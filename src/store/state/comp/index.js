let { authInit } = require('state/common')

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
	storeInstroInstroduce: authInit(require('./storeInstro/content/storeInstroInstroduce')),
	// 店铺简介--轮播
	storeWonderful:    authInit(require('./storeInstro/content/storeWonderful')),
	// 店铺简介--竖线
	storeSplitLine:    authInit(require('./storeInstro/content/storeSplitLine')),

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
	html:              authInit(require('./html')),
	// 图片-绑定
	pictureBind:       authInit(require('./pictureBind')),
	// 文本-绑定
	textBind:          authInit(require('./textBind')),
	// 轮播-绑定
	swiperBind:        authInit(require('./swiperBind')),

	/* 商品 开始 */
	// 商品列表
	goodsList:         authInit(require('./goodsList')),
	// 列表&轮播&分类 (商品)
	listByGoods:       authInit(require('./goodsList/content/list')),		// 列表
	swiperByGoods:     authInit(require('./goodsList/content/swiper')),		// 轮播
	catgByGoods:       authInit(require('./goodsList/content/catg')),		// 分类
	resetByGoods:      authInit(require('./goodsList/content/reset')),		// 重置
	// 商品详情
	goodsDetails:      authInit(require('./goodsDetails')),
	goodsBar:          authInit(require('./goodsDetails/content/goodsBar')),	// 商品条
	goodsBlock:        authInit(require('./goodsDetails/content/goodsBlock')),	// 商品信息
	/* 商品 结束 */

	/* 店铺 开始 */
	// 店铺列表
	storeList2:        authInit(require('./storeList2')),
	listByStore2:      authInit(require('./storeList2/content/list')),		// 列表
	catgByStore2:      authInit(require('./storeList2/content/catg')),		// 分类
	pageByStore2:      authInit(require('./storeList2/content/page')),		// 分页
	floorByStore2:     authInit(require('./storeList2/content/floor')),		// 楼层
	letterByStore2:    authInit(require('./storeList2/content/letter')),	// 字母
	resetByStore2:     authInit(require('./storeList2/content/reset')),		// 重置
	mapByStore2:       authInit(require('./storeList2/content/map')),		// 导航
	// 店铺详情
	storeDetails2:     authInit(require('./storeDetails2')),
	storeBlock:        authInit(require('./storeDetails2/content/storeBlock')),	// 信息
	/* 店铺 结束 */

	// 背景色块
	area:              authInit(require('./area')),
	// 图片列表-绑定
	pictureListBind:   authInit(require('./pictureListBind')),
	// 切换标签
	tabs:              authInit(require('./tabs')),
	// 标签分类
	catgByTabs:        authInit(require('./tabs/content/catgByTabs')),
	// 子元素
	childElement:      authInit(require('./childElement')),
	// 二维码
	qrcode:            authInit(require('./qrcode')),
	// 二维码绑定
	qrcodeBind:        authInit(require('./qrcodeBind'))
}