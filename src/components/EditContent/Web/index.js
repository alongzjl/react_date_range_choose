/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import $ from 'jquery'
import classnames from 'classnames'
import './index.less'

class Web extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let { focusItem, components, focusIndex, range, actions } = this.props
		return (
			<div className="e-picture">
				我是网页组件内容
			</div>
		)
	}
}

export default Web
