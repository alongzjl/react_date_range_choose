/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import CustomO from 'compEdit/EditElement/Custom'
import CustomB from 'compEditB/EditElement/Custom'
import CustomV from 'view/Element/Custom'
import * as Server from 'server'
import * as variable from 'var'
let mockMap = variable.mockMap.item
let cusMap = {
	operate:  CustomO,
	business: CustomB
}

export default class GoodsDetails extends React.Component {
	constructor(props) {
		super(props)
		this.init()
	}
	componentWillMount() {}

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
		let { data, csn } = this.props
		let { ioInput } = this.state
		let { feature } = data
		let ipt = deepCopy(feature)
		let doc = document.querySelector(`.${csn}`)
		ipt.scrollTop = doc? doc.scrollTop: 0
		ipt.item = ioInput.item
		// this.getItem(ipt)
		this.state = { ioInput: ipt }
		// this.ioOuter(ipt)
	}

	getData = ipt => {
		if (envType !== 'business') return
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
		let { data } = this.props
		let item = mockMap[data.name] || {}
		let { feature } = data
		let { content } = data.data
		ipt.item = envType !== 'business'? item: {}
		this.getData(ipt)
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
