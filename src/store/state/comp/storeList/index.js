const common = require('state/common')
let { authInit, deepCopy, extend, styleIdxChange } = common
const c  = authInit(require('./content/catg'))
const f  = authInit(require('./content/floor'))
const l  = authInit(require('./content/letter'))
const r  = authInit(require('./content/reset'))
const p  = authInit(require('./content/page'))
const ls = authInit(require('./content/listByStore'))
const map = authInit(require('../map2D'))

// 店铺列表
const dataStyle_1 = {
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
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	},
	components: [c,f,l,r,p,ls] 
}
const f_2 = extend(deepCopy(f), {
	data:{
		layout: {
			top:  0, 
		}
	}
})
const ls_2 = extend(deepCopy(ls), {
	data:{
		layout: {
			top:  0, 
		}
	}
})
const p_2 = extend(deepCopy(p), {
	data:{
		layout: {
			top:  300, 
		} 
	}
})
const map_2 = extend(deepCopy(map), {
	data:{
		layout: {
			top:  350, 
		}
	}
})
// 楼层导航
const dataStyle_2 = {
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
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	},
	components: [f_2,p_2,ls_2,map] 
}

module.exports = {
	name: 'storeList',
	type: 'advanced',
	data: JSON.parse(JSON.stringify(dataStyle_1)),
	// 动画设置
	styleList: {
		idx:  0,
		list: [{
			name: '品牌导购',
			img:  '',
			data: JSON.parse(JSON.stringify(dataStyle_1))
		}/*, {
			name: '楼层导航',
			img:  '',
			data: JSON.parse(JSON.stringify(dataStyle_2))
		}*/]
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