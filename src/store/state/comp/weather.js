// 文本
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
const data2 = JSON.parse(JSON.stringify(data))
data2.style.split = {
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
data2.content.template = '今天天气: {type} 气温: {temp} 空气质量: {aqi} {aqiInfo} 风向: {direct} {power}'

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