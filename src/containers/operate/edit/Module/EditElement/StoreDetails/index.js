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
