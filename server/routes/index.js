const main = require('./main');

module.exports = function(app) {
    app.use('/', main);
}
