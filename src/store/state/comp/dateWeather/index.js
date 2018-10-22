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
			name: '样式1',
			img:  '',
			data: deepCopy(style_3)
		},{ 
			name: '样式2',
			img:  '',
			data: deepCopy(style_2)
		},{
			name: '样式3',
			img:  '',
			data: deepCopy(style_5)
		},{
			name: '样式4',
			img:  '',
			data: deepCopy(style_1)
		},{  
			name: '样式5',
			img:  '',
			data: deepCopy(style_6)
		},{   
			name: '样式6', 
			img:  '',
			data: deepCopy(style_4) 
		}]
	},
	// 功能特性
	feature: {
	}
}