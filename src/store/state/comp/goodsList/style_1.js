let { authInit, deepCopy, extendRmSL } = require('state/common')
const list = authInit(require('./content/list'))
const catg = authInit(require('./content/catg'))

const goodsList = extendRmSL(deepCopy(list), {
	data: {
		layout: {
			top:  90,
			left: 5
		}
	}
})

const goodsCatg = extendRmSL(deepCopy(catg), {
	data: {
		// layout: {
		// 	top:  0,
		// 	left: 0
		// }
	}
})

// 商品列表
module.exports = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   600
	},
	style: {},
	content: {
		size: 6
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	},
	components: [ goodsCatg, goodsList ]
}
