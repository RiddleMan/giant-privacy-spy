/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
import webpack from 'webpack';
import path from 'path';

const API_URL = process.env['__API_URL__'] || 'http://localhost:3001/'; //eslint-disable-line

export default {
    output: {
        path: path.join(__dirname, '.tmp'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    devtool: 'eval-source-map',
    entry: [
        'whatwg-fetch',
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        './src/index.js'
    ],

    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            exclude: [/node_modules/, /vendor/],
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.(js|jsx)$/,
            include: path.join(__dirname, 'src'),
            loader: 'babel-loader'
        },
        {
            test: /\.scss/,
            loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader'
        },
        {
            test: /\.json/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpg|ttf|svg|eot|woff|woff2)/,
            loader: 'url-loader?limit=8192'
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            __DEVTOOLS__: false,
            __API_URL__: `\'${API_URL}\'`
        })
    ]

};
