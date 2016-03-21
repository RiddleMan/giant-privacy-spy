const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GeoJSON = require('mongoose-geojson-schema');
const Grid = require('gridfs-stream');
const connection = mongoose.connection;
const errno = require('errno');
const parallel = require('run-parallel');
const getImageExif = require('./utils').getImageExif;
const getExifCoordinates = require('./utils').getExifCoordinates;

const getGrid = () => {
    Grid.mongo = mongoose.mongo;
    return Grid(connection.db);
};

const MediaSchema = new Schema({
    exif: {
        type: Object,
        default: {}
    },
    loc: GeoJSON.Point,
    name: {
        type: String,
        default: ''
    },
    mimeType: {
        type: String,
        default: ''
    },
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
    delete ret._id;
    delete ret._user;
    delete ret.__v;
    delete ret.id;
};

MediaSchema.virtual('createdDate')
    .get(function() {
        return this._id.getTimestamp();
    });

MediaSchema.statics.getFile = (id, cb) => {
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

const exifMimeTypes = [
    'image/jpeg'
];

MediaSchema.methods.saveFile = function(options, cb) {
    const _cb = cb || function() {};
    const _id = mongoose.Types.ObjectId();
    const gfs = getGrid();

    const writeStream = gfs.createWriteStream({
        _id,
        filename: options.name,
        content_type: options.mimeType //eslint-disable-line
    });
    options.file.pipe(writeStream);

    parallel([
        exifMimeTypes.indexOf(options.mimeType) !== -1 ?
            getImageExif.bind(null, options.file) :
            (cb) => cb(),
        (cb) => {
            writeStream.on('close', cb.bind(null, null));
        }
    ], (err, results) => {
        if(err)
            return _cb(err);

        const exif = results[0];

        this.exif = exif;
        this.fileId = _id;
        this.name = options.name;
        this.mimeType = options.mimeType;
        this.loc = exif && exif.gps.GPSLatitudeRef ?
            getExifCoordinates(exif) :
            {
                coordinates: [
                    17.04052448272705,
                    51.0819254574311
                ]
            };

        this.save(_cb);
    });

    writeStream.on('error', _cb);
};

MediaSchema.index({
    loc: '2d'
});

module.exports = mongoose.model('Media', MediaSchema);
