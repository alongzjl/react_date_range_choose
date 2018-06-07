/**
 * @Author: Along
 * @Date:   2018-05-07
 
 */

import React from 'react'
import './index.less'

class Button extends React.Component {
	
	 
	
	render() {
		let { type,data } = this.props;
		let style = cssColorFormat(this.props, 'text');
		return (   
			<div className='e_button' style={style}> 
				{data.data.content.text}  
			</div>     
		)  
	}  
} 
 
export default Button
