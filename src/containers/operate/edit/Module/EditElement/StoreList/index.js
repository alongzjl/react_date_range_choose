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

let cusMap = {
	operate:  CustomO,
	business: CustomB
}

class StoreList extends React.Component {
	constructor(props) {
		super(props)
		this.init()
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}
	componentWillReceiveProps() {
		let { data } = this.props
		let { feature } = data
		let ipt = deepCopy(feature)
		this.getList(ipt)
		this.state = { ioInput: ipt }
		this.ioOuter(ipt)
	}

	ioOuter(ipt) {
		this.getList(ipt)
		this.setState({ ioInput: ipt })
		console.clear()
	}
	getList = (ipt) => {
		let { data } = this.props
		let { content } = data.data
		let size = ipt.body.size = content.size
		ipt.list = new Array(size).fill().map((_, i) => {
			var m = Math.floor(Math.random() * 1e2)
			return {
				id: i + 1,
				name:  'UNIQLO',
				price: `${m}.99`,
				floor: `L1=1${('00' + m).substr(-2)}`,
				no:    `1${('00' + m).substr(-2)}`,
				mall_id: '54f403eae4b002000cf63762',
				pic: 'http://rongyi.b0.upaiyun.com/commodity/text/201805311433385479.png'
			}
		})
	}

	init = () => {
		let { data } = this.props
		let { feature } = data
		let ipt = deepCopy(feature)
		this.getList(ipt)
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

export default StoreList
