/**
 * v4环境
 * @Date:   2017-03-31 10:33:16
 * @Last modified time: 2017-09-11T16:26:06+08:00
 */

'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let config = Object.assign({}, baseConfig, {
    entry: path.join(__dirname, '../src/index'),
    output: {
        path: path.join(__dirname, '/../dist'),
        filename: '[name]_[hash:8].js',
        chunkFilename: '[name]_[hash:8].js',
        publicPath: '/store_static/'
        // publicPath: 'http://rongyi.b0.upaiyun.com/fe/screen/v23/assets/'
    },
    cache: false,
    // devtool: 'source-map',
    devtool: 'hidden-source-map',
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            ENV: JSON.stringify('dist'),
        }),
        new BowerWebpackPlugin({
            searchResolveModulesDirectories: false
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './src/index.html',
            filename: 'index.html'
        })
    ],
    module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'babel',
    include: [].concat(
        config.additionalPaths,
        [ path.join(__dirname, '/../src') ]
    )
});

module.exports = config;
