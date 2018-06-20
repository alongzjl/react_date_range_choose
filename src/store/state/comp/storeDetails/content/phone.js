/**
 * @Author: Along
 * @Date:   2018-05-30
 
 */
 
const common = require('state/common')
let { deepCopy, extend } = common

const phone = extend(deepCopy(require('./address')), {
	data: { 
		layout: {
			top:  54, 
			left: 172.5,
			width:120  
		},  
		type:'phone',
		content: { 
			text: '023-64538476',
			img:    { type: 'custom', img: "http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/e49fe7db-78c7-4dc6-9abd-d2198b8b4ffb.png" }
		},
		animation: {
			className: '',	// 动画样式
			direction: '',				// 方向
			delay: 0,					// 开始时间
			duration: 1,				// 持续时间
			iterationCount: 1			// 循环次数
		}
	}
}) 

module.exports = phone