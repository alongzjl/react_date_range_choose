const common = require('state/common')
let { authInit, deepCopy, extend } = common

// 时间日期
const data = {
	style:     {
		text: {
			textAlign:    'center',
			fontSize:     32, 
			lineHeight:   36,
			fontStyle:    'normal',
			fontWeight:   'normal',
			opacity:      1,
			textShadow:   {
				h_shadow: 0,
				v_shadow: 0,
				blur_dis: 0,
				color:    { type: 'custom', color: '#f58f8f' }
			},
			color:        { type: 'custom', color: '#333' }
		},
		split: {
			fontSize:     24, 
			lineHeight:   24,
			fontStyle:    'normal',
			fontWeight:   'normal',
			opacity:      1,
			textShadow:   {
				h_shadow: 0,
				v_shadow: 0,
				blur_dis: 0,
				color:    { type: 'custom', color: '#f58f8f' }
			},
			color:        { type: 'custom', color: '#333' }
		}
	},
	layout: {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    120,
		height:   40
	},
	content: {
		split: ':'
	},
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	}
}

const data2 = extend(deepCopy(data), {
	content: { split: '-' }
})

// 年月日
const data3 = deepCopy(data)
delete data3.content.split

// 星期
const data4 = deepCopy(data)
data4.content.prefix = '星期'
delete data4.content.split
delete data4.style.split

// 自定义
const data5 = deepCopy(data)
delete data5.content.split
data5.content.template = '今天是 {yyyy}年{mm}月{dd}日 {hh}点{nn}分{ss}秒'

module.exports = {
	name: 'time',
	type: 'base',
	// 位置大小
	// 样式管理
	data: deepCopy(data),
	// 内容管理
	// 样式列表
	styleList: {
		idx:  0,
		list: [{
			name:  'HH:MM:SS',
			img:   '',
			data:  deepCopy(data)
		}, {
			name:  'HH:MM',
			img:   '',
			data:  deepCopy(data)
		}, {
			name:  'YYYY-MM-DD',
			img:   '',
			data:  deepCopy(data2)
		}, {
			name:  'YYYY年MM月DD日',
			img:   '',
			data:  deepCopy(data3)
		}, {
			name:  '星期',
			img:   '',
			data:  deepCopy(data4)
		}, {
			name:  '自定义',
			img:   '',
			data:  deepCopy(data5)
		}] 
	},
	// 功能特性
	feature: {
	}
}