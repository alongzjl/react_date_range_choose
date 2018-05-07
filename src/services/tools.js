const Fetch = require('public/Fetch')
const formatPxMap = {
	fontSize: 1,
	width: 1,
	height: 1,
	padding: 1,
	paddingTop: 1,
	paddingRight: 1,
	paddingBottom: 1,
	paddingLeft: 1,
	top: 1,
	right: 1,
	bottom: 1,
	left: 1,
	marginTop: 1,
	marginRight: 1,
	marginBottom: 1,
	marginLeft: 1,
	borderRadius: 1,
	borderWidth: 1,
	borderTopWidth: 1,
	borderRightWidth: 1,
	borderBottomWidth: 1,
	borderLeftWidth: 1,
	lineHeight: 1
}
const formatColorMap = {
	color: 1,
	backgroundColor: 1
}
const tools = function() {
(function (window) {

String.prototype.colorRGB = function(){
	var sColor = this.toLowerCase(),
		reg = /^#([0-9a-f]{3}|[0-9a-f]{6})$/
	// 如果是16进制颜色
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) {
			var sColorNew = '#'
			for (var i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
			}
			sColor = sColorNew
		}
		//处理六位的颜色值
		var sColorChange = []
		for (var i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt('0x'+sColor.slice(i, i + 2)))
		}
		return sColorChange
	}
	return sColor
}

// 组件样式格式化
window.cssColorFormat = (props, key) => {
	let { data, actions } = props
	let obj = JSON.parse(JSON.stringify(data.style[key]))
	let st  = Date.now()
	let colorChange = 0
	for (let p in obj) {
		let v = obj[p]
		if(p == 'boxShadow' || p == 'textShadow'){
			v = obj[p].color;
		}
		if (formatColorMap[p]) {
			let type = v.type
			if (!window.curThemeColor[type] && type !== 'custom') {
				v.type = 'custom'
				colorChange = 1
			}
			if (!colorChange) obj[p] = type === 'custom'? v.color: window.curThemeColor[type].color
		}
	}
	if (colorChange) {
		// 判断如果当前组件的颜色所使用的主题类别被删除, 更新颜色类型为custom
		data.style[key] = obj
		return actions.updateComp(null, data)
	}
	// console.log(`耗时${Date.now() - st}ms`)
	return obj
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

window.Ajax = Fetch.default


}(window))
}

module.exports = tools