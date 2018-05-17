// 文本
const data = {
	style:     {
		text: { 
			textAlign:      'center',
			fontSize:       12, 
			lineHeight:     16,
			transform:       { rotate: 0 },
			fontStyle:      'normal',
			fontWeight:     'normal',
			textDecoration: 'none',
			opacity:        1,
			textShadow:     {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				color:      { type: 'custom', color: '#f58f8f' }
			},
			color:          { type: 'custom', color: '#333' }
		}
	},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    120,
		height:   30
	},
	content: {
		text:   '右侧编辑文字', 			// 文字内容
		router: {}				// 路由
	},
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	}
}
var style = {
}

module.exports = {
	name: 'text',
	type: 'base',
	// 位置大小
	// 样式管理
	data: JSON.parse(JSON.stringify(data)),
	// 内容管理
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name:  '样式1',
			img:   '',
			data:  JSON.parse(JSON.stringify(data))
		}/*, {
			name:  '样式2',
			img:   '',
			data:  JSON.parse(JSON.stringify(data))
		}, {
			name:  '样式3',
			img:   '',
			data:  JSON.parse(JSON.stringify(data))
		}*/] 
	},
	// 功能特性
	feature: {
	}
}