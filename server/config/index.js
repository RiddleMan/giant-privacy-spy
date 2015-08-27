import { EnvEnum } from '../utils';
let config = {};

import production from './production';
import test from './test';
import development from './development';

const env = process.env.NODE_ENV;

if(env === EnvEnum.PRODUCTION)
    Object.assign(config, production);
else if(env === EnvEnum.TEST)
    Object.assign(config, test);
else
    Object.assign(config, development);

export default config;
