const common = require('state/common')
let { authInit, deepCopy } = common
const picture = authInit(require('./picture'))
const time    = authInit(require('./time'))
const weather = authInit(require('./weather'))
// 店铺列表
const data = {
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   100
	},
	style: {
	},
	content: {
	},
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	},
	components: [
		time,
		weather
	]
}

module.exports = {
	name: 'dateWeather',
	type: 'advanced',
	data: deepCopy(data),
	// 动画设置
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: deepCopy(data)
		}]
	},
	// 功能特性
	feature: {
	}
}