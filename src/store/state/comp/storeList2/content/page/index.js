let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const a  = authInit(require('state/comp/area'))
// const tb = authInit(require('state/comp/textBind'))

const Point = extendRmSL(deepCopy(a), {
	data: {
		layout: {
			top:  5,
			left: 5,
			width:  8,
			height: 8
		},
		style: {
			filterBox: {
				opacity: 0.2,
				borderRadius: {
					topLeft:     8,
					topRight:    8,
					bottomRight: 8,
					bottomLeft:  8
				},
				backgroundColor: { type: 'main', color: '#666' }
			}
		}
	}
})
const PointAV = extendRmSL(deepCopy(a), {
	data: {
		layout: {
			top:  5,
			left: 5,
			width:  8,
			height: 8
		},
		style: {
			filterBox: {
				opacity: 1,
				borderRadius: {
					topLeft:     8,
					topRight:    8,
					bottomRight: 8,
					bottomLeft:  8
				},
				backgroundColor: { type: 'main', color: '#666' }
			}
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
			justifyContent: 'center',
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
			width:  18,
			height: 18,
			margin: {
				top:    0,
				right:  0,
				bottom: 0,
				left:   0
			}
		}
	},
	componentLayout: [ Point, PointAV ],
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
	name: 'pageByStore2',
	type: 'layout',
	// 位置大小
	data: deepCopy(data),
	// 样式列表
	styleList: {
		idx:  0,
		list: [
		{
			name: '原点',
			img:  '',
			data: deepCopy(data)
		}
		]
	},
	// 功能特性
	feature: {
	}
}