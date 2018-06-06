const tc = require('./themeContent')

const globalData = {
	// 全局数据
	data: {
		homepage: 'p_1000',			// 首页路由
		backgroundColor: '#fff'		// 全局背景色
	},
	theme: {
		idx: 0,
		max: {
			color:   0,
			picture: 0
		},
		list: [JSON.parse(JSON.stringify(tc))]
	},
	floors:    [],	// 楼层数据
	catgs:     [],	// 分类数据
	storeList: [],	// 店铺数据
	copyComp: null,	// 复制组件
	// 全局特征 
	feature: {
	}
}

module.exports = globalData;