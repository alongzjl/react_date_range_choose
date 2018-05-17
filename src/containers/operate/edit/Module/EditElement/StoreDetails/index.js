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
		let comp  = data.data.components
		comp = comp.map(item => {
			if (item.name == 'text') {
				item.data.content.text = '优衣库/UNIQLO'
			} else if(item.name == 'button') {
				item.data.content.text = '立即前往'
			} else if(item.name == 'picture') {
				item.data.content.img.img = require('compEdit/EditElement/images/Index_Logo.png')  
			}
			return item
		}) 
		data.data.components = comp;
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
