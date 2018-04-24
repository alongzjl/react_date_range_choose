module.exports = {
	// 页面相关数据
	page: {
		// 全局数据
		data: {
			homepage: 'p_1000',			// 首页路由
			backgroundColor: '#fff',	// 全局背景色
		},
		// 页面内容
		content: {
			// 以路由名称命名
			'p_1000': {},
		},
		// 页面管理
		list: {
			maxPageIdx: 1000,
			// 页面分组
			group: [
				{
					name: '默认',
					pages: [
						{
							router: 'p_1000',
							title: '首页'
						},
					]
				}
			],
		},
	},
	// 全局特征 
	feature: {
	},
}