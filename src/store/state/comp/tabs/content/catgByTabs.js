const common = require('state/common')
let { authInit, deepCopy, extend, styleIdxChange } = common
const p  = authInit(require('../../picture'))
const pb = authInit(require('../../pictureBind'))
const t  = authInit(require('../../text'))
const tb = authInit(require('../../textBind'))

const gPic = extend(deepCopy(pb), {
	data: {
		layout: {
			top:  12,
			left: 12,
			width:  152,
			height: 152
		},
		content: {
			bind: 'pic'
		}
	}
})
const gName = extend(deepCopy(tb), {
	data: {
		layout: {
			top:  166,
			left: 12,
			width:  152,
			height: 36
		},
		content: {
			bind: 'name'
		},
		style: {
			text: {
				textAlign: 'left',
				color: { type: 'custom', color: '#666' }
			}
		}
	}
})

// 字母排序
const data = {
	layout: {
		position: 'absolute',
		top:  10,
		left: 5,
		width:  535,
		height: 540
	},
	style: {
		filterBox: {
			width:  100,
			height: 100,
			borderWidth: 0,
			borderStyle: 'solid',
			borderColor: { type: 'main', color: '#fff' },
			backgroundColor: { type: 'custom', color: '#fff' },
			margin: {
				top:     0,
				right:   4,
				bottom:  4,
				left:    0,
			},
			borderRadius:    {
				topLeft:     0,
				topRight:    0,
				bottomLeft:  0,
				bottomRight: 0
			},
			boxShadow: {
				h_shadow:   0,
				v_shadow:   0,
				blur_dis:   0,
				spread_dis: 0,
				color:      { type: 'custom', color: '#000' }
			}
		}
	},
	componentLayout: [ gPic, gName ],
	content: {
		tabs: []
	},
	animation: {
		className: '',		// 动画样式
		direction: '',		// 方向
		delay: 0,			// 开始时间
		duration: 1,		// 持续时间
		iterationCount: 1	// 循环次数
	}
}

module.exports = {
	name: 'catgByTabs',
	type: 'layout',
	// 位置大小
	data: deepCopy(data),
	// 样式列表
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