let { authInit, deepCopy } = require('state/common')

// 轮播图
const data = {
	style:    {
		text: {
			display:        'none',
			color:          { type: 'custom', color: '#000' },
			fontSize:       12,
			fontStyle:      'normal',
			fontWeight:     'normal',
			textAlign:      'center',
			textDecoration: 'none'
		},
		swiperImage:{
			borderRadius:    {
				topLeft:     0,
				topRight:    0,
				bottomRight: 0,
				bottomLeft:  0
			}
		},
		pageSet: {
			width:  6,
			height: 6,
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#fff' },
			background: 'center no-repeat',
			backgroundSize: 'contain',
			backgroundImage: { type: 'custom', img: '' },
			backgroundColor: { type: 'high', color: '#fff' },
			borderRadius:    {
				topLeft:     10,
				topRight:    10,
				bottomLeft:  10,
				bottomRight: 10
			},
			margin: {
				top:   10,
				right: 5
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
			borderWidth: 0,
			borderStyle: 'solid',
			borderColor: { type: 'custom', color: '#a240ec' },
			background: 'center no-repeat',
			backgroundImage: { type: 'custom', img: '' },
			backgroundColor: { type: 'main', color: '#a240ec' }
		}
	},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   200
	},
	content: {
		bind: ''
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
	name: 'swiperBind',
	type: 'base',
	// 位置大小
	// 样式管理
	data: deepCopy(data),
	// 内容管理
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
		style: {
			layout: '0',	// 外观样式
			title:  '0'		// 标题样式
		},
		layout: 1,
		swiperOptions: {
			direction: 'horizontal',	// 轮播方向 vertical
			effect:'slide',				// 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
			autoplay: true,				// 播放开关
			loop : true,				// 循环
			speed: 1000,				// 切换速度
			slideOptions: {
				spaceBetween:  0,
				slidesPerView: 1,
				centeredSlides: true
			},
			autoplayOptions: {
				delay: 1000,					// 1秒切换一次
				disableOnInteraction: false,	// 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
			}
		}
	}
}