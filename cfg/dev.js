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
	module: defaultSettings.getDevModules(),
});

let target = 'http://java1.rongyi.com'

config.devServer = {
	contentBase: './src/',
	historyApiFallback: true,
	stats: 'errors-only',
	hot: true,
	port: defaultSettings.port,
	publicPath: defaultSettings.publicPath,
	noInfo: false,
	proxy: {
		'/easy-roa/v1/user': {
			target: target,
			secure: false,
			changeOrigin: 'true',
		},
		'/bsoms': {
			target: target,
			secure: false,
			changeOrigin: 'true',
			onProxyRes:function(proxyRes, req, res) {
				//登录处理
				let cookies  =  proxyRes.headers['set-cookie']
				var newCookies = []
				console.log('========== 登录成功 ==========')
				if(cookies){
					cookies.forEach(function(cookie,index){
						newCookies.push(cookie.replace(/\.rongyi\.com/,'localhost'))
					})
					proxyRes.headers['set-cookie']=newCookies
				}else{
					console.log('========== 登录失败 ==========')
				}
			}
		},
		'/chaoyue': {
			target: 'http://localhost:4080/api/store',
			secure: false,
			changeOrigin: 'true',
		},
		'/store': {
			target: 'http://localhost:4080/api/store',
			secure: false,
			changeOrigin: 'true',
		},
		'/mcp-gateway': {
			target: 'http://192.168.1.52:10078',
			secure: false,
			changeOrigin: 'true',
		},
	}
}

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
