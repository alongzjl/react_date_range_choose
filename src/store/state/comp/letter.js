// 字母排序
var style = {
	letterBox: {
		fontSize:       12, 
		fontStyle:      'normal',
		fontWeight:     'normal',
		textDecoration: 'none',
	},
	letter: {
		width:  33,
		height: 33,
		justifyContent: 'center',
		marginTop:    0,
		marginRight:  6,
		marginBottom: 6,
		marginLeft:   0,
		borderWidth:  0,
		borderStyle: 'solid',
		borderColor: { type: 'custom', color: '#fff' },
		color: { type: 'custom', color: '#666' },
		background: 'center no-repeat',
		backgroundSize: 'contain',
		backgroundColor: { type: 'custom', color: '#fff' },
		borderRadius:    {
			topLeft:     6,
			topRight:    6,
			bottomLeft:  6,
			bottomRight: 6
		},
		boxShadow: {
			h_shadow:   5,
			v_shadow:   5,
			blur_dis:   16,
			spread_dis: 0,
			color:      { type: 'custom', color: 'rgba(0, 0, 0, .2)' }
		}
	},
	letterActive: {
		justifyContent: 'center',
		borderWidth: 0,
		borderStyle: 'solid',
		borderColor: { type: 'custom', color: '#a240ec' },
		color: { type: 'custom', color: '#fff' },
		background: 'center no-repeat',
		backgroundColor: { type: 'custom', color: '#a240ec' }
	}
}

module.exports = {
	name: 'letter',
	type: 'base',
	// 位置大小
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    234,
		height:   234
	},
	// 样式管理
	style: JSON.parse(JSON.stringify(style)),
	// 内容管理
	content: {
		letterBGImg: { type: 'custom', img: '' },	// 图片url
	},
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