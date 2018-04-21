'use strict';

// require('core-js/fn/object/assign')

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

let config = Object.assign({}, baseConfig, {
	entry: path.resolve('./src/index.js'),
	output: {
		path: path.resolve('./dist'),
		filename: '[name]_[hash:8].js',
	},
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
})

// Add needed loaders to the defaults here
config.module.loaders.push({
	test: /\.(js|jsx)$/,
	loader: 'react-hot!babel-loader',
	include: [].concat(
		config.additionalPaths,
		[ path.join(__dirname, '/../src') ]
	)
})

// 本地代理
let target = 'http://java1.rongyi.com'

config.devServer = {
	host: 'localhost',
	port: defaultSettings.port,
	historyApiFallback: true,
	stats: 'errors-only',
	hot: true,
	proxy: {
		'^/easy-roa/v1/user/**': {
			target: target,
			secure: false,
			changeOrigin: 'true',
		},
		'^/bsoms/**': {
			target: target,
			secure: false,
			changeOrigin: 'true',
			onProxyRes:function(proxyRes, req, res) {
				//登录处理
				let cookies  =  proxyRes.headers['set-cookie']
				var newCookies = []
				console.log('================ 登录成功 ================')
				if(cookies){
					cookies.forEach(function(cookie,index){
						newCookies.push(cookie.replace(/\.rongyi\.com/,'localhost'))
					})
					proxyRes.headers['set-cookie']=newCookies
				}else{
					console.log('================ 登录失败 ================')
				}
			}
		},
	}
}

module.exports = config;
