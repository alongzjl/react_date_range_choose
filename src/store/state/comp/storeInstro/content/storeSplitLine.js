/**
 * @Author: Along
 * @Date:   2018-05-30
 
 */
 
const common = require('state/common')
let { deepCopy, extend } = common

const storeSplitLine = extend(deepCopy(require('../../../comp/splitLine')), {
	data: {
		layout: {
			top:  5,
			left: 30,
			width:50 
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
		 },
		 type:'storeSplitLine',
		 animation: {
			className: '',	// 动画样式
			direction: '',				// 方向
			delay: 0,					// 开始时间
			duration: 1,				// 持续时间
			iterationCount: 1			// 循环次数
		}
	}  
})

module.exports = storeSplitLine