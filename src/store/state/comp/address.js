


// 地址或电话
const data = {
	style:     {
		text: { 
			textAlign:      'center',
			fontSize:       12, 
			lineHeight:     36, 
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
			color:          { type: 'custom', color: '#333' },
			margin: { 
				top:     0,
				right:   0,
				bottom:  0,
				left:    0,
			}, 
			animation:      '0s 0s 1'			// 动画 (0: 开始时间, 1: 持续时间, 2: 循环次数)
		}, 
		image:{
			height:30,
			width:30,
			borderRadius:    {
				topLeft:     6,
				topRight:    6,
				bottomRight:  6,
				bottomLeft: 6
			},    
			margin: {  
				top:     10, 
				right:   10, 
				bottom:  0,
				left:    0,
			}  
		}    
	},  
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    120,
		height:   50 
	}, 
	content: {
		img:    { type: 'custom', img: require('compEdit/EditElement/images/phone.png') },	// 图片url
		text:   'L2  2489',  
		router: {},	// 路由 
	},
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	}
}

module.exports = {
	name: 'address',
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