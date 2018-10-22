let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const kongQi = authInit(require('./content/kongQi'))
const feng = authInit(require('./content/feng'))
const shiDu = authInit(require('./content/shiDu'))
const w = authInit(require('./content/weather'))
 

//自定义
const weather  = extendRmSL(styleIdxChange(8, deepCopy(w)), {
	data: {
		layout: {
			top:    51,
			left:   30.5, 
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
			top:    19,
			left:   250,
			width:  25,
			height: 25
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
			top:    9,
			left:   15,
			width:  95,
			height: 49
		},
		style:{ 
			text:{
				textAlign:  'left',
				fontSize:   35, 
				lineHeight: 49, 
				color:    { type: 'custom', color: '#313131' } 
			}
		} 
	}
})
//天气
const weather4 = extendRmSL(styleIdxChange(3, deepCopy(w)), {
	data: {
		layout: {
			top:    30,
			left:   187.5,
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
			top:    51,
			left:   210.5,   
			width:  46,   
			height: 15  
		}, 
		style:{ 
			text:{
				fontSize:   12, 
				lineHeight: 15,
				textAlign:'left', 
				color:    { type: 'custom', color: '#313131' } 
			}
		}  
	}
}) 
//强度
const weather6 = extendRmSL(styleIdxChange(5, deepCopy(w)), {
	data: {
		layout: {
			top:    51,
			left:   253,
			width:  40,  
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
const kq = extendRmSL(deepCopy(kongQi), {
	data:{
		layout:{
			top:54,
			left:16,
			height:10,
			width:10
		}
	}
})
const ff = extendRmSL(deepCopy(feng), {
	data:{
		layout:{
			top:53.5,
			left:196.5,
			height:10,
			width:10
		}
	}
})

const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    290,
		height:   75 
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
		weather,
		weather2,
		weather3,
		weather4,
		weather5,
		weather6,
		kq, 
		ff
	]
} 
module.exports = data 