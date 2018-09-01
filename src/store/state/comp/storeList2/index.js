let { authInit, deepCopy, extend } = require('state/common')
const style_1 = require('./style_1')
const style_2 = require('./style_2')

module.exports = {
	name: 'storeList2',
	type: 'advanced',
	data: deepCopy(style_1),
	// 动画设置
	styleList: {
		idx:  0,
		list: [
		{
			name: '店铺列表',
			img:  '',
			data: deepCopy(style_1)
		},
		{
			name: '楼层导航',
			img:  '',
			data: deepCopy(style_2)
		}
		]
	},
	// 功能特性
	feature: {
		body: {
			page:   1,
			size:   6,
			total:  0
		}
	}
}
