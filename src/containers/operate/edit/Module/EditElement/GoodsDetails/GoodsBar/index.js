/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'

export default class GoodsBar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	render() {
		let props = this.props,
			{ data, ioInput } = props,
			{ componentLayout = {}, layout = {}, content } = data.data,
			{ item, scrollTop } = ioInput,
			{ showTop } = content
		return (
			<section className={`e-goods-bar${scrollTop >= showTop? ' s-show': ''}`} style={cssColorFormat(props, 'filterBox')}>
				<Layout data={item} layout={layout} components={componentLayout} styleObj={cssColorFormat(props, 'filter')} />
			</section>
		)
	}
}
