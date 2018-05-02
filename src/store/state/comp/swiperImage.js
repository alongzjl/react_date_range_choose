// 轮播图
var style = {
	// 组件样式
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    120,
		height:   120,
	},
	box: {
		transform: '',
		animation: '0s 0s 1',			// 动画 (0: 开始时间, 1: 持续时间, 2: 循环次数)
	},
	text: {
		color:          { type: 'custom', color: '#fff' },
		fontSize:       12,
		fontStyle:      'normal',
		fontWeight:     'normal',
		textAlign:      'center',
		textDecoration: 'none',
	},
}

module.exports = {
	name: 'swiper-image',
	// 样式管理
	style: JSON.parse(JSON.stringify(style)),
	// 内容管理
	content: [
		{
			img: '',			// 图片url
			text: '图片1',		// 图片标题
			routerType: 0,		// 链接类型
			router: '',			// 路由
			routerOption: {},	// 链接设置
		},
	],
	// 动画设置
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite',	// 循环次数
	},
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: JSON.parse(JSON.stringify(style))
		}],
	},
	// 功能特性
	feature: {
		style: {
			layout: '0',	// 外观样式
			title:  '0',	// 标题样式
		},
		switch: true,		// 播放开关
		autoPlayTime: 5000,	// 自动播放时间 (ms)
	},
}