const formatMap = require('./formatMap')
const formatPxMap      = formatMap.px
const formatComplexMap = formatMap.complex
const formatColorMap   = formatMap.color
const formatImage      = formatMap.image
const formatPxMap2     = formatMap.px2
const NT = formatMap.numberTemplate

const cdnUrl = 'http://rongyi.b0.upaiyun.com/commodity/text'
const pics = [
	'201808271739138841',
	'201808271739139870',
	'201808271739140771',
	'201808271739141416',
	'201808271739142502'
]

/* window 扩展方法 */
const Fetch  = require('public/Fetch')
const extend = require('util')._extend


function colorVaild(v, obj, key, change) {
	if (typeof v === 'string') return v
	if (!v || change) return change
	let type   = v.type
	if (!window.curThemeColor[type] && type !== 'custom') {
		v.type = type = 'custom'
	}
	obj[key] = type === 'custom'? v.color: window.curThemeColor[type].color
	return change
}

module.exports = extend(window, {
	dataFormat: require('./dataFormat'),
	Ajax:       Fetch.default,
	storeState: {
		saveHistory: false		// 是否允许保存历史记录状态 true: 允许 false: 不允许
	},
	storeData: {},
	// 组件样式格式化
	cssColorFormat(props, key) {
		// let st  = Date.now()
		let { data, actions } = props
		let { style, layout } = data.data
		let sk = key === 'layout'? layout: style[key]
		if (!sk) {
			console.error(`名为 ${key} 的样式未定义!`)
			return {}
		}
		let obj = deepCopy(sk)
		let colorChange = 0
		for (let p in obj) {
			let v = obj[p]
			if (formatComplexMap[p]) {
				colorChange = colorVaild(v.color, v, 'color', colorChange)
				obj[p] = Object.keys(v).map(_ => {
					let w  = v[_], nt = NT[_]
					return nt? nt.substitute({ val: w }): getAttr(w) === 'Number'? w += 'px': w
				}).join(' ')
			}
			else if (formatColorMap[p]) {
				colorChange = colorVaild(v, obj, p, colorChange)
			}
			else if (formatPxMap2[p]) {
				obj[p] += 'px'
			}
			else if (formatImage[p]) {
				obj[p] = `url('${getImg(v)}')`
			}
		}
		var newO = {}
		var newObj = Object.keys(obj).sort()
		newObj.map(_ => {
			newO[_] = obj[_]
		})
		// console.log(`耗时${Date.now() - st}ms`)
		return newO
	},
	cssFormatByTerm(obj) {
		Object.keys(obj).map(p => {
			let v = obj[p]
			if (formatComplexMap[p]) {
				 Object.keys(v).map(_ => {
					let w  = v[_], nt = NT[_]
					const nowData =  nt? nt.substitute({ val: w }): getAttr(w) === 'Number'? (w *2 + 'px'): w
					obj[p][_] = nowData
				})
			}
			else if (formatPxMap[p]) {
				obj[p] = v * 2 + 'px'
			}
		})
		var newO = {}
		var newObj = Object.keys(obj).sort()
		newObj.map(_ => {
			newO[_] = obj[_]
		})
		return newO
	},
	// 获取图片
	// 组件图片格式化
	getImg(content) {
		let type = content.type,
			fc   = window.curThemeColor[type]
		return fc? fc.img: content.img
	},
	// 组件图片格式化
	compImgFormat(props, content) {
		let { data, actions } = props
		let imgChange = 0
		let type = content.type
		if (!window.curThemeColor[type] && type !== 'custom') {
			content.type = type = 'custom'
		}
		content = type === 'custom'? content.img: window.curThemeColor[type].img
		return content
	},
	mock: {
		map: {
			goods() {
				return {
					currentPrice:     '现价',
					originalPrice:    '原价',
					commodityName:    '商品名称',
					commodityPicList: '商品图片',
					qrcode:           '二维码',
				}
			},
			reGoods() {
				return {
					currentPrice:    '现价',
					originalPrice:   '原价',
					name:            '商品名称',
					recommendReason: '推荐理由',
					showPicList:     '轮播图列表',
					qrcode:          '二维码'
				}
			},
			goodsCatg() {
				return {
					categoryName: '分类名称',
					url:          '分类图片'
				}
			}
		},
		list: {
			goods(num = 1) {
				return Array.apply(null, { length: num }).map((_, i) => {
					var m   = 1e3 + i * 1.2 >> 0,
						m2  = m + i * 1.6 >> 0
					return {
						id:       i,
						currentPrice:  `${m}.9`,
						originalPrice: `${m2}.9`,
						commodityName: `TELEFLORA 11朵粉紫玫瑰七夕花束预定当天自提`,
						commodityPicList: [`${cdnUrl}/${pics[rn(5)]}.png`],
						qrcode: `${cdnUrl}/201808271756227480.png`
					}
				})
			},
			reGoods(num = 1) {
				return Array.apply(null, { length: num }).map((_, i) => {
					var m   = 1e3 + i * 1.2 >> 0,
						m2  = m + i * 1.6 >> 0
					return {
						id: i,
						currentPrice:  `${m}.9`,
						originalPrice: `${m2}.9`,
						name:          `TELEFLORA 11朵粉紫玫瑰七夕花束预定当天自提`,
						showPicList: [
							`${cdnUrl}/${pics[rn(5)]}.png`,
							`${cdnUrl}/${pics[rn(5)]}.png`,
							`${cdnUrl}/${pics[rn(5)]}.png`
						],
						recommendReason: `推荐理由-${i+8}`,
						qrcode: `${cdnUrl}/201808271756227480.png`
					}
				})
			},
			goodsCatg(num = 1) {
				var catg = ['餐饮', '潮流', '儿童', '美发', '生活'],
					pics = [
						'201808271728380089',
						'201808271728381172',
						'201808271728382159',
						'201808271728383194',
						'201808271728384138'
					]
				return Array.apply(null, { length: num }).map((_, i) => {
					var m   = 1e3 + i * 1.2 >> 0,
						m2  = m + i * 1.6 >> 0
					return {
						categoryId:   i,
						categoryName: catg[i],
						url:  `${cdnUrl}/${pics[i]}.png`
					}
				})
			}
		},
		item: {
			goods() {
				return {
					id:       1,
					currentPrice:  `9925.0`,
					originalPrice: `9799.9`,
					commodityName: 'TELEFLORA 11朵粉紫玫瑰七夕花束预定当天自提',
					commodityPicList: [
						`${cdnUrl}/${pics[rn(5)]}.png`,
						`${cdnUrl}/${pics[rn(5)]}.png`,
						`${cdnUrl}/${pics[rn(5)]}.png`
					],
					qrcode: `${cdnUrl}/201808271756227480.png`
				}
			},
			reGoods() {
				return {
					id: 1,
					currentPrice:  `9925.0`,
					originalPrice: `9799.9`,
					name:          `商品-1`,
					showPicList: [
						`${cdnUrl}/${pics[rn(5)]}.png`,
						`${cdnUrl}/${pics[rn(5)]}.png`,
						`${cdnUrl}/${pics[rn(5)]}.png`
					],
					recommendReason: `推荐理由`,
					qrcode: `${cdnUrl}/201808271756227480.png`
				}
			},
			goodsCatg() {
				return {
					categoryId:   -1,
					categoryName: `运动`,
					url:  `${cdnUrl}/201807191807420161.jpg`
				}
			}
		}
	}
})