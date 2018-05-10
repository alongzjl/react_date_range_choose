/**
 * @Author: Along
 * @Date:   2018-05-03

 */
 import React from 'react'
import './index.less'

import  SwiperSame  from '../SwiperSame'  


class SwiperImage extends React.Component {

	constructor(props) {
		super(props)

	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}


	render() { 
		let data  = this.props.data; 
		return (  
			<SwiperSame data={data} />  
		)
	}
}
 
export default SwiperImage