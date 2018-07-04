// 字母排序
const data = {
	layout: {
		position: 'absolute',
		top:  80,
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
				top:     10,
				right:   0,
				bottom:  10,
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
		},
		filterPage: {
			width:  25,
			height: 25,
			justifyContent: 'center',
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#fff' },
			color: { type: 'custom', color: '#666' },
			background: 'center no-repeat',
			backgroundSize: 'contain',
			backgroundColor: { type: 'main', color: '#fff' },
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
		PagePrev: {
			backgroundImage: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/81dd2b08-3361-4b8f-8009-4da47881f37e.png' }
		},
		PageNext: {
			backgroundImage: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/75a48794-5e71-41b6-afee-7b4176dd2c8d.png' }
		}
	},
	content: {
		switch:   true,
		size: 4,
		pageSwitch:false
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