import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'

export default class ResetByGoods extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(props) {}

	componentDidMount() {}

	componentWillUnmount() {}

	renderDom = e => {
		let { data } = this.props,
			{ content, componentLayout, layout } = data.data

		let slide = (
			<Layout
				data={{}}
				layout={layout}
				components={componentLayout}
				styleObj={cssColorFormat(this.props, 'filterBox')}
			/>
		)
		return slide
	}
	render() {
		let dom = this.renderDom()

		return (
			<section className={`e-reset-by-goods`}>
				{ dom }
			</section>
		)
	}
}
