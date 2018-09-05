import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

export default class FloorByStore2 extends React.Component {
	constructor(props) {
		super(props)
		var { floor = [] } = props.ioInput
		this.state = { list: floor }
	}
	renderItem = (item, floor, idx) => {
		let { data } = this.props,
			{ id } = item,
			{ componentLayout, layout } = data.data,
			// isAV = id === floor,
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
			return <div key={i}>{this.renderItem(_, body.floor, i)}</div>
		})
	}
	render() {
		let dom = this.renderList()
		return (
			<section className={`e-floor-by-store2 scrollbar`} style={cssColorFormat(this.props, 'filterBox')}>
				<div className="e-floor-by-store2-box" style={cssColorFormat(this.props, 'filterFlex')}>
					{ dom }
				</div>
			</section>
		)
	}
}
