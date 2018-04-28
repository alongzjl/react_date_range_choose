var formatMap = {
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

var ajax = require('./ajax')

// CSS对象转String
function cssFormat(obj) {
	var st  = Date.now()
		obj = JSON.parse(JSON.stringify(obj))
	for (var p in obj) {
		var v = obj[p]
		if (formatMap[p]) obj[p] += 'px'
	}
	console.log(`耗时${Date.now() - st}ms`)
	return obj
}
// 删除数组内元素
function arrRemoveByIdx(arr, idx) {
	arr.splice(idx, 1)
}
// 清空对象字段
function objClearByKey(obj, key) {
	obj[key] = {}
}
// 数组交换顺序
function arrPosChange(arr, idx1, idx2) {
	var x = JSON.parse(JSON.stringify(arr[idx1])),
		y = JSON.parse(JSON.stringify(arr[idx2]));
	Vue.set(arr, idx1, y)
	Vue.set(arr, idx2, x)
	return arr
}
// CSS对象转小程序String
function cssToWxaStr(obj) {
	var str = ''
	for (var p in obj) {
		var v = obj[p]
		if (formatMap[p]) {
			v *= 2
			v += 'rpx'
		}
		str += (p.replace(/[A-Z]/g, function(_) { return '-'+_.toLowerCase() }) +':'+(v|| ' ')+';')
	}
	return str
}
// 文本换行
function textBreak(str = '') {
	return str.replace(/\n|\r\n/g, '<br/>').replace(/\s/g, '&nbsp;')
}
// 获取真实数据类型
function getAttr(element) {
	return Object.prototype.toString.call(element).match(/[A-Z][a-z]*/)[0]
}
// 获取url参数
// function getQueryValue(key) {
// 	var r = global.location.search.match(new RegExp('[\\?|\\&]' + key + '=([^\\&]*)', 'i'))
// 	return r? decodeURIComponent(r[1]): ''
// }

export default {
	install(Vue, options) {
		Vue.prototype.cssFormat      = cssFormat
		Vue.prototype.cssToWxaStr    = cssToWxaStr
		Vue.prototype.arrRemoveByIdx = arrRemoveByIdx
		Vue.prototype.objClearByKey  = objClearByKey
		Vue.prototype.arrPosChange   = arrPosChange
		Vue.prototype.textBreak      = textBreak
		Vue.prototype.Ajax           = ajax.ajax
		Vue.prototype.getAttr        = getAttr
		// Vue.prototype.getQueryValue  = getQueryValue
	}
}