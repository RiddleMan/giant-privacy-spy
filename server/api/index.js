'use strict';
const express = require('express');
const router = express.Router();
const mainRouter = express.Router();

const routes = [
    require('./media')
];

routes.forEach(routePath =>
    router.use(routePath));

mainRouter.use('/api', router);
module.exports = mainRouter;
