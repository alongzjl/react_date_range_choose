let { authInit, deepCopy, extendRmSL, styleIdxChange } = require('state/common')

const t = authInit(require('./content/time'))
const w = authInit(require('./content/weather'))
 
 
const time     = extendRmSL(styleIdxChange(0, deepCopy(t)), {
	data: {
		layout: {
			top:  1, 
			left: 15,
			width:  174,
			height: 61
		},  
		style: {
			text: {
				fontSize:   45, 
				lineHeight: 61,
				textAlign:    'content',
				color:    { type: 'custom', color: '#313131' }
			}  
		}
	}
})
const time2    = extendRmSL(styleIdxChange(4, deepCopy(t)), {
	data: {
		layout: { 
			top:    18,
			left:   289,
			width:  48,
			height: 28
		}, 
		style: { 
			text: {
				fontSize:   20, 
				lineHeight: 28,
				color:{ type: 'custom', color: '#fff' },
				backgroundColor: { type: 'custom', color: '#4A89DC' },
				borderRadius: {
					topLeft:     4,
					topRight:    4,
					bottomRight: 4,
					bottomLeft:  4
				} 
			} 
		} 
	}
}) 
const time3    = extendRmSL(styleIdxChange(3, deepCopy(t)), {
	data: {
		layout: { 
			top:    16,
			left:   347,   
			width:  178, 
			height: 31  
		},  
		style: { 
			text: {  
				fontSize:     22, 
				lineHeight:   31,
				color:{ type: 'custom', color: '#313131' },
			}, 
			split: {
				fontSize:     22, 
				lineHeight:   31, 
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
		left:     0,
		width:    540,
		height:   63
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