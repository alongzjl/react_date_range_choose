function getMallId(da = {}) {
	var mallId = window.uif.userInfo.mallMid || ''
	if (mallId) da.mallId = mallId
	return da
}

var host = ENV === 'qa' || ENV === 'dev'
	?
	'224.rongyi.com'
	:
	ENV === 'dist'	// v4
	?
	'api.v4.rongyi.com'
	:
	'api.rongyi.com'

var tcPath = `//${host}/mcp-gateway/terminalCategory`,
	cPath  = `//${host}/mcp-gateway/commodity`

module.exports = {
	// 分类列表
	getCategoryList(cb) {
		Ajax.postJSON_C(`${tcPath}/getTerminalCategoryList`, getMallId()).then(res => {
			var list = res.data? res.data.list: []
			cb && cb(list)
		})
	},
	// 分类商品列表
	getGoodsList(categoryId = '', cb) {
		Ajax.postJSON_C(`${cPath}/getTerminalCommodityList`, getMallId({ categoryId })).then(res => {
			var list = res.data? res.data.list: []
			cb && cb(list)
		})
	},
	// 推荐商品列表
	getRecGoodsList(cb) {
		Ajax.postJSON_C(`${cPath}/getTerminalRecommendCommodityList`, getMallId()).then(res => {
			var list = res.data? res.data.list: []
			cb && cb(list)
		})
	},
	// 商品详情
	getGoodsDetails(cb) {
		// Ajax.postJSON_C(`${cPath}/getTerminalCommodityList`, getMallId({ categoryId: 1 })).then(res => {
			// var list = res.data && res.data.list.length? res.data.list: [
			var list = [
				{
					"relateCommodityCount": 1,
					"relateRfidCount": 1,
					"landingPageUrl": 1,
					"commodityPicList": [
						"http://rongyi.b0.upaiyun.com/commodity/original/201805251403047996.jpg"
					],
					"originalPrice": "123.00",
					"commodityCategoryName": "珠宝>珠宝钻石>黄金",
					"id": 1,
					"channel": 1,
					"landingPageType": 0,
					"categoryId": 16,
					"stock": 1,
					"mallId": "51f9d7f731d6559b7d00014d",
					"commodityId": "5b1600daeeb6632d044d100c",
					"currentPrice": "21.00",
					"commodityName": "特殊测试"
				}
			]
			cb && cb(list[0])
		// })
	}
}