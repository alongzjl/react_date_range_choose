let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const a   = authInit(require('../area'))
const p   = authInit(require('../picture'))
const pb  = authInit(require('../pictureBind'))
const plb = authInit(require('../pictureListBind'))
const t   = authInit(require('../text'))
const tb  = authInit(require('../textBind'))
const sb  = authInit(require('../swiperBind'))
const gb  = authInit(require('./content/goodsBar'))
const gbk = authInit(require('./content/goodsBlock'))

/* 商品条 */
const GB = extendRmSL(deepCopy(gb), {
	data: {
		layout: {
			left: 10
		}
	}
})

/* 商品描述 */
const GBINFO = extendRmSL(deepCopy(gbk), {
	data: {
		layout: {
			top:  10,
			left: 10
		}
	}
})

/* 商品详情 */
const GBINFO2 = extendRmSL(styleIdxChange(1, deepCopy(gbk)), {
	data: {
		layout: {
			top:  240,
			left: 10
		}
	}
})

/* 商品图 */
const GoodsPic = extendRmSL(deepCopy(plb), {
	data: {
		layout: {
			top:  372,
			left: 10,
			width:  520,
			height: 120
		},
		style:     {
			filterBox: {
				width: 520,
				padding: {
					left: 125
				},
				borderRadius: {
					topLeft:     6,
					topRight:    6,
					bottomRight: 6,
					bottomLeft:  6
				}
			},
			image: {
				width:  270,
				height: 270,
				margin: {
					bottom: 10
				}
			}
		},
		content: {
			bind: 'pics'
		}
	}
})

const data = {
	style: {},
	layout:    {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   960
	},
	content:   {},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	},
	// 组件管理
	components: [
		GBINFO,
		GBINFO2,
		GoodsPic,
		GB
	]
}

module.exports = {
	name: 'goodsDetails',
	type: 'advanced',
	// 样式管理
	data: deepCopy(data),
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: deepCopy(data)
		}]
	},
	// 功能特性
	feature: {}
}


