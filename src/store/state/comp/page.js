// 字母排序
var style = {
	filterBox: {
		width:  18,
		height: 18,
		margin: {
			top:     0,
			right:   0,
			bottom:  0,
			left:    0,
		},
		fontSize:       8,
		fontStyle:      'normal',
		fontWeight:     'normal',
		textDecoration: 'none',
	},
	filter: {
		width:  6,
		height: 6,
		justifyContent: 'center',
		borderWidth:  0,
		borderStyle: 'solid',
		borderColor: { type: 'custom', color: '#fff' },
		color: { type: 'custom', color: '#666' },
		background: 'center no-repeat',
		backgroundSize: 'contain',
		backgroundColor: { type: 'high', color: '#fff' },
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
		borderWidth: 0,
		borderStyle: 'solid',
		borderColor: { type: 'custom', color: '#a240ec' },
		color: { type: 'textHigh', color: '#fff' },
		background: 'center no-repeat',
		backgroundColor: { type: 'main', color: '#a240ec' }
	}
}

module.exports = {
	name: 'page',
	type: 'base',
	// 位置大小
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    364,
		height:   60
	},
	// 样式管理
	style: JSON.parse(JSON.stringify(style)),
	// 内容管理
	content: {
		filterBGImg: { type: 'custom', img: '' },	// 图片url
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