/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

const typeMap = {
	String: 1,
	Array: 1,
	Object: 1
}

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
			{ bind } = data.data.content,
			img = bind? item[bind] || '': '',
			t = getAttr(img)
		img = !typeMap[t]? img + '': t === 'String'? img: t === 'Array'? img[0] || '': compImgFormat(this.props, img)
		return envType === 'business' && !img
			?
			false
			:
			(
				<div className="e-picture-bind" style={cssColorFormat(this.props, 'image')}>
					<img src={img} />
				</div>
			)
	}
}
