'use strict';
const env = process.env.NODE_ENV || 'development'; // eslint-disable-line
const base = {
    jwt: {
        secret: 'hakunamatata'
    }
};

module.exports = Object.assign(base, require(`./${env}`));
