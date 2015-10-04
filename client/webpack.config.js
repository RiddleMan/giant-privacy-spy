/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');

module.exports = {

    output: {
        filename: 'main.js',
        publicPath: '/assets/',
        path: '.tmp/assets/'
    },

    cache: true,
    debug: true,
    devtool: 'sourcemap',
    entry: [
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],

    stats: {
        colors: true,
        reasons: true
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'gojs': __dirname + '/src/vendor/gojs/go-debug'
        }
    },
    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            exclude: [/node_modules/, /vendor/],
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: [/node_modules/, /vendor/],
            loader: 'babel-loader'
        }, {
            test: /\.scss/,
            loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader'
        }, {
            test: /\.json/,
            loader: 'json-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg|ttf|svg|eot|woff|woff2)$/,
            loader: 'url-loader?limit=8192'
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            __DEVTOOLS__: false,
            __API_URL__: '\'http://localhost:3000/\''
        }),
        new webpack.ProvidePlugin({
            'fetch': 'babel-loader!imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]

};
