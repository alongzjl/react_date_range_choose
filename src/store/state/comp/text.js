// 文本
module.exports = {
	name: 'text',
	// 样式管理
	style: {
		// 组件样式
		layout: {
			position: 'absolute',
			top:       0,
			left:      0,
			width:     120,
			height:    120,
		},
		text: {
			color:          '#333',
			fontSize:       12,
			fontStyle:      'normal',
			fontWeight:     'normal',
			textAlign:      'left',
			textDecoration: 'none',
			transform:      '',
			animation:      '0s 0s 1',			// 动画 (0: 开始时间, 1: 持续时间, 2: 循环次数)
		},
	},
	// 内容管理
	content: {
		text: '',			// 文字内容
		routerType: 0,		// 链接类型
		router: '',			// 路由
		routerOption: {},	// 链接设置
	},
	// 动画设置
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite',	// 循环次数
	},
	// 功能特性
	feature: {
	},
}