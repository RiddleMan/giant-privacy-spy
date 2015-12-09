/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
import webpack from 'webpack';
import path from 'path';

export default {
    output: {
        path: path.join(__dirname, '.tmp'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    devtool: 'sourcemap',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
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
            loader: 'react-hot!babel-loader'
        }, {
            test: /\.json/,
            loader: 'json-loader'
        }, {
            test: /\.(png|jpg|ttf|svg|eot|woff|woff2)$/,
            loader: 'url-loader?limit=8192'
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            __DEVTOOLS__: false
        }),
        new webpack.ProvidePlugin({
            fetch: 'babel-loader!imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]

};
