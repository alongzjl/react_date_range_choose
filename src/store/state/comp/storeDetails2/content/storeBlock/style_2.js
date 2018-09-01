let { authInit, deepCopy, extendRmSL } = require('state/common')
const a  = authInit(require('state/comp/area'))
const t  = authInit(require('state/comp/text'))
const tb = authInit(require('state/comp/textBind'))

const Line = extendRmSL(deepCopy(a), {
	data: {
		layout: {
			top:  16,
			left: 30,
			width:  2,
			height: 12
		},
		style: {
			filterBox: {
				backgroundColor: { type: 'main', color: '#666' }
			}
		}
	}
})
const Title = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  12,
			left: 40,
			width:  100,
			height: 20
		},
		style:     {
			text: {
				textAlign:  'left',
				lineHeight: 20
			}
		},
		content: {
			text: '店铺介绍'
		}
	}
})
const Desc = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  60,
			left: 30,
			width:  480,
			height: 110
		},
		style:     {
			text: {
				textAlign:  'left'
			}
		},
		content: {
			bind: 'description'
		}
	}
})

// 字母排序
module.exports = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  540,
		height: 170
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
	componentLayout: [ Line, Title, Desc ],
	content: {},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	}
}