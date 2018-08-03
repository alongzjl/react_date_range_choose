let { authInit, deepCopy } = require('state/common')
const swiper = authInit(require('./content/swiper'))

const goodsList = deepCopy(swiper)

// 推荐商品
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
	components: [goodsList]
}
