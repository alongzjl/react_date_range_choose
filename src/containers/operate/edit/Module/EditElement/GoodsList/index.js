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

let cusMap = {
	operate:  CustomO,
	business: CustomB
}

export default class GoodsList extends React.Component {
	constructor(props) {
		super(props)
		let { feature } = props.data
		let ipt = deepCopy(feature)
		this.state = { ioInput: ipt }
	}
	componentWillMount() {
		this.getData()
	}
	componentDidMount() {}
	componentWillUnmount() {}
	componentWillReceiveProps() {
		this.getData()
	}

	ioOuter = ipt => {
		console.clear()
	}

	getData = e => {
		let ipt = this.state.ioInput
		let { feature, data } = this.props.data
		let { content } = data
		let size = ipt.body.size = content.size
		delete feature.list
		delete feature.map
	}

	render() {
		let Custom = cusMap[envType] || CustomV
		return (
			<Custom
				{...this.props}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/>
		)
	}
}
