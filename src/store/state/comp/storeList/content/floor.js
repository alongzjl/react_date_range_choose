// 字母排序
const data = {
	layout: {
		position: 'absolute',
		top:  110,
		left: 490,
		width:    40,
		height:   300
	},
	style:     {
		filterBox: {
			fontSize:       8, 
			fontStyle:      'normal',
			fontWeight:     'normal',
			textDecoration: 'none',
		},
		filter: {
			width:  25,
			height: 25,
			justifyContent: 'center',
			margin: {
				top:     0,
				right:   0,
				bottom:  25,
				left:    0,
			},
			borderWidth:  1,
			borderStyle: 'solid',
			borderColor: { type: 'auxiliary', color: '#fff' },
			color: { type: 'custom', color: '#666' },
			background: 'center no-repeat',
			backgroundSize: 'contain',
			backgroundImage: { type: 'custom', img: '' },
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
			backgroundImage: { type: 'custom', img: '' },
			borderColor: { type: 'auxiliary', color: '#a240ec' },
			color: { type: 'textHigh', color: '#fff' },
			background: 'center no-repeat',
			backgroundColor: { type: 'main', color: '#a240ec' }
		}
	},
	content: {
	},
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}
}

module.exports = {
	name: 'floor',
	type: 'base',
	// 位置大小
	// 样式管理
	data: JSON.parse(JSON.stringify(data)),
	// 内容管理
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: JSON.parse(JSON.stringify(data))
		}]
	},
	// 功能特性
	feature: {
	}
}