

import React from 'react'
import './index.less'
const QRCode = require('qrcode.react')

export default class QrcodeBind extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let {data,item} = this.props,
			layout  = data.data.layout,
			content = data.data.content,
			height = parseInt(layout.height),
			width = parseInt(layout.width),
			size = width > height ? height : width;
			return (
				item['qrcode'] ? <div className="e-qrcode-bind">
					<QRCode size={size} value={item['qrcode']} />
					<div className="eq-text" style={cssColorFormat(this.props, 'text')}>{content.text || ''}</div>
				</div> : null 
			)   
	}
}
