const Fetch     = require('public/Fetch')
const formatMap = require('./formatMap')
const formatPxMap      = formatMap.px
const formatComplexMap = formatMap.complex
const formatColorMap   = formatMap.color
const formatImage      = formatMap.image
const formatPxMap2     = formatMap.px2
const NT = formatMap.numberTemplate
const tools = function() {
(function (window) {

String.prototype.colorRGB = () => {
	var sColor = this.toLowerCase(),
		reg   = /^#([0-9a-f]{3}|[0-9a-f]{6})$/,
		reg8  = /^#(\S)(\S)(\S)$/
	// 如果是16进制颜色
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) sColor = sColor.replace(reg8, '#$1$1$2$2$3$3')
		// 处理六位的颜色值
		var sColorChange = []
		for (var i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt('0x'+sColor.slice(i, i + 2)))
		}
		return sColorChange
	}
	return sColor
}
String.prototype.substitute = function(data) {
	return data && typeof(data) == 'object'? this.replace(/\{\{([^{}]+)\}\}/g, (m, k) => {
		return data[k] || 0
	}): this.toString()
}

function colorVaild(v, obj, key, change) {
	if (typeof v === 'string') return v
	if (!v || change) return change
	let type   = v.type
	if (!window.curThemeColor[type] && type !== 'custom') {
		v.type = 'custom'
		change = 1
	}
	if (!change) obj[key] = type === 'custom'? v.color: window.curThemeColor[type].color
	return change
}
// 组件样式格式化
window.cssColorFormat = (props, key) => {
	let { data, actions } = props
	let { style, layout } = data.data
	let sk = key === 'layout'? layout: style[key]
	if (!sk) {
		console.error(`名为 ${key} 的样式未定义!`)
		return {}
	}
	let obj = deepCopy(sk)
	let st  = Date.now()
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
	if (colorChange) {
		// 判断如果当前组件的颜色所使用的主题类别被删除, 更新颜色类型为custom
		style[key] = obj
		return actions.updateComp(null, data)
	}
	// console.log(`耗时${Date.now() - st}ms`)
	return obj
}

window.cssFormatByTerm = (obj) => {
	// let colorChange = 0
	// let styleArr    = []
	Object.keys(obj).map(p => {
		let v = obj[p]
		if (formatPxMap[p]) {
			obj[p] = v * 2 + 'px'
		}
		// else if (formatComplexMap[p]) {
		// 	colorChange = colorVaild(v.color, v, 'color', colorChange)
		// 	obj[p] = Object.keys(v).map(_ => {
		// 		let w  = v[_], nt = NT[_]
		// 		return nt? nt.substitute({ val: w }): getAttr(w) === 'Number'? w += 'px': w
		// 	}).join(' ')
		// }
		// else if (formatColorMap[p]) {
		// 	colorChange = colorVaild(v, obj, p, colorChange)
		// }
		// else if (formatImage[p]) {
		// 	obj[p] = `url('${getImg(v)}')`
		// }
		// styleArr.push(`${p.replace(/[A-Z]/g, _ => '-'+_.toLowerCase())}:${obj[p]};`)
	})
	// if (colorChange) style[key] = obj
	return obj
}

// 获取图片
// 组件图片格式化
window.getImg = (content) => {
	let type = content.type,
		fc   = window.curThemeColor[type]
	return fc? fc.img: content.img
}

// 组件图片格式化
window.compImgFormat = (props, content) => {
	let { data, actions } = props
	let imgChange = 0
	let type = content.type
	if (!window.curThemeColor[type] && type !== 'custom') {
		content.type = 'custom'
		imgChange = 1
	}
	if (!imgChange) content = type === 'custom'? content.img: window.curThemeColor[type].img
	else {
		// 判断如果当前组件的图片所使用的主题类别被删除, 更新图片类型为custom
		return actions.updateComp(null, data)
	}
	return content
}

// 文本换行
window.textBreak = (str = '') => {
	return str.replace(/\n|\r\n/g, '<br/>').replace(/ /g, '&nbsp;')
}
// 获取真实数据类型
window.getAttr = (element) => {
	return Object.prototype.toString.call(element).match(/[A-Z][a-z]*/)[0]
}
// 深拷贝
window.deepCopy = (obj) => {
	try {
		return JSON.parse(JSON.stringify(obj))
	} catch(e) {
		console.error(e)
		return obj
	}
}
window.getCookie = (name) => {
	let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
	if (arr = document.cookie.match(reg)) {
		return unescape(arr[2])
	} else {
		return ''
	}
}
window.setCookie = (name, val, hour = 24) => {
	var exp = new Date()
	exp.setTime(exp.getTime() + hour * 60 * 60 * 1000)
	document.cookie = `${name}=${escape(val)};expires=${exp.toGMTString()};path=/`
}

window.getTime = () => {
	let now = new Date()
	let o = {
		year:    now.getFullYear() + '',		// 年
		month:   now.getMonth() + 1,			// 月
		date:    now.getDate(),					// 日
		hour:    now.getHours(),				// 时
		minutes: now.getMinutes(),				// 分
		seconds: now.getSeconds(),				// 秒
		ms:      now.getMilliseconds() + '',	// 毫秒
		week:    '日一二三四五六'[now.getDay()]	// 周
	}
	o.q   = Math.floor((o.month + 2) / 3) + ''	// 季
	o.apm = o.hour > 11? '下午': '上午'			// AM / PM
	o.month   = (o.month < 10? '0': '') + o.month
	o.date    = (o.date < 10? '0': '') + o.date
	o.minutes = (o.minutes < 10? '0': '') + o.minutes
	o.hour    = (o.hour < 10? '0': '') + o.hour
	o.seconds = (o.seconds < 10? '0': '') + o.seconds
	return o
}
window.timeFormat = (format) => {
	let now   = new Date()
	let split = []
	let RPN = /(\{[^{}]+\})|([^{}]+)/g
	let RPC = /\{([^{}]+)\}/
	let o = {
		'y+': now.getFullYear() + '',
		'm+': now.getMonth() + 1,					// 月
		'd+': now.getDate(),						// 日
		'h+': now.getHours(),						// 时
		'n+': now.getMinutes(),						// 分
		's+': now.getSeconds(),						// 秒
		'W': '日一二三四五六'[now.getDay()],			// 周
		'q+': Math.floor((now.getMonth() + 3) / 3),	// 季
		'ap': 1
	}
	format.replace(RPN, m => {
		m = m.replace(RPC, (n, $1) => {
			for (let k in o) {
				if (new RegExp('('+ k +')').test($1)) {
					return '{' + $1.replace(RegExp.$1,
						k === 'y+'
						?
						o[k].substr(4 - RegExp.$1.length)
						:
						k === 'ap'
						?
						((o['h+'] >= 12) ? '下午': '上午')
						:
						RegExp.$1.length == 1
						?
						o[k]
						:
						('00' + o[k]).substr(('' + o[k]).length)
					) + '}'
				}
			}
		})
		split.push(m)
	})
	return split
}

window.Ajax = Fetch.default


}(window))
}

module.exports = tools