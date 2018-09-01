let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const tb = authInit(require('state/comp/textBind'))

const gName = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  0,
			width:  60,
			height: 24
		},
		style: {
			text: {
				lineHeight:      24,
				backgroundColor: { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 },
				borderRadius:    {
					topLeft:     20,
					topRight:    20,
					bottomRight: 20,
					bottomLeft:  20
				},
				borderColor: 	 { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 },
				color:           { type: 'custom', color: '#666' }
			}
		},
		content: {
			bind: 'name'
		}
	}
})
const gNameAV = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  0,
			width:  60,
			height: 24
		},
		style: {
			text: {
				lineHeight:      20,
				backgroundColor: { type: 'main', color: '#a240ec' },
				borderRadius:    {
					topLeft:     20,
					topRight:    20,
					bottomRight: 20,
					bottomLeft:  20
				},
				borderWidth:     2,
				borderColor: { type: 'auxiliary', color: '#a240ec' },
				color: { type: 'textHigh', color: '#fff' },
			}
		},
		content: {
			bind: 'name'
		}
	},
	feature: { active: true }
})


const data = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  370,
		height: 30
	},
	style: {
		filterFlex: {
			flexDirection: 'row',
			flexWrap: 'nowrap',
		},
		filterBox: {
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'main', color: '#fff' },
			backgroundColor: { type: 'custom', color: 'rgba(255, 255, 255, 0)', rgb: '#fff', alpha: 0 },
			padding: {
				top:    0,
				right:  0,
				bottom: 0,
				left:   0
			},
			borderRadius: {
				topLeft:     0,
				topRight:    0,
				bottomLeft:  0,
				bottomRight: 0
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color: { type: 'custom', color: '#000' }
			}
		},
		filter: {
			width:  60,
			height: 24,
			margin: {
				top:    0,
				right:  20,
				bottom: 0,
				left:   20
			}
		}
	},
	componentLayout: [ gName, gNameAV ],
	content: {
		rel: 0,
		router: {}
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	}
}

module.exports = {
	name: 'catgByStore2',
	type: 'layout',
	// 位置大小
	data: deepCopy(data),
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: deepCopy(data)
		}]
	},
	// 功能特性
	feature: {
	}
}