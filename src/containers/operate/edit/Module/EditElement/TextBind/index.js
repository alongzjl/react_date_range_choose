/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import './index.less'

export default class TextBind extends React.Component {
	render() {
		let props = this.props,
			{ ioInput, type } = props,
			ipt = ioInput? ioInput: props,
			{ data } = props,
			{ item } = ipt,
			{ bind } = data.data.content,
			text = bind? item[bind]: '',
			dom

		if (bind !== 'recommendReason') {
			dom = <div
				style={cssColorFormat(this.props, 'text')}
				dangerouslySetInnerHTML={{__html: textBreak(text)}}
			></div>
		} else {
			dom = text
			?
			<span
				style={cssColorFormat(this.props, 'text')}
				dangerouslySetInnerHTML={{__html: textBreak(text)}}
			></span>
			: null
		}
		return (
			<div className={`e-text`}>
				{ dom }
			</div>
		)
	}
}
