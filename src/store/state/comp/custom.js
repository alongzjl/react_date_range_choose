// 自定义
var style = {
}

module.exports = {
	name: 'custom',
	type: 'advanced',
	// 位置大小
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    120,
		height:   120
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
	}
}