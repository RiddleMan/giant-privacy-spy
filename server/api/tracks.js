const api = require('../utils').api('/tracks');
const isLogged = require('../auth').isLogged;
const Busboy = require('busboy');
const Track = require('../models/Track');
const through = require('through2');
const JSONStream = require('JSONStream');

const fs = require('fs');
const path = require('path');

const trackStream = (user) => {
    return through.obj((googleTrack, enc, cb) => {
        const track = new Track(googleTrack);
        track._user = user;

        this.push('');

        track.save(() => cb());
    });
};

api.post('/', isLogged, (req, res) => {
    if(!req.is('multipart/form-data'))
        res.sendStatus(415);

    const busboy = new Busboy({
        headers: req.headers
    });

    busboy.on('file', (fieldname, file) => {
        file
            .pipe(JSONStream.parse('locations.*'))
            .pipe(trackStream(req.user))
            .on('data', () => {})
            .on('error', () => {
                res.sendStatus(500);
            })
            .on('end', () => {
                res.writeHead(201, { Connection: 'close' });
                res.end();
            });
    });

    req.pipe(busboy);
});

module.exports = api.main;
