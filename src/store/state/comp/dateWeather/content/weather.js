let { authInit, deepCopy, extendRmSL } = require('state/common')

// 天气
const data = {
	style:     {
		text: {
			textAlign:    'center',
			fontSize:     32, 
			lineHeight:   36,
			fontStyle:    'normal',
			fontWeight:   'normal',
			opacity:      1,
			textShadow:   {
				h_shadow: 0,
				v_shadow: 0,
				blur_dis: 0,
				color:    { type: 'custom', color: '#f58f8f' }
			},
			color:        { type: 'custom', color: '#333' }
		}
	},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    120,
		height:   40
	},
	content: {},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}
}
const data2 = extendRmSL(deepCopy(data), {
	style: {
		split: {
			fontSize:     24, 
			lineHeight:   24,
			fontStyle:    'normal',
			fontWeight:   'normal',
			opacity:      1,
			textShadow:   {
				h_shadow: 0,
				v_shadow: 0,
				blur_dis: 0,
				color:    { type: 'custom', color: '#f58f8f' }
			},
			color:        { type: 'custom', color: '#333' }
		}
	},
	content: {
		template: '今天天气: {type} 气温: {temp} 空气质量: {aqi} {aqiInfo} 风向: {direct} {power}'
	}
})
const data3 = extendRmSL(deepCopy(data), {
	layout: {
		width: 52,
		height: 52
	},
	style: {
		image:{
			borderRadius: {
				topLeft:     0,
				topRight:    0,
				bottomRight: 0,
				bottomLeft:  0
			}
		}
	},
	content: {
		weatherIcon: {
			'晴':        { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291034408591.png' },
			'晴_多云_阴': { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291034409695.png' },
			'晴_雨':     { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291034411456.png' },
			'阴_多云':    { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291034411645.png' },
			'阴_多云_雨': { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291034412926.png' },
			'阴':        { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291034413712.png' },
			'小雨':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291034414739.png' },
			'中雨':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291034415789.png' },
			'阵雨':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291034416835.png' },
			'大雨':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291034416835.png' },
			'暴雨':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291034416835.png' },
			'小雪':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291034417831.png' },
			'雨_雪':     { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291038563386.png' },
			'雷雨':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291038564457.png' },
			'雷阵雨':    { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291038564457.png' },
			'晴_雨_雷':  { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291038565568.png' },
			'冰雹':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291038566438.png' },
			'阴_多云_雪': { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291038567480.png' },
			'中雪':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291038568511.png' },
			'大雪':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291038569553.png' },
			'暴雪':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291038569553.png' }
		}
	}
})
delete data3.style.text
const data4 = extendRmSL(deepCopy(data3), {
	style: {
		image: { 
			backgroundColor: { type: 'main', color: '#000' }
		}
	}
})

module.exports = {
	name: 'weather',
	type: 'base',
	// 位置大小
	// 样式管理
	data: deepCopy(data),
	// 内容管理
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name:  '温度',
			img:   '',
			data:  deepCopy(data)
		}, {
			name:  '空气质量',
			img:   '',
			data:  deepCopy(data)
		}, {
			name:  '空气质量描述',
			img:   '',
			data:  deepCopy(data)
		}, {
			name:  '天气',
			img:   '',
			data:  deepCopy(data)
		}, {
			name:  '风向',
			img:   '',
			data:  deepCopy(data)
		}, {
			name:  '强度',
			img:   '',
			data:  deepCopy(data)
		}, {
			name:  '图标',
			img:   '',
			data:  deepCopy(data3)
		}, {
			name:  '纯色图标',
			img:   '',
			data:  deepCopy(data4)
		}, {
			name:  '自定义',
			img:   '',
			data:  deepCopy(data2)
		}] 
	},
	// 功能特性
	feature: {
	},
	auth: {
		style: {
			split: {
				fontSize:     false, 
				lineHeight:   false,
				fontStyle:    false,
				fontWeight:   false,
				opacity:      false,
				textShadow:   false,
				color:        false
			}
		}
	}
}