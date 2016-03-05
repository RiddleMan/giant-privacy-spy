const strategy = require('./jwtStrategy')
strategy.register();
const passport = require('passport');
module.exports = {
    routing: require('./routing'),
    isLogged: passport.authenticate('jwt', { session: false})
};
