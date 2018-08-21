import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

export default class ListByStore extends React.Component {
	constructor(props) {
		super(props)
		var { list } = props.ioInput
		this.state = {
			list: envType !== 'business'? list: []
		}
		this.getData(1)
	}
	componentWillReceiveProps(props) {
		var { catg } = props.ioInput.body,
			{ id }   = this.state
		if (catg && catg !== id) this.getData(catg)
	}
	getData = id => {
		if (envType !== 'business') return
		Server.goods.getGoodsList(id, o => {
			this.setState({ list: o })
		})
	}
	renderList = (item, i) => {
		let { data, ioInput } = this.props,
			{ list } = this.state,
			{ componentLayout, layout } = data.data
		return list.map((_, i) => {
			return <Layout key={i} data={_} layout={layout} components={componentLayout} styleObj={cssColorFormat(this.props, 'filter')} />
		})
	}
	render() {
		let dom = this.renderList()
		return (
			<section className={`e-list-by-goods`}>
				{ dom }
			</section>
		)
	}
}
