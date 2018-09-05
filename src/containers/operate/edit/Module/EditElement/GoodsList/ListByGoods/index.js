import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

export default class ListByGoods extends React.Component {
	constructor(props) {
		super(props)
		this.state = { list: [] }
	}
	componentWillMount() {
		this.getData()
	}
	componentWillReceiveProps(props) {
		var { size } = props.ioInput.body,
			size2 = this.state.size
		if (size2 != size) this.getData()
	}
	getData = e => {
		var { size } = this.props.ioInput.body
		Server.goods.getList(size, o => {
			this.setState({ list: o, size: size })
		})
	}
	renderList = e => {
		let { data, ioInput } = this.props,
			{ list = [] } = this.state,
			{ componentLayout, layout } = data.data
		return list.map((_, i) => {
			return <Layout key={i} data={_} layout={layout} components={componentLayout} styleObj={cssColorFormat(this.props, 'filter')} />
		})
	}
	render() {
		let dom = this.renderList()
		return (
			<section className={`e-list-by-goods scrollbar`}>
				{ dom }
			</section>
		)
	}
}
