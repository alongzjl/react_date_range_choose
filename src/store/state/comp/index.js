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
		content = JSON.parse(JSON.stringify(data.content)),
		feature = JSON.parse(JSON.stringify(data.feature))
	for (var p in style) {
		for (var q in style[p]) {
			style[p][q] = false
		}
	}
	if (content.length) handleArray(content)
	else handleObj(content)

	handleObj(feature)
	data.auth = {
		style: style,
		content: content,
		feature:feature
	}
	return data
}

// 组件元素数据
module.exports = {
	/* 基础组件 */
	// 图片
	picture:         authInit(require('./picture')),
	// 天气日期
	date:            authInit(require('./date')),
	// 轮播图
	swiperImage:     authInit(require('./swiperImage')),
	// 文本
	text:            authInit(require('./text')),
	//按钮
	button:          authInit(require('./button')), 
	// 自定义
	web:             authInit(require('./web')),
	// 导航列表
	navigation:      authInit(require('./navigation')),
	// 悬浮导航
	navigationFloat: authInit(require('./navigationFloat')), 
	// 字母
	letter:          authInit(require('./letter')),
	// 楼层
	floor:           authInit(require('./floor')),

	/* 业务组件 */
	// 店铺列表
	storeList:       authInit(require('./storeList'))
}