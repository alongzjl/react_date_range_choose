/**
 * @Author: Along
 * @Date:   2018-05-16
 
 */ 


import React from 'react'
import './index.less'

class HalvingLine extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let { data } = this.props
		// console.log(1, this.props)
		return (
			<div className="e-halvingLine" style={cssColorFormat(this.props, 'image')}></div> 
		)
	}
}

export default HalvingLine
