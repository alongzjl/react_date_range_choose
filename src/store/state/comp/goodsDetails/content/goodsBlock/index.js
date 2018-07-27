const { deepCopy } = require('state/common')
const style_1 = require('./style_1')
const style_2 = require('./style_2')

module.exports = {
	name: 'goodsBlock',
	type: 'layout',
	// 位置大小
	data: deepCopy(style_1),
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name: '商品描述',
			img:  '',
			data: deepCopy(style_1)
		}, {
			name: '商品详情',
			img:  '',
			data: deepCopy(style_2)
		}]
	},
	// 功能特性
	feature: {
	}
}