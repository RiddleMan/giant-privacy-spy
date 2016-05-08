const api = require('../utils').api('/media');
const isLogged = require('../auth').isLogged;
const Busboy = require('busboy');
const Media = require('../models/Media');

api.get('/boxes', isLogged, (req, res) => {
    Media.boxFiles({
        startPosition: req.query.startPos,
        endPosition: req.query.endPos,

        //TODO: search: 'hakunamatata'
        after: req.query.after,
        before: req.query.before,
        extensions: req.query.extensions
    }, (err, results) => {
        if(err)
            return res.sendStatus(500);

        res.send(results);
    });
});

api.get('/', isLogged, (req, res) => {
    Media.unboxFiles({
        box: req.query.box,

        //TODO: search: 'hakunamatata'
        after: req.query.after,
        before: req.query.before,
        extensions: req.query.extensions,
        size: req.query.size && parseInt(req.query.size),
        page: req.query.page && parseInt(req.query.page),
        sort: req.query.sort
    }, (err, results) => {
        if(err)
            return res.sendStatus(500);

        res.send(results);
    });
});

api.get('/:id', isLogged, (req, res) => {
    Media.getFile({
        id: req.params.id,

        //TODO: search: 'hakunamatata'
        box: req.query.box,
        after: req.query.after,
        before: req.query.before,
        extensions: req.query.extensions,
        sort: req.query.sort
    }, (err, media) => {
        if(err)
            return res.sendStatus(500);

        if(!media)
            return res.sendStatus(404);

        res.json(media);
    });
});

api.post('/', isLogged, (req, res) => {
    if(!req.is('multipart/form-data'))
        res.sendStatus(415);

    const media = new Media({
        _user: req.user
    });
    const busboy = new Busboy({
        headers: req.headers
    });

    busboy.on('file', (fieldname, file, filename, encoding, mimeType) => {
        media.saveFile({
            file,
            name: filename,
            mimeType
        }, (err) => {
            if(err)
                return res.sendStatus(500);

            res.writeHead(201, { Connection: 'close' });
            res.end();
        });
    });

    req.pipe(busboy);
});

api.get('/static/:id', (req, res) => {
    Media.getStaticFile(req.params.id, (err, file) => {
        if(err && err.code === 'ENOENT')
            return res.sendStatus(404);

        if(err)
            return res.sendStatus(500);

        res.writeHead(200, {
            'Content-type': file.mimeType //TODO: Forever cache
        });
        file.file.pipe(res);
    });
});

api.put('/', isLogged, (req, res) => {
    //TODO: Create update of coordinates + filename etc.
});

api.delete('/:id', isLogged, (req, res) => {
    Media.findOneAndRemove({
        _id: req.params.id,
        _user: req.user._id
    }, (err, media) => {
        if(err)
            return res.sendStatus(500);

        if(!media)
            res.sendStatus(404);

        res.sendStatus(200);
    });
});

module.exports = api.main;
