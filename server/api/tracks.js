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
    let counter = 0;
    const BATCH_SIZE = 1000;
    return new Writable({
        objectMode: true,
        // writev(chunks, cb) {
        //     const mapper = mapToDoc(user);
        //
        //     const docs = chunks.map(({chunk}) =>
        //         mapper(chunk));
        //
        //     if(counter % BATCH_SIZE === 0)
        //         setTimeout(() => {
        //             Track.collection.insert(docs, cb);
        //         }, 1000);
        //     else
        //         Track.collection.insert(docs, cb);
        //     counter++;
        // },
        write(googleTrack, enc, cb) {
            const doc = [
                mapToDoc(user)(googleTrack)
            ];

            if(counter % BATCH_SIZE === 0)
                setTimeout(() => {
                    Track.collection.insert(doc, cb);
                }, 1000);
            else
                Track.collection.insert(doc, cb);
            counter++;
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
