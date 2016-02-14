'use strict';

const utils = require('../utils');
const EnvEnum = utils.EnvEnum;
let config = {};
const env = process.env.NODE_ENV;

switch (env) {
case EnvEnum.PRODUCTION:
    Object.assign(config, require('./production'));
    break;
case EnvEnum.TEST:
    Object.assign(config, require('./test'));
default:
    Object.assign(config, require('./development'))
}

module.exports = config;
