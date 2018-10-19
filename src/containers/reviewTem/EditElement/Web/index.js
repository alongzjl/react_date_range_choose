/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less' 
 
class Web extends React.Component {
	
	state = {
		id:`iframe_RY_${parseInt(Math.random()*1e5)}`
	} 
	componentDidMount() {
		window.addEventListener('message', this.messageGet,false); 
	}

	messageGet = messageEvent => {
		let { type, value } = messageEvent.data;
		if (type === 'back' && value) { 
			clearInterval(RYTimer);  
			funcIn(); 
		}
	}     
	componentWillUnmount(){  
		window.removeEventListener('message', this.messageGet,false); 
	} 
	render() {
		let { data } = this.props
		return ( 
			<div className="e-web">
				<iframe id={this.state.id} className="ew-iframe" src={data.data.content.url} scrolling={'no'} />
			</div> 
		) 
	}
}

export default Web
