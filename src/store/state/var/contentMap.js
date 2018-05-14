// 高级组件对应添加子组件
module.exports = {
	text:          { name: '文本内容', type: 'Textarea', max: 1000, autosize: { minRows: 1, maxRows: 6 } },
	title:         { name: '标题',    type: 'Title',    max: 30 },
	img:           { name: '图片',    type: 'Image' },
	filterBGImg:   { name: '字母图片', type: 'Image' },
	filterPageImg: { name: '分页图片', type: 'Image' },
	filterPrevImg: { name: '上页图片', type: 'Image' },
	filterNextImg: { name: '下页图片', type: 'Image' },
	pageSwitch:    { name: '分页开关', type: 'Checkbox' },
	prevSwitch:    { name: '上页开关', type: 'Checkbox' },
	nextSwitch:    { name: '下页开关', type: 'Checkbox' },
	numberSwitch:  { name: '数字开关', type: 'Checkbox' },
	posIcon:       { name: '坐标图标', type: 'Image' },
	url:           { name: '网址',    type: 'Url' },
	router:        { name: '页面跳转', type: 'Router' },
	size:          { name: '商品数量', type: 'Number', min: 1, max: 50 }
}