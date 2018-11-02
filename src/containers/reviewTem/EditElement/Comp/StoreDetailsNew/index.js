/**
 * @Author: Along
 * @Date:   2018-05-10
 
 */ 

import React from 'react'
import './index.less'
import checkToJump from '../../checkToJump'
import Custom from '../Custom'
import * as Server from 'server'

class StoreDetailsNewShow extends React.Component {
	state = {
		shopDetais:{NAME:'',LOCAL_LOGO:'',BERTH_NUMBER:'',CONTACT:'',LOCAL_URL:[{LOCAL_URL:''}],DESCRIPTION:''},
		first:0
	} 
	componentWillMount() {
		Server.store.getDetails(o => {
			this.setState({ shopDetais: o })
		})  
	}  
	 
	render() { 
		let { data, animate,animateParams,action } = this.props;
		let ioInput = {itemDetails:this.state.shopDetais,mapParams:{}}
		return (    
			<Custom
				data={data}
				animate={animate}
				animateParams={animateParams}
				action={action} 
				ioInput={ioInput}
			/>  
		)
	}
}
 
export default StoreDetailsNewShow
