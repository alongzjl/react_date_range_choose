var formatPxMap = {
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
var formatColorMap = {
	color: 1,
	backgroundColor: 1,
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

window.cssColorFormat = function(props, key) {
	let { data, actions } = props
	let obj = JSON.parse(JSON.stringify(data.style[key]))
	let st  = Date.now()
	let colorChange = 0
	for (let p in obj) {
		let v = obj[p]
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
		data.style[key] = obj
		return actions.updateComp(null, data)
	}
	console.log(`耗时${Date.now() - st}ms`)
	return obj
}


}(window))
}

module.exports = tools