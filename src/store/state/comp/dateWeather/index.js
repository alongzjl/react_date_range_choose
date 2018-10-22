const style_6 = require('./style_6')
const style_5 = require('./style_5')
const style_4 = require('./style_4')
const style_3 = require('./style_3')
const style_2 = require('./style_2')
const style_1 = require('./style_1')
let { deepCopy } = require('state/common')
 
module.exports = {
	name: 'dateWeather',
	type: 'advanced',
	data: deepCopy(style_3), 
	// 动画设置
	styleList: {
		idx:  0,
		list: [{
			name: '天气+日期常规',
			img:  '',
			data: deepCopy(style_3)
		},{ 
			name: '天气常规',
			img:  '',
			data: deepCopy(style_2)
		},{
			name: '天气+日期中型',
			img:  '',
			data: deepCopy(style_5)
		},{
			name: '天气迷你',
			img:  '',
			data: deepCopy(style_1)
		},{  
			name: '日期常规',
			img:  '',
			data: deepCopy(style_6)
		},{   
			name: '日期迷你',  
			img:  '',
			data: deepCopy(style_4) 
		}]
	},
	// 功能特性
	feature: {
	}
}