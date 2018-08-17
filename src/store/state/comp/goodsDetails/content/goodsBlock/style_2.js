let { authInit, deepCopy, extendRmSL } = require('state/common')
const p  = authInit(require('state/comp/picture'))
const t  = authInit(require('state/comp/text'))
const tb = authInit(require('state/comp/textBind'))

const Title = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  7,
			left: 0,
			width:  520,
			height: 18
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201807251208278441.png' }
		}
	}
})

// 退换货政策
const Name1 = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  44,
			left: 10,
			width:  72,
			height: 16
		},
		style: {
			text: {
				textAlign:  'left',
				lineHeight: 14,
				color: { type: 'custom', color: '#666' }
			}
		},
		content: {
			text: '退换货政策:'
		}
	}
})

// 退换货政策
const Con1 = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  44,
			left: 82,
			width:  300,
			height: 16
		},
		style: {
			text: {
				textAlign:  'left',
				lineHeight: 14,
				color: { type: 'custom', color: '#1375aa' }
			}
		},
		content: {
			text: '非商品质量问题不支持退货'
		}
	}
})

// 字母排序
module.exports = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  520,
		height: 100
	},
	style: {
		filterBox: {
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'main', color: '#fff' },
			backgroundColor: { type: 'custom', color: '#fff' },
			borderRadius: {
				topLeft:     6,
				topRight:    6,
				bottomLeft:  6,
				bottomRight: 6
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color:      { type: 'custom', color: '#000' }
			}
		}
	},
	componentLayout: [
		Title,
		Name1,
		Con1
	],
	content: {},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	}
}