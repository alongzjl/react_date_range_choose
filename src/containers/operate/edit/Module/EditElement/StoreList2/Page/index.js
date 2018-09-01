import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

const numArr = Array.from(new Array(10), (_, i) => { return {name: `${i+1}`}})

export default class LetterByStore2 extends React.Component {
	// constructor(props) {
	// 	super(props)
	// }
	onChange = (e, item) => {
		e.stopPropagation()
		let { ioInput, ioOuter } = this.props,
			{ body } = ioInput
		body.page = item.name
		ioOuter(ioInput)
	}
	renderItem = (item, page, idx) => {
		let { data } = this.props,
			{ name } = item,
			{ componentLayout, layout } = data.data,
			// isAV = name === page,
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
	renderList = e => {
		let { body } = this.props.ioInput
		let list = numArr
		return list.map((_, i) => {
			return <div key={i} onClick={e => this.onChange(e, _)}>{this.renderItem(_, body.page, i)}</div>
		})
	}
	render() {
		let dom = this.renderList()
		return (
			<section className={`e-page-by-store2 scrollbar`} style={cssColorFormat(this.props, 'filterBox')}>
				<div className="e-page-by-store2-box" style={cssColorFormat(this.props, 'filterFlex')}>
					{ dom }
				</div>
			</section>
		)
	}
}
