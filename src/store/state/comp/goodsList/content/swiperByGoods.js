const common = require('state/common')
let { authInit, deepCopy, extend, styleIdxChange } = common
const p  = authInit(require('../../picture'))
const pb = authInit(require('../../pictureBind'))
const t  = authInit(require('../../text'))
const tb = authInit(require('../../textBind'))
const sb = authInit(require('state/comp/swiperBind'))

const Name = extend(deepCopy(tb), {
	data: {
		layout: {
			top:  25,
			left: 25,
			width:  210,
			height: 42
		},
		content: {
			bind: 'name'
		},
		style: {
			text: {
				fontSize:   15,
				lineHeight: 20,
				textAlign: 'left',
				color: { type: 'custom', color: '#666' }
			}
		}
	}
})
const PIcon = extend(deepCopy(t), {
	data: {
		layout: {
			top:  114,
			left: 25,
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
const Price = extend(deepCopy(tb), {
	data: {
		layout: {
			top:  101,
			left: 45,
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
const PriceT = extend(deepCopy(t), {
	data: {
		layout: {
			top:  106,
			left: 154.5,
			width:  70,
			height: 17
		},
		style:     {
			text: {
				lineHeight: 16,
				color: { type: 'custom', color: '#da2339' }
			}
		},
		content: {
			text: '现场专享价'
		}
	}
})
const OPT = extend(deepCopy(t), {
	data: {
		layout: {
			top:  122.5,
			left: 150,
			width:  30,
			height: 16
		},
		style:     {
			text: {
				lineHeight: 16,
				color: { type: 'custom', color: '#999' }
			}
		},
		content: {
			text: '原价:'
		}
	}
})
const OPrice = extend(deepCopy(tb), {
	data: {
		layout: {
			top:  120,
			left: 181.5,
			width:  50,
			height: 20
		},
		style:     {
			text: {
				textAlign:  'left',
				textDecoration: 'line-through',
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
const QR = extend(deepCopy(pb), {
	data: {
		layout: {
			top:  26.5,
			left: 274,
			width:  95,
			height: 95
		},
		content: {
			bind: 'QRPic'
		}
	}
})
const QRT = extend(deepCopy(t), {
	data: {
		layout: {
			top:  123.5,
			left: 275,
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
const Spr = extend(deepCopy(sb), {
	data: {
		layout: {
			top:  154,
			left: 25,
			width:  344,
			height: 344
		},
		content: {
			bind: 'pics'
		}
	}
})
const DescT = extend(deepCopy(tb), {
	data: {
		layout: {
			top:  75,
			left: 25,
			width:  200,
			height: 24
		},
		style:     {
			text: {
				lineHeight: 12,
				color: { type: 'custom', color: '#da2339' },
				padding: {
					top:    1,
					right:  8,
					bottom: 1,
					left:   8,
				},
				borderRadius:    {
					topLeft:     4,
					topRight:    4,
					bottomRight: 4,
					bottomLeft:  4
				},
				borderWidth:     1,
				borderStyle:     'solid',
				borderColor: 	 { type: 'custom', color: '#da2339' },
			}
		},
		content: {
			bind: 'desc'
		}
	}
})


// 字母排序
const data = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  540,
		height: 600
	},
	style: {
		filterBox: {
			width:  394,
			height: 523,
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'main', color: '#fff' },
			backgroundColor: { type: 'custom', color: '#fff' },
			borderRadius:    {
				topLeft:     20,
				topRight:    20,
				bottomLeft:  20,
				bottomRight: 20
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   60,
				spread_dis: 0,
				color:      { type: 'custom', color: 'rgba(0,0,0,.24)' }
			}
		}
	},
	componentLayout: [ Name, DescT, PIcon, Price, PriceT, OPT, OPrice, QR, QRT, Spr ],
	content: {
		swiperOptions: {
			direction: 'horizontal',
			effect:  'slide',
			autoplay: true,
			loop:  true,
			speed: 500,
			delay: 3000,
			spaceBetween:   150,
			slidesPerView:  2,
			slidesPerGroup: 1,
			slidesOffsetBefore: 0,
			centeredSlides: true
		},
		recommendGoods: []
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
	name: 'swiperByGoods',
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