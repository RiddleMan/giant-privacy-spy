const api = require('../utils').api('/tracks');
const isLogged = require('../auth').isLogged;
const Busboy = require('busboy');
const Track = require('../models/Track');
const JSONStream = require('JSONStream');
const tmp = require('tmp');
const fs = require('fs');
const Writable = require('stream').Writable;
const getFloatCoord = require('../models/utils').getFloatCoord;

const mapToDoc = (user) => ({
    accuracy,
    timestampMs,
    longitudeE7,
    latitudeE7
}) => {
    return {
        _user: user._id,
        accuracy,

        loc: {
            coordinates: [
                getFloatCoord(longitudeE7),
                getFloatCoord(latitudeE7)
            ],
            type: 'Point'
        },
        _createDate: new Date(parseInt(timestampMs))
    };
};

const trackStream = (user) => {
    return new Writable({
        objectMode: true,
        writev(chunks, cb) {
            const mapper = mapToDoc(user);

            const docs = chunks.map(({chunk}) =>
                mapper(chunk));

            Track.collection.insert(docs, cb);
        },
        write(googleTrack, enc, cb) {
            Track.collection.insert(
                [
                    mapToDoc(user)(googleTrack)
                ],
                cb);
        }
    });
};

const processTracks = (user, filePath, cleanupCb) => {
    fs.createReadStream(filePath)
        .pipe(JSONStream.parse('locations.*'))
        .pipe(trackStream(user))
        .on('finish', cleanupCb);
};

api.post('/', isLogged, (req, res) => {
    if(!req.is('multipart/form-data'))
        res.sendStatus(415);

    const busboy = new Busboy({
        headers: req.headers
    });

    const sendSuccess = (...args) => () => {
        res.writeHead(201, { Connection: 'close' });
        res.end();

        processTracks(...args);
    };

    busboy.on('file', (fieldname, file) => {
        tmp.file(function(err, path, _, cleanupCb) {
            file
                .pipe(fs.createWriteStream(path))
                .on('finish', sendSuccess(req.user, path, cleanupCb));
        });
    });

    req.pipe(busboy);
});

module.exports = api.main;
