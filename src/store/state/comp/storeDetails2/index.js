let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const sb  = authInit(require('./content/storeBlock'))
const swb = authInit(require('state/comp/swiperBind'))

/* 店铺详情 */
const INFO = extendRmSL(styleIdxChange(0, deepCopy(sb)), {
	data: {
		layout: {
			// top:  0,
			// left: 0
		}
	}
})

const Swiper = extendRmSL(styleIdxChange(0, deepCopy(swb)), {
	data: {
		layout: {
			top:    150,
			height: 216
		},
		style: {
			paginationBox: {
				backgroundColor: { type: 'custom', color: 'rgba(255,255,255,0)', rgb: '#fff', alpha: 0 }
			}
		},
		content: {
			bind: 'pictures',
			swiperOptions: {
				spaceBetween:  10,
				slidesPerView: 2,
				pagination: true
			}
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
		INFO, Swiper
	]
}

module.exports = {
	name: 'storeDetails2',
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


