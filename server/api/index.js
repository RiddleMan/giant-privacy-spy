'use strict';
const express = require('express');
const router = express.Router();

const routes = {
    '/auth': require('./auth')
};

module.exports = (app) => {
    Object.keys(routes)
        .forEach(routePath =>
            router.use(routePath, routes[routePath]));

    app.use('/api', router);
}
