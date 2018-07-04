// 高级组件对应添加子组件
module.exports = {
	group: {
		in: {
			name: '进入类',
			list: ['pageTranZoomIn', 'pageScaleIn', 'pageTranIn']
		},
		out: {
			name: '离开类',
			list: ['pageTranZoomOut', 'pageScaleOut', 'pageTranOut']
		}
	},
	style: {
		// 进入
		pageTranZoomIn: {
			name: '平移缩放',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		pageScaleIn: {
			name: '缩放',
			list: ['ZoomIn', 'ZoomOut']
		},
		pageTranIn: {
			name: '平移',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		// 离开
		pageTranZoomOut: {
			name: '缩放平移',
			list: ['Right', 'Left', 'Bottom', 'Top']
		},
		pageScaleOut: {
			name: '缩放',
			list: ['ZoomIn', 'ZoomOut']
		},
		pageTranOut: {
			name: '平移',
			list: ['Right', 'Left', 'Bottom', 'Top']
		}
	},
	map: {
		Center:  '中间',
		Top:     '上',
		Right:   '右',
		Bottom:  '下',
		Left:    '左',
		RightTop: '右上',
		LeftTop:  '左上',
		ZoomIn:  '向内',
		ZoomOut: '向外',
		X:       'X轴',
		Y:       'Y轴',
		CW:      '顺时针',
		AW:      '逆时针'
	}
}