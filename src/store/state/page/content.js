module.exports = {
	router:    'p_1000',	// 路由名称
	title:     '首页',		// 页面标题
	elements:  [],			// 组件对象
	topNav:    {},			// 头部组件对象 (预留)
	bottomNav: {},			// 底部组件对象 (预留)
	// 页面特征
	feature: {
		homeTime: 30,		// 返回首页的时间
		backgroundColor: { type: 'custom', color: '#fff' }	// 页面背景色
	},
	animation: {
		in: {
			className: '',
			direction: '',				// 方向
			delay: 0,					// 开始时间
			duration: 1,				// 持续时间
			iterationCount: 1			// 循环次数
		},
		out: {
			className: '',
			direction: '',				// 方向
			delay: 0,					// 开始时间
			duration: 1,				// 持续时间
			iterationCount: 1			// 循环次数
		},
		interval: 0		// 下一页间隔时间
	}
}