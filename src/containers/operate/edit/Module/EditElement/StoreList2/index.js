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
import * as Server from 'server'
import * as variable from 'var'
let mockMap = variable.mockMap.list

let cusMap = {
	operate:  CustomO,
	business: CustomB
}

export default class GoodsList extends React.Component {
	constructor(props) {
		super(props)
		this.init()
	}
	componentWillMount() {}
	componentDidMount() {}
	componentWillUnmount() {}
	componentWillReceiveProps() {
		let { feature } = this.props.data
		let { ioInput } = this.state
		let ipt  = deepCopy(feature)
		ipt.body = ioInput.body
		this.getList(ipt)
		this.state = {
			ioInput: ipt
		}
	}

	ioOuter = ipt => {
		let { data } = this.props
		this.getList(ipt)
		this.setState({ ioInput: ipt })
		console.clear()
		console.log(ipt.body)
	}

	getList = ipt => {
		let { data } = this.props
		let { feature } = data
		let { content } = data.data
		let size = ipt.body.size = content.size
		ipt.list  = mockMap.store(size)
		ipt.catg  = mockMap.storeCatg(10)
		ipt.floor = mockMap.storeFloor(10)
	}

	init = () => {
		let { data } = this.props
		let { feature } = data
		let ipt = deepCopy(feature)
		this.getList(ipt)
		this.state = { ioInput: ipt }
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
