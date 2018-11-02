/**
 * @Author: Along
 * @Date:   2018-05-05

 */
 

import React from 'react'
import JumpRouter from '../JumpRouter'
import checkToJump from '../checkToJump'
import './index.less' 

class NavigationShow extends React.Component {
	
	to = event => {
		event.preventDefault()
	}
	toPage = data => {
		const {animate,animateParams,action} = this.props,
		dataStr = checkToJump('RYRouterSet',data);
	 	JumpRouter(dataStr,animate,animateParams,action);
	} 
	 
	render() { 
		let { data } = this.props
		return (
			<div className="e-navigation">
				<div className="navigation_box">
					{
						data.data.content.map((item,index) => <OnlyNavigation props={this.props} data={item} key={index} clickFunc={this.toPage}></OnlyNavigation>)
					}  
				</div>
					
			</div>   
		) 
	} 
} 
 
function OnlyNavigation({data,props,clickFunc}) {

	return ( 
			<div className="only" style={cssColorFormat(props, 'filter')} onClick={()=>clickFunc(data.router)} > 
				{ compImgFormat(props,data.img) ? <img src={compImgFormat(props,data.img)} /> : null }    
				<p style={cssColorFormat(props, 'text')}>{data.title}</p> 
			</div>
		)
}
export default NavigationShow