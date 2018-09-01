/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

export default class Qrcode extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let { data } = this.props
		let img = data.data.content.img
		return envType === 'business' && !img.img
			?
			false
			:
			(
			<div className="e-qrcode" style={cssColorFormat(this.props, 'image')}>
				<img src="http://rongyi.b0.upaiyun.com/commodity/text/201808271756227480.png" />
			</div>
			)
	}
}
