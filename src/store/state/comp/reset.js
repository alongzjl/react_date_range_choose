// 字母排序
const data = {
	style:     {
		filter: {
			width:  60,
			height: 24,
			textAlign:       'center',
			borderWidth:     1,
			borderStyle:     'solid',
			borderColor:     { type: 'main', color: '#fff' },
			color:           { type: 'text', color: '#666' },
			background:      'center no-repeat',
			backgroundSize:  'contain',
			backgroundColor: { type: 'custom', color: '#fff' },
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
		}
	},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    60,
		height:   24
	},
	content: {
		text: '重置',
		filterBGImg: { type: 'custom', img: '' },	// 图片url
	},
	animation: {
		className: '',				// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	}
}
var style = {
}

module.exports = {
	name: 'reset',
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