/**
 * @Author: Along
 * @Date:   2018-05-10

 */
import React from 'react'
import './index.less'

import  SwiperSame  from '../SwiperSame'
  
 

class WonderfulActivity extends React.Component {
	constructor(props) {
		super(props)

	} 
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}
 

	render() {
		let { data } = this.props;
		if (!data.editConfig) data = data.data
		if (!data.editConfig) return
		return (  
			<SwiperSame data={data} /> 
		)
	}
} 

export default WonderfulActivity