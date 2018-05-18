// 图片
const data = {
	style:     {
		image:{
			transform:       { rotate: 0 },
			borderRadius:    {
				topLeft:     6,
				topRight:    6,
				bottomRight:  6,
				bottomLeft: 6
			}
		}
	},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    120,
		height:   120
	},
	content: {
		img:    { type: 'custom', img: '' },	// 图片url
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
	name: 'picture',
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