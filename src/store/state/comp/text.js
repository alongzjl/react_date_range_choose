let { deepCopy } = require('state/common')

// 文本
const data = {
	style:     {
		text: { 
			textAlign:      'center',
			fontSize:       12,
			lineHeight:     18,
			transform:      { rotate: 0 },
			fontStyle:      'normal',
			fontWeight:     'normal',
			textDecoration: 'none',
			textIndent:     0,
			opacity:        1,
			backgroundColor: { type: 'custom', color: 'rgba(0,0,0,0)', rgb: '#000', alpha: 0 },
			borderRadius:    {
				topLeft:     0,
				topRight:    0,
				bottomRight: 0,
				bottomLeft:  0
			},
			borderWidth:     0,
			borderStyle:     'solid',
			borderColor: 	 { type: 'custom', color: '#333' },
			padding: {
				top:     0,
				right:   0,
				bottom:  0,
				left:    0,
			},
			textShadow:     {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				color:      { type: 'custom', color: 'rgba(0,0,0,0)', rgb: '#000', alpha: 0 }
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
		text:   '', 			// 文字内容
		router: {}				// 路由
	},
	type:'normal',
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}
}
var style = {
}

module.exports = {
	name: 'text',
	type: 'base',
	// 位置大小
	// 样式管理
	data: deepCopy(data),
	// 内容管理
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name:  '样式1',
			img:   '',
			data:  deepCopy(data)
		}] 
	},
	// 功能特性
	feature: {
	}
}