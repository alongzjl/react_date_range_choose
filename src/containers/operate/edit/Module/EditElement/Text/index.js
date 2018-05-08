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
			<div style={cssColorFormat(props, style)} dangerouslySetInnerHTML={{__html: textBreak(data.content.text)}}></div>
		)
	}
	
	render() {
		let { type } = this.props
		let dom = this[`render${type}`](this.props, 'text')
		return (
			<div className={`e-text ${type}`}>
				{ dom }
			</div>
		)
	}
}

export default Text
