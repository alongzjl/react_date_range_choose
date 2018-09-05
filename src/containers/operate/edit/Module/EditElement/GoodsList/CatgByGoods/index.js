import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

export default class CatgByGoods extends React.Component {
	constructor(props) {
		super(props)
		this.state = { list: [] }
	}
	componentWillMount() {
		this.getData()
	}
	getData = e => {
		Server.goods.getCategoryList(o => {
			this.setState({ list: o })
		})
	}
	renderItem = (item, catg, idx) => {
		let { data } = this.props,
			{ categoryId } = item,
			{ componentLayout, layout } = data.data,
			// isAV = categoryId === catg,
			isAV = !idx,
			cl   = []
		componentLayout.map(_ => {
			var { active } = _.feature
			if ((isAV && active) || (!isAV && !active)) {
				cl.push(_)
			}
		})
		return <Layout
			data={item}
			layout={layout}
			components={cl}
			styleObj={cssColorFormat(this.props, 'filter')}
		/>
	}
	renderList = () => {
		let { body } = this.props.ioInput,
			{ list } = this.state
		return list.map((_, i) => {
			return <div key={i}>{this.renderItem(_, body.catg, i)}</div>
		})
	}
	render() {
		let dom = this.renderList()
		return (
			<section className={`e-catg-by-goods scrollbar`} style={cssColorFormat(this.props, 'filterBox')}>
				<div className="e-catg-by-goods-box" style={cssColorFormat(this.props, 'filterFlex')}>
					{ dom }
				</div>
			</section>
		)
	}
}
