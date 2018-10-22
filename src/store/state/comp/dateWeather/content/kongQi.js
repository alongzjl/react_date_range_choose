let { deepCopy, extendRmSL } = require('state/common')
const kz = require('images/weather/zhiliang.svg')

const kongQi = extendRmSL(deepCopy(require('../../../comp/area')), {
	data: {
		layout: {
			top:    73, 
			left:   50,
			width:  10,
			height: 10
		},
		type:'kongQi',
		style:{
			filterBox:{
				backgroundColor: { type: 'custom', color: '#4a89dc' },
				WebkitMaskImage:`url('${kz}')`,
				opacity: 0.6
			}   
		} 
	}
})  

module.exports = kongQi