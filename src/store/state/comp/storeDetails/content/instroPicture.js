let { deepCopy, extendRmSL } = require('state/common')

const instroPicture = extendRmSL(deepCopy(require('../../../comp/picture')), {
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
		type:'instroPicture',
		animation: {
			className: '',	// 动画样式
			direction: '',				// 方向
			delay: 0,					// 开始时间
			duration: 1,				// 持续时间
			iterationCount: 1			// 循环次数
		}
	}  
}) 

module.exports = instroPicture