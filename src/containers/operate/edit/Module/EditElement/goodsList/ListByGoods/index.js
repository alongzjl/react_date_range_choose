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
			<section className={`e-list-by-goods`}>
				{ dom }
			</section>
		)
	}
}
