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

// 品牌名称
const Name1 = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  44,
			left: 10,
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
// 退换货政策
const Name2 = extendRmSL(deepCopy(Name1), {
	data: {
		layout: {
			top:  70,
			width: 72
		},
		content: {
			text: '退换货政策:'
		}
	}
})
// 包邮说明
const Name3 = extendRmSL(deepCopy(Name1), {
	data: {
		layout: {
			top:  96
		},
		content: {
			text: '包邮说明:'
		}
	}
})

// 品牌名称
const Con1 = extendRmSL(deepCopy(tb), {
	data: {
		layout: {
			top:  44,
			left: 70,
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
// 退换货政策
const Con2 = extendRmSL(deepCopy(Name1), {
	data: {
		layout: {
			top:  70,
			left: 82,
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
const Con3 = extendRmSL(deepCopy(Con2), {
	data: {
		layout: {
			top:  96,
			left: 70
		},
		content: {
			text: '包邮（除西藏、新疆、海南、港澳台）'
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
		height: 148
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
		Name1, Name2, Name3,
		Con1,  Con2,  Con3
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