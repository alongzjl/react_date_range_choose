/**
 * @Author: Along
 * @Date:   2018-05-16
 
 */


import React from 'react'
import './index.less'

class Address extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let { data } = this.props
		data = data.data
		return (
			<div className="e-address">
				<img style={cssColorFormat(this.props, 'image')} src={compImgFormat(this.props, data.content.img)} />
				<span style={cssColorFormat(this.props, 'text')}>{ data.content.text ? data.content.text : data.type == 'address' ? '暂无地址' : '暂无电话'}</span>
			</div>   
		)  
	} 
}

export default Address 
