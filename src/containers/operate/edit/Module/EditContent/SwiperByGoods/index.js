/**
 * @Author: Along
 * @Date:   2018-05-02
 
 */

import React from 'react'
import './index.less'

import GoodsListModal from 'compEdit/EditCommon/GoodsListModal'


export default class SwiperByGoods extends React.Component {
	render() {
		let { data, onChange } = this.props,
			da = data.data.data,
			{ content } = da,
			{ recommendGoods } = content
		
		return <GoodsListModal
					list={recommendGoods}
					onChange={v => onChange(v, content, 'recommendGoods', {})}
				/>
	}
}
