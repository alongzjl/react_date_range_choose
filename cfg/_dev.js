'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

let config = Object.assign({}, baseConfig, {
	entry: [
		'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
		'webpack/hot/only-dev-server',
		'./src/index'
	],
	cache: true,
	devtool: 'eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			ENV: JSON.stringify('dev'),
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new BowerWebpackPlugin({
			searchResolveModulesDirectories: false
		})
	],
	module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
	test: /\.(js|jsx)$/,
	loader: 'react-hot!babel-loader',
	include: [].concat(
		config.additionalPaths,
		[ path.join(__dirname, '/../src') ]
	)
});

module.exports = config;
