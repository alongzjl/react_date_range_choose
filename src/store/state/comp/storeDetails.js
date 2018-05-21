/**
 * @Author: Along
 * @Date:   2018-05-10
 */

const common = require('state/common')
let { authInit, deepCopy, extend, styleIdxChange } = common
const name  = authInit(require('./text'))
const picture  = authInit(require('./picture'))
const a  = authInit(require('./address'))
const b  = authInit(require('./button'))


const n = extend(deepCopy(name), {
	data: {
		layout: {
			top:  30, 
			left: 87.5  
		}, 
		style:{
			text:{
				textAlign:'left'
			}
		},   
		content: {
			text: '优衣库/UNIQLO'
		} 
	}
}) 

const logo = extend(deepCopy(picture), {
	data: {
		layout: {
			top:  30, 
			left: 30,
			width:40,
			height:40  
		},
		content: {
			img:    { type: 'custom', img: "http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/5892bde0-c399-42e0-be7d-8c2c1e6dddb3.png" }	// 图片url
		} 
	} 
})
const address = extend(deepCopy(a), {
	data: {
		layout: {
			top:  54,  
			left: 87.5  
		}, 
		style:{
			text:{
				textAlign:'left'
			},
			image:{
				margin: {  
					top:     0, 
					right:   5, 
					bottom:  0,
					left:    0,
				} 
			} 
		},  
		content: {
			text: 'L2  2817',
			img:{type:'custom',img:'http://rongyi.b0.upaiyun.com/commodity/text/201805191128322385.png'}
		}  
	}  
}) 
const phone = extend(deepCopy(a), {
	data: {
		layout: {
			top:  54, 
			left: 172.5  
		},  
		style:{
			text:{
				textAlign:'left'
			},
			image:{ 
				margin: {   
					top:     0, 
					right:   5,  
					bottom:  0,
					left:    0,
				} 
			} 
		},
		content: {
			text: '023-64538476',
			img:    { type: 'custom', img: "http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/e49fe7db-78c7-4dc6-9abd-d2198b8b4ffb.png" }
		}  
	}  
})   
const button = extend(deepCopy(b), {
	data: {
		layout: {
			top:  30, 
			left: 467,
			height:40,
			width:40   
		}, 
		style:{
			text:{
				background: 'center no-repeat',
				backgroundSize: 'contain', 
				backgroundColor: { type: 'custom', color: '#fff' }, 
				backgroundImage:{type:'custom',img:"http://rongyi.b0.upaiyun.com/system/mcp/DEV/app/upload/136c4156-08c9-4d37-8ffc-da00c7b5af7b.png"},
				borderWidth:     0
			}   
		},        
		content: { 
			text: ''
		} 
	}
})


const data = {
	style:     {},
	layout:    {
		position: 'absolute',
		top:      0,
		left:     0,
		width:    540,
		height:   120
	},
	content:   {},
	animation: {
		className: '',	// 动画样式
		delay: 1,					// 开始时间
		duration: 1,				// 持续时间
		iterationCount: 'infinite'	// 循环次数
	},
	// 组件管理
	components: [button,phone,address,n,logo] 
}

module.exports = {  
	name: 'storeDetails',
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
