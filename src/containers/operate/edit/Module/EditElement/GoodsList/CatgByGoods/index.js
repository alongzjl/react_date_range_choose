import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

export default class CatgByGoods extends React.Component {
	constructor(props) {
		super(props)
		var { catg } = props.ioInput
		this.state = {
			list: envType !== 'business'? catg: []
		}
		this.getData()
	}
	onChange = (e, item) => {
		e.stopPropagation()
		let { ioInput, ioOuter } = this.props,
			{ body } = ioInput
		body.catg = item.categoryId
		ioOuter(ioInput)
	}
	getData = cb => {
		if (envType !== 'business') return
		let { ioInput, ioOuter } = this.props
		Server.goods.getCategoryList(o => {
			this.setState({ list: o })
			ioInput.catg = o
			ioOuter(ioInput)
		})
	}
	renderItem = (item, catg) => {
		let { data } = this.props,
			{ categoryId } = item,
			{ componentLayout, layout } = data.data
		let isAV = categoryId === catg,
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
			return <div key={i} onClick={e => this.onChange(e, _)}>{this.renderItem(_, body.catg)}</div>
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
