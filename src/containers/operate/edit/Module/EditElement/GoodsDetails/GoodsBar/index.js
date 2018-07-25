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
	renderList = (item) => {
		let { data } = this.props,
			{ componentLayout, layout } = data.data
		return <Layout data={item} layout={layout} components={componentLayout} styleObj={cssColorFormat(this.props, 'filter')} />
	}
	render() {
		let { data, ioInput } = this.props,
			{ componentLayout, layout, content } = data.data,
			{ item, scrollTop } = ioInput,
			{ showTop } = content
		return scrollTop > showTop
			?
			(
			<section className={`e-goods-bar`} style={cssColorFormat(this.props, 'filterBox')}>
				<Layout data={item} layout={layout} components={componentLayout} styleObj={cssColorFormat(this.props, 'filter')} />
			</section>
			): null
	}
}
