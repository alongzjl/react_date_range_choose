let { authInit, deepCopy, extendRmSL } = require('state/common')
const t  = authInit(require('state/comp/text'))
const pb = authInit(require('state/comp/pictureBind'))
const tb = authInit(require('state/comp/textBind'))
const sb = authInit(require('state/comp/swiperBind'))

const Spr = extendRmSL(deepCopy(sb), {
	data: {
		layout: {
			top:  10,
			left: 10,
			width:  200,
			height: 200
		},
		content: {
			bind: 'pics'
		}
	}
})
const Name = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  10,
			left: 225,
			width:  285,
			height: 42
		},
		style:     {
			text: {
				textAlign:  'left',
				fontSize:   15,
				lineHeight: 20,
				color: { type: 'custom', color: '#666' }
			}
		},
		content: {
			bind: 'name'
		}
	}
})
const PIcon = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  80,
			left: 226,
			width:  20,
			height: 28
		},
		style:     {
			text: {
				// textAlign:  'left',
				fontSize:   23,
				lineHeight: 28,
				color: { type: 'custom', color: '#da2339' }
			}
		},
		content: {
			text: '¥'
		}
	}
})
const Price = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  68,
			left: 246,
			width:  155,
			height: 43
		},
		style:     {
			text: {
				textAlign:  'left',
				fontSize:   35,
				lineHeight: 43,
				color: { type: 'custom', color: '#da2339' }
			}
		},
		content: {
			bind: 'price'
		}
	}
})
const OPT = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  114,
			left: 228,
			width:  30,
			height: 16
		},
		style:     {
			text: {
				// textAlign:  'left',
				// fontSize:   12,
				lineHeight: 16,
				color: { type: 'custom', color: '#999' }
			}
		},
		content: {
			text: '原价:'
		}
	}
})
const OPrice = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  111,
			left: 260,
			width:  50,
			height: 20
		},
		style:     {
			text: {
				textAlign:  'left',
				fontSize:   15,
				lineHeight: 20,
				color: { type: 'custom', color: '#999' }
			}
		},
		content: {
			bind: 'oldPrice'
		}
	}
})
const QR = extendRmSL(deepCopy(pb), {
	data: {
		layout: {
			top:  99,
			left: 416,
			width:  94,
			height: 94
		},
		content: {
			bind: 'QRPic'
		}
	}
})
const QRT = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  194,
			left: 416,
			width:  94,
			height: 14
		},
		style:     {
			text: {
				lineHeight: 14,
				color: { type: 'custom', color: '#999' }
			}
		},
		content: {
			text: '扫码即可购买'
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
		height: 220
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
	componentLayout: [ Spr, Name, PIcon, Price, OPT, OPrice, QR, QRT ],
	content: {},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	}
}