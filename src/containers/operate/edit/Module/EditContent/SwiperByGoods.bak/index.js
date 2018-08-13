/**
 * @Author: Along
 * @Date:   2018-05-02
 
 */

import React from 'react'
import './index.less'

import GoodsListModal from 'compEdit/EditCommon/GoodsListModal'


export default class SwiperByGoods extends React.Component {
	render() {
		let { data, updateComp } = this.props,
			da = data.data.data,
			{ content } = da,
			{ recommendGoods } = content
		return envType === 'business'
		?
		<GoodsListModal
			list={recommendGoods}
			updateComp={updateComp}
		/>
		: null
	}
}
