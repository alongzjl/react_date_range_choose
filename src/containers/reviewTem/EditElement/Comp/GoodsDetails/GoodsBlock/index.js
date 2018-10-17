/**
 * @Author: Along
 * @Date:   2018-07-25

 **/

import React from 'react'
import Layout from '../../Layout'
import './index.less'

export default class GoodBlock extends React.Component {

	shouldComponentUpdate(nextProps,nextState){
		return nextProps.refresh
	}
	render() {
		let { ioInput,data,refresh } = this.props,
			filterBox = cssColorFormat(this.props, 'filterBox');
		return (
			<section className="e-goods-block" style={filterBox}>
				 <Layout itemList={ioInput.itemDetails} data={data} refresh={refresh} />
			</section>
		)
	}
}

