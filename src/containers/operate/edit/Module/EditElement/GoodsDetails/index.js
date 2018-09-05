import React from 'react'
import './index.less'

import CustomO from 'compEdit/EditElement/Custom'
import CustomB from 'compEditB/EditElement/Custom'
import CustomV from 'view/Element/Custom'
import * as Server from 'server'

let cusMap = {
	operate:  CustomO,
	business: CustomB
}

export default class GoodsDetails extends React.Component {
	constructor(props) {
		super(props)
		this.init()
	}
	componentWillMount() {
		this.getData()
	}

	componentDidMount() {
		let csn = this.props.csn
		if (!csn) return false
		let doc = document.querySelector(`.${csn}`)
		doc.addEventListener('scroll', throttle(this._handleScroll, 500, 500))
	}
	componentWillUnmount() {
		let csn = this.props.csn
		if (!csn) return false
		let doc = document.querySelector(`.${csn}`)
		doc.removeEventListener('scroll', throttle(this._handleScroll, 500, 500))
	}
	componentWillReceiveProps() {
		let { csn } = this.props
		let ipt = this.state.ioInput
		let doc = document.querySelector(`.${csn}`)
		ipt.scrollTop = doc? doc.scrollTop: 0
		this.state = { ioInput: ipt }
	}

	getData = e => {
		let ipt = this.state.ioInput
		Server.goods.getGoodsDetails(o => {
			ipt.item = o
			this.setState({ ioInput: ipt })
		})
	}

	_handleScroll = e => {
		let { ioInput } = this.state
		let doc = document.querySelector(`.${this.props.csn}`),
			st = doc.scrollTop
		this.setState({
			ioInput: {
				...ioInput,
				scrollTop: st
			}
		})
	}

	ioOuter(ipt) {
		this.setState({ ioInput: ipt })
		console.clear()
	}

	getItem = (ipt) => {
		let { feature } = this.props.data
		ipt.item = {}

		delete feature.item
		delete feature.map
	}

	init = () => {
		let { data, csn } = this.props
		let { feature } = data
		let ipt = deepCopy(feature)
		let doc = document.querySelector(`.${csn}`)
		ipt.scrollTop = doc? doc.scrollTop: 0
		this.getItem(ipt)
		this.state = { ioInput: ipt }
	}

	render() {
		let Custom = cusMap[envType] || CustomV
		return (
			<Custom
				{...this.props}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/>
		)
	}
}
