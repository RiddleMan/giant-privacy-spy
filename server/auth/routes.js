'use strict';

const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports =  (app) => {
    app.use('/auth/login', passport.authenticate('local'), (req, res) => {
        let token = jwt.sign({id:req.user.id}, 'asdf');
        res.json(Object.assign({
            token
        }, config));
    });
}
