/**
 * @Author: Along
 * @Date:   2018-05-07

 */

// 按钮
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    100,
		height:   40
	},
	style: {
		text: {
			textAlign:       'center',
			fontSize:        16, 
			lineHeight:      36,
			fontStyle:       'normal',
			fontWeight:      'normal',
			textDecoration:  'none',
			transformRotate: 0,
			opacity:         1, 
			color:           { type: 'custom', color: '#000' },
			backgroundColor: { type: 'custom', color: '#F58F8F' },
			borderRadius:    {
				topLeft:     6,
				topRight:    6,
				bottomRight:  6,
				bottomLeft: 6
			},
			borderWidth:     1, 
			borderStyle:     'solid',  
			borderColor: 	 { type: 'custom', color: '#333' },
			boxShadow:       {
				h_shadow:    0,
				v_shadow:    0,
				blur_dis:    0,
				spread_dis:  0,
				color:       { type: 'custom', color: '#333' }
			},
			textShadow:      {
				h_shadow:    0,
				v_shadow:    0,
				blur_dis:    0,
				color:       { type: 'custom', color: '#333' }
			},
			animation:       '0s 0s 1'			// 动画 (0: 开始时间, 1: 持续时间, 2: 循环次数)
		}
	},
	content: {
		text:   '文字内容',	// 文字内容
		router: {} 			// 路由
	},	
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	}
}

module.exports = {
	name: 'button',
	type: 'base',
	data: JSON.parse(JSON.stringify(data)),
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name:  '样式1',
			img:   '',
			data:  JSON.parse(JSON.stringify(data))
		}]
	},
	// 功能特性
	feature: {
	}
}