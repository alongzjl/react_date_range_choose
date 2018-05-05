/**
 * @Author: Along
 * @Date:   2018-05-05
 
 */ 

// 天气日期
var style = {
	// 组件样式
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    '100%', 
		height:   150,     
	},
	/*text: {
		color:          { type: 'custom', color: '#fff' },
		fontSize:       12,
		fontStyle:      'normal',
		fontWeight:     'normal',
		textAlign:      'center',
		textDecoration: 'none',
	},*/ 
}

module.exports = {
	name: 'date',
	type: 'base',
	// 样式管理
	style: JSON.parse(JSON.stringify(style)),
	// 内容管理
	content: { 
		type:1,
		format_time:':',
		format_date:'.' 
	},  
	// 动画设置
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite',	// 循环次数
	},
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: JSON.parse(JSON.stringify(style))
		}],
	}, 
	// 功能特性
	feature: {
	},
}