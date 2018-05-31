const common = require('state/common')
let { authInit, deepCopy, extend, styleIdxChange } = common
const c  = authInit(require('./content/catg'))
const f  = authInit(require('./content/floor'))
const l  = authInit(require('./content/letter'))
const r  = authInit(require('./content/reset'))
const p  = authInit(require('./content/page'))
const ls = authInit(require('./content/listByStore'))

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
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	},
	components: [c,f,l,r,p,ls] 
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