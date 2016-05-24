const api = require('../utils').api('/tags');
const isLogged = require('../auth').isLogged;
const Tag = require('../models/Tag');

api.get('/', isLogged, (req, res) => {
    Tag.getAll(req.user.id, (err, tags) => {
        if(err)
            return res.send(500);

        res.json(
            tags.map((t) =>
                t.toJSON()
            )
        );
    });
});

module.exports = api.main;
