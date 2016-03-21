const api = require('../utils').api('/media');
const isLogged = require('../auth').isLogged;
const Busboy = require('busboy');
const Media = require('../models/Media');

api.get('/', isLogged, (req, res) => {
    //TODO: Filter options. Hugeeee.
    res.send({
        user: req.user,
        asdf: 'asdf'
    });
});

api.get('/:id', isLogged, (req, res) => {
    Media.findById(req.params.id, (err, media) => {
        if(err)
            return res.sendStatus(500);

        if(!media)
            return res.sendStatus(404);

        res.json(media.toJSON());
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
    Media.getFile(req.params.id, (err, file) => {
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
