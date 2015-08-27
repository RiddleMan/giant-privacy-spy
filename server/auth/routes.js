import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../config';

export default (app) => {
    app.use('/auth/login', passport.authenticate('local'), (req, res) => {
        let token = jwt.sign({id:req.user.id}, 'asdf');
        res.json(Object.assign({
            token
        }, config));
    });
}
