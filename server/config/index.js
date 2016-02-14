'use strict';

const utils = require('../utils');
let config = {};

const production = require('./production');
const test = require('./test');
const development = require('./development');

const env = process.env.NODE_ENV;

if(env === utils.EnvEnum.PRODUCTION)
    Object.assign(config, production);
else if(env === utils.EnvEnum.TEST)
    Object.assign(config, test);
else
    Object.assign(config, development);

module.exports = config;
