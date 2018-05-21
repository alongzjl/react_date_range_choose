/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import { Icon, Pagination } from 'antd'

import './index.less'


class Page extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	selectVal(str) {
		let { parent, actions, ioInput, ioOuter } = this.props
		if (ioInput.body.page === str || !parent) return
		ioInput.body.page = str
		ioOuter(ioInput)
	}
	renderDom(props, body) {
		let { page, size, total } = body
		let content = props.data.data.content
		let totalPage = Math.ceil(total / size),
			img  = content.filterPageImg,
			imgp = content.filterPrevImg,
			imgn = content.filterNextImg,
			swh  = content.pageSwitch,
			swhp = content.prevSwitch,
			swhn = content.nextSwitch,
			ns   = content.numberSwitch,
			css  = cssColorFormat(props, 'filter'),
			cssp = cssColorFormat(props, 'filterPage'),
			cssn = cssColorFormat(props, 'filterPage'),
			childNode = [],
			prevNode,
			nextNode,
			node

		if (swhp) prevNode = (<div key={0} className={page < 2? 's-disabled': ''}          style={{ ...cssp, ...cssColorFormat(props, 'PagePrev') }} onClick={this.selectVal.bind(this, page - 1)}></div>)
		if (swhn) nextNode = (<div key={2} className={page >= totalPage? 's-disabled': ''} style={{ ...cssn, ...cssColorFormat(props, 'PageNext') }} onClick={this.selectVal.bind(this, page + 1)}></div>)
		if (swh) {
			node = Array.from(new Array(totalPage)).map((_, i) => {
				let cur = i + 1
				let nCss = css
				if (page === cur) nCss = { ...css, ...cssColorFormat(props, 'filterActive') }
				return (
					<div
						key={i}
						style={cssColorFormat(props, 'filterBox')}
						className={`ep-item${page === cur? ' s-active': ''}`}
						onClick={this.selectVal.bind(this, cur)}
					>
						<i style={nCss}>{ ns? cur: '' }</i>
					</div>
				)
			})
			node = (
				<div key={1} className="ep-page">{node}</div>
			)
		}
		return [prevNode, node, nextNode]
	}

	// 原点
	renderStyle1(props, body) {
		return this.renderDom.bind(this, props, body)()
	}
	
	render() {
		let { type, ioInput } = this.props
		let render = this[`render${type}`]? this[`render${type}`]: this.renderStyle1
		let dom    = render.bind(this, this.props, ioInput.body)()
		return (
			<section className={`e-page ${type}`}>
				{ dom }
			</section>
		)
	}
}

export default Page
