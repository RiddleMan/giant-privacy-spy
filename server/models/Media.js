'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GeoJSON = require('mongoose-geojson-schema');
const Grid = require('gridfs-stream');
const connection = mongoose.connection;
const errno = require('errno');
const parallel = require('run-parallel');
const waterfall = require('run-waterfall');
const getImageExif = require('./utils').getImageExif;
const getExifCoordinates = require('./utils').getExifCoordinates;
const getExifDate = require('./utils').getExifDate;
const moment = require('moment');
const geohash = require('ngeohash');
const geolib = require('geolib');
const fs = require('fs');
const tmp = require('tmp');
const im = require('imagemagick');
const path = require('path');

const getGrid = () => {
    Grid.mongo = mongoose.mongo;
    return Grid(connection.db);
};

const MediaSchema = new Schema({
    exif: {
        type: Object,
        default: {}
    },
    _geoHash: {
        type: String
    },
    _loc: GeoJSON.Point,
    name: {
        type: String,
        default: ''
    },
    mimeType: {
        type: String,
        default: ''
    },
    thumbnails: {
        200: { type: Schema.Types.ObjectId },
        500: { type: Schema.Types.ObjectId },
        800: { type: Schema.Types.ObjectId },
        1920: { type: Schema.Types.ObjectId },
        original: { type: Schema.Types.ObjectId }
    },
    _createDate: {
        type: Date,
        default: Date.now
    },
    tags: [{
        type: String
    }],
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    fileId: Schema.Types.ObjectId
});

if(!MediaSchema.options.toJSON)
    MediaSchema.options.toJSON = {
        virtuals: true
    };

MediaSchema.options.toJSON.transform = function(doc, ret) {
    delete ret._user;
    delete ret.__v;
    delete ret.id;
};

MediaSchema.virtual('loc')
    .get(function() {
        return this._loc;
    })
    .set(function(val) {
        const coords = val.coordinates;
        this._geoHash = geohash.encode(coords[1], coords[0], 11);
        this._loc = val;
    });

MediaSchema.virtual('createDate')
    .get(function() {
        if(this._createDate)
            return this._createDate;

        return this._id.getTimestamp();
    })
    .set(function(val) {
        if(this.exif)
            return this._createDate = getExifDate(this.exif).toISOString();

        if(val)
            return this._createDate = val;

        this._craeteDate = this._id.getTimestamp();
    });

MediaSchema.statics.getStaticFile = (id, cb) => {
    const _cb = cb || function() {};
    const gfs = getGrid();
    const query = {
        _id: id
    };

    gfs.exist(query, (err, found) => {
        if(err)
            return _cb(err);

        if(!found)
            return _cb(errno.code.ENOENT);

        gfs.findOne(query, (err, fileData) => {
            if(err)
                return _cb(err);

            _cb(null, {
                mimeType: fileData.contentType,
                file: gfs.createReadStream(query)
            });
        });
    });
};

const countPrecision = (startLat, startLong, endLat, endLong) => {
    const width = geolib.getDistance(
        { latitude: startLat, longitude: startLong },
        { latitude: startLat, longitude: endLong }
    );
    const height = geolib.getDistance(
        { latitude: startLat, longitude: startLong },
        { latitude: endLat, longitude: startLong }
    );

    const PRECISIONS = [
        [5009.4 * 1000, 4992.6 * 1000],
        [1252.3 * 1000, 624.1 * 1000],
        [156.5 * 1000, 156 * 1000],
        [39.1 * 1000, 19.5 * 1000],
        [4.9 * 1000, 4.9 * 1000],
        [1.2 * 1000, 609.4],
        [152.9, 152.4],
        [38.2, 19],
        [4.8, 4.8]
    ];

    for(let i = 0; i < PRECISIONS.length; i++) {
        if(PRECISIONS[i][0] < width || PRECISIONS[i][1] < height)
            return i + 1;
    }

    return 1;
};

MediaSchema.statics.boxFiles = function(predicate, cb) {
    const precision = countPrecision(
        predicate.startPosition[1],
        predicate.startPosition[0],
        predicate.endPosition[1],
        predicate.endPosition[0]
    );

    const bboxes = geohash.bboxes(
        predicate.startPosition[1],
        predicate.startPosition[0],
        predicate.endPosition[1],
        predicate.endPosition[0],
        precision
    ).map((bbox) => new RegExp(`^${bbox}`));

    const match = {
        _geoHash: {
            $in: bboxes
        }
    };

    if(predicate.after || predicate.before)
        match._createDate = {};

    if(predicate.before)
        match._createDate.$lt = new Date(predicate.before);

    if(predicate.after)
        match._createDate.$gte = new Date(predicate.after);

    if(predicate.extensions)
        match.name = {
            $in: predicate.extensions.map((ext) => new RegExp(`\\${ext}$`))
        };

    if(predicate.tags)
        match.tags = {
            $in: predicate.tags
        };

    this.aggregate()
        .match(match)
        .group({
            _id: {
                $substr: ['$_geoHash', 0, precision]
            },
            loc: { $last: '$_loc' },
            count: { $sum: 1 }
        })
        .exec(cb);
};

MediaSchema.statics.getFile = function(predicate, cb) {
    const _predicate = Object.assign({
        sort: '-_createDate'
    }, predicate);

    const match = {
        _id: new mongoose.Types.ObjectId(predicate.id)
    };

    if(predicate.box)
        match._geoHash = new RegExp(`^${_predicate.box}`);

    if(_predicate.after || _predicate.before)
        match._createDate = {};

    if(_predicate.before)
        match._createDate.$lt = new Date(_predicate.before);

    if(_predicate.after)
        match._createDate.$gte = new Date(_predicate.after);

    if(_predicate.extensions)
        match.name = {
            $in: _predicate.extensions
                .map((ext) => new RegExp(`\\${ext}$`))
        };

    if(_predicate.tags)
        match.tags = {
            $in: _predicate.tags
        };

    let currFile;

    const getLinkedFiles = (file, cb) => {
        const BATCH_SIZE = 100;
        currFile = file[0];

        if(!currFile)
            return cb();

        const sortPropName = predicate.sort.replace(/^-/, '');
        delete match._id;

        let prevMatch = Object.assign({}, match);
        if(sortPropName in match) {
            prevMatch = {
                $and: [
                    prevMatch,
                    Object.assign({}, prevMatch, {
                        [sortPropName]: {
                            $lte: currFile[sortPropName]
                        }
                    })
                ]
            };
        }

        const nextMatch = Object.assign({}, match);
        if(sortPropName in match) {
            prevMatch = {
                $and: [
                    prevMatch,
                    Object.assign({}, prevMatch, {
                        [sortPropName]: {
                            $gte: currFile[sortPropName]
                        }
                    })
                ]
            };
        }

        const prevSort = _predicate.sort.indexOf('-') === 0 ?
            _predicate.sort.replace(/^-/, '') : '-' + _predicate.sort;

        const isReverted = _predicate.sort.indexOf('-') === 0;

        parallel([
            (cb) => {
                let count = 0;
                const findPrev = (page = 0, cb) =>
                    this.find(isReverted ? nextMatch : prevMatch, '_id')
                        .sort(prevSort + ' _id')
                        .skip(page * BATCH_SIZE)
                        .limit(BATCH_SIZE)
                        .exec(cb);

                const checker = (err, docs) => {
                    if(err)
                        return cb(err);

                    for(let i = 0; i < docs.length; i++) {
                        const doc = docs[i];

                        if(doc.id.toString() === predicate.id) {
                            if((i + 2) <= docs.length)
                                return cb(null, docs[i + 1].id);

                            return cb(null, null);
                        }
                    }

                    if(docs.length <= BATCH_SIZE) {
                        findPrev(++count, checker);
                    }
                };

                findPrev(count, checker);
            },
            (cb) => {
                let count = 0;
                const findNext = (page = 0, cb) => this.find(isReverted ? prevMatch : nextMatch, '_id')
                    .sort(_predicate.sort + ' -_id')
                    .skip(page * BATCH_SIZE)
                    .limit(BATCH_SIZE)
                    .exec(cb);

                const checker = (err, docs) => {
                    if(err)
                        return cb(err);


                    for(let i = 0; i < docs.length; i++) {
                        const doc = docs[i];

                        if(doc.id.toString() === predicate.id) {
                            if((i + 2) <= docs.length)
                                return cb(null, docs[i + 1].id);

                            return cb(null, null);
                        }
                    }

                    if(docs.length <= BATCH_SIZE) {
                        findNext(++count, checker);
                    }
                };

                findNext(count, checker);
            }
        ], cb);
    };

    waterfall([
        (cb) => this.find(match)
            .limit(1)
            .exec(cb),
        getLinkedFiles
    ], (err, linkedFiles) => {
        if(err)
            return cb(err);

        if(!currFile)
            return cb(null, currFile);

        const prevFile = linkedFiles[0];
        const nextFile = linkedFiles[1];

        cb(null, Object.assign(currFile.toJSON(), {
            prev: prevFile,
            next: nextFile
        }));
    });
};

MediaSchema.statics.updateFile = function(id, update, cb) {
    const _update = Object.assign({}, update);

    if('_loc' in update) {
        _update._loc = {
            type: 'Point',
            coordinates: update._loc
        };
        _update._geoHash = geohash.encode(update._loc[1], update._loc[0], 11);
    }

    if('tags' in update) {
        this.model('Tag').createIfNotExists({
            _user: _update._user,
            tags: update.tags
        });
    }

    this.model('Media').update({
        _id: new mongoose.Types.ObjectId(id)
    }, _update, cb);
};

MediaSchema.statics.unboxFiles = function(predicate, cb) {
    const _predicate = Object.assign({
        page: 1,
        size: 10,
        sort: '-createDate'
    }, predicate);

    const match = {
        _geoHash: new RegExp(`^${_predicate.box}`)
    };

    if(_predicate.after || _predicate.before)
        match._createDate = {};

    if(_predicate.before)
        match._createDate.$lt = new Date(_predicate.before);

    if(_predicate.after)
        match._createDate.$gte = new Date(_predicate.after);

    if(_predicate.extensions)
        match.name = {
            $in: _predicate.extensions
                .map((ext) => new RegExp(`\\${ext}$`))
        };

    if(_predicate.tags)
        match.tags = {
            $in: _predicate.tags
        };

    const skip = _predicate.size * (_predicate.page - 1);

    this.find(match)
        .skip(skip)
        .limit(_predicate.size)
        .sort(_predicate.sort + ' -_id')
        .exec(cb);
};

const exifMimeTypes = [
    'image/jpeg'
];

MediaSchema.methods.setLocation = function(cb) {
    if(this.exif && this.exif.gps.GPSLatitudeRef) {
        this.loc = getExifCoordinates(this.exif);
        return process.nextTick(() => cb());
    }

    this.model('Track').findOne({
        _user: this._user._id,
        _createDate: {
            $lt: moment(this.createDate).add(1, 'h').toDate(),
            $gte: moment(this.createDate).subtract(30, 'm').toDate()
        }
    }, (err, track) => {
        if(err)
            return cb(err);

        if(track)
            this.loc = track.loc;
        else
            this.loc = {
                type: 'Point',
                coordinates: [
                    16.5334442,
                    51.8335932
                ]
            };

        cb();
    });
};

const createThumbnails = (imgStream, mimeType, fileName, cb) => {
    let _tmpPath;
    let _cleanupCb;
    let _originalId;

    const saveToGFS = (filePath, cb) => {
        const _id = mongoose.Types.ObjectId();
        const gfs = getGrid();

        const readStream = fs.createReadStream(filePath);
        const writeStream = gfs.createWriteStream({
            _id,
            filename: fileName,
            content_type: mimeType //eslint-disable-line
        });

        readStream
            .on('end', () => cb(null, _id))
            .pipe(writeStream)
            .on('error', (err) => cb(err));
    };

    const resize = (originalImgPath, width, cb) => {
        im.identify(['-format', '%wx%h', originalImgPath], (err, rawDim) => {
            if(err)
                return cb(err);

            const dims = rawDim.split('x');
            const w = dims[0];
            const h = dims[1];
            const ratio = w / width > 1 ? 1 : w / width;

            const rDim = {
                w: width,
                h: h * ratio
            };

            const destPath = path.join(_tmpPath, '' + width);
            im.resize({
                srcPath: originalImgPath,
                dstPath: destPath,
                width: rDim.w,
                height: rDim.h
            }, (err) => {
                if(err)
                    return cb(err);

                saveToGFS(destPath, cb);
            });
        });
    };

    waterfall([
        tmp.dir.bind(null, {
            unsafeCleanup: true
        }),
        (tmpPath, cleanupCb, cb) => {
            _tmpPath = tmpPath;
            _cleanupCb = cleanupCb;

            const originalFS = fs.createWriteStream(path.join(_tmpPath, fileName), 'binary');

            imgStream
                .on('end', () => cb(null))
                .pipe(originalFS)
                .on('error', (err) => cb(err));
        },
        (cb) => saveToGFS(path.join(_tmpPath, fileName), cb),
        (originalId, cb) => {
            const originalPath = path.join(_tmpPath, fileName);
            _originalId = originalId;

            parallel([
                resize.bind(null, originalPath, 500),
                resize.bind(null, originalPath, 800),
                resize.bind(null, originalPath, 1000),
                resize.bind(null, originalPath, 1920),
                exifMimeTypes.indexOf(mimeType) !== -1 ?
                   getImageExif.bind(null, originalPath) :
                   (cb) => cb
            ], cb);
        }
    ], (err, ids) => {
        if(err)
            return cb(err);

        cb(null, {
            original: _originalId,
            200: ids[0],
            500: ids[1],
            800: ids[2],
            1920: ids[3],
            exif: ids[4]
        });
        _cleanupCb();
    });
};

MediaSchema.methods.saveFile = function(options, cb) {
    const _cb = cb || function() {};

    parallel([
        /^image/.test(options.mimeType) ?
            createThumbnails.bind(
                null,
                options.file,
                options.mimeType,
                options.name
            ) :
            (cb) => {
                const _id = mongoose.Types.ObjectId();
                const gfs = getGrid();

                const writeStream = gfs.createWriteStream({
                    _id,
                    filename: options.name,
                    content_type: options.mimeType //eslint-disable-line
                });
                options.file
                    .on('end', () => cb(null, {
                        original: _id
                    }))
                    .pipe(writeStream)
                    .on('error', (err) => cb(err));
            }
    ], (err, results) => {
        if(err)
            return _cb(err);
        const ids = results[0];

        this.exif = ids.exif;
        this.fileId = ids.original;
        if(Object.keys(ids).length > 1) {
            delete ids.exif;
            this.thumbnails = ids;
        }

        this.name = options.name;
        this.mimeType = options.mimeType;
        this.createDate = options.createDate;
        this.setLocation((err) => {
            if(err)
                return _cb(err);

            this.save(_cb);
        });
    });
};

MediaSchema.index({
    _loc: '2dsphere',
    name: 1,
    _geoHash: 1,
    _createDate: 1,
    tags: 1,
    _user: 1
});

MediaSchema.index({
    _loc: '2dsphere',
    name: 1,
    _geoHash: 1,
    _createDate: -1,
    tags: 1,
    _user: 1
});

module.exports = mongoose.model('Media', MediaSchema);
