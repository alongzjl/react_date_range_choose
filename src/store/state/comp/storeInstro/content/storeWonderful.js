/**
 * @Author: Along
 * @Date:   2018-05-30
 
 */
 
const common = require('state/common')
let { deepCopy, extend } = common

const storeWonderful = extend(deepCopy(require('../../../comp/wonderfulActivity')), {
	data: {
		layout: {
			top:  170,
			left: 30,  
			width: 480, 
			height:286 
		},
		type:'storeWonderful' 
	}, 
	feature:{ 
		swiperOptions:{
			slideOptions:{
				spaceBetween: 25,
				slidesPerView: 2,
				centeredSlides: true
			}
		} 
	}
})

module.exports = storeWonderful