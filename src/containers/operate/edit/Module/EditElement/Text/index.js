/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import classnames from 'classnames'
import './index.less'

class Text extends React.Component {
	
	
	render() {
		let { data } = this.props
		console.log(1,this.props);
		return (
			<div className="e-text">
				<div style={data.style.text}>{data.content.text}</div>
			</div>   
		)
	}
} 

export default Text 
