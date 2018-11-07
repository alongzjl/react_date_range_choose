/**
 * @Author: Along
 * @Date:   2018-05-10
 
 */ 

import React from 'react'
import './index.less'
import Custom from '../Custom'

class StoreInstroShow extends React.Component {
	 
 	
	render() {  
		let { data,animate,animateParams } = this.props;
		 
		return (   
			<Custom
				data={data}
				animate={animate}
				animateParams={animateParams}
			/>    
		)
	}
}
 
export default StoreInstroShow
