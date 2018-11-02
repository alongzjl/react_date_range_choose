

import React from 'react'
import './index.less'
const QRCode = require('qrcode.react')
export default class QrcodeRYShow extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let {data,type} = this.props,
			layout  = data.data.layout,
			content = data.data.content,
			height = parseInt(layout.height),
			width = parseInt(layout.width),
			size = width > height ? height : width,
			url = content.url;
		!/https?\:\/\/.*?/.test(url) ? url = '' : null;
		return (    
			<div className="e-qrcode-bind">
				{ 
					url ? <QRCode size={size} value={url} /> : null
				} 
			</div> 
		) 
	} 
}
