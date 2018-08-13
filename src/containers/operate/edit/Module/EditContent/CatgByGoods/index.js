/**
 * @Author: Along
 * @Date:   2018-05-02
 
 */

import React from 'react'
import './index.less'

import GoodsCatgModal from 'compEdit/EditCommon/GoodsCatgModal'


export default class CatgByGoods extends React.Component {
	render() {
		let { data, updateComp } = this.props,
			da = data.data.data
		return envType === 'business'
		?
		<GoodsCatgModal
			content={da.content}
			updateComp={updateComp}
		/>
		: null
	}
}
