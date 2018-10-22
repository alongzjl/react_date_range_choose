let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')

const t = authInit(require('./content/time'))
const w = authInit(require('./content/weather'))
 
 
const time     = extendRmSL(styleIdxChange(0, deepCopy(t)), {
	data: {
		layout: {
			top:  3.5, 
			left: 18.5,
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
			left:   18.5,
			width:  30,
			height: 14
		},
		style: { 
			text: {
				fontSize:   12, 
				lineHeight: 14,
				color:{ type: 'custom', color: '#fff' },
				backgroundColor: { type: 'custom', color: '#4A89DC' },
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
			left:   52, 
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

// 店铺列表
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     375, 
		width:    165,
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
		time,
		time2,
		time3
	]
} 
module.exports = data