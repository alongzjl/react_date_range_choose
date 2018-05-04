/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import Custom from '../Custom'

class StoreList extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let { data, actions, idx, csn } = this.props
		console.log(1, this.props)
		return (
			<Custom
				data={data}
				actions={actions}
				idx={idx}
				csn={csn}
				comp={data.components}
			/>
		)
	}
}

export default StoreList
