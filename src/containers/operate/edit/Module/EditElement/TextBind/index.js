/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import './index.less'

export default class TextBind extends React.Component {
	render() {
		let props = this.props,
			{ ioInput } = props,
			ipt = ioInput? ioInput: props,
			{ data } = props,
			{ item } = ipt,
			{ bind } = data.data.content,
			text = bind? item[bind]: ''
		return (
			<div className={`e-text`}>
				<div
					style={cssColorFormat(this.props, 'text')}
					dangerouslySetInnerHTML={{__html: textBreak(text || '右侧编辑内容')}}
				></div>
			</div>
		)
	}
}
