import React from 'react'
import './index.less'

import { Icon, Pagination } from 'antd'
import Layout from 'compEdit/EditElement/Layout'
import * as Server from 'server'

const letArr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(name => { return { name } })
const numArr = Array.from(new Array(10), (_, i) => { return {name: `${i}`}})
const listMap = {
	Style1: letArr,
	Style2: numArr,
	Style3: [ ...numArr, ...letArr ]
}

export default class LetterByStore2 extends React.Component {
	// constructor(props) {
	// 	super(props)
	// }
	renderItem = (item, letter, idx) => {
		let { data } = this.props,
			{ name } = item,
			{ componentLayout, layout } = data.data,
			// isAV = name === letter,
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
	renderList = (type) => {
		let { body } = this.props.ioInput
		let list = listMap[type] || []
		return list.map((_, i) => {
			return <div key={i}>{this.renderItem(_, body.letter, i)}</div>
		})
	}
	render() {
		let { type } = this.props
		let dom = this.renderList(type)
		return (
			<section className={`e-letter-by-store2 scrollbar`} style={cssColorFormat(this.props, 'filterBox')}>
				<div className="e-letter-by-store2-box" style={cssColorFormat(this.props, 'filterFlex')}>
					{ dom }
				</div>
			</section>
		)
	}
}
