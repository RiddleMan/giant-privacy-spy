const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const config = require('../config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: config.jwt.secret
}

const register = () => {
    passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
        User.findById(payload.id, (err, user) => {
            if (err || !user)
                return done(err, false);

            if (user)
                return done(null, user);
        });
    }));
};

const generateToken = (userId, cb) => {
    jwt.sign({
        id: userId
    }, config.jwt.secret, {}, cb.bind(null, null));
}

const getToken = (user, password, cb) => {
    User.findOne({
        name: user
    }, (err, user) => {
        if(err)
            return cb(err, null);

        if(user.authenticate(password)) {
            generateToken(user.id, cb);
        } else {
            cb(err, false);
        }
    })

};

module.exports = {
    register,
    getToken
};
