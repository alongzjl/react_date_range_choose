const common = require('state/common')
let { authInit, deepCopy, extend, styleIdxChange } = common
const c  = authInit(require('./catg'))
const f  = authInit(require('./floor'))
const l  = authInit(require('./letter'))
const r  = authInit(require('./reset'))
const p  = authInit(require('./page'))
const ls = authInit(require('./listByStore'))

const reset = extend(deepCopy(r), {
	data: {
		layout: {
			top:  36,
			left: 40
		},
		content: {
			text: '全部店铺'
		}
	}
})
const catg = extend(deepCopy(c), {
	data: {
		layout: {
			top:  36,
			left: 104,
			width: 360
		}
	}
})
const list = extend(deepCopy(ls), {
	data: {
		layout: {
			top:  75,
			left: 40
		}
	}
})
const floor = extend(deepCopy(f), {
	data: {
		layout: {
			top:  110,
			left: 490
		}
	}
})
const page = extend(deepCopy(p), {
	data: {
		layout: {
			top:  374,
			left: 40,
			width:  430,
			height: 20
		},
		content: {
			pageSwitch:   true,
			prevSwitch:   false,
			nextSwitch:   false,
			numberSwitch: false
		}
	}
})
const letter = extend(deepCopy(l), {
	data: {
		layout: {
			top:  410,
			left: 88
		}
	}
})
// 店铺列表
const data = {
	layout: {
		position: 'absolute',
		top:      100,
		left:     0,
		width:    540,
		height:   500
	},
	style: {
	},
	content: {
		size: 12
	},
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	},
	components: [
		reset,
		catg,
		list,
		floor,
		page,
		letter
	]
}

module.exports = {
	name: 'storeList',
	type: 'advanced',
	data: JSON.parse(JSON.stringify(data)),
	// 动画设置
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: JSON.parse(JSON.stringify(data))
		}, {
			name: '样式2',
			img:  '',
			data: JSON.parse(JSON.stringify(data))
		}, {
			name: '样式3',
			img:  '',
			data: JSON.parse(JSON.stringify(data))
		}]
	},
	// 功能特性
	feature: {
		body: {
			floor:  '',
			letter: '',
			catg:   '',
			page:   1,
			size:   12,
			total:  0
		},
		floors: [],		// 楼层数据
		catgs:  [],		// 分类数据
		list:   []		// 商品
	}
}
// {
// 	page: 1,
//  size: 10,
// 	filter: [
// 	{key: 'catg', val: 'axcmakljdskldklskla'},
// 	{key: 'floor', val: 'axcmakljdskldklskla123'},
// 	{key: 'letter', val: 'A'}
// 	]
// }