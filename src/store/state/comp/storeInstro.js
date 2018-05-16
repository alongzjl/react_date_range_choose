/**
 * @Author: Along
 * @Date:   2018-05-10
 */


const data = {
	style:     {},
	layout:    {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   400
	},
	content:   {},
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	},
	// 组件管理
	components: []
}
/*
{"name":"text","type":"base","data":{"style":{"text":{"textAlign":"center","fontSize":16,"lineHeight":26,"transformRotate":0,"fontStyle":"normal","fontWeight":"normal","textDecoration":"none","opacity":1,"textShadow":{"h_shadow":0,"v_shadow":0,"blur_dis":0,"color":{"type":"custom","color":"rgba(8,0,0,1)","alpha":100,"rgb":"#080000"}},"color":{"type":"custom","color":"#333"},"animation":"0s 0s 1"}},"layout":{"position":"absolute","top":0,"left":0,"width":120,"height":30},"content":{"text":"店铺简介","router":{}},"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"}},"styleList":{"idx":0,"list":[{"name":"样式1","img":"","data":{"style":{"text":{"textAlign":"center","fontSize":16,"lineHeight":26,"transformRotate":0,"fontStyle":"normal","fontWeight":"normal","textDecoration":"none","opacity":1,"textShadow":{"h_shadow":0,"v_shadow":0,"blur_dis":0,"color":{"type":"custom","color":"rgba(8,0,0,1)","alpha":100,"rgb":"#080000"}},"color":{"type":"custom","color":"#333"},"animation":"0s 0s 1"}},"layout":{"position":"absolute","top":0,"left":0,"width":120,"height":30},"content":{"text":"店铺简介","router":{}},"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"}}}]},"feature":{},"auth":{"style":{"text":{"textAlign":false,"fontSize":false,"lineHeight":false,"transformRotate":false,"fontStyle":false,"fontWeight":false,"textDecoration":false,"opacity":false,"textShadow":false,"color":false,"animation":false}},"content":{"text":false,"router":false},"animation":{"className":false,"delay":false,"duration":false,"iterationCount":false},"feature":{}}},
{"name":"text","type":"base","data":{"style":{"text":{"textAlign":"center","fontSize":12,"lineHeight":16,"transformRotate":0,"fontStyle":"normal","fontWeight":"normal","textDecoration":"none","opacity":1,"textShadow":{"h_shadow":0,"v_shadow":0,"blur_dis":0,"color":{"type":"custom","color":"rgba(15,1,1,1)","alpha":100,"rgb":"#0f0101"}},"color":{"type":"custom","color":"#333"},"animation":"0s 0s 1"}},"layout":{"position":"absolute","top":42,"left":11,"width":497,"height":103},"content":{"text":"店铺简介内容显示...","router":{}},"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"}},"styleList":{"idx":0,"list":[{"name":"样式1","img":"","data":{"style":{"text":{"textAlign":"center","fontSize":12,"lineHeight":16,"transformRotate":0,"fontStyle":"normal","fontWeight":"normal","textDecoration":"none","opacity":1,"textShadow":{"h_shadow":0,"v_shadow":0,"blur_dis":0,"color":{"type":"custom","color":"rgba(15,1,1,1)","alpha":100,"rgb":"#0f0101"}},"color":{"type":"custom","color":"#333"},"animation":"0s 0s 1"}},"layout":{"position":"absolute","top":42,"left":11,"width":497,"height":103},"content":{"text":"","router":{}},"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"}}}]},"feature":{},"auth":{"style":{"text":{"textAlign":false,"fontSize":false,"lineHeight":false,"transformRotate":false,"fontStyle":false,"fontWeight":false,"textDecoration":false,"opacity":false,"textShadow":false,"color":false,"animation":false}},"content":{"text":false,"router":false},"animation":{"className":false,"delay":false,"duration":false,"iterationCount":false},"feature":{}}},
{"name":"wonderfulActivity","type":"base","data":{"style":{"text":{"color":{"type":"custom","color":"#fff"},"fontSize":12,"fontStyle":"normal","fontWeight":"normal","textAlign":"center","textDecoration":"none"},"swiperImage":{"borderRadius":{"topLeft":16,"topRight":16,"bottomRight":16,"bottomLeft":16}}},"layout":{"position":"absolute","top":132,"left":-2,"width":540,"height":200},"content":[],"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"},"components":[]},"styleList":{"idx":0,"list":[{"name":"样式1","img":"","data":{"style":{"text":{"color":{"type":"custom","color":"#fff"},"fontSize":12,"fontStyle":"normal","fontWeight":"normal","textAlign":"center","textDecoration":"none"},"swiperImage":{"borderRadius":{"topLeft":16,"topRight":16,"bottomRight":16,"bottomLeft":16}}},"layout":{"position":"absolute","top":132,"left":-2,"width":540,"height":200},"content":[],"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"},"components":[]}}]},"feature":{"style":{"layout":"0","title":"0"},"layout":1,"swiperOptions":{"direction":"horizontal","autoplay":true,"loop":true,"speed":1000,"spaceBetween":70,"slidesPerView":2,"centeredSlides":true,"effect":"slide","autoplayOptions":{"delay":1000,"stopOnLastSlide":false,"disableOnInteraction":false,"reverseDirection":false},"pagination":true,"paginationOptions":{"el":".swiper-pagination","type":"bullets","progressbarOpposite":true,"dynamicBullets":false,"dynamicMainBullets":2,"hideOnClick":false,"clickable":false}},"list":[{"title":"促销图文","url":"http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png"}]},"auth":{"style":{"text":{"color":false,"fontSize":false,"fontStyle":false,"fontWeight":false,"textAlign":false,"textDecoration":false},"swiperImage":{"borderRadius":false}},"content":[],"animation":{"className":false,"delay":false,"duration":false,"iterationCount":false},"feature":{"style":false,"layout":false,"swiperOptions":false}}}
*/
module.exports = {  
	name: 'storeInstro', 
	type: 'advanced',
	// 样式管理
	data: JSON.parse(JSON.stringify(data)),
	styleList: {
		idx:  0,
		list: [{
			name: '样式1',
			img:  '',
			data: JSON.parse(JSON.stringify(data))
		}]
	}, 
	// 功能特性
	feature: {
		
	}
}
