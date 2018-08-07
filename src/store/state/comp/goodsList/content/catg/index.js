let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const a  = authInit(require('state/comp/area'))
const pb = authInit(require('state/comp/pictureBind'))
const tb = authInit(require('state/comp/textBind'))

const gPic = extendRmSL(deepCopy(pb), {
	data: {
		layout: {
			top:  5,
			left: 36,
			width:  40,
			height: 40
		},
		style: {
			image: {
				opacity: 0.2
			}
		},
		content: {
			bind: 'pic'
		}
	}
})
const gName = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  45,
			width:  112,
			height: 16
		},
		style: {
			text: {
				opacity: 0.2
			}
		},
		content: {
			bind: 'name'
		}
	}
})
const gPicAV = extendRmSL(deepCopy(pb), {
	data: {
		layout: {
			top:  5,
			left: 36,
			width:  40,
			height: 40
		},
		content: {
			bind: 'pic'
		}
	},
	feature: { active: true }
})
const gNameAV = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  45,
			width:  112,
			height: 16
		},
		content: {
			bind: 'name'
		}
	},
	feature: { active: true }
})
const gLineAV = extendRmSL(deepCopy(a), {
	data: {
		layout: {
			top:  74,
			left: 26,
			width:  60,
			height: 4
		},
		content: {
			bind: 'name'
		}
	},
	feature: { active: true }
})

// 字母排序
const data = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  540,
		height: 80
	},
	style: {
		filterFlex: {
			flexWrap: 'nowrap'
		},
		filterBox: {
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'main', color: '#fff' },
			backgroundColor: { type: 'custom', color: '#fff' },
			padding: {
				top:    0,
				right:  34,
				bottom: 0,
				left:   34
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
			width:  112,
			height: 80
		}
	},
	componentLayout: [ gPic, gName, gPicAV, gNameAV, gLineAV ],
	content: {
		router: {},
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
	name: 'catgByGoods',
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