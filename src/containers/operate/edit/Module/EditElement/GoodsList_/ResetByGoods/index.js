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

	onChange = e => {
		e.stopPropagation()
		let { ioInput, ioOuter } = this.props,
			{ body } = ioInput
		delete body.catg
		ioOuter(ioInput)
	}
	renderDom = e => {
		let { data, ioInput } = this.props,
			{ catg } = ioInput.body,
			{ componentLayout, layout } = data.data
		let cl = []
		componentLayout.map(_ => {
			var { active } = _.feature
			if ((typeof catg != 'number' && active) || (typeof catg === 'number' && !active)) {
				cl.push(_)
			}
		})
		let slide = (
			<Layout
				data={{}}
				layout={layout}
				components={cl}
			/>
		)
		return slide
	}
	render() {
		let dom = this.renderDom()

		return (
			<section
				className={`e-reset-by-goods`}
				style={cssColorFormat(this.props, 'filterBox')}
				onClick={e => this.onChange(e)}
			>
				{ dom }
			</section>
		)
	}
}
