let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')
const kongQi = authInit(require('./content/kongQi'))
const feng = authInit(require('./content/feng'))
const shiDu = authInit(require('./content/shiDu'))
const w = authInit(require('./content/weather'))
const l = authInit(require('./content/line'))

//自定义
const weather  = extendRmSL(styleIdxChange(8, deepCopy(w)), {
	data: {
		layout: {
			top:    33,
			left:   405,  
			width:  130,   
			height: 15 
		},   
		style: {
			text: {
				textAlign:  'center',
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
			top:    10.5,
			left:   84.5,
			width:  34,
			height: 34
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
			top:    4.5,
			left:   15,
			width:  65,
			height: 33.5
		},
		style:{
			text:{
				fontSize:   24, 
				lineHeight: 33.5, 
				color:    { type: 'custom', color: '#333' } 
			}
		} 
	}
})
//天气
const weather4 = extendRmSL(styleIdxChange(3, deepCopy(w)), {
	data: {
		layout: {
			top:    33.5,
			left:   15,
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
			top:    33,
			left:   310,   
			width:  46,   
			height: 15  
		}, 
		style:{ 
			text:{
				fontSize:   12, 
				lineHeight: 15,
				textAlign:'center', 
				color:    { type: 'custom', color: '#313131' } 
			}
		} 
	}
}) 
//强度
const weather6 = extendRmSL(styleIdxChange(5, deepCopy(w)), {
	data: {
		layout: {
			top:    33,
			left:   356,
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
const kq = extendRmSL(deepCopy(kongQi), {
	data:{
		layout:{
			top:13,
			left:467,
			height:15,
			width:15
		}
	}
})
const ff = extendRmSL(deepCopy(feng), {
	data:{
		layout:{
			top:13,
			left:348.5,
			height:15,
			width:15
		}
	}
})
const line = extendRmSL(deepCopy(l), {
	data:{
		layout:{
			top:15.5,
			left:393,  
			height:30,  
			width:1
		}, 
		style:{ 
			filterBox:{
				backgroundColor: { type: 'custom', color: '#ACACAC' }
			}    
		} 
	}
})

const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   61 
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
		ff,
		line
	]
}  
module.exports = data 