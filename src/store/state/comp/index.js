const common = require('state/common')
let { authInit, deepCopy, extend, styleIdxChange } = common

const address = extend(deepCopy(require('./address')), {
	data: {
		layout: {
			top:  54,  
			left: 87.5, 
			width:80  
		}, 
		style:{
			text:{
				textAlign:'left'
			},
			image:{
				margin: {  
					top:     0, 
					right:   5, 
					bottom:  0,
					left:    0,
				} 
			} 
		},
		type:'address',  
		content: { 
			text: 'L2  2817',
			img:{type:'custom',img:'http://rongyi.b0.upaiyun.com/commodity/text/201805191128322385.png'}
		}  
	}
}) 
const phone = extend(deepCopy(require('./address')), {
	data: { 
		layout: {
			top:  54, 
			left: 172.5  
		},  
		style:{
			text:{
				textAlign:'left'
			},
			image:{ 
				margin: {   
					top:     0, 
					right:   5,  
					bottom:  0,
					left:    0,
				} 
			} 
		},
		type:'phone',
		content: { 
			text: '023-64538476',
			img:    { type: 'custom', img: "http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/e49fe7db-78c7-4dc6-9abd-d2198b8b4ffb.png" }
		}  
	}
})
const instroTitle = extend(deepCopy(require('./text')), {
		data: {
			layout: {
				top:  30, 
				left: 87.5  
			}, 
			style:{
				text:{
					textAlign:'left'
				}
			},   
			content: {
				text: '优衣库/UNIQLO'
			} 
		} 
	})
const instroPicture =  extend(deepCopy(require('./picture')), {
		data: {
			layout: {
				top:  30, 
				left: 30,
				width:40,
				height:40  
			},
			content: {
				img:    { type: 'custom', img: "http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/5892bde0-c399-42e0-be7d-8c2c1e6dddb3.png" }	// 图片url
			} 
		}  
	}) 
const instroButton = extend(deepCopy(require('./button')), {
			data: {
				layout: {
					top:  30, 
					left: 467,
					height:40,
					width:40   
				}, 
				style:{
					text:{
						background: 'center no-repeat',
						backgroundSize: 'contain', 
						backgroundColor: { type: 'custom', color: '#fff' }, 
						backgroundImage:{type:'custom',img:"http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/136c4156-08c9-4d37-8ffc-da00c7b5af7b.png"},
						borderWidth:     0
					}   
				},        
				content: {  
					text: ''
				} 
			}
		})
const storeInstroTitle = extend(deepCopy(require('./text')), {
	data: {
		layout: {
			top:  12, 
			left: 40,
			width:100   
		}, 
		style:{
			text:{
				textAlign:'left'
			}
		},    
		type:'storeInstroTitle',   
		content: {
			text: '店铺介绍'
		} 
	}  
})
const storeInstroInstroduce = extend(deepCopy(require('./text')), {
	data: {
		layout: {  
			top:  60,
			left: 30,
			width: 480,
			height:111
		}, 
		type:'storeInstroInstroduce',  
		content:{
			text:'    UNIQLO（日文假名发音：ユニクロ），日本服装品牌，由日本迅销公司建立于1963年，当年是一家销售西服的小服装店，现已成为国际知名服装品牌。优衣库现任董事长兼总经理柳井正在日本首次引进了大卖场式的服装销售方式，通过独特的商品策划、开发和销售体系来实现店铺运作的低成本化，由此引发了优衣库的'
		}
	}
})  
const storeWonderful  = extend(deepCopy(require('./wonderfulActivity')), {
			data: {
				layout: {
					top:  170,
					left: 30,  
					width: 480, 
					height:286 
				} 
			},
			feature:{
				swiperOptions:{
					slideOptions:{
						spaceBetween:25, 
						slidesPerView:2,  
						centeredSlides:true,
					},
				}
			}
		})
const storeSplitLine = extend(deepCopy(require('./splitLine')), {
	data: {
		layout: {
			top:  5,
			left: 30,
			width:50 
		}, 
		 style:{
		 	line:{
		 		height: 12,  
			 	width:0,  
				borderLeft: {
					width: 2,  
					style: 'solid',
					color: { type: 'custom', color: '#CFAD81' }
				}  
		 	} 
		 }
	}  
	})
// 组件元素数据
module.exports = {
	/* 基础组件 */
	// 图片
	picture:           authInit(require('./picture')),
	// 天气日期
	time:              authInit(require('./time')),
	// 轮播图
	swiperImage:       authInit(require('./swiperImage')),
	// 精彩活动
	wonderfulActivity: authInit(require('./wonderfulActivity')),
	// 文本
	text:              authInit(require('./text')), 
	// 天气 
	weather:           authInit(require('./weather')),
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

	//店铺详情的标题
	instroTitle:       authInit(instroTitle),
	//店铺详情的logo
	instroPicture:     authInit(instroPicture),
	//店铺详情的立即前往
	instroButton:      authInit(instroButton),
	// 地址
	address:           authInit(address),
	// 电话 
	phone:             authInit( phone ),


	//店铺简介--标题
	storeInstroTitle:  authInit( storeInstroTitle ), 
	//店铺简介---详情
	storeInstroInstroduce:  authInit( storeInstroInstroduce ),
	//店铺简介--轮播
	storeWonderful:authInit( storeWonderful ),
	//店铺简介--竖线
	storeSplitLine:authInit( storeSplitLine ),

	
	/* 业务组件 */
	// 店铺列表
	storeList:         authInit(require('./storeList')),
	// 店铺详情
	storeDetails:      authInit(require('./storeDetails')),
	// 店铺简介
	storeInstro:       authInit(require('./storeInstro')),
	// 日期天气
	dateWeather:       authInit(require('./dateWeather')),
	// 2d地图组件
	map2D:             authInit(require('./map2D'))
}