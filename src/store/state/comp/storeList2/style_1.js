let { authInit, deepCopy, extendRmSL } = require('state/common')
const list   = authInit(require('./content/list'))
const catg   = authInit(require('./content/catg'))
const reset  = authInit(require('./content/reset'))
const floor  = authInit(require('./content/floor'))
const letter = authInit(require('./content/letter'))
const page   = authInit(require('./content/page'))

const List = extendRmSL(deepCopy(list), {
	data: {
		layout: {
			top:  75,
			left: 40
		}
	}
})
const Catg  = extendRmSL(deepCopy(catg), {
	data: {
		layout: {
			top:  36,
			left: 104
		}
	}
})
const Reset = extendRmSL(deepCopy(reset), {
	data: {
		layout: {
			top:  36,
			left: 40
		}
	}
})
const Floor = extendRmSL(deepCopy(floor), {
	data: {
		layout: {
			top:  80,
			left: 490
		}
	}
})
const Letter = extendRmSL(deepCopy(letter), {
	data: {
		layout: {
			top:    405,
			left:   80,
			width:  370,
			height: 60
		}
	}
})
const Page = extendRmSL(deepCopy(page), {
	data: {
		layout: {
			top:    374,
			left:   40,
			width:  430,
			height: 20
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
		height:   500
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
	components: [ Catg, List, Reset, Floor, Letter, Page ]
}
