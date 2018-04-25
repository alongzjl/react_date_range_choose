// 组件元素数据
module.exports = {
	// 组件数据
	compData: require('./comp'),
	// 页面数据
	pageData: require('./page'),
	// 当前操作数据
	curData: {
		router: 'p_1000',	// 页面路由
		page: {},			// 页面信息
		comIdx: 0,			// 组件索引
		comp: {},			// 组件内容
	},
	compList:    require('./compList'),		// 组件列表
	compNameMap: require('./compNameMap'),	// 组件Map
}