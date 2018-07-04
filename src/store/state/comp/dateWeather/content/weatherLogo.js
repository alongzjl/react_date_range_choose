/**
 * @Author: Along
 * @Date:   2018-05-30
 
 */
 
const common = require('state/common')
let { deepCopy, extend } = common

const weatherLogo = extend(deepCopy(require('../../../comp/picture')), {
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