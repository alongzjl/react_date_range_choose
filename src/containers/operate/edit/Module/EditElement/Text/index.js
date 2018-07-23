/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import './index.less'

class Text extends React.Component {
	
	// renderStyle1(props, style) {
	// 	let { data } = props
	// 	return (
	// 		<div style={cssColorFormat(props, style)} dangerouslySetInnerHTML={{__html: textBreak(data.data.content.text || '右侧编辑内容')}}></div>
	// 	)
	// }
	
	render() {
		let { data, type } = this.props
		// let render   = this[`render${type}`]? this[`render${type}`]: this.renderStyle1
		// let dom      = render(this.props, 'text')
		let dom = <div style={cssColorFormat(this.props, 'text')} dangerouslySetInnerHTML={{__html: textBreak(data.data.content.text || '右侧编辑内容')}}></div>
		return (
			<div className={`e-text`}>
				{ dom }
			</div>
		)
	}
}

export default Text
