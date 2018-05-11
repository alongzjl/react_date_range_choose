/**
 * @Author: Along
 * @Date:   2018-05-08
 
 */ 

// 视频
const data = {
	style:     {},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   150
	}, 
	// 内容管理
	content: {
		src:''
	},
	// 动画设置
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite',	// 循环次数
	}
}

module.exports = {
	name: 'video',
	type: 'base',
	// 样式管理
	data: JSON.parse(JSON.stringify(data)),
	// 组件样式
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: JSON.parse(JSON.stringify(data))
		}],
	}, 
	// 功能特性
	feature: {
	},
}