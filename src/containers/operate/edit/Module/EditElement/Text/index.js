/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import classnames from 'classnames'
import './index.less'

class Text extends React.Component {
	
	renderStyle1(props, style) {
		let { data } = props
		return (
			<div style={cssColorFormat(props, style)}>{data.content.text}</div>
		)
	}
	renderStyle2(props, style) {
		let { data } = props
		return (
			<div style={cssColorFormat(props, style)}>{data.content.text}哇哈哈😁</div>
		)
	}
	
	render() {
		let { data, type } = this.props
		console.log(1, this.props)
		let dom = this[`render${type}`](this.props, 'text')
		return (
			<div className={`e-text ${type}`}>
				{ dom }
			</div>   
		)
	}
} 

export default Text 
