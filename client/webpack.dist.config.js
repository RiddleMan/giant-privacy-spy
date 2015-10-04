/*
 * Webpack distribution configuration
 *
 * This file is set up for serving the distribution version. It will be compiled to dist/ by default
 */

'use strict';

var webpack = require('webpack');

module.exports = {

    output: {
        publicPath: '/assets/',
        path: 'dist/assets/',
        filename: 'main.[hash].js'
    },

    debug: false,
    devtool: false,
    entry: './src/index.js',

    stats: {
        colors: true,
        reasons: false
    },

    plugins: [
        function() {
            this.plugin("done", function(stats) {
                var fs = require('fs');
                var path = require('path');

                var distHtmlPath = path.join(__dirname, 'dist', 'index.html');
                var file = fs.readFileSync(distHtmlPath, {
                    encoding: 'utf8'
                });
                var info = stats.toJson();

                var fileReplaced = file.replace('main.js', info.assetsByChunkName.main);

                fs.writeFileSync(
                    distHtmlPath,
                    fileReplaced
                );
            });
        },
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: false,
            __DEVTOOLS__: false,
            __API_URL__: '\'http://localhost:3000/\''
        }),
        new webpack.ProvidePlugin({
            'fetch': 'babel-loader!imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],

    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'gojs': __dirname + '/src/vendor/gojs/go'
        }
    },

    module: {
        preLoaders: [{
            test: /\.(js|jsx)$/,
            exclude: [/node_modules/, /vendor/, /FileManager.js/],
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: [/node_modules/, /vendor/],
            loader: 'babel-loader'
        }, {
            test: /\.json/,
            loader: 'json-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.scss/,
            loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 versions!sass-loader?outputStyle=expanded'
        }, {
            test: /\.(png|jpg|ttf|svg|eot|woff|woff2)$/,
            loader: 'url-loader?limit=8192'
        }]
    }
};
