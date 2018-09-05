import React from 'react'
import './index.less'

import CustomO from 'compEdit/EditElement/Custom'
import CustomB from 'compEditB/EditElement/Custom'
import CustomV from 'view/Element/Custom'
import * as Server from 'server'

let cusMap = {
	operate:  CustomO,
	business: CustomB
}

export default class GoodsDetails extends React.Component {
	constructor(props) {
		super(props)
		let { feature } = this.props.data
		let ipt = deepCopy(feature)
		this.state = { ioInput: ipt }
	}
	componentWillMount() {
		this.getData()
	}
	componentDidMount() {}
	componentWillUnmount() {}
	componentWillReceiveProps() {}

	ioOuter(ipt) {
		this.setState({ ioInput: ipt })
		console.clear()
	}

	getData = e => {
		let ipt = this.state.ioInput
		let { feature } = this.props.data

		Server.store.getDetails(o => {
			ipt.item = o
			this.setState({ ioInput: ipt })
		})
		
		delete feature.item
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
