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

export default class GoodsList extends React.Component {
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

	getChs() {
		// return String.fromCodePoint(Math.round(Math.random() * 20901) + 19968)
		var str = ['好', '太', '非常', '无与伦比的', '超级'][Math.floor(Math.random() * 5)]
		return `庄家琪${str}帅!`
	}

	getList = (ipt) => {
		let { data } = this.props
		let { feature } = data
		let { content } = data.data
		let size = ipt.body.size = content.size
		ipt.list = new Array(size).fill().map((_, i) => {
			var m   = Math.floor(Math.random() * 1e3),
				m2  = m + Math.floor(Math.random() * 50),
				chs = new Array(5).fill().map(() => this.getChs()).join('')
			return {
				id:       i + 1,
				price:    `${m}.99`,
				oldPrice: `${m2}.99`,
				// name:     '康帅傅' + chs,
				name:     chs,
				pic:      'http://rongyi.b0.upaiyun.com/commodity/text/201807191807420161.jpg',
				QRPic:    'http://rongyi.b0.upaiyun.com/commodity/text/201807181419502662.png'
			}
		})
		feature.list = [ipt.list[0]]
	}

	init = () => {
		let { data } = this.props
		let { feature } = data
		let ipt = deepCopy(feature)
		this.getList(ipt)
		feature.map = {
			price:     '价格',
			oldPrice:  '原价',
			name:      '商品名称',
			pic:       '图片',
			QRPic:     '二维码',
		}
		this.state = { ioInput: ipt }
	}

	render() {
		let Custom = cusMap[envType] || CustomV
		// this.init()
		return (
			<Custom
				{...this.props}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/>
		)
	}
}
