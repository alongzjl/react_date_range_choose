
/**
 * @Author: Along
 * @Date:   2018-07-25

 **/

import React from 'react'
import Layout from '../../Layout'
import './index.less'

export default class StoreDetailsBlock extends React.Component {
	
	render() {
		let { data,goodsDetails } = this.props,
			filterBox = cssColorFormat(this.props, 'filterBox'),
			styleObj = cssColorFormat(this.props, 'filter');
		return (
			<section className={`e-goods-block`}>
				 <Layout itemList={goodsDetails} data={data} styleObj={styleObj} refresh={true} type="storeDetails" />
			</section>
		)
	}
}

