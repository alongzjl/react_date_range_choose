let { deepCopy, extendRmSL } = require('state/common')

const feng = extendRmSL(deepCopy(require('../../../comp/area')), {
	data: {
		layout: {
			top:    73, 
			left:   305,
			width:  10, 
			height: 10
		},
		type:'feng',
		style:{
			filterBox:{
				backgroundColor: { type: 'custom', color: '#4a89dc' },
				WebkitMaskImage:`url('http://rongyi.b0.upaiyun.com/wd/other/store_other/2018/images/feng.svg')`,
				opacity: 0.6
			}    
		}  
	}
}) 

module.exports = feng