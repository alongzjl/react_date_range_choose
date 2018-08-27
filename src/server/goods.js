function getMallId(da = {}) {
	var mallId = window.uif.userInfo.mallMid || ''
	if (mallId) da.mallId = mallId
	return da
}

var host = ENV === 'qa' || ENV === 'dev'
	?
	'52.internal.rongyi.com'
	:
	ENV === 'dist'	// v4
	?
	'52.internal.rongyi.com'
	:
	'52.internal.rongyi.com'

var tcPath = `//${host}/mcp-gateway/terminalCategory`,
	cPath  = `//${host}/mcp-gateway/commodity`

module.exports = {
	// 分类列表
	getCategoryList(cb) {
		Ajax.postJSON_C(`${tcPath}/getTerminalCategoryList`, getMallId()).then(res => {
			var list = res.data && res.data.list.length? res.data.list: [
				{
					"url": "http://dev.hdp.rongyi.com/1213123123/20171025/264c8ea8097b3379f315ae94fd97d374.jpg",
					"sourceId": 27,
					"categoryId": 17,
					"categoryName": "分类二"
				},
				{
					"url": "http://dev.hdp.rongyi.com/1213123123/20171024/5d99ee229522dbbef69b842b4a29e5df.jpg",
					"sourceId": 20,
					"categoryId": 16,
					"categoryName": "分类一"
				},
				{
					"url": "http://dev.hdp.rongyi.com/1213123123/20171025/3d7058aa9c02c2fa5b6526eb2478ec8e.jpg",
					"sourceId": 28,
					"categoryId": 18,
					"categoryName": "分类三"
				},
				{
					"url": "http://dev.hdp.rongyi.com/1213123123/20171025/d203de0134722fec05ad26203f5f947b.jpg",
					"sourceId": 30,
					"categoryId": 21,
					"categoryName": "secondCategory"
				},
				{
					"url": "http://rongyi.b0.upaiyun.com/system/smartService/51f9d7f731d6559b7d00014d/184128376201712082.jpg",
					"sourceId": 157,
					"categoryId": 22,
					"categoryName": "thirdCategory"
				},
				{
					"url": "http://rongyi.b0.upaiyun.com/system/smartService/null/201801021409237337.jpg",
					"sourceId": 220,
					"categoryId": 25,
					"categoryName": "sixthCategory"
				},
				{
					"url": "http://rongyi.b0.upaiyun.com/system/smartService/51f9d7f731d6559b7d00014d/184128377201712089.jpg",
					"sourceId": 158,
					"categoryId": 23,
					"categoryName": "forthCategory"
				},
				{
					"url": "http://rongyi.b0.upaiyun.com/system/smartService/51f9d7f731d6559b7d00014d/184813847201712089.jpg",
					"sourceId": 160,
					"categoryId": 24,
					"categoryName": "fifthCategory"
				}
			]
			cb && cb(list)
		})
	},
	// 分类商品列表
	getGoodsList(categoryId = '', cb) {
		Ajax.postJSON_C(`${cPath}/getTerminalCommodityList`, getMallId({ categoryId })).then(res => {
			var list = res.data && res.data.list.length? res.data.list: [
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
				},
				{
					"relateCommodityCount": 1,
					"relateRfidCount": 1,
					"landingPageUrl": 1,
					"commodityPicList": [
						"http://rongyi.b0.upaiyun.com/commodity/original/201805251403047996.jpg"
					],
					"originalPrice": "23.00",
					"commodityCategoryName": "配饰>其他配饰>太阳眼镜",
					"id": 2,
					"channel": 2,
					"landingPageType": 0,
					"categoryId": 16,
					"stock": 12,
					"mallId": "51f9d7f731d6559b7d00014d",
					"commodityId": "5b59a423f4281819bc30f062",
					"currentPrice": "423.00",
					"commodityName": "单浩辉test"
				}
			]
			cb && cb(list)
		})
	},
	// 推荐商品列表
	getRecGoodsList(cb) {
		Ajax.postJSON_C(`${cPath}/getTerminalRecommendCommodityList`, getMallId()).then(res => {
			var list = res.data && res.data.list.length? res.data.list: [
				{
					"landingPageUrl": 1,
					"showPicList": [
						"http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/d2cac0f2-0c15-4288-b5fb-a0b31f92fdc0.jpeg",
						"http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/f9ba0fd2-0756-40a0-a8c9-733c5cd8b858.png",
						"http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/305ba84d-30fd-482d-bb46-a0e12e94893b.png"
					],
					"landingPageType": 13627,
					"id": 1,
					"recommendReason": "测试zp-1",
					"originalPrice": "123.00",
					"commodityId": "5b1600daeeb6632d044d100c",
					"index": 1,
					"name": "商品推荐1",
					"currentPrice": "21.00",
					qrcode: 'http://rongyi.b0.upaiyun.com/commodity/text/201807181419502662.png'
				},
				{
					"landingPageUrl": 1,
					"showPicList": [
						"http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/d2cac0f2-0c15-4288-b5fb-a0b31f92fdc0.jpeg",
						"http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/f9ba0fd2-0756-40a0-a8c9-733c5cd8b858.png",
						"http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/305ba84d-30fd-482d-bb46-a0e12e94893b.png"
					],
					"landingPageType": 13627,
					"id": 2,
					"recommendReason": "测试zp-1",
					"originalPrice": "123.00",
					"commodityId": "5b1600daeeb6632d044d100c",
					"index": 2,
					"name": "商品推荐1",
					"currentPrice": "21.00",
					qrcode: 'http://rongyi.b0.upaiyun.com/commodity/text/201807181419502662.png'
				},
				{
					"landingPageUrl": 1,
					"showPicList": [
						"http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/d2cac0f2-0c15-4288-b5fb-a0b31f92fdc0.jpeg",
						"http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/f9ba0fd2-0756-40a0-a8c9-733c5cd8b858.png",
						"http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/305ba84d-30fd-482d-bb46-a0e12e94893b.png"
					],
					"landingPageType": 13627,
					"id": 3,
					"recommendReason": "测试zp-1",
					"originalPrice": "123.00",
					"commodityId": "5b1600daeeb6632d044d100c",
					"index": 3,
					"name": "商品推荐1",
					"currentPrice": "21.00",
					qrcode: 'http://rongyi.b0.upaiyun.com/commodity/text/201807181419502662.png'
				}
			]
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