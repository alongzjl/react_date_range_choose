const Fetch = require('public/Fetch')
const formatPxMap = {
	fontSize: 1,
	width: 1,
	height: 1,
	paddingTop: 1,
	paddingRight: 1,
	paddingBottom: 1,
	paddingLeft: 1,
	top:    1,
	right:  1,
	bottom: 1,
	left:   1,
	marginTop: 1,
	marginRight: 1,
	marginBottom: 1,
	marginLeft: 1,
	borderWidth: 1,
	borderTopWidth: 1,
	borderRightWidth: 1,
	borderBottomWidth: 1,
	borderLeftWidth: 1,
	lineHeight: 1
}
const formatComplexMap = {
	margin: 1,
	padding: 1,
	borderRadius: 1,
	boxShadow: 1,
	textShadow: 1
}
const formatColorMap = {
	color: 1,
	borderColor: 1,
	backgroundColor: 1
}
const formatPxMap2 = {
	lineHeight: 1
}
const tools = function() {
(function (window) {

String.prototype.colorRGB = function(){
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

function colorVaild(v, obj, key, change) {
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
	let { style } = data.data
	if (!style[key]) {
		console.error(`名为 ${key} 的样式未定义!`)
		return {}
	}
	let obj = JSON.parse(JSON.stringify(style[key]))
	let st  = Date.now()
	let colorChange = 0
	for (let p in obj) {
		let v = obj[p]
		if (formatComplexMap[p]) {
			colorChange = colorVaild(v.color, v, 'color', colorChange)
			obj[p] = Object.keys(v).map(_ => {
				let w = v[_]
				return getAttr(w) === 'Number'? w += 'px': w
			}).join(' ')
		}
		else if (formatColorMap[p]) {
			colorChange = colorVaild(v, obj, p, colorChange)
		}
		else if (formatPxMap2[p]) {
			obj[p] += 'px'
		}else if(p == 'transformRotate'){
			obj['transform'] = `rotate(${obj[p]}deg)`
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

window.Ajax = Fetch.default


}(window))
}

module.exports = tools