const mongoose = require('mongoose');
const models = require('../models');
const config = require('../config');

const connect = () => {
    const options = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    };
    mongoose.connect(config.mongo.conn, options);
}

const bootstrap = (cb) => {
    connect();
    const db = mongoose.connection;

    db.on('error',
        console.error.bind(
            console, '[MONGOOSE]: Connection error'));

    //db.on('disconnected', connect);

    models.bootstrap();
}

module.exports = bootstrap;
