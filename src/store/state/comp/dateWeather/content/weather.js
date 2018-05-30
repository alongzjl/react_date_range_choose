const common = require('state/common')
let { authInit, deepCopy, extend } = common

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
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	}
}
const data2 = extend(deepCopy(data), {
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
const data3 = extend(deepCopy(data), {
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
			'晴':        { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181526323397.png' },
			'晴_多云_阴': { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181526423755.png' },
			'晴_雨':     { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181527123210.png' },
			'阴_多云':    { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181528502221.png' },
			'阴_多云_雨': { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181528372528.png' },
			'阴':        { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181528030006.png' },
			'小雨':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181527490142.png' },
			'中雨':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181529464726.png' },
			'阵雨':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181529185081.png' },
			'大雨':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181529185081.png' },
			'暴雨':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181529185081.png' },
			'小雪':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181527247914.png' },
			'雨_雪':     { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181529020582.png' },
			'雷雨':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181526113192.png' },
			'雷阵雨':    { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181526113192.png' },
			'晴_雨_雷':  { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181526573514.png' },
			'冰雹':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181525537484.png' },
			'阴_多云_雪': { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181528243395.png' },
			'中雪':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181529360709.png' },
			'大雪':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181525168338.png' },
			'暴雪':      { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805181525168338.png' }
		}
	}
})
delete data3.style.text

module.exports = {
	name: 'weather',
	type: 'base',
	// 位置大小
	// 样式管理
	data: JSON.parse(JSON.stringify(data)),
	// 内容管理
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name:  '温度',
			img:   '',
			data:  JSON.parse(JSON.stringify(data))
		}, {
			name:  '空气质量',
			img:   '',
			data:  JSON.parse(JSON.stringify(data))
		}, {
			name:  '空气质量描述',
			img:   '',
			data:  JSON.parse(JSON.stringify(data))
		}, {
			name:  '天气',
			img:   '',
			data:  JSON.parse(JSON.stringify(data))
		}, {
			name:  '风向',
			img:   '',
			data:  JSON.parse(JSON.stringify(data))
		}, {
			name:  '强度',
			img:   '',
			data:  JSON.parse(JSON.stringify(data))
		}, {
			name:  '图标',
			img:   '',
			data:  JSON.parse(JSON.stringify(data3))
		}, {
			name:  '自定义',
			img:   '',
			data:  JSON.parse(JSON.stringify(data2))
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