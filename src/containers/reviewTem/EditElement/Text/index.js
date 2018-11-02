/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import JumpRouter from '../JumpRouter'
import checkToJump from '../checkToJump'
import './index.less'

class TextShow extends React.Component {
	
	toPage = data => {
		const {animate,animateParams,action} = this.props,
		dataStr = checkToJump('RYRouterSet',data);
	 	JumpRouter(dataStr,animate,animateParams,action);
	} 
	renderStyle1(props, style,recommendReason) {
		let { data } = props,
		 	text = data.data.content.text,
		 	styleObj = cssColorFormat(props, style), 
		 	styleAlign = {textAlign:styleObj.textAlign};
		text = text ? String(text).replace(/\\n/g,'<br/>') : ''
		if(!text) return null 
		if(recommendReason) return (<div style={styleAlign} ><span style={styleObj} dangerouslySetInnerHTML={{__html: textBreak(text)}}></span></div>)
		return ( 
			<div style={styleObj} dangerouslySetInnerHTML={{__html: textBreak(text)}}></div>
		)
	} 
	
	render() {
		let { type,data,recommendReason } = this.props
		let render   = this[`render${type}`]? this[`render${type}`]: this.renderStyle1
		let dom      = render(this.props, 'text',recommendReason)
		const router = data.data.content.router
		return (
			<div className={`e-text ${type}`} onClick={() => this.toPage(router)} > 
				{ dom }
			</div>
		)
	}
}

export default TextShow
