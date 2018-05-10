/**
 * @Author: Along
 * @Date:   2018-05-05
 
 */ 

// 天气日期
const data = {
	style:     {
		// 组件样式
		/*text: {
			color:          { type: 'custom', color: '#fff' },
			fontSize:       12,
			fontStyle:      'normal',
			fontWeight:     'normal',
			textAlign:      'center',
			textDecoration: 'none',
		},*/ 
	},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    '100%',
		height:   150
	},
	content: { 
		type:1,
		format_time:':',
		format_date:'.' 
	},  
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite',	// 循环次数
	}
}

module.exports = {
	name: 'date',
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
		}],
	}, 
	// 功能特性
	feature: {
	},
}