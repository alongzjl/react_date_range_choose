let { rn, deepCopy } = require('state/common')
const cdn     = 'http://rongyi.b0.upaiyun.com'
const cdnUrl  = `${cdn}/commodity/text`
const cdnSUrl = `${cdn}/system/mcp/DEV/app/upload`
const catg  = ['餐饮', '潮流', '儿童', '美发', '生活']
const floor = ['B2', 'B1', 'L1', 'L2', 'L3', 'L4', 'L5', 'L6']
const pics  = [
	'201808271739138841',
	'201808271739139870',
	'201808271739140771',
	'201808271739141416',
	'201808271739142502'
]
const picsS = [
	'de750143-1462-46c2-b5ea-cfe407cac3fd',
	'5e541d36-c094-4acc-bb3f-4b40d745e369',
	'78d75e81-40af-4eda-814f-a03c266417dc',
	'9d5a73db-8a29-48c6-8bc2-bc456bf7ad0c'
]
// 高级组件对应添加子组件
var Item = {
	goods: {
		id:       1,
		currentPrice:  `9925.0`,
		originalPrice: `9799.9`,
		commodityName: 'TELEFLORA 11朵粉紫玫瑰七夕花束预定',
		commodityPicList: Array.apply(null, { length: 3 }).map(_ => `${cdnUrl}/${pics[rn(5)]}.png`),
		qrcode: `${cdnUrl}/201808271756227480.png`
	},
	reGoods: {
		id: 1,
		currentPrice:  `9925.0`,
		originalPrice: `9799.9`,
		commodityName: `商品-1`,
		showPicList: Array.apply(null, { length: 3 }).map(_ => `${cdnUrl}/${pics[rn(5)]}.png`),
		recommendReason: `推荐理由`,
		qrcode: `${cdnUrl}/201808271756227480.png`
	},
	goodsCatg: {
		categoryId:   1,
		categoryName: `运动`,
		url:  `${cdnUrl}/201807191807420161.jpg`
	},
	store: {
		id:       1,
		logo:     `${cdnUrl}/201805311433385479.png`,
		pictures: new Array(5).fill().map(_ => `${cdnSUrl}/${picsS[rn(4)]}.png`),
		praiseAmount: rn(1e4),
		name:      `优衣库/UNIQLO`,
		qrcode:    'http://www.rongyi.com',
		berthNumber: 'L1=199',
		contact:   '021-88888888',
		description: 'A|X Armani Exchange是全球主导时尚和高级消费品的Armani集团旗下品牌。 A|X Armani Exchange代表都会年青及时尚品味，不论剪裁、衣料、感觉和轮廓，都尽显Armani的时装智慧，展现都会的时尚。'
	},
	storeCatg: {
		id:   1,
		name: `运动`
	},
	storeFloor: {
		id:   1,
		name: `L1`
	},
	storeLetter: {
		name: 'A'
	},
	storePage: {
		name: `1`
	}
}
module.exports = {
	list: {
		goods(num = 1) {
			return Array.apply(null, { length: num }).map((_, i) => {
				return {
					...deepCopy(Item.goods),
					id: i + 1,
					commodityPicList: Array.apply(null, { length: 3 }).map(() => `${cdnUrl}/${pics[rn(5)]}.png`)
				}
			})
		},
		reGoods(num = 1) {
			return Array.apply(null, { length: num }).map((_, i) => {
				return {
					...deepCopy(Item.reGoods),
					id: i + 1,
					showPicList: Array.apply(null, { length: 3 }).map((p, j) => `${cdnUrl}/${pics[j]}.png`)
				}
			})
		},
		goodsCatg(num = 1) {
			var pics = ['201808271728380089', '201808271728381172', '201808271728382159', '201808271728383194', '201808271728384138']
			return Array.apply(null, { length: num }).map((_, i) => {
				return {
					categoryId:   i + 1,
					categoryName: catg[rn(catg.length)],
					url:  `${cdnUrl}/${pics[rn(pics.length)]}.png`
				}
			})
		},
		store(num = 1) {
			return Array.apply(null, { length: num }).map((_, i) => {
				return {
					...deepCopy(Item.store),
					id:       i + 1
				}
			})
		},
		storeCatg() {
			return Array.apply(null, { length: catg.length }).map((_, i) => {
				return {
					id:   i + 1,
					name: catg[i]
				}
			})
		},
		storeFloor() {
			return Array.apply(null, { length: floor.length }).map((_, i) => {
				return {
					id:   i + 1,
					name: floor[i]
				}
			})
		},
	},
	item: {
		listByGoods:     deepCopy(Item.goods),
		swiperByGoods:   deepCopy(Item.reGoods),
		catgByGoods:     deepCopy(Item.goodsCatg),
		goodsDetails:    deepCopy(Item.goods),
		goodsBar:        deepCopy(Item.goods),
		goodsBlock:      deepCopy(Item.goods),
		pictureListBind: deepCopy(Item.goods),
		listByStore2:    deepCopy(Item.store),
		catgByStore2:    deepCopy(Item.storeCatg),
		floorByStore2:   deepCopy(Item.storeFloor),
		letterByStore2:  deepCopy(Item.storeLetter),
		pageByStore2:    deepCopy(Item.storePage),
		storeDetails2:   deepCopy(Item.store),
		storeBlock:      deepCopy(Item.store),
		// swiperBind:      deepCopy(Item.store),
	}
}