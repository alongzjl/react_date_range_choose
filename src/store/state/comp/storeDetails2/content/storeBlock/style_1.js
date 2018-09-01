let { authInit, deepCopy, extendRmSL } = require('state/common')
const p  = authInit(require('state/comp/picture'))
const pb = authInit(require('state/comp/pictureBind'))
const tb = authInit(require('state/comp/textBind'))

const Logo = extendRmSL(deepCopy(pb), {
	data: {
		layout: {
			top:  30,
			left: 30,
			width:  40,
			height: 40
		},
		content: {
			bind: 'logo'
		}
	}
})
const Name = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  30,
			left: 88,
			width:  120,
			height: 20
		},
		style:     {
			text: {
				textAlign:  'left',
				fontSize:   12,
				lineHeight: 20,
				color: { type: 'custom', color: '#666' }
			}
		},
		content: {
			bind: 'name'
		}
	}
})
const Pos = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  54,
			left: 88,
			width:  16,
			height: 16
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805191128322385.png' }
		}
	}
})
const PosT = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  54,
			left: 110,
			width:  60,
			height: 20
		},
		style:     {
			text: {
				textAlign:  'left'
			}
		},
		content: {
			bind: 'berthNumber'
		}
	}
})
const Phone = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  54,
			left: 172,
			width:  16,
			height: 16
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/e49fe7db-78c7-4dc6-9abd-d2198b8b4ffb.png' }
		}
	}
})
const PhoneT = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  54,
			left: 192,
			width:  120,
			height: 20
		},
		style:     {
			text: {
				textAlign:  'left'
			}
		},
		content: {
			bind: 'contact'
		}
	}
})
const Go = extendRmSL(deepCopy(p), {
	data: {
		layout: {
			top:  30,
			left: 467,
			width:  40,
			height: 40
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/136c4156-08c9-4d37-8ffc-da00c7b5af7b.png' }
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
		height: 120
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
	componentLayout: [ Logo, Name, Pos, PosT, Phone, PhoneT, Go ],
	content: {},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	}
}