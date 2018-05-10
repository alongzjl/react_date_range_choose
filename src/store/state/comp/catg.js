// 字母排序
var style = {
	filterBox: {
		fontSize:       8, 
		fontStyle:      'normal',
		fontWeight:     'normal',
		textDecoration: 'none',
	},
	filter: {
		height:     24,
		lineHeight: 24,
		justifyContent: 'center',
		margin: {
			top:     0,
			right:   4,
			bottom:  0,
			left:    0,
		},
		padding: {
			top:     0,
			right:   15,
			bottom:  0,
			left:    15,
		},
		borderWidth:   2,
		borderStyle:  'solid',
		borderColor:  { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 },
		color: { type: 'custom', color: '#666' },
		background: 'center no-repeat',
		backgroundSize: 'contain',
		backgroundColor: { type: 'custom', color: '#fff' },
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
		justifyContent: 'center',
		borderWidth: 2,
		borderStyle: 'solid',
		borderColor: { type: 'auxiliary', color: '#a240ec' },
		color: { type: 'textHigh', color: '#fff' },
		background: 'center no-repeat',
		backgroundColor: { type: 'main', color: '#a240ec' }
	}
}

module.exports = {
	name: 'catg',
	type: 'base',
	// 位置大小
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    440,
		height:   24
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
		}]
	},
	// 功能特性
	feature: {
	}
}