module.exports = ({ host, mockList, mockItem, getMallId }) => {
	let path = `//${host}/kaide-web/mallShop`
	return {
		// 分类列表
		getCategoryList(cb) {
			// if (envType !== 'business') {
				var { storeCatg, storeFloor } = mockList
				cb && cb({floor: storeFloor(), catg: storeCatg() })
			// } else {
			// 	Ajax.post(`${path}/shopTypeFloorList`, getMallId()).then(res => {
			// 		var { floorList, typeList } = res.data? res.data: {}
			// 		cb && cb({ floor: floorList, catg: typeList })
			// 	})
			// }
		},
		// 分类商品列表
		getList(size = 10, cb) {
			// if (envType !== 'business') {
				var { store } = mockList
				cb && cb(store(size))
			// } else {
			// 	var da = { currentPage: 1, floor: 1, pageSize: size, type: 1 }
			// 	Ajax.post(`${path}/shopList`, getMallId(da)).then(res => {
			// 		var list = res.data? res.data.list: []
			// 		cb && cb(list)
			// 	})
			// }
		},
		// 店铺详情
		getDetails(cb) {
			cb && cb(mockItem.storeDetails2)
		}
		
	}
}