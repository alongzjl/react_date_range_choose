// function handleArray(arr) {
// 	arr.map(obj => handleObj(obj))
// }
function handleObj(obj) {
	for (var p in obj) {
		obj[p] = false
	}
}

function authInit(da) {
	let { data, feature } = da
	let style     = JSON.parse(JSON.stringify(data.style)),
		content   = JSON.parse(JSON.stringify(data.content)),
		animation = JSON.parse(JSON.stringify(data.animation)),
		fture     = JSON.parse(JSON.stringify(feature))

	for (var p in style) {
		handleObj(style[p])
	}
	if (content.length) content = content[0]
	handleObj(content)

	handleObj(fture)
	handleObj(animation)
	da.auth = {
		style:     style,
		content:   content,
		animation: animation,
		feature:   fture
	}
	return da
}

// 组件元素数据
module.exports = {
	/* 基础组件 */
	// 图片
	picture:           authInit(require('./picture')),
	// 天气日期
	date:              authInit(require('./date')),
	// 轮播图
	swiperImage:       authInit(require('./swiperImage')),
	// 精彩活动
	wonderfulActivity: authInit(require('./wonderfulActivity')),
	// 文本
	text:              authInit(require('./text')),
	// 地址和电话
	address:           authInit(require('./address')),
	//按钮
	button:            authInit(require('./button')),
	// 自定义
	web:               authInit(require('./web')),
	// 导航列表
	navigation:        authInit(require('./navigation')),
	// 悬浮导航
	navigationFloat:   authInit(require('./navigationFloat')),
	// 字母
	letter:            authInit(require('./letter')),
	// 楼层
	floor:             authInit(require('./floor')),
	// 分类
	catg:              authInit(require('./catg')),
	// 分页
	page:              authInit(require('./page')),
	// 重置
	reset:             authInit(require('./reset')),
	// 列表 (店铺)
	listByStore:       authInit(require('./listByStore')),
	// 视频
	video:             authInit(require('./video')),
	// 分割线
	splitLine:         authInit(require('./splitLine')),
	
	/* 业务组件 */
	// 店铺列表
	storeList:         authInit(require('./storeList')),
	// 店铺详情
	storeDetails:      authInit(require('./storeDetails')),
	// 店铺简介
	storeInstro:      authInit(require('./storeInstro'))
}