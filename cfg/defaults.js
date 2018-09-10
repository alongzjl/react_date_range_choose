/**
 * @Author: Liao Hui
 * @Date:   2017-09-07T15:30:52+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2017-09-08T10:20:21+08:00
 */

/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8111;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */

const modules = [
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
    },
    {
        test: /\.less/,
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
    },
    {
        test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg)\??.*$/,
        loader: 'url-loader?limit=10000&name=[path][name]_[hash:8].[ext]'
    },
    {
        test: /\.(mp3|mp4|ogg)$/,
        loader: 'file-loader'
    }
]
function getDefaultModules() {
    return {
        preLoaders: [
            {
                test: /\.jsx?$/,
                include: srcPath,
                loader: 'eslint-loader'
            }
        ],
        loaders: modules
    };
}
function getDevModules() {
    return {
        loaders: modules
    };
}

module.exports = {
    srcPath: srcPath,
    publicPath: '/assets/',
    port: dfltPort,
    getDevModules: getDevModules,
    getDefaultModules: getDefaultModules
};
