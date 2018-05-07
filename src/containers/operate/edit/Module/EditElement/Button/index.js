/**
 * @Author: Along
 * @Date:   2018-05-07
 
 */

import React from 'react'
import './index.less'

class Button extends React.Component {
	
	 
	
	render() {
		let { type,data } = this.props
		let boxShadow = data.style.text.boxShadow;
		let textShadow = data.style.text.textShadow;
		let transform = `rotate(${data.style.text.transformRotate}deg)`;
		boxShadow = `${boxShadow.h_shadow}px ${boxShadow.v_shadow}px ${boxShadow.blur_dis}px ${boxShadow.spread_dis}px ${boxShadow.color}`;
		textShadow = `${textShadow.h_shadow}px ${textShadow.v_shadow}px ${textShadow.blur_dis}px ${textShadow.spread_dis}px ${textShadow.color}`;
		return ( 
			<div className='e_button' style={{...cssColorFormat(this.props, 'text'),boxShadow:boxShadow,textShadow:textShadow,transform:transform}}>
				{data.content.text} 
			</div>   
		)  
	}
}
 
export default Button
