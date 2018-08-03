let { authInit, deepCopy, extend, styleIdxChange } = require('state/common')
// const list = authInit(require('./content/listByGoods'))

// 店铺列表
const dataStyle_1 = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   800
	},
	style: {},
	content: {},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	},
	components: []
}

module.exports = {
	name: 'tabs',
	type: 'advanced',
	data: deepCopy(dataStyle_1),
	// 动画设置
	styleList: {
		idx:  0,
		list: [{
			name: '品牌导购',
			img:  '',
			data: deepCopy(dataStyle_1)
		}]
	},
	// 功能特性
	feature: {
		max: 0,
		body: {
			catg: ''
		}
	}
}
