module.exports = ({ host, mockList, mockItem, getMallId }) => {
	let tcPath = `//${host}/mcp-gateway/terminalCategory`,
		cPath  = `//${host}/mcp-gateway/commodity`
	return {
		// 分类列表
		getCategoryList(cb) {
			// if (envType !== 'business') {
				cb && cb(mockList.goodsCatg(5))
			// } else {
			// 	Ajax.postJSON_C(`${tcPath}/getTerminalCategoryList`, getMallId()).then(res => {
			// 		var list = res.data? res.data.list: []
			// 		cb && cb(list)
			// 	})
			// }
		},
		// 分类商品列表
		getList(size = 10, cb) {
			// if (envType !== 'business') {
				cb && cb(mockList.goods(size))
			// } else {
			// 	Ajax.postJSON_C(`${cPath}/getTerminalCommodityList`, getMallId({ categoryId })).then(res => {
			// 		var list = res.data? res.data.list: []
			// 		cb && cb(list)
			// 	})
			// }
		},
		// 推荐商品列表
		getRecGoodsList(cb) {
			// if (envType !== 'business') {
				var { goods } = mockList
				cb && cb(mockList.reGoods(5))
			// } else {
			// 	Ajax.postJSON_C(`${cPath}/getTerminalRecommendCommodityList`, getMallId()).then(res => {
			// 		var list = res.data? res.data.list: []
			// 		cb && cb(list)
			// 	})
			// }
		},
		// 商品详情
		getGoodsDetails(cb) {
			cb && cb(mockItem.goodsDetails)
		}
		
	}
}