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
		let boxShadow = style.boxShadow;
		let textShadow = style.textShadow; 
		let transform = `rotate(${style.transformRotate}deg)`;
		boxShadow = `${boxShadow.h_shadow}px ${boxShadow.v_shadow}px ${boxShadow.blur_dis}px ${boxShadow.color}`;
		textShadow = `${textShadow.h_shadow}px ${textShadow.v_shadow}px ${textShadow.blur_dis}px ${textShadow.color}`;  
		style = {...style,boxShadow:boxShadow,textShadow:textShadow,transform:transform};
		return ( 
			<div className='e_button' style={style}> 
				{data.content.text}  
			</div>   
		)  
	} 
}
 
export default Button
