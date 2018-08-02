// 高级组件对应添加子组件
module.exports = {
	text:          { name: '文本内容', type: 'Textarea', max: 1000, placeholder: '右侧编辑内容', autosize: { minRows: 1, maxRows: 6 } },
	title:         { name: '标题',    type: 'Title',    max: 30 },
	img:           { name: '图片',    type: 'Image' },
	bind:          { name: '字段绑定', type: 'Bind' },
	video:         { name: '视频',    type: 'Video' },
	filterBGImg:   { name: '字母图片', type: 'Image' },
	filterPageImg: { name: '分页图片', type: 'Image' },
	filterPrevImg: { name: '上页图片', type: 'Image' },
	filterNextImg: { name: '下页图片', type: 'Image' },
	pageSwitch:    { name: '分页开关', type: 'Checkbox' },
	highSwitch:    { name: '高亮开关', type: 'Checkbox' },
	prevSwitch:    { name: '上页开关', type: 'Checkbox' },
	nextSwitch:    { name: '下页开关', type: 'Checkbox' },
	numberSwitch:  { name: '数字开关', type: 'Checkbox' },
	posIcon:       { name: '坐标图标', type: 'Image' },
	url:           { name: '网址',    type: 'Url' },
	split:         { name: '分隔符',  type: 'Input', min: 0, max: 5 },
	prefix:        { name: '前缀',    type: 'Input', min: 0, max: 5 },
	suffix:        { name: '后缀',    type: 'Input', min: 0, max: 5 },
	template:      { name: '模板',    type: 'Textarea', min: 0, max: 200, autosize: { minRows: 1, maxRows: 6 } },
	router:        { name: '页面跳转', type: 'Router' },
	switch:        { name: '滑动开关', type: 'Checkbox' },
	pageSwitch:    { name: '翻页开关', type: 'Checkbox' },
	size:          { name: '显示数量', type: 'Number', min: 1, max: 20 },
	file:          { name: '文档',    type: 'File' },
	showTop:       { name: '滚动高度', type: 'Number', min: 0, max: 1000 },
	direction:     { name: '方向',    type: 'Radio', option: [
		{ name: '水平', value: 'horizontal' },
		{ name: '垂直', value: 'vertical' }
	] },
	effect:        { name: '效果',    type: 'RadioMix', option: [
		{ name: '位移切换', value: 'slide' },
		{ name: '淡入', value: 'fade' },
		{ name: '方块', value: 'cube' },
		{ name: '3D流', value: 'coverflow' },
		{ name: '3D翻转', value: 'flip' }
	] },
	autoplay:      { name: '自动播放', type: 'Switch' },
	loop:          { name: '循环播放', type: 'Switch' },
	speed:         { name: '切换速度', type: 'Number', min: 0, max: 2e4, step: 100 },
	delay:         { name: '停留时长', type: 'Number', min: 0, max: 5e3, step: 100 },
	slidesPerView:  { name: '显示数量', type: 'Number', min: 1, max: 10 },
	slidesPerGroup: { name: '滚动数量', type: 'Number', min: 1, max: 10 },
	centeredSlides: { name: '居中排列', type: 'Switch' },
	spaceBetween:   { name: '图片间距', type: 'Number', min: -500, max: 500 },
	slidesOffsetBefore: { name: '左偏移量', type: 'Number', min: -1000, max: 1000 },
	swiperOptions:  { name: '轮播配置', type: 'Options' },
	// recommendGoods: { name: '推荐商品', type: 'Goods' }
}