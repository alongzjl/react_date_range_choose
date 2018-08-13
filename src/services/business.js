const formatMap = require('./formatMap')
const formatPxMap      = formatMap.px
const formatComplexMap = formatMap.complex
const formatColorMap   = formatMap.color
const formatImage      = formatMap.image
const formatPxMap2     = formatMap.px2
const NT = formatMap.numberTemplate

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
					price:     '价格',
					oldPrice:  '原价',
					brand:     '品牌',
					name:      '商品名称',
					pic:       '封面',
					pics:      '详情图',
					QRPic:     '二维码'
				}
			},
			goodsCatg() {
				return {
					name: '名称',
					img:  '图片'
				}
			}
		},
		list: {
			goods(num = 1) {
				return Array.apply(null, { length: num }).map((_, i) => {
					var m   = Math.floor(1e3 + i * 1.2),
						m2  = m + Math.floor(i * 1.6)
					return {
						id:       i,
						price:    `${m}.9`,
						oldPrice: `${m2}.9`,
						brand:    'TELEFLORA',
						name:     `${i}-拜亚动力/拜雅（Beyerdynamic）Xelento remote 榭兰图 线控版特斯拉旗舰入耳式耳塞`,
						pic:      'http://rongyi.b0.upaiyun.com/commodity/text/201807191807420161.jpg',
						pics:     'http://a.vpimg3.com/upload/merchandise/pdcvis/2018/07/04/176/79c5de67-8f8f-4463-a82d-364d3dcd92e5_420x420_90.jpg,http://a.vpimg3.com/upload/merchandise/pdcvis/2018/07/04/62/bacab0f7-7b39-4631-b6ff-029e65ae5339_420x420_90.jpg,http://a.vpimg3.com/upload/merchandise/pdcvis/2018/07/04/115/51673b5a-f7ac-47f2-8dc3-ad6f8560631e_420x420_90.jpg',
						QRPic:    'http://rongyi.b0.upaiyun.com/commodity/text/201807181419502662.png',
						desc:     `商品描述-${i+8}`
					}
				})
			},
			goodsCatg(num = 1) {
				return Array.apply(null, { length: num }).map((_, i) => {
					var m   = Math.floor(1e3 + i * 1.2),
						m2  = m + Math.floor(i * 1.6)
					return {
						id:   i,
						name: `${i}-榭兰图`,
						img:  'http://rongyi.b0.upaiyun.com/commodity/text/201807191807420161.jpg'
					}
				})
			}
		},
		item: {
			goods() {
				return {
					id:       1,
					price:    `9925.0`,
					oldPrice: `9799.9`,
					brand:    'TELEFLORA',
					name:     'TELEFLORA 11朵粉紫玫瑰七夕花束预定当天自提',
					pic:      'http://rongyi.b0.upaiyun.com/commodity/text/201807191807420161.jpg',
					pics:     'http://a.vpimg3.com/upload/merchandise/pdcvis/2018/07/04/176/79c5de67-8f8f-4463-a82d-364d3dcd92e5_420x420_90.jpg,http://a.vpimg3.com/upload/merchandise/pdcvis/2018/07/04/62/bacab0f7-7b39-4631-b6ff-029e65ae5339_420x420_90.jpg,http://a.vpimg3.com/upload/merchandise/pdcvis/2018/07/04/115/51673b5a-f7ac-47f2-8dc3-ad6f8560631e_420x420_90.jpg',
					QRPic:    'http://rongyi.b0.upaiyun.com/commodity/text/201807181419502662.png',
					desc:     '商品描述'
				}
			},
			goodsCatg() {
				return {
					id:   -1,
					name: 'TELEFLORA 11朵粉紫玫瑰七夕花束预定当天自提',
				}
			}
		}
	}
})