let { authInit, deepCopy, extendRmSL } = require('state/common')
const a = authInit(require('state/comp/area'))
const p = authInit(require('state/comp/picture'))
const t = authInit(require('state/comp/text'))

const Name = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  0,
			width:  60,
			height: 24
		},
		style: {
			text: {
				lineHeight:      24,
				backgroundColor: { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 },
				borderWidth: 0,
				borderStyle:     'solid',
				borderColor: 	 { type: 'custom', color: 'rgba(0, 0, 0, 0)', rgb: '#000', alpha: 0 },
				borderRadius:    {
					topLeft:     20,
					topRight:    20,
					bottomRight: 20,
					bottomLeft:  20
				},
				color:           { type: 'custom', color: '#666' }
			}
		},
		content: {
			text: '全部'
		}
	}
})
const NameAV = extendRmSL(deepCopy(t), {
	data: {
		layout: {
			top:  0,
			width:  60,
			height: 24
		},
		style: {
			text: {
				lineHeight:      20,
				backgroundColor: { type: 'main', color: '#a240ec' },
				borderWidth: 2,
				borderStyle: 'solid',
				borderColor: { type: 'auxiliary', color: '#a240ec' },
				borderRadius:    {
					topLeft:     20,
					topRight:    20,
					bottomRight: 20,
					bottomLeft:  20
				},
				color: { type: 'textHigh', color: '#fff' },
			}
		},
		content: {
			text: '全部'
		}
	},
	feature: { active: true }
})


// 字母排序
const data = {
	layout: {
		position: 'absolute',
		top:  0,
		left: 0,
		width:  60,
		height: 24
	},
	style: {
		filterBox: {
			borderWidth:  0,
			borderStyle: 'solid',
			borderColor: { type: 'main', color: '#fff' },
			backgroundColor: { type: 'custom', color: 'rgba(255, 255, 255, 0)', rgb: '#fff', alpha: 0 },
			padding: {
				top:    0,
				right:  0,
				bottom: 0,
				left:   0
			},
			borderRadius: {
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
				color: { type: 'custom', color: '#000' }
			}
		}
	},
	componentLayout: [ Name, NameAV ],
	content: {
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
	name: 'resetByStore2',
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