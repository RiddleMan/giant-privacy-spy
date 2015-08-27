import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy } from 'passport-jwt';
import authRoutes from './routes';

passport.use(new LocalStrategy({
    session: false
}, (username, password, cb) => {
    //TODO: restore user from DB
    return cb(null, {id:'asdf234'});
}));

passport.use(new JWTStrategy({
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

export const init = (app) => {
    app.use(passport.initialize());
    authRoutes(app);
}

export const IsAuth = (req, res, next) => {
    passport.authenticate('jwt')(req, res, next);
}
