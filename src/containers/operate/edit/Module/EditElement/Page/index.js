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
	itemRender(cur, type, ele) {
		let { props } = this
		let { ioInput } = props
		let { body }    = ioInput
		if (type === 'page') return <div style={cssColorFormat(props, 'filterBox')} className={`ep-item${body.page === cur? ' s-active': ''}`}><i style={nCss}></i></div>
		return false
	}
	renderDom(props, body) {
		let { page, size, total } = body
		let totalPage = Math.ceil(total / size)
		let img = props.data.content.filterBGImg
		let css = cssColorFormat(props, 'filter')
		let node = Array.from(new Array(totalPage)).map((_, i) => {
			let cur = i + 1
			let nCss = css
			if (body.page === cur) nCss = { ...css, ...cssColorFormat(props, 'filterActive') }
			return (
				<div
					key={i}
					style={cssColorFormat(props, 'filterBox')}
					className={`ep-item${body.page === cur? ' s-active': ''}`}
					onClick={this.selectVal.bind(this, cur)}
				>
					<i style={nCss}></i>
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
		let { type, ioInput } = this.props
		let dom = this[`render${type}`].bind(this, this.props, ioInput.body)()
		return (
			<section className={`e-page ${type}`}>
				{ dom }
			</section>
		)
	}
}

export default Page
