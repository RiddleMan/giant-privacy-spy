'use strict';

const api = require('../utils')
    .api('/auth');
const User = require('../models/User');
const getToken = require('./jwtStrategy').getToken;
const isLogged = require('./authMiddleware');

const getTokenCtrl = (req, res) => {
    getToken(req.body.user, req.body.password, (err, token) => {
        if(err)
            return res.sendStatus(401);

        res.json({
            token
        });
    });
};

api.post('/login', getTokenCtrl);

api.post('/register', (req, res) => {
    User.findOne({
        name: req.body.user
    }, (err, user) => {
        if(user)
            return res.send(409);

        const obj = new User({
            name: req.body.user,
            email: req.body.email,
            password: req.body.password
        });

        obj.save((err) => {
            if(err)
                return res.send(500);

            getTokenCtrl(req, res);
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
