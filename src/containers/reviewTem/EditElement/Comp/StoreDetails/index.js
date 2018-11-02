/**
 * @Author: Along
 * @Date:   2018-05-10
 
 */ 

import React from 'react'
import './index.less'
import checkToJump from '../../checkToJump'
import Custom from '../Custom'

class StoreDetailsShow extends React.Component {
	   
	render() { 
		let { data,animate,animateParams,action } = this.props;
		return (   
			<Custom
				data={data}
				animate={animate}
				animateParams={animateParams}
				action={action}
			/>  
		)
	}
}
 
export default StoreDetailsShow
