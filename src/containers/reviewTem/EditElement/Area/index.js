/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

export default class AreaShow extends React.Component {
	
	render() {
		let { show = true } = this.props,
			filterBox = cssColorFormat(this.props, 'filterBox')
		return show
		?
		<div className="e-area" style={filterBox}></div>
		: null
	}
}
