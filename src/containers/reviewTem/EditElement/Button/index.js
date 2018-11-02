/**
 * @Author: Along
 * @Date:   2018-05-07
 
 */
 
import React from 'react'
import JumpRouter from '../JumpRouter'
import checkToJump from '../checkToJump'
import './index.less'

class ButtonShow extends React.Component {
	
	 toPage = (data) => { 
	 	const {animate,animateParams,action} = this.props;
	 	if(data.RYDetail){
	 		JumpRouter(data.RYDetail,animate,animateParams,action)
	 	}else{
	 		let dataStr = checkToJump('RYRouterSet',data);
	 		JumpRouter(dataStr,animate,animateParams,action);
	 	}
	}    
	
	render() { 
		let { type,data } = this.props;
		let style = cssColorFormat(this.props, 'text');
		const router = data.data.content.router;
		return (   
			<div className="e_button" style={style} onClick={() => this.toPage(router)}> 
				{data.data.content.text}  
			</div>     
		)   
	} 
}   
 
export default ButtonShow
 