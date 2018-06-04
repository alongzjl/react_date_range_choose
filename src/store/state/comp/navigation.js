/**
 * @Author: Along
 * @Date:   2018-05-05
 
 */
 

// 导航
const data = {
	style:     {
		filterBox: {
			backgroundColor: { type: 'custom', color: '#fff' },
			padding: {
				top:     0,
				right:   26,
				bottom:  0,
				left:    26,
			}
		},
		filter:{
			width:  110,
			height: 136,
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'auxiliary', color: '#fff' },
			borderRadius:    {
				topLeft:     0,
				topRight:    0,
				bottomLeft:  0,
				bottomRight: 0
			},
			margin: {
				top:     0,
				right:   26,
				bottom:  40,
				left:    26,
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
			}, 
		}
	},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   330
	},
	content: [
		{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291307551679.png' },
			title: '导航1',		// 图片标题
			router: {},			// 路由
		},
		{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291307552591.png' },
			title: '导航2',		// 图片标题
			router: {},			// 路由
		},
		{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291307553698.png' },
			title: '导航3',		// 图片标题
			router: {},			// 路由
		},
		{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291307554460.png' },
			title: '导航4',		// 图片标题
			router: {},			// 路由
		},{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291307555477.png' },
			title: '导航5',		// 图片标题
			router: {},			// 路由
		},
		{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805291307556478.png' },
			title: '导航6',		// 图片标题
			router: {},			// 路由
		}
	],
	// 动画设置
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite',	// 循环次数
	}
}

module.exports = {
	name: 'navigation',
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