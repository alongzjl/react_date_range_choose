// 自定义
const data = {
	style:     {},
	layout:    {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    120,
		height:   120
	},
	content:   {},
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	},
	components: []
}

module.exports = {
	name: 'custom',
	type: 'advanced',
	// 样式管理
	data: JSON.parse(JSON.stringify(data)),
	// 组件管理
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