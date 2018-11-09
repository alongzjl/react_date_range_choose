let { deepCopy, extendRmSL } = require('state/common')

const shiDu = extendRmSL(deepCopy(require('../../../comp/area')), {
	data: {
		layout: {
			top:    20,
			left:   390,
			width:  130,
			height: 60
		},
		type: 'shiDu',
		style:{
			filterBox:{
				backgroundColor: { type: 'custom', color: '#4a89dc' },
				opacity: 0.6,
				WebkitMaskImage:`url('http://rongyi.b0.upaiyun.com/wd/other/store_other/2018/images/shidu.svg')` 
			}    
		}  
	}
})  

module.exports = shiDu