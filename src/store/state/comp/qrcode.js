let { deepCopy } = require('state/common')

// 图片
const data = {
	style:     {
		image: {
			transform: { rotate: 0 },
			opacity:   1,
			borderRadius: {
				topLeft:     0,
				topRight:    0,
				bottomRight: 0,
				bottomLeft:  0
			}
		}
	},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    100,
		height:   100,
		lockAspectRatio:true
	},
	content: {
		url: ''
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	}
}

module.exports = {
	name: 'qrcode',
	type: 'base',
	// 位置大小
	// 样式管理
	data: deepCopy(data),
	// 内容管理
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: deepCopy(data)
		}]
	},
	// 功能特性
	feature: {
	}
}