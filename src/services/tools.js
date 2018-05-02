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
			for (var i=1; i<4; i+=1) {
				sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1))
			}
			sColor = sColorNew
		}
		//处理六位的颜色值
		var sColorChange = []
		for (var i=1; i<7; i+=2) {
			sColorChange.push(parseInt('0x'+sColor.slice(i, i+2)))
		}
		return sColorChange
	}
	return sColor
}

window.cssColorFormat = function(obj) {
	var st  = Date.now(),
		obj = JSON.parse(JSON.stringify(obj))
	for (var p in obj) {
		var v = obj[p]
		if (formatColorMap[p]) {
			var type = v.type
			obj[p] = type === 'custom'? v.color: window.curThemeColor[type].color
		}
	}
	console.log(`耗时${Date.now() - st}ms`)
	return obj
}


}(window))
}

module.exports = tools