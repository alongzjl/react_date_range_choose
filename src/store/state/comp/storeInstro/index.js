
/**
 * @Author: Along
 * @Date:   2018-05-10
 */
const common = require('state/common')
let { authInit, deepCopy, extend, styleIdxChange } = common
const t  = authInit(require('./content/storeInstroTitle'))
const s  = authInit(require('./content/storeInstroInstroduce'))
const w  = authInit(require('./content/storeWonderful'))
const l  = authInit(require('./content/storeSplitLine')) 
const data = {
	style:     {},
	layout:    {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   450 
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
	components: [t,s,w,l]
}

module.exports = {  
	name: 'storeInstro', 
	type: 'advanced',
	// 样式管理
	data: JSON.parse(JSON.stringify(data)),
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: JSON.parse(JSON.stringify(data))
		}]
	}, 
	// 功能特性
	feature: {
		
	}
}