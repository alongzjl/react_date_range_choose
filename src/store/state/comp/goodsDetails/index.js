/**
 * @Author: Along
 * @Date:   2018-05-10
 */

let { authInit, deepCopy, extend } = require('state/common')
const a   = authInit(require('../area'))
const p   = authInit(require('../picture'))
const pb  = authInit(require('../pictureBind'))
const plb = authInit(require('../pictureListBind'))
const t   = authInit(require('../text'))
const tb  = authInit(require('../textBind'))
const sb  = authInit(require('../swiperBind'))
const gb  = authInit(require('./content/goodsBar'))

const Bg1 = extend(deepCopy(a), {
	data: {
		layout: {
			top:      10,
			left:     10,
			width:    520,
			height:   220
		},
		style: {
			filterBox: {
				borderRadius: {
					topLeft:     6,
					topRight:    6,
					bottomRight: 6,
					bottomLeft:  6
				},
				backgroundColor: { type: 'custom', color: '#fff' }
			}
		}
	}
})
const Bg2 = extend(deepCopy(a), {
	data: {
		layout: {
			top:      240,
			left:     10,
			width:    520,
			height:   220
		},
		style: {
			filterBox: {
				borderRadius: {
					topLeft:     6,
					topRight:    6,
					bottomRight: 6,
					bottomLeft:  6
				},
				backgroundColor: { type: 'custom', color: '#fff' }
			}
		}
	}
})
const Spr = extend(deepCopy(sb), {
	data: {
		layout: {
			top:  24,
			left: 43,
			width:  153,
			height: 168
		},
		content: {
			bind: 'pics'
		}
	}
})
const Name = extend(deepCopy(tb), {
	data: {
		layout: {
			top:  20,
			left: 235,
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
const PIcon = extend(deepCopy(t), {
	data: {
		layout: {
			top:  90,
			left: 236,
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
			top:  78,
			left: 256,
			width:  155,
			height: 43
		},
		style:     {
			text: {
				textAlign:  'left',
				fontSize:   35,
				lineHeight: 43,
				fontFamily: 'Impact',
				color: { type: 'custom', color: '#da2339' }
			}
		},
		content: {
			bind: 'price'
		}
	}
})
const OPT = extend(deepCopy(t), {
	data: {
		layout: {
			top:  124,
			left: 238,
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
const OPrice = extend(deepCopy(tb), {
	data: {
		layout: {
			top:  121,
			left: 270,
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
const QR = extend(deepCopy(pb), {
	data: {
		layout: {
			top:  109,
			left: 426,
			width:  94,
			height: 94
		},
		content: {
			bind: 'QRPic'
		}
	}
})
const QRT = extend(deepCopy(t), {
	data: {
		layout: {
			top:  204,
			left: 426,
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

const Title = extend(deepCopy(p), {
	data: {
		layout: {
			top:  247,
			left: 10,
			width:  520,
			height: 18
		},
		content: {
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201807251208278441.png' }
		}
	}
})
/* 类目名称 */
// 品牌名称
const Name1 = extend(deepCopy(t), {
	data: {
		layout: {
			top:  284,
			left: 20,
			width:  60,
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
			text: '品牌名称:'
		}
	}
})
// 上架时间
const Name2 = extend(deepCopy(Name1), {
	data: {
		layout: {
			top:  320
		},
		content: {
			text: '上架时间:'
		}
	}
})
// 产品分类
const Name3 = extend(deepCopy(Name2), {
	data: {
		layout: {
			left:  208
		},
		content: {
			text: '产品分类:'
		}
	}
})
// 包装种类
const Name4 = extend(deepCopy(Name2), {
	data: {
		layout: {
			left: 415
		},
		content: {
			text: '包装种类:'
		}
	}
})
// 货号
const Name5 = extend(deepCopy(Name2), {
	data: {
		layout: {
			top:  346
		},
		content: {
			text: '货号:'
		}
	}
})
// 颜色规格
const Name6 = extend(deepCopy(Name3), {
	data: {
		layout: {
			top:  346
		},
		content: {
			text: '颜色规格:'
		}
	}
})
// 退换货政策
const Name7 = extend(deepCopy(Name5), {
	data: {
		layout: {
			top:  372,
			width: 72
		},
		content: {
			text: '退换货政策:'
		}
	}
})
// 包邮说明
const Name8 = extend(deepCopy(Name5), {
	data: {
		layout: {
			top:  398
		},
		content: {
			text: '包邮说明:'
		}
	}
})

/* 类目内容 */
// 品牌名称
const Con1 = extend(deepCopy(tb), {
	data: {
		layout: {
			top:  284,
			left: 80,
			width:  200,
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
			bind: 'brand'
		}
	}
})
// 上架时间
const Con2 = extend(deepCopy(Con1), {
	data: {
		layout: {
			top:  320,
			left: 80,
			width:  120
		},
		style: {
			text: {
				color: { type: 'custom', color: '#999' }
			}
		},
		content: {
			bind: 'sTime'
		}
	}
})
// 产品分类
const Con3 = extend(deepCopy(Con2), {
	data: {
		layout: {
			left:  268
		},
		content: {
			bind: 'catg'
		}
	}
})
// 包装种类
const Con4 = extend(deepCopy(Con2), {
	data: {
		layout: {
			left: 475,
			width: 65
		},
		content: {
			bind: 'pType'
		}
	}
})
// 货号
const Con5 = extend(deepCopy(Con2), {
	data: {
		layout: {
			top:  346,
			left: 80
		},
		content: {
			bind: 'artNo'
		}
	}
})
// 颜色规格
const Con6 = extend(deepCopy(Con3), {
	data: {
		layout: {
			top:  346,
			left:  268
		},
		content: {
			bind: 'spec'
		}
	}
})
// 退换货政策
const Con7 = extend(deepCopy(Name7), {
	data: {
		layout: {
			top:  372,
			left: 92,
			width: 300
		},
		style: {
			text: {
				color: { type: 'custom', color: '#999' }
			}
		},
		content: {
			text: '非商品质量问题不支持退货'
		}
	}
})
// 包邮说明
const Con8 = extend(deepCopy(Con7), {
	data: {
		layout: {
			top:  398,
			left: 80
		},
		content: {
			text: '包邮（除西藏、新疆、海南、港澳台）'
		}
	}
})

/* 商品图 */
const GoodsPic = extend(deepCopy(plb), {
	data: {
		layout: {
			top:  442,
			left: 10,
			width:  520,
			height: 120
		},
		style:     {
			filterBox: {
				width: 520,
				padding: {
					top:     0,
					right:   0,
					bottom:  0,
					left:    125,
				},
				borderRadius: {
					topLeft:     6,
					topRight:    6,
					bottomRight: 6,
					bottomLeft:  6
				}
			},
			image: {
				width:  270,
				height: 270,
				margin: {
					bottom: 10
				}
			}
		},
		content: {
			bind: 'pics'
		}
	}
})

/* 商品条 */
const GB = extend(deepCopy(gb), {
	data: {
		layout: {
			top:  10,
			left: 10
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
		Bg1, Bg2, Spr, Name, PIcon, Price, OPT, OPrice, QR, QRT,
		Title, Name1, Name2, Name3, Name4, Name5, Name6, Name7, Name8,
		Con1, Con2, Con3, Con4, Con5, Con6, Con7, Con8,
		GoodsPic, GB
	]
}

module.exports = {
	name: 'goodsDetails',
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


