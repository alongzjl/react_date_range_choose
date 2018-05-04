function handleArray(arr) {
	arr.map(obj => handleObj(obj))
}
function handleObj(obj) {
	for (var p in obj) {
		obj[p] = false
	}
}

function authInit(data) {
	var style   = JSON.parse(JSON.stringify(data.style)),
		content = JSON.parse(JSON.stringify(data.content))
	for (var p in style) {
		for (var q in style[p]) {
			style[p][q] = false
		}
	}
	if (content.length) handleArray(content)
	else handleObj(content)
	data.auth = {
		style: style,
		content: content,
	}
	return data
}

// 组件元素数据
module.exports = {
	// 图片
	picture:     authInit(require('./picture')),
	// 按钮
	// button:       require('./button'),
	// 轮播图
	swiperImage: authInit(require('./swiperImage')),
	// 文本
	text:        authInit(require('./text')),
	// 自定义
	web:         authInit(require('./web')),
	storeList:   authInit(require('./storeList')),
}