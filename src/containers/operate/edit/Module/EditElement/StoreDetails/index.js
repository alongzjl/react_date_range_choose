/**
 * @Author: Along
 * @Date:   2018-05-10
 
 */ 

import React from 'react'
import './index.less'

import Custom from '../Custom'

class StoreDetails extends React.Component {
	constructor(props) {
		super(props)

		// let ioInput = JSON.parse(JSON.stringify(props.data.feature))
		// this.state = {
		// 	ioInput: ioInput
		// }
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	state = {
		ioInput: {}
	}

	ioOuter(ipt) {
		
	}
	
	init() {
		let { data, actions } = this.props
		this.state = {
			ioInput: data.feature
		}
	}

	render() {
		let { data, actions, idx, csn } = this.props
		
		return (
			<Custom
				data={data}
				actions={actions}
				idx={idx}
				csn={csn}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
				comp={data.components}
				name={data.name}
			/> 
		)
	}
}
 
export default StoreDetails
