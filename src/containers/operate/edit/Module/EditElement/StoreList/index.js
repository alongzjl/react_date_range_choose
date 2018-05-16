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

let Custom

class StoreList extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	ioOuter(ipt) {
		let { data, actions, idx, csn } = this.props
		let body = ipt.body
		let keys = []
		// for (var p in body) {
		// 	if (body[p]) {
		// 		let o = {}
		// 		o[p] = body[p]
		// 		keys.push(o)
		// 	}
		// }
		// Ajax.get('/store/getStoreList').then(res => {
			var m = Math.floor(Math.random() * 1e3)
			ipt.list = [
				{
					id: 1,
					name:  `法拉利${m}`,
					price: `${m}.99`,
					floor: 'L1',
					no:    '101',
					mall_id: '54f403eae4b002000cf63762',
					pic: 'http://img.weiye.me/zcimgdir/headimg/32d7529d24439f8c4a22f753c918326e_o.jpg'
				}
			]
			this.setState({ ioInput: ipt })
		// }).catch(e => console.log(e))
		console.clear()
		console.log(body)
	}

	init() {
		let { data } = this.props
		let { feature } = data
		let { content } = data.data
		feature.body.size = content.size
		this.state = {
			ioInput: feature
		}
	}

	render() {
		let { data, actions, idx, csn } = this.props
		if (envType === 'operate')       Custom = CustomO
		else if (envType === 'business') Custom = CustomB
		else                             Custom = CustomV
		this.init.bind(this)()

		return (
			<Custom
				data={data}
				actions={actions}
				idx={idx}
				csn={csn}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/>
		)
	}
}

export default StoreList
