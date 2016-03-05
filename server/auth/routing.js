'use strict';

const api = require('../utils')
    .api('/auth');
const getToken = require('./jwtStrategy').getToken;

api.post('/login', (req, res) => {
    getToken(req.body.user, req.body.password, (err, token) => {
        if(err)
            return res.sendStatus(401);

        res.json({
            token
        });
    });
});

module.exports = api.main;
