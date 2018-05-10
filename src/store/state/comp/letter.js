// 字母排序
const data = {
	style:     {
		filterBox: {
			fontSize:       8, 
			fontStyle:      'normal',
			fontWeight:     'normal',
			textDecoration: 'none',
		},
		filter: {
			width:  20,
			height: 20,
			justifyContent: 'center',
			margin: {
				top:     0,
				right:   8,
				bottom:  10,
				left:    0,
			},
			borderWidth:  1,
			borderStyle: 'solid',
			borderColor: { type: 'auxiliary', color: '#fff' },
			color: { type: 'custom', color: '#666' },
			background: 'center no-repeat',
			backgroundSize: 'contain',
			backgroundColor: { type: 'custom', color: '#fff' },
			borderRadius:    {
				topLeft:     10,
				topRight:    10,
				bottomLeft:  10,
				bottomRight: 10
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
			justifyContent: 'center',
			borderWidth: 2,
			borderStyle: 'solid',
			borderColor: { type: 'auxiliary', color: '#a240ec' },
			color: { type: 'textHigh', color: '#fff' },
			background: 'center no-repeat',
			backgroundColor: { type: 'main', color: '#a240ec' }
		}
	},
	layout:    {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    364,
		height:   60
	},
	content: {
		filterBGImg: { type: 'custom', img: '' },	// 图片url
	},
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	}
}

module.exports = {
	name: 'letter',
	type: 'base',
	data: JSON.parse(JSON.stringify(data)),
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: JSON.parse(JSON.stringify(data))
		}, {
			name: '样式2',
			img:  '',
			data: JSON.parse(JSON.stringify(data))
		}, {
			name: '样式3',
			img:  '',
			data: JSON.parse(JSON.stringify(data))
		}]
	},
	// 功能特性
	feature: {
	}
}