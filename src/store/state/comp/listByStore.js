// 字母排序
const data = {
	style:     {
		image: {
			width:  40,
			height: 40
		},
		posIcon: {
			width:  8,
			height: 8,
			marginRight: 2
		},
		title: {
			color: { type: 'title', color: '#333' },
		},
		text: {
			color: { type: 'main', color: '#333' },
		},
		filterBox: {
			fontSize:       8,
			fontStyle:      'normal',
			fontWeight:     'normal',
			textDecoration: 'none',
		},
		filter: {
			width:  100,
			height: 90,
			justifyContent: 'center',
			borderWidth:  1,
			borderStyle: 'solid',
			borderColor: { type: 'main', color: '#fff' },
			color: { type: 'text', color: '#666' },
			background: 'center no-repeat',
			backgroundSize: 'contain',
			backgroundColor: { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000' },
			margin: {
				top:     0,
				right:   10,
				bottom:  10,
				left:    0,
			},
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
		}
	},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    440,
		height:   300
	},
	content: {
		posIcon: { type: 'custom', img: '' },	// 图片url
	},
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	},
}

module.exports = {
	name: 'listByStore',
	type: 'base',
	// 位置大小
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