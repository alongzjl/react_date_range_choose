/**
 * @Author: Along
 * @Date:   2018-05-05
 
 */
 

// 导航
const data = {
	style:     {
		filter:{
			width:  60,
			height: 60,
			borderWidth:  1,
			borderStyle: 'solid',
			borderColor: { type: 'auxiliary', color: '#fff' },
			borderRadius:    {
				topLeft:     20,
				topRight:    20,
				bottomLeft:  20,
				bottomRight: 20
			},
			margin: {
				top:     0,
				right:   0,
				bottom:  5,
				left:    0,
			},
			padding: {
				top:     0,
				right:   0,
				bottom:  0,
				left:    0,
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color:      { type: 'custom', color: '#000' }
			}
		},
		text: {
			display:        'none',
			fontSize:       12,
			fontStyle:      'normal',
			fontWeight:     'normal',
			textAlign:      'center',
			textDecoration: 'none',
			color:          { type: 'custom', color: '#000' },
			margin: {
				top:     0,
				right:   0,
				bottom:  5,
				left:    0,
			}
		}
	},
	layout: {
		position: 'absolute',
		top:      220,
		left:     0,
		width:    80,
		height:   400
	},
	content: [
		{
			img: { type: 'custom', img: require('compEdit/EditElement/images/navigationFloat_1.png') },
			title: '导航1',		// 图片标题
			router: {},			// 路由
		},
		{
			img: { type: 'custom', img: require('compEdit/EditElement/images/navigationFloat_2.png') },
			title: '导航2',		// 图片标题
			router: {},			// 路由
		},
		{
			img: { type: 'custom', img: require('compEdit/EditElement/images/navigationFloat_3.png') },
			title: '导航3',		// 图片标题
			router: {},			// 路由
		}, 
		{
			img: { type: 'custom', img: require('compEdit/EditElement/images/navigationFloat_4.png') },
			title: '导航4',		// 图片标题
			router: {},			// 路由
		},{
			img: { type: 'custom', img: require('compEdit/EditElement/images/navigationFloat_5.png') },
			title: '导航5',		// 图片标题
			router: {},			// 路由
		},
		{
			img: { type: 'custom', img: require('compEdit/EditElement/images/navigationFloat_6.png') },
			title: '导航6',		// 图片标题
			router: {},			// 路由
		}
	],
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite',	// 循环次数
	}
}

module.exports = {
	name: 'navigationFloat',
	type: 'base',
	// 位置大小
	// 样式管理
	data: JSON.parse(JSON.stringify(data)),
	//布局方式的选择
	layout:{
		type:1,
		position:'left'
	},
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
	}
}