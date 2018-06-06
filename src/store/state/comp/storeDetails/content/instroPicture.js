/**
 * @Author: Along
 * @Date:   2018-05-30
 
 */
 
const common = require('state/common')
let { deepCopy, extend } = common

const instroPicture = extend(deepCopy(require('../../../comp/picture')), {
	data: {
		layout: {
			top:  30, 
			left: 30,
			width:40,
			height:40  
		},
		content: {
			img:    { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/5892bde0-c399-42e0-be7d-8c2c1e6dddb3.png' }	// 图片url
		},
		type:'instroPicture'
	}  
}) 

module.exports = instroPicture