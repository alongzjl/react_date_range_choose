const { authInit, deepCopy, extendRmSL } = require('state/common')
const c  = authInit(require('./content/catg'))
const f  = authInit(require('./content/floor'))
const l  = authInit(require('./content/letter'))
const r  = authInit(require('./content/reset'))
const p  = authInit(require('./content/page'))
const ls = authInit(require('./content/listByStore'))
const floorMap = authInit(require('./content/floorMap'))

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
const f_2 = extendRmSL(deepCopy(f), {
	data:{
		layout: {
			top:  0, 
		}
	}
})
const ls_2 = extendRmSL(deepCopy(ls), {
	data:{
		layout: {
			top:  0, 
		}
	}
})
const p_2 = extendRmSL(deepCopy(p), {
	data:{
		layout: {
			top:  300, 
		} 
	}
}) 
// 楼层导航
const dataStyle_2 = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   900
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
	components: [f_2,p_2,ls_2,floorMap] 
}

module.exports = {
	name: 'storeList',
	type: 'advanced',
	data: deepCopy(dataStyle_1),
	// 动画设置
	styleList: {
		idx:  0,
		list: [{
			name: '品牌导购',
			img:  '',
			data: deepCopy(dataStyle_1)
		}, {
			name: '楼层导航',
			img:  '',
			data: deepCopy(dataStyle_2)
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
