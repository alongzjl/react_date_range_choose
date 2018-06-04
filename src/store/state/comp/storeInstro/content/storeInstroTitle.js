/**
 * @Author: Along
 * @Date:   2018-05-30
 
 */
 
const common = require('state/common')
let { deepCopy, extend } = common

const storeInstroTitle = extend(deepCopy(require('../../../comp/text')), {
	data: {
		layout: {
			top:  12, 
			left: 40,
			width:100   
		}, 
		style:{
			text:{
				textAlign:'left'
			}
		},    
		type:'storeInstroTitle',   
		content: {
			text: '店铺介绍'
		} 
	}  
})

module.exports = storeInstroTitle