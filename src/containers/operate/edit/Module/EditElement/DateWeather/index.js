/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import CustomO from 'compEdit/EditElement/Custom'
import CustomB from 'compEditB/EditElement/Custom'
import CustomV from 'view/Element/Custom'

let Custom

class DateWeather extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	ioOuter(ipt) {
		// let { data, actions, idx, csn } = this.props
	}

	init() {
		let { data } = this.props
		let { feature } = data
		this.state = {
			ioInput: feature
		}
	}

	render() {
		let { data, actions, idx, csn } = this.props
		if (envType === 'operate')       Custom = CustomO
		else if (envType === 'business') Custom = CustomB
		else                             Custom = CustomV
		this.init.bind(this)()
		return (
			<Custom
				data={data}
				actions={actions}
				idx={idx}
				csn={csn}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/>
		)
	}
}

export default DateWeather
