/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

class SplitLine extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let { data, type } = this.props
		return (
			<div className={`e-splitline ${type}`} style={cssColorFormat(this.props, 'line')}></div> 
		)
	}
}

export default SplitLine
