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
				topLeft:     6,
				topRight:    6,
				bottomRight: 6,
				bottomLeft:  6
			},
		}
	},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   200
	},
	content: [
		{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805231506216176.jpg' },
			title: '图片1',		// 图片标题
			router: {}			// 路由
		},
		{
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805231506213816.jpg' },
			title: '图片2',		// 图片标题
			router: {}			// 路由
		},
		{   
			img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/commodity/text/201805231506215219.jpg' },
			title: '图片3',		// 图片标题
			router: {}			// 路由
		}
	],
	animation: {
		className: '',	// 动画样式
		direction: '',				// 方向
		delay: 0,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 1			// 循环次数
	}
}

module.exports = {
	name: 'swiperImage',
	type: 'base',
	// 位置大小
	// 样式管理
	data: JSON.parse(JSON.stringify(data)),
	// 内容管理
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
		style: {
			layout: '0',	// 外观样式
			title:  '0'		// 标题样式
		},
		layout: 1,
		swiperOptions: {
			direction: 'horizontal',//轮播方向 vertical
			effect:'slide',// 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
			autoplay: true,// 播放开关
			loop : true,//循环
			speed: 1000,	// 切换速度
			slideOptions:{
				spaceBetween:0,
				slidesPerView:1,
				centeredSlides:true,
			},
			autoplayOptions: {
			delay: 1000,//1秒切换一次
			//stopOnLastSlide: false,//如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）。
			disableOnInteraction: false,//用户操作swiper之后，是否禁止autoplay。默认为true：停止。
			//reverseDirection: false,//开启反向自动轮播。
			},
			//pagination:false, 
			//paginationOptions:{
				//el: '.swiper-pagination',//分页元素
				//type: 'bullets',          //类型 ‘fraction’  分式 ‘progressbar’  进度条
				//progressbarOpposite: true,//使进度条分页器与Swiper的direction参数相反，
				//dynamicBullets:false,       //动态隐藏
				//dynamicMainBullets: 2, //动态分页器的主指示点的数量
				//hideOnClick :true,//默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
				///clickable :true,  //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。

			//}
		}
	}
}