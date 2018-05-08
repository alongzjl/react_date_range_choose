/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import './index.less'

class Text extends React.Component {
	
	renderStyle1(style,text) {
		console.log(style) 
		return ( 
			<div style={style} dangerouslySetInnerHTML={{__html: textBreak(text)}}></div>
		)  
	} 
	  
	render() { 
		let { type,data } = this.props
		let style= cssColorFormat(this.props, 'text');
		let textShadow = style.textShadow;
		textShadow = `${textShadow.h_shadow}px ${textShadow.v_shadow}px ${textShadow.blur_dis}px ${textShadow.color}`;
		style = {...style,textShadow:textShadow}
		let dom = this[`render${type}`](style,data.content.text) 
		return (
			<div className={`e-text ${type}`}>
				{ dom }
			</div> 
		)
	}
}

export default Text
