function authInit(data) {
	var auth = JSON.parse(JSON.stringify(data.style))
	for (var p in auth) {
		for (var q in auth[p]) {
			auth[p][q] = false
		}
	}
	data.auth = auth
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
	custom:      authInit(require('./custom')),
	web:         authInit(require('./web')),
}