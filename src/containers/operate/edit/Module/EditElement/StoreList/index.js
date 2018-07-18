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
		this.makeArr = this.makeArr.bind(this)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	ioOuter(ipt) {
		let { data, actions, idx, csn } = this.props
		let body = ipt.body
		let keys = []
		let size = data.data.content.size || 12
		ipt.list = this.makeArr(size)
		this.setState({ ioInput: ipt })
		console.clear()
		console.log(body)
	}
	makeArr(size){
		return new Array(size).fill().map((_, i) => {
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
	init() {
		let { data } = this.props
		let { feature } = data
		let { content } = data.data
		feature.body.size = content.size
		feature.list = this.makeArr(content.size)
		this.state = {
			ioInput: feature
		}
	}

	render() {
		let Custom = cusMap[envType] || CustomV
		this.init.bind(this)()

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
