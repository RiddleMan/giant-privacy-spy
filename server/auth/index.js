'use strict';

const passport = require('passport');
const passportLocal= require('passport-local');
const passportJwt = require('passport-jwt');
const authRoutes = require('./routes');

passport.use(new passportLocal.Strategy({
    session: false
}, (username, password, cb) => {
    //TODO: restore user from DB
    return cb(null, {id:'asdf234'});
}));

passport.use(new passportJwt.JWTStrategy({
    //TODO: take secret from config
    secretOrKey: 'asdfaaa',
    session: false
}, (jwt_payload, cb) => {
    //TODO: restore user from DB
    cb(null, {id:'asdf234'})
}));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  cb(null, { id: id });
});
module.exports = {
    init: (app) => {
        app.use(passport.initialize());
        authRoutes(app);
    },
    IsAuth: (req, res, next) => {
        passport.authenticate('jwt')(req, res, next);
    }
};
