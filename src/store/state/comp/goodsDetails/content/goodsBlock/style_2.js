const { authInit, deepCopy, extend } = require('state/common')
const p  = authInit(require('state/comp/picture'))
const t  = authInit(require('state/comp/text'))
const tb = authInit(require('state/comp/textBind'))

const Title = extend(deepCopy(p), {
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
const Name1 = extend(deepCopy(t), {
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
// 上架时间
const Name2 = extend(deepCopy(Name1), {
	data: {
		layout: {
			top:  80
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
			left:  198
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
			left: 405
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
			top:  106
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
			top:  106
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
			top:  132,
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
			top:  158
		},
		content: {
			text: '包邮说明:'
		}
	}
})

// 品牌名称
const Con1 = extend(deepCopy(tb), {
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
// 上架时间
const Con2 = extend(deepCopy(Con1), {
	data: {
		layout: {
			top:  80,
			left: 70,
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
			left:  258
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
			left: 465,
			width: 55
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
			top:  106,
			left: 70
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
			top:  106,
			left: 258
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
			top:  132,
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
const Con8 = extend(deepCopy(Con7), {
	data: {
		layout: {
			top:  158,
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
	componentLayout: [
		Title,
		Name1, Name2, Name3, Name4, Name5, Name6, Name7, Name8,
		Con1, Con2, Con3, Con4, Con5, Con6, Con7, Con8
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