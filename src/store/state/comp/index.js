const common = require('state/common')
let { authInit } = common

// 组件元素数据
module.exports = {
	/* 基础组件 */
	// 图片
	picture:           authInit(require('./picture')),
	// 轮播图
	swiperImage:       authInit(require('./swiperImage')),
	// 精彩活动
	wonderfulActivity: authInit(require('./wonderfulActivity')),
	// 文本
	text:              authInit(require('./text')), 
	//按钮 
	button:            authInit(require('./button')),  
	// 网页
	web:               authInit(require('./web')),
	// 导航列表
	navigation:        authInit(require('./navigation')),
	// 悬浮导航
	navigationFloat:   authInit(require('./navigationFloat')),
	// 视频
	video:             authInit(require('./video')),
	// 分割线
	splitLine:         authInit(require('./splitLine')),

	// 店铺简介--标题
	storeInstroTitle:  authInit(require('./storeInstro/content/storeInstroTitle')), 
	// 店铺简介--详情
	storeInstroInstroduce:  authInit(require('./storeInstro/content/storeInstroInstroduce')),
	// 店铺简介--轮播
	storeWonderful:authInit(require('./storeInstro/content/storeWonderful')),
	// 店铺简介--竖线
	storeSplitLine:authInit(require('./storeInstro/content/storeSplitLine')),

	// 店铺详情-标题
	instroTitle:       authInit(require('./storeDetails/content/instroTitle')),
	// 店铺详情-logo
	instroPicture:     authInit(require('./storeDetails/content/instroPicture')),
	// 店铺详情-前往
	instroButton:      authInit(require('./storeDetails/content/instroButton')),
	// 地址
	address:           authInit(require('./storeDetails/content/address')),
	// 电话 
	phone:             authInit(require('./storeDetails/content/phone')),
	
	// 字母
	letter:            authInit(require('./storeList/content/letter')),
	// 楼层
	floor:             authInit(require('./storeList/content/floor')),
	// 分类
	catg:              authInit(require('./storeList/content/catg')),
	// 分页
	page:              authInit(require('./storeList/content/page')),
	// 重置
	reset:             authInit(require('./storeList/content/reset')),
	// 列表 (店铺)
	listByStore:       authInit(require('./storeList/content/listByStore')),
	// 楼层地图
	floorMap:          authInit(require('./storeList/content/floorMap')),
	// 天气日期
	time:              authInit(require('./dateWeather/content/time')),
	// 天气 
	weather:           authInit(require('./dateWeather/content/weather')),
	//天气logo
	weatherLogo:       authInit(require('./dateWeather/content/weatherLogo')),
	/* 业务组件 */
	// 店铺列表
	storeList:         authInit(require('./storeList/index')),
	// 店铺详情
	storeDetails:      authInit(require('./storeDetails/index')),
	// 店铺简介
	storeInstro:       authInit(require('./storeInstro/index')),
	// 日期天气
	dateWeather:       authInit(require('./dateWeather/index')),
	// 2d地图组件
	map2D:             authInit(require('./map2D')),
	// 组件上传
	html:              authInit(require('./html'))
}