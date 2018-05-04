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
			<div style={cssColorFormat(props, style)}>{data.content.text}</div>
		)
	}
	
	render() {
		let { data, type } = this.props
		console.log(1, this.props)
		let dom = this[`render${type}`](this.props, 'text')
		return (
			<div className={`e-text ${type}`}>
				{
					data.content.text ?  dom : <div style={cssColorFormat(this.props, 'text')}>右侧输入文本内容</div>
				}
			</div>   
		)
	}
} 

export default Text 
