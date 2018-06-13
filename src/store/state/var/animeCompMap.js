// 高级组件对应添加子组件
module.exports = {
	group: [
		{
			name: '进入类',
			list: ['fadeIn', 'bounceIn', 'translateIn', 'rotateIn', 'lightSpeedIn', 'zoomIn', 'pullIn', 'rollIn', 'scaleIn', 'flipIn']
		},
		{
			name: '提醒类',
			list: ['swingPoint', 'jumpPoint', 'rotatePoint', 'fadePoint', 'flashPoint', 'shakePoint', 'tadaPoint', 'flipPoint', 'jellyPoint']
		},
		{
			name: '离开类',
			list: ['fadeOut', 'bounceOut', 'translateOut', 'lightSpeedOut', 'rollOut', 'scaleOut', 'flipOut', 'hingeOut']
		}
	],
	style: {
		// 进入
		fadeIn: {
			name: '淡入',
			list: ['Center', 'Left', 'Right', 'Top', 'Bottom']
		},
		bounceIn: {
			name: '弹入',
			list: ['Center', 'Left', 'Right', 'Top', 'Bottom']
		},
		translateIn: {
			name: '平移',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		rotateIn: {
			name: '旋转',
			list: ['Center', 'Left', 'Right', 'RightTop', 'LeftTop']
		},
		lightSpeedIn: {
			name: '光速',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		zoomIn: {
			name: '飞入',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		pullIn: {
			name: '展开',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		rollIn: {
			name: '翻滚',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		scaleIn: {
			name: '缩放',
			list: ['ZoomIn', 'ZoomOut', 'X', 'Y']
		},
		flipIn: {
			name: '翻转',
			list: ['X', 'Y']
		},
		// 离开
		fadeOut: {
			name: '淡出',
			list: ['Center', 'Left', 'Right', 'Top', 'Bottom']
		},
		bounceOut: {
			name: '弹出',
			list: ['Center', 'Left', 'Right', 'Top', 'Bottom']
		},
		translateOut: {
			name: '移出',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		lightSpeedOut: {
			name: '光速',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		rollOut: {
			name: '翻滚',
			list: ['Left', 'Right', 'Top', 'Bottom']
		},
		scaleOut: {
			name: '缩放',
			list: ['ZoomIn', 'ZoomOut', 'X', 'Y']
		},
		flipOut: {
			name: '翻转',
			list: ['X', 'Y']
		},
		hingeOut: {
			name: '脱落',
			list: ['Left', 'Right']
		},
		// 提醒
		swingPoint:  { name: '摇动'   },
		jumpPoint:   { name: '跳动'   },
		rotatePoint: {
			name: '旋转',
			list: ['CW', 'AW']
		},
		fadePoint:   { name: '呼吸灯' },
		flashPoint:  { name: '闪动'   },
		shakePoint:  { name: '抖动'   },
		tadaPoint:   { name: '乱抖动' },
		flipPoint:   { name: '翻转'   },
		jellyPoint:  { name: '果冻'   }
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