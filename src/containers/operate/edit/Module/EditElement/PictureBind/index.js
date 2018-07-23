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
		let { data, item } = this.props,
			{ bind } = data.data.content
		let img = bind? item[bind]: ''
		return envType === 'business' && !img
			?
			false
			:
			(
			<div className="e-picture" style={cssColorFormat(this.props, 'image')}>
				<img src={img} />
			</div>
			)
	}
}
