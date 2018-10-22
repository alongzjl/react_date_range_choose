let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const kongQi = authInit(require('./content/kongQi'))
const feng = authInit(require('./content/feng'))
const shiDu = authInit(require('./content/shiDu'))
const t = authInit(require('./content/time'))
const w = authInit(require('./content/weather'))
 
 
const time     = extendRmSL(styleIdxChange(0, deepCopy(t)), {
	data: {
		layout: {
			top:  3.5, 
			left: 48.5,
			width:  138,
			height: 49
		},  
		style: {
			text: {
				fontSize:   35, 
				lineHeight: 49,
				textAlign:    'left',
				color:    { type: 'custom', color: '#313131' }
			}  
		}
	}
})
const time2    = extendRmSL(styleIdxChange(4, deepCopy(t)), {
	data: {
		layout: { 
			top:    52,
			left:   48.5,
			width:  30,
			height: 14
		},
		style: { 
			text: {
				fontSize:   12, 
				lineHeight: 14,
				color:{ type: 'custom', color: '#fff' },
				backgroundColor: { type: 'custom', color: '#4A89DC' },
				opacity:      0.6,
				borderRadius: {
					topLeft:     2,
					topRight:    2,
					bottomRight: 2,
					bottomLeft:  2
				} 
			} 
		} 
	}
})
const time3    = extendRmSL(styleIdxChange(3, deepCopy(t)), {
	data: {
		layout: {
			top:    51.5,
			left:   82, 
			width:  90,
			height: 15 
		}, 
		style: { 
			text: {
				fontSize:     12, 
				lineHeight:   15,
				color:{ type: 'custom', color: '#313131' },
			}, 
			split: {
				fontSize:     11, 
				lineHeight:   15, 
				color:{ type: 'custom', color: '#313131' },
			}
		}
	}
}) 
//自定义
const weather  = extendRmSL(styleIdxChange(8, deepCopy(w)), {
	data: {
		layout: {
			top:    70,
			left:   63.5,
			width:  150,  
			height: 15 
		},  
		style: {
			text: {
				textAlign:  'left',
				fontSize:   12, 
				lineHeight: 15,
				color:    { type: 'custom', color: '#9FA5A9' }
			},  
			split: { 
				textAlign:  'left',
				fontSize:   12, 
				lineHeight: 15,
				color:    { type: 'custom', color: '#313131' }
			}   
		},
		content: {
			template: '空气质量: {aqi} {aqiInfo}' 
		} 
	}
})
//纯色图标
const weather2 = extendRmSL(styleIdxChange(7, deepCopy(w)), {
	data: {
		layout: {
			top:    5,
			left:   343.5,
			width:  45,
			height: 45
		},
		style: {
			image: { 
				backgroundColor: { type: 'custom', color: '#4a89dc' }
			}    
		}   
	}
})
//温度
const weather3 = extendRmSL(styleIdxChange(0, deepCopy(w)), {
	data: {
		layout: {
			top:    52,
			left:   298,
			width:  30,
			height: 14
		},
		style:{
			text:{
				fontSize:   12, 
				lineHeight: 14, 
				color:    { type: 'custom', color: '#333' } 
			}
		} 
	}
})
//天气
const weather4 = extendRmSL(styleIdxChange(3, deepCopy(w)), {
	data: {
		layout: {
			top:    52,
			left:   329,
			width:  60,
			height: 14
		}, 
		style:{ 
			text:{
				fontSize:   12, 
				lineHeight: 14, 
				color:    { type: 'custom', color: '#333' } 
			}
		} 
	}
})
//风向
const weather5 = extendRmSL(styleIdxChange(4, deepCopy(w)), {
	data: {
		layout: {
			top:    70,
			left:   315,  
			width:  46,   
			height: 15  
		}, 
		style:{ 
			text:{
				fontSize:   12, 
				lineHeight: 15, 
				color:    { type: 'custom', color: '#313131' } 
			}
		} 
	}
}) 
//强度
const weather6 = extendRmSL(styleIdxChange(5, deepCopy(w)), {
	data: {
		layout: {
			top:    70,
			left:   357,
			width:  50,
			height: 15
		}, 
		style:{ 
			text:{
				fontSize:   12, 
				lineHeight: 15,
				textAlign:'left', 
				color:    { type: 'custom', color: '#9FA5A9' } 
			}
		} 
	} 
})
 

// 店铺列表
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    404,
		height:   95
	},
	style: {
	},
	content: {
	},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}, 
	components: [
		time,
		time2,
		time3, 
		weather,
		weather2,
		weather3,
		weather4,
		weather5,
		weather6,
		kongQi,
		feng
	]
} 
 
module.exports = data