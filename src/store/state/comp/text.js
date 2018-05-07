// 文本
var style = {
	text: { 
		textAlign:      'center',  
		fontSize:       12, 
		fontStyle:      'normal', 
		fontWeight:     'normal',
		textDecoration: 'none',
		transform:      '',
		opacity:        1,
		textShadow:      {h_shadow:2,v_shadow:2,blur_dis:5,spread_dis:2,color:'#F58F8F'},
		color:          { type: 'custom', color: '#333' },
		animation:      '0s 0s 1'			// 动画 (0: 开始时间, 1: 持续时间, 2: 循环次数)
	}
}

module.exports = {
	name: 'text',
	type: 'base',
	// 位置大小
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    120,
		height:   30
	},
	// 样式管理
	style: JSON.parse(JSON.stringify(style)),
	// 内容管理
	content: {
		text: '', 			// 文字内容
		router: {}			// 路由
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
			name:  '样式1',
			img:   '',
			data:  JSON.parse(JSON.stringify(style))
		}]
	},
	// 功能特性
	feature: {
	}
}