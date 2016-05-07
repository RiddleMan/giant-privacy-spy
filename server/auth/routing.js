'use strict';

const api = require('../utils')
    .api('/auth');
const getToken = require('./jwtStrategy').getToken;
const isLogged = require('./authMiddleware');

api.post('/login', (req, res) => {
    getToken(req.body.user, req.body.password, (err, token) => {
        if(err)
            return res.sendStatus(401);

        res.json({
            token
        });
    });
});

api.get('/', isLogged, (req, res) => {
    res.json({
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = api.main;
