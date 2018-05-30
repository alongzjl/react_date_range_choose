/**
 * @Author: Along
 * @Date:   2018-05-30
 
 */
 
const common = require('state/common')
let { deepCopy, extend } = common

const instroButton = extend(deepCopy(require('../../../comp/button')), {
	data: {
		layout: {
			top:  30, 
			left: 467,
			height:40,
			width:40   
		}, 
		style:{
			text:{
				background: 'center no-repeat',
				backgroundSize: 'contain', 
				backgroundColor: { type: 'custom', color: '#fff' }, 
				backgroundImage:{type:'custom',img:"http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/136c4156-08c9-4d37-8ffc-da00c7b5af7b.png"},
				borderWidth:     0
			}   
		},        
		content: {  
			text: ''
		},
		type:'instroButton' 
	}  
}) 

module.exports = instroButton