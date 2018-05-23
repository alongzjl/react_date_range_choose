/**
 * @Author: Along
 * @Date:   2018-05-05
 
 */
 

// 导航
const data = {
	style:     {
		filter: {
			width:  35,
			height: 35,
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
		filterActive: {
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'auxiliary', color: '#fff' },
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color:      { type: 'custom', color: '#000' }
			},
			transform:      { scale: 1.1 }
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
		width:    60,
		height:   400
	},
	content: [
		{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805231505013287.png' },
			title: '导航1',		// 图片标题
			highSwitch: false,
			router: {},			// 路由
		},
		{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805231505049273.png' },
			title: '导航2',		// 图片标题
			highSwitch: false,
			router: {},			// 路由
		},
		{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805231505123352.png' },
			title: '导航3',		// 图片标题
			highSwitch: false,
			router: {},			// 路由
		}, 
		{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805231505124540.png' },
			title: '导航4',		// 图片标题
			highSwitch: false,
			router: {},			// 路由
		},{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805231505125551.png' },
			title: '导航5',		// 图片标题
			highSwitch: false,
			router: {},			// 路由
		},
		{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805231505126509.png' },
			title: '导航6',		// 图片标题
			highSwitch: false,
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