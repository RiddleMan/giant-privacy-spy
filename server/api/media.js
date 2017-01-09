const api = require('../utils').api('/media');
const isLogged = require('../auth').isLogged;
const Busboy = require('busboy');
const Media = require('../models/Media');
const _ = require('lodash');

api.get('/boxes', isLogged, (req, res, next) => {
    Media.boxFiles({
        startPosition: req.query.startPos,
        endPosition: req.query.endPos,

        searchPhrase: req.query.searchPhrase,
        after: req.query.after,
        before: req.query.before,
        extensions: req.query.extensions,
        tags: req.query.tags,
        _user: req.user.id
    }, (err, results) => {
        if(err)
            return next(err);

        res.send(results);
    });
});

api.get('/', isLogged, (req, res, next) => {
    Media.unboxFiles({
        box: req.query.box,

        searchPhrase: req.query.searchPhrase,
        after: req.query.after,
        before: req.query.before,
        extensions: req.query.extensions,
        size: req.query.size && parseInt(req.query.size),
        page: req.query.page && parseInt(req.query.page),
        sort: req.query.sort,
        tags: req.query.tags,
        _user: req.user.id
    }, (err, results) => {
        if(err)
            return next(err);

        res.send(results);
    });
});

api.get('/:id', isLogged, (req, res, next) => {
    Media.getFile({
        id: req.params.id,

        searchPhrase: req.query.searchPhrase,
        box: req.query.box,
        after: req.query.after,
        before: req.query.before,
        extensions: req.query.extensions,
        sort: req.query.sort,
        tags: req.query.tags,
        _user: req.user.id
    }, (err, media) => {
        if(err)
            return next(err);

        if(!media)
            return res.sendStatus(404);

        res.json(media);
    });
});

api.post('/', isLogged, (req, res, next) => {
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
                return next(err);

            res.writeHead(201, { Connection: 'close' });
            res.end();
        });
    });

    req.pipe(busboy);
});

api.get('/static/:id', (req, res, next) => {
    Media.getStaticFile(req.params.id, (err, file) => {
        if(err && err.code === 'ENOENT')
            return res.sendStatus(404);

        if(err)
            return next(err);

        res.writeHead(200, {
            'Content-type': file.mimeType //TODO: Forever cache
        });
        file.file.pipe(res);
    });
});

api.put('/', isLogged, (req, res, next) => {
    const id = req.body._id;

    if(!id)
        res.sendStatus(400);

    const update = Object.assign(_.omit(req.body, ['_id']), {
        _user: req.user.id
    });

    Media.updateFile(id, update, (err) => {
        if(err)
            return next(err);

        res.sendStatus(200);
    });
});

api.delete('/:id', isLogged, (req, res, next) => {
    Media.remove(
        req.params.id,
        req.user._id,
        (err) => {
            if(err)
                return next(err);

            res.sendStatus(200);
        });
});

module.exports = api.main;
