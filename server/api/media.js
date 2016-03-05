const api = require('../utils').api('/media');
const isLogged = require('../auth').isLogged;

api.get('/', isLogged, (req, res) => {
    res.send({
        user: req.user,
        asdf: 'asdf'
    });
});

module.exports = api.main;
