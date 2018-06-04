/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import './index.less'

class Text extends React.Component {
	
	renderStyle1(props, style) {
		let { data } = props
		return (
			<div style={cssColorFormat(props, style)} dangerouslySetInnerHTML={{__html: textBreak(data.data.content.text || '右侧编辑内容')}}></div>
		)
	}
	
	render() {
		let { type } = this.props
		let render   = this[`render${type}`]? this[`render${type}`]: this.renderStyle1
		let dom      = render(this.props, 'text')
		return (
			<div className={`e-text ${type}`}>
				{ dom }
			</div>
		)
	}
}

export default Text
