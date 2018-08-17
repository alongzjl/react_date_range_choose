/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

export default class PictureListBind extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	renderImage = imgs => {
		let props = this.props,
			{ style } = props.data.data,
			css  = cssColorFormat(props, 'image')
		return (
			<div className="eplb-box" style={cssColorFormat(props, 'filterBox')}>
				{ imgs.map((_, i) => <div key={i} style={css}><img src={_} /></div>) }
			</div>
		)
	}

	render() {
		let props = this.props,
			{ ioInput } = props,
			ipt = ioInput? ioInput: props,
			{ data } = props,
			{ item } = ipt,
			{ bind } = data.data.content,
			imgs = bind? item[bind] || []: []
		return envType === 'business' && !imgs
			?
			false
			:
			(
				<div className="e-picture-list-bind">
					{ this.renderImage(imgs) }
				</div>
			)
	}
}
