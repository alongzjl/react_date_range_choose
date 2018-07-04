/**
 * @Author: Along
 * @Date:   2018-05-30
 
 */
 
const common = require('state/common')
let { deepCopy, extend } = common

const storeWonderful = extend(deepCopy(require('../../../comp/wonderfulActivity')), {
	data: {
		layout: {
			top:  170,
			left: 0,  
			width: 540, 
			height:216
		},
		style:{
			swiperImage: {
				borderRadius:{
					topLeft:     0,
					topRight:    0,
					bottomRight: 0,
					bottomLeft:  0
				}
			}
		},
		content: {
			list: [
				{
					img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/de750143-1462-46c2-b5ea-cfe407cac3fd.png' },
					title: '图片1',		// 图片标题
					router: {}			// 路由
				},
				{
					img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/5e541d36-c094-4acc-bb3f-4b40d745e369.png' },
					title: '图片2',		// 图片标题
					router: {}			// 路由
				},
				{
					img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/78d75e81-40af-4eda-814f-a03c266417dc.png' },
					title: '图片3',		// 图片标题
					router: {}			// 路由
				},
				{
					img: { type: 'custom', img: 'http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/9d5a73db-8a29-48c6-8bc2-bc456bf7ad0c.png' },
					title: '图片4',		// 图片标题
					router: {}			// 路由
				}
			]
		},
		type:'storeWonderful',
		animation: {
			className: '',	// 动画样式
			direction: '',				// 方向
			delay: 0,					// 开始时间
			duration: 1,				// 持续时间
			iterationCount: 1			// 循环次数
		}
	},
	feature:{
		swiperOptions:{
			slideOptions:{
				spaceBetween: 10,
				slidesPerView: 2,
				centeredSlides: true
			}
		}
	}
})

module.exports = storeWonderful