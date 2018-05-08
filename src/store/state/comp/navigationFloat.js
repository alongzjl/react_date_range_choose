/**
 * @Author: Along
 * @Date:   2018-05-05
 
 */
 

// 导航
var style = {
	// 组件样式
	text: {
		color:          { type: 'custom', color: '#000' },
		fontSize:       12, 
		fontStyle:      'normal',
		fontWeight:     'normal',
		textAlign:      'center',
		textDecoration: 'none',
	},
}

module.exports = {
	name: 'navigationFloat',
	type: 'base',
	// 位置大小
	layout: {
		position: 'absolute',
		top:      220,
		left:     0,
		width:    80,
		height:   330
	},
	// 样式管理  
	style: JSON.parse(JSON.stringify(style)),
	//布局方式的选择
	layout:{
		type:1,
		position:'left'
	},
	// 内容管理
	content: [
		{
			img: { type: 'custom', img: 'http://ryoms.v4.rongyi.com/ryoms/images/menu-icon/icon3_2.png' },			// 图片url
			title: '导航1',		// 图片标题
			router: {},			// 路由
		},
		{
			img: { type: 'custom', img: 'http://ryoms.v4.rongyi.com/ryoms/images/menu-icon/icon11_2.png' },			// 图片url
			title: '导航2',		// 图片标题
			router: {},			// 路由
		},
		{
			img: { type: 'custom', img: 'http://ryoms.v4.rongyi.com/ryoms/images/menu-icon/icon6_2.png' },			// 图片url
			title: '导航3',		// 图片标题
			router: {},			// 路由
		},
		{
			img: { type: 'custom', img: 'http://ryoms.v4.rongyi.com/ryoms/images/menu-icon/icon15_2.png' },			// 图片url
			title: '导航4',		// 图片标题
			router: {},			// 路由
		},{   
			img: { type: 'custom', img: 'http://ryoms.v4.rongyi.com/ryoms/images/menu-icon/icon9_2.png' },			// 图片url
			title: '导航5',		// 图片标题
			router: {},			// 路由
		}
	],
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
	}
}