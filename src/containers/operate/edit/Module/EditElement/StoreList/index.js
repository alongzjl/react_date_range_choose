/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import Custom from '../Custom'

class StoreList extends React.Component {
	constructor(props) {
		super(props)

		// let ioInput = JSON.parse(JSON.stringify(props.data.feature))
		// this.state = {
		// 	ioInput: ioInput
		// }
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	state = {
		ioInput: {}
	}

	ioOuter(ipt) {
		this.setState({ ioInput: ipt })
		let { data, actions, idx, csn } = this.props
		let body = ipt.api.body
		let keys = []
		for (var p in body) {
			if (body[p]) {
				let o = {}
				o[p] = body[p]
				keys.push(o)
			}
		}
		console.clear()
		console.log(body)
	}

	init() {
		let { data, actions } = this.props
		this.state = {
			ioInput: data.feature
		}
	}

	render() {
		let { data, actions, idx, csn } = this.props
		this.init.bind(this)()
		return (
			<Custom
				data={data}
				actions={actions}
				idx={idx}
				csn={csn}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
				comp={data.components}
			/>
		)
	}
}

export default StoreList
