/**
 * @Author: Along
 * @Date:   2018-05-10
 */
const common = require('state/common')
let { authInit, deepCopy, extend, styleIdxChange } = common
const t  = authInit(require('./text'))
const w  = authInit(require('./wonderfulActivity'))
const s  = authInit(require('./splitLine'))

const splitLine = extend(deepCopy(s), {
	data: {
		layout: {
			top:  5,
			left: 30
		}, 
		 style:{
		 	line:{
		 		height: 12,  
			 	width:0,  
				borderLeft: {
					width: 2,  
					style: 'solid',
					color: { type: 'custom', color: '#CFAD81' }
				}  
		 	} 
		 }
	} 
})

const title = extend(deepCopy(t), {
	data: {
		layout: {
			top:  12, 
			left: 40  
		}, 
		style:{
			text:{
				textAlign:'left'
			}
		},   
		content: {
			text: '店铺介绍'
		} 
	}
})
const instroduce = extend(deepCopy(t), {
	data: {
		layout: {
			top:  60,
			left: 30,
			width: 480,
			height:111
		},
		content:{
			text:'    UNIQLO（日文假名发音：ユニクロ），日本服装品牌，由日本迅销公司建立于1963年，当年是一家销售西服的小服装店，现已成为国际知名服装品牌。优衣库现任董事长兼总经理柳井正在日本首次引进了大卖场式的服装销售方式，通过独特的商品策划、开发和销售体系来实现店铺运作的低成本化，由此引发了优衣库的'
		}
	}
})    
const imagList = extend(deepCopy(w), {
	data: {
		layout: {
			top:  170,
			left: 30,  
			width: 480, 
			height:286 
		} 
	},
	feature:{
		swiperOptions:{
			slideOptions:{
				spaceBetween:25, 
				slidesPerView:2,  
				centeredSlides:true,
			},
		}
	}
})
 
const data = {
	style:     {},
	layout:    {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   500 
	},  
	content:   {},
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	},
	// 组件管理  
	components: [title,instroduce,imagList,splitLine]
}

module.exports = {  
	name: 'storeInstro', 
	type: 'advanced',
	// 样式管理
	data: JSON.parse(JSON.stringify(data)),
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
		
	}
}
