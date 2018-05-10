/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import { Icon, Pagination } from 'antd'

import './index.less'


class ListByStore extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	selectVal(str) {
		let { parent, actions, ioInput, ioOuter } = this.props
		if (ioInput.body.page === str || !parent) return
		ioInput.body.page = str
		ioOuter(ioInput)
	}

	renderDom(props, list) {
		let node = list.map((_, i) => {
			return (
				<div
					key={i}
					style={cssColorFormat(props, 'filter')}
					className={'ep-item$'}
				>
					<p><img style={cssColorFormat(props, 'image')} src={_.pic} /></p>
					<p><span>{_.name}</span></p>
					<p><span>{_.floor}</span></p>
				</div>
			)
		})
		return node
	}

	// 原点
	renderStyle1(props, body) {
		return this.renderDom.bind(this, props, body)()
	}
	
	render() {
		let props = this.props
		let { type, ioInput } = props
		let dom = this[`render${type}`].bind(this, props, ioInput.list)()
		return (
			<section className={`e-list-by-store ${type}`} style={cssColorFormat(props, 'filterBox')}>
				{ dom }
			</section>
		)
	}
}

export default ListByStore
