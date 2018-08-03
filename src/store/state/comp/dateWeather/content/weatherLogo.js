let { deepCopy, extendRmSL } = require('state/common')

const weatherLogo = extendRmSL(deepCopy(require('../../../comp/picture')), {
	data: {
		layout: {
			top:    20,
			left:   390,
			width:  130,
			height: 60
		},
		type: 'weatherLogo',
		content: {
			img: { type: 'logo', img: '' }
		}
	}
}) 

module.exports = weatherLogo