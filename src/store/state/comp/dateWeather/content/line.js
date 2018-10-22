let { deepCopy, extendRmSL } = require('state/common')

const line = extendRmSL(deepCopy(require('../../../comp/area')), {
	data: {
		layout: {
			top:    32, 
			left:   156, 
			width:  1,
			height: 28.5
		},
		type:'line', 
		style:{
			filterBox:{
				backgroundColor: { type: 'custom', color: '#ACACAC' }
			}    
		} 
	}
})  

module.exports = line