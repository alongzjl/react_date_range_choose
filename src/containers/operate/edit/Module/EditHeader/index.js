/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-19T14:29:30+08:00
 */

import React from 'react'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

const comp     = require('state/comp')
const compList = require('state/compList')

import * as actions from 'actions'

import { Icon, message } from 'antd'
 
class Header extends React.Component {
	componentWillMount() {
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	} 

	addComp(item) { 
		let { actions, editConfig } = this.props
		let { curComp, curData } = editConfig
		let { parentComp } = curData
		if (curComp.type === 'advanced' || parentComp) {
			let compData = JSON.parse(JSON.stringify(comp[item.key]))
			let Comp = parentComp || curComp
			if (compData.type === 'base') {
				Comp.data.components.push(compData)
				actions.updateComp(null, Comp)
			} else {
				message.info('高级组件内只能添加基础组件!')
			}
		} else {
			actions.addComp(editConfig.curData.router, item.key)
		}   
		if(item.key == 'storeDetails'){
			let compData_title = JSON.parse(JSON.stringify({"name":"text","type":"base","data":{"style":{"text":{"textAlign":"center","fontSize":14,"lineHeight":27,"fontStyle":"normal","fontWeight":"normal","textDecoration":"none","transform":"","opacity":1,"textShadow":{"h_shadow":0,"v_shadow":0,"blur_dis":0,"color":{"type":"custom","color":"rgba(10,0,0,1)","alpha":100,"rgb":"#0a0000"}},"color":{"type":"custom","color":"rgba(10,0,0,1)","alpha":100,"rgb":"#0a0000"},"animation":"0s 0s 1"}},"layout":{"position":"absolute","top":2,"left":3,"width":120,"height":30},"content":{"text":"店铺介绍","router":{}},"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"}},"styleList":{"idx":0,"list":[{"name":"样式1","img":"","data":{"style":{"text":{"textAlign":"center","fontSize":14,"lineHeight":27,"fontStyle":"normal","fontWeight":"normal","textDecoration":"none","transform":"","opacity":1,"textShadow":{"h_shadow":0,"v_shadow":0,"blur_dis":0,"color":{"type":"custom","color":"rgba(10,0,0,1)","alpha":100,"rgb":"#0a0000"}},"color":{"type":"custom","color":"rgba(10,0,0,1)","alpha":100,"rgb":"#0a0000"},"animation":"0s 0s 1"}},"layout":{"position":"absolute","top":2,"left":3,"width":120,"height":30},"content":{"text":"店铺介绍","router":{}},"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"}}},{"name":"样式2","img":"","data":{"style":{"text":{"textAlign":"center","fontSize":12,"lineHeight":16,"fontStyle":"normal","fontWeight":"normal","textDecoration":"none","transform":"","opacity":1,"textShadow":{"h_shadow":0,"v_shadow":0,"blur_dis":0,"color":{"type":"custom","color":"#f58f8f"}},"color":{"type":"custom","color":"#333"},"animation":"0s 0s 1"}},"layout":{"position":"absolute","top":0,"left":0,"width":120,"height":30},"content":{"text":"右侧编辑文字","router":{}},"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"}}},{"name":"样式3","img":"","data":{"style":{"text":{"textAlign":"center","fontSize":12,"lineHeight":16,"fontStyle":"normal","fontWeight":"normal","textDecoration":"none","transform":"","opacity":1,"textShadow":{"h_shadow":0,"v_shadow":0,"blur_dis":0,"color":{"type":"custom","color":"#f58f8f"}},"color":{"type":"custom","color":"#333"},"animation":"0s 0s 1"}},"layout":{"position":"absolute","top":0,"left":0,"width":120,"height":30},"content":{"text":"右侧编辑文字","router":{}},"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"}}}]},"feature":{},"auth":{"style":{"text":{"textAlign":false,"fontSize":false,"lineHeight":false,"fontStyle":false,"fontWeight":false,"textDecoration":false,"transform":false,"opacity":false,"textShadow":false,"color":false,"animation":false}},"content":{"text":false,"router":false},"animation":{"className":false,"delay":false,"duration":false,"iterationCount":false},"feature":{}}}))
			let compData_content = JSON.parse(JSON.stringify({"name":"text","type":"base","data":{"style":{"text":{"textAlign":"center","fontSize":12,"lineHeight":27,"fontStyle":"normal","fontWeight":"normal","textDecoration":"none","transform":"","opacity":1,"textShadow":{"h_shadow":0,"v_shadow":0,"blur_dis":0,"color":{"type":"custom","color":"rgba(10,0,0,1)","alpha":100,"rgb":"#0a0000"}},"color":{"type":"custom","color":"rgba(10,0,0,1)","alpha":100,"rgb":"#0a0000"},"animation":"0s 0s 1"}},"layout":{"position":"absolute","top":52,"left":0,"width":432,"height":81},"content":{"text":"店铺介绍","router":{}},"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"}},"styleList":{"idx":0,"list":[{"name":"样式1","img":"","data":{"style":{"text":{"textAlign":"center","fontSize":12,"lineHeight":27,"fontStyle":"normal","fontWeight":"normal","textDecoration":"none","transform":"","opacity":1,"textShadow":{"h_shadow":0,"v_shadow":0,"blur_dis":0,"color":{"type":"custom","color":"rgba(10,0,0,1)","alpha":100,"rgb":"#0a0000"}},"color":{"type":"custom","color":"rgba(10,0,0,1)","alpha":100,"rgb":"#0a0000"},"animation":"0s 0s 1"}},"layout":{"position":"absolute","top":52,"left":3,"width":482,"height":81},"content":{"text":"店铺介绍","router":{}},"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"}}},{"name":"样式2","img":"","data":{"style":{"text":{"textAlign":"center","fontSize":12,"lineHeight":16,"fontStyle":"normal","fontWeight":"normal","textDecoration":"none","transform":"","opacity":1,"textShadow":{"h_shadow":0,"v_shadow":0,"blur_dis":0,"color":{"type":"custom","color":"#f58f8f"}},"color":{"type":"custom","color":"#333"},"animation":"0s 0s 1"}},"layout":{"position":"absolute","top":0,"left":0,"width":120,"height":30},"content":{"text":"右侧编辑文字","router":{}},"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"}}},{"name":"样式3","img":"","data":{"style":{"text":{"textAlign":"center","fontSize":12,"lineHeight":16,"fontStyle":"normal","fontWeight":"normal","textDecoration":"none","transform":"","opacity":1,"textShadow":{"h_shadow":0,"v_shadow":0,"blur_dis":0,"color":{"type":"custom","color":"#f58f8f"}},"color":{"type":"custom","color":"#333"},"animation":"0s 0s 1"}},"layout":{"position":"absolute","top":0,"left":0,"width":120,"height":30},"content":{"text":"右侧编辑文字","router":{}},"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"}}}]},"feature":{},"auth":{"style":{"text":{"textAlign":false,"fontSize":false,"lineHeight":false,"fontStyle":false,"fontWeight":false,"textDecoration":false,"transform":false,"opacity":false,"textShadow":false,"color":false,"animation":false}},"content":{"text":false,"router":false},"animation":{"className":false,"delay":false,"duration":false,"iterationCount":false},"feature":{}}}))
			let compData_images  = {"name":"wonderfulActivity","type":"base","data":{"style":{"text":{"color":{"type":"custom","color":"#fff"},"fontSize":12,"fontStyle":"normal","fontWeight":"normal","textAlign":"center","textDecoration":"none"},"swiperImage":{"borderRadius":{"topLeft":6,"topRight":6,"bottomRight":6,"bottomLeft":6}}},"layout":{"position":"absolute","top":165,"left":0,"width":540,"height":200},"content":[],"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"},"components":[]},"styleList":{"idx":0,"list":[{"name":"样式1","img":"","data":{"style":{"text":{"color":{"type":"custom","color":"#fff"},"fontSize":12,"fontStyle":"normal","fontWeight":"normal","textAlign":"center","textDecoration":"none"},"swiperImage":{"borderRadius":{"topLeft":6,"topRight":6,"bottomRight":6,"bottomLeft":6}}},"layout":{"position":"absolute","top":165,"left":41,"width":432,"height":200},"content":[],"animation":{"className":"","delay":1,"duration":1,"iterationCount":"infinite"},"components":[]}}]},"feature":{"style":{"layout":"0","title":"0"},"layout":1,"swiperOptions":{"direction":"horizontal","autoplay":false,"loop":true,"speed":1000,"spaceBetween":50,"slidesPerView":2,"centeredSlides":true,"effect":"slide","autoplayOptions":{"delay":1000,"stopOnLastSlide":false,"disableOnInteraction":false,"reverseDirection":false},"pagination":false,"paginationOptions":{"el":".swiper-pagination","type":"bullets","progressbarOpposite":true,"dynamicBullets":false,"dynamicMainBullets":2,"hideOnClick":true,"clickable":true}}},"auth":{"style":{"text":{"color":false,"fontSize":false,"fontStyle":false,"fontWeight":false,"textAlign":false,"textDecoration":false},"swiperImage":{"borderRadius":false}},"content":[],"animation":{"className":false,"delay":false,"duration":false,"iterationCount":false},"feature":{"style":false,"layout":false,"swiperOptions":false}}};
			setTimeout(()=>{    
				let curComp = this.props.editConfig.curComp;
				curComp.data.components.push(compData_title);
				actions.updateComp(null, curComp);
			},200) 
			setTimeout(()=>{ 
				let curComp = this.props.editConfig.curComp;
				curComp.data.components.push(compData_content);
				actions.updateComp(null, curComp);
			},300) 
			setTimeout(()=>{ 
				let curComp = this.props.editConfig.curComp;
				curComp.data.components.push(compData_images);
				actions.updateComp(null, curComp);
			},500) 
		}
	}

	selectTheme() {
		let { actions, editConfig } = this.props
		editConfig.curData.contentType = 'theme'
		actions.updateCur(editConfig.curData)
	}

	createData() {
		let { editConfig } = this.props
		let cfg = JSON.parse(JSON.stringify(editConfig))
		let config = {
			configPC: {
				pageContent: cfg.pageContent,
				pageList:    cfg.pageList,
				globalData:  cfg.globalData
			}
			// configTerminal: {
			// 	pageContent: cfg.pageContent,
			// 	pageList:    cfg.pageList,
			// 	globalData:  cfg.globalData
			// }
		}
		Ajax.post('/mcp-gateway/template/save', {
			// composeType: '',
			config: JSON.stringify(config),
			coverImgUrl: 'http://rongyi.com',
			name: '模板名称'
		})
		console.log(JSON.stringify(config))
	}

	render() {
		let compListNode = compList.map((_, i) => {
			return (
				<div key={i} className="cl-item" onClick={this.addComp.bind(this, _)}>{_.name}</div>
			)
		})
		return (
			<div className="pe-header e-flex">
				<div className="peh-left"></div>

				<div className="peh-center">
					<section className="comp-list">
						{ compListNode }
					</section>
				</div>

				<div className="peh-right">
					<section className="comp-list">
						<div className="cl-item" onClick={this.selectTheme.bind(this)}>
							<Icon type="appstore" /> 主题
						</div>
						<div className="cl-item" onClick={this.createData.bind(this)}>
							<Icon type="code" /> 数据保存
						</div>
					</section>
				</div>
			</div>
		)
	}
}


Header.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
