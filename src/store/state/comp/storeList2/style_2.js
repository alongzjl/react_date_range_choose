let { authInit, deepCopy, extendRmSL } = require('state/common')
const list   = authInit(require('./content/list'))
const floor  = authInit(require('./content/floor'))
const page   = authInit(require('./content/page'))
const map    = authInit(require('./content/map'))

const List = extendRmSL(deepCopy(list), {
	data: {
		layout: {
			left: 40
		}
	}
})
const Floor = extendRmSL(deepCopy(floor), {
	data: {
		layout: {
			left: 490
		}
	}
})
const Page = extendRmSL(deepCopy(page), {
	data: {
		layout: {
			top:    300,
			left:   40,
			width:  430,
			height: 20
		}
	}
})
const Map = extendRmSL(deepCopy(map), {
	data: {
		layout: {
			top:    340
		}
	}
})


// 商品列表
module.exports = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   880
	},
	style: {},
	content: {
		size: 12,
		dataSource: 'base'
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	},
	components: [ List, Floor, Page, Map ]
}
