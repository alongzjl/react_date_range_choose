/**
 * @Author: Along
 * @Date:   2018-05-10
 
 */ 

import React from 'react'
import './index.less'

import CustomO from 'compEdit/EditElement/Custom'
import CustomB from 'compEditB/EditElement/Custom'
import CustomV from 'view/Element/Custom'

let Custom

class StoreDetails extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	ioOuter(ipt) {
		
	}
	
	init() {
		this.state = {
			ioInput: this.props.data.feature
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
 
export default StoreDetails
