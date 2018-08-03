let { deepCopy } = require('state/common')
// 字母排序
const data = {
	layout: {
		position: 'absolute',
		top:  36,
		left: 40,
		width:    60,
		height:   24
	},
	style:     {
		filter: {
			width:  60,
			height: 24,
			lineHeight: 20,
			justifyContent: 'center',
			fontSize:       8, 
			fontStyle:      'normal',
			fontWeight:     'normal',
			textDecoration: 'none',
			borderWidth:     2,
			borderStyle:     'solid',
			borderColor:     { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 },
			color:           { type: 'text', color: '#666' },
			background:      'center no-repeat',
			backgroundSize:  'contain',
			backgroundImage: { type: 'custom', img: '' },
			backgroundColor: { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 },
			padding: {
				top:     0,
				right:   0,
				bottom:  0,
				left:    0,
			},
			borderRadius:    {
				topLeft:     20,
				topRight:    20,
				bottomLeft:  20,
				bottomRight: 20
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color:      { type: 'custom', color: '#000' }
			}
		},
		filterActive: {
			borderWidth: 2,
			borderStyle: 'solid',
			backgroundImage: { type: 'custom', img: '' },
			borderColor: { type: 'auxiliary', color: '#a240ec' },
			color: { type: 'textHigh', color: '#fff' },
			background: 'center no-repeat',
			backgroundColor: { type: 'main', color: '#a240ec' }
		}
	},
	content: {
		text: '全部店铺'
	},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}
}
var style = {
}

module.exports = {
	name: 'reset',
	type: 'base',
	data: deepCopy(data),
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: deepCopy(data)
		}, {
			name: '样式2',
			img:  '',
			data: deepCopy(data)
		}, {
			name: '样式3',
			img:  '',
			data: deepCopy(data)
		}]
	},
	// 功能特性
	feature: {
	}
}