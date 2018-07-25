/**
 * @Author: gaoyang
 * @Date:   2018-05-17
 */

let { deepCopy } = require('state/common')

// 按钮
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   540
	}, 
	style: {
		text: {}
	},
	content: {themeColor:{type:'main',color:'#cfad81'}},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}
}

module.exports = {
	name: 'map2D',
	type: 'base',
	data: deepCopy(data),
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name:  '样式1',
			img:   '',
			data:  deepCopy(data)
		}]
	},
	// 功能特性
	feature: {
	}
}