let { deepCopy, extendRmSL } = require('state/common')
const f = require('images/weather/feng.svg')

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
				WebkitMaskImage:`url('${f}')`,
				opacity: 0.6
			}    
		}  
	}
}) 

module.exports = feng