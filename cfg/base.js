'use strict';
let path = require('path');
const projectRoot = process.cwd();
let defaultSettings = require('./defaults');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let additionalPaths = [];

let REACT_WEBPACK_ENV = process.env.REACT_WEBPACK_ENV;
let envMap = {
    qa: 'qa',
    rd: 'dev'
};

if (envMap[REACT_WEBPACK_ENV]) {
    REACT_WEBPACK_ENV = envMap[REACT_WEBPACK_ENV]
}

module.exports = {
    additionalPaths: additionalPaths,
    port: defaultSettings.port,
    debug: true,
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '/../dist/assets'),
        filename: 'app.js',
        publicPath: defaultSettings.publicPath
    },
    // devServer: {
    //     contentBase: './src/',
    //     historyApiFallback: true,
    //     hot: true,
    //     port: defaultSettings.port,
    //     publicPath: defaultSettings.publicPath,
    //     noInfo: false
    // },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            store:      `${defaultSettings.srcPath}/store`,
            business:   `${defaultSettings.srcPath}/containers/business`,
            operate:    `${defaultSettings.srcPath}/containers/operate`,
            actions:    `${defaultSettings.srcPath}/store/actions`,
            components: `${defaultSettings.srcPath}/components`,
            public:     `${defaultSettings.srcPath}/public`,
            styles:     `${defaultSettings.srcPath}/styles`,
            images:     `${defaultSettings.srcPath}/images`,
            services:   `${defaultSettings.srcPath}/services`,
            config:     `${defaultSettings.srcPath}/config/` + (REACT_WEBPACK_ENV || 'dev')
        }
    },
    module: {},
};
