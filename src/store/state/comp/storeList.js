// 自定义
var style = {
}

module.exports = {
	name: 'storeList',
	type: 'advanced',
	// 位置大小
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    432,
		height:   500
	},
	// 样式管理
	style: JSON.parse(JSON.stringify(style)),
	// 内容管理
	content: {
	},
	// 组件管理
	components: [],
	// 动画设置
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	},
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: JSON.parse(JSON.stringify(style))
		}]
	},
	// 功能特性
	feature: {
		// 依赖API
		api: {
			url:  '/store/getStoreList',
			type: 'get',
			body: {
				floor:  '',
				letter: '',
				catg:   ''
			}
		},
		// 楼层数据
		floors: []
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