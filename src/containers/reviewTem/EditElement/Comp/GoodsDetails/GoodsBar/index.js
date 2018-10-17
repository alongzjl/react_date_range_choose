/**
 * @Author: Along
 * @Date:   2018-07-25

 **/

import React from 'react'
import Layout from '../../Layout'
import './index.less'

export default class GoodBar extends React.Component {
	
	render() {
		let { ioInput,data,refresh,top } = this.props,
			showTop = data.data.content.showTop,
			filterBox = cssColorFormat(this.props, 'filterBox'),
			styleObj = cssColorFormat(this.props, 'filter');
		const isShow = ioInput.scrollTop > showTop ? 'show' : 'hide'
		return (
			<section className={`e-goods-bar ${isShow}`} style={{...filterBox,top:top}}>
				 <Layout itemList={ioInput.itemDetails} data={data} styleObj={styleObj} refresh={refresh} />
			</section>
		)
	}
}

