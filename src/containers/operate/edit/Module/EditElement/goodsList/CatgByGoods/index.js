import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'

export default class CatgByGoods extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	onChange = (e, item) => {
		e.stopPropagation()
		let { ioInput, ioOuter } = this.props,
			{ body } = ioInput
		body.catg = item.id
		ioOuter(ioInput)
	}
	renderList = (item, catg) => {
		let { data } = this.props,
			{ id } = item,
			{ componentLayout, layout } = data.data
		let isAV = id === catg,
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
			isActive={true}
		/>
	}
	render() {
		let { ioInput } = this.props
		let { catg, body } = ioInput
		let dom = catg.map((_, i) => {
			return <div key={i} onClick={e => this.onChange(e, _)}>{this.renderList(_, body.catg)}</div>
		})
		return (
			<section className={`e-catg-by-goods scrollbar`} style={cssColorFormat(this.props, 'filterBox')}>
				<div className="e-catg-by-goods-box" style={cssColorFormat(this.props, 'filterFlex')}>
					{ dom }
				</div>
			</section>
		)
	}
}
