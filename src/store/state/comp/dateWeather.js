const common = require('state/common')
let { authInit, deepCopy, extend, styleIdxChange } = common
const p = authInit(require('./picture'))
const t = authInit(require('./time'))
const w = authInit(require('./weather'))

const time     = extend(styleIdxChange(1, deepCopy(t)), {
	data: {
		layout: {
			top:  18,
			left: 26,
			width:  110,
			height: 42
		},
		style: {
			text: {
				fontSize:   40, 
				lineHeight: 42,
			}
		}
	}
})
const time2    = extend(styleIdxChange(2, deepCopy(t)), {
	data: {
		layout: {
			top:    60,
			left:   20,
			width:  76,
			height: 24
		},
		style: {
			text: {
				fontSize:   14, 
				lineHeight: 24,
			},
			split: {
				fontSize:   14, 
				lineHeight: 14,
			}
		},
		content: {
			split: '.'
		}
	}
})
const time3    = extend(styleIdxChange(4, deepCopy(t)), {
	data: {
		layout: {
			top:    60,
			left:   95,
			width:  50,
			height: 24
		},
		style: {
			text: {
				fontSize:     14, 
				lineHeight:   24,
			}
		}
	}
})
const weather  = extend(deepCopy(w), {
	data: {
		layout: {
			top:    30,
			left:   200,
			width:  60,
			height: 28
		},
		style: {
			text: {
				textAlign:  'right',
				fontSize:   24, 
				lineHeight: 28
			}
		}
	}
})
const weather2 = extend(styleIdxChange(3, deepCopy(w)), {
	data: {
		layout: {
			top:    56,
			left:   200,
			width:  60,
			height: 24
		},
		style: {
			text: {
				textAlign:  'right',
				fontSize:   14, 
				lineHeight: 24
			}
		}
	}
})
const weather3 = extend(styleIdxChange(7, deepCopy(w)), {
	data: {
		layout: {
			top:    30,
			left:   260,
			width:  52,
			height: 52
		}
	}
})
const picture  = extend(deepCopy(p), {
	data: {
		layout: {
			top:    35,
			left:   390,
			width:  130,
			height: 32
		},
		style: {
			image:{
				borderRadius: {
					topLeft:     0,
					topRight:    0,
					bottomRight: 0,
					bottomLeft:  0
				}
			}
		},
		content: {
			img: { type: 'logo', img: '' }
		}
	}
})

// 店铺列表
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   100
	},
	style: {
	},
	content: {
	},
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	},
	components: [
		time,
		time2,
		time3,
		weather,
		weather2,
		weather3,
		picture
	]
}

module.exports = {
	name: 'dateWeather',
	type: 'advanced',
	data: deepCopy(data),
	// 动画设置
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