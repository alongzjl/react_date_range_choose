// 字母排序
var style = {
	image: {
		width:  50,
		height: 50			// 动画 (0: 开始时间, 1: 持续时间, 2: 循环次数)
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
}

module.exports = {
	name: 'listByStore',
	type: 'base',
	// 位置大小
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    440,
		height:   300
	},
	// 样式管理
	style: JSON.parse(JSON.stringify(style)),
	// 内容管理
	content: {},
	// 动画设置
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	},
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: JSON.parse(JSON.stringify(style))
		}, {
			name: '样式2',
			img:  '',
			data: JSON.parse(JSON.stringify(style))
		}, {
			name: '样式3',
			img:  '',
			data: JSON.parse(JSON.stringify(style))
		}]
	},
	// 功能特性
	feature: {
	}
}