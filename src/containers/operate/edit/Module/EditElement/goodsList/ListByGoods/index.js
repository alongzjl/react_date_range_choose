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

export default class ListByStore extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	renderList = (item, i) => {
		let { data } = this.props,
			{ componentLayout, layout } = data.data
		return <Layout key={i} data={item} layout={layout} components={componentLayout} styleObj={cssColorFormat(this.props, 'filter')} />
	}
	render() {
		let { ioInput } = this.props
		let { list } = ioInput
		let dom = list.map((_, i) => {
			return this.renderList(_, i)
		})
		return (
			<section className={`e-list-by-goods`} style={cssColorFormat(this.props, 'filterBox')}>
				{ dom }
			</section>
		)
	}
}
