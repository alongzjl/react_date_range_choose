/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

export default class PictureBind extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let props = this.props,
			{ ioInput } = props,
			ipt = ioInput? ioInput: props,
			{ data } = props,
			{ item } = ipt,
			{ bind, text = '' } = data.data.content,
			img = bind? item[bind] || '': ''
		img = getAttr(img) === 'String'? img: getAttr(img) === 'Array'? img[0] || '': compImgFormat(this.props, img)
		return envType === 'business' && !img
			?
			false
			:
			(
				<div className="e-qrcode-bind">
					<img className="eq-img" src={img} style={cssColorFormat(this.props, 'image')} />
					<div className="eq-text" style={cssColorFormat(this.props, 'text')}>{text}</div>
				</div>
			)
	}
}
