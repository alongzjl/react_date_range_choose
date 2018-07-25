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
		// doc.addEventListener('scroll', this._handleScroll)
	}

	componentWillUnmount() {
		let csn = this.props.csn
		if (!csn) return false
		let doc = document.querySelector(`.${csn}`)
		doc.removeEventListener('scroll', throttle(this._handleScroll, 500, 500))
		// doc.removeEventListener('scroll', this._handleScroll)
	}

	componentWillReceiveProps() {
		let { data } = this.props
		let { feature } = data
		let ipt = deepCopy(feature)
		ipt.scrollTop = 0
		this.getItem(ipt)
		this.state = { ioInput: ipt }
		this.ioOuter(ipt)
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
		this.getItem(ipt)
		this.setState({ ioInput: ipt })
		console.clear()
	}

	getChs() {
		// return String.fromCodePoint(Math.round(Math.random() * 20901) + 19968)
		var str = ['好', '太', '非常', '无与伦比的', '超级'][Math.floor(Math.random() * 5)]
		return `庄家琪${str}帅!`
	}

	getItem = (ipt) => {
		let { data } = this.props
		let { feature } = data
		let { content } = data.data
		let m    = Math.floor(Math.random() * 1e3),
			m2   = m + Math.floor(Math.random() * 50),
			chs  = new Array(5).fill().map(() => this.getChs()).join('')
		ipt.item = {
			id:       1,
			price:    `9925.0`,
			oldPrice: `9799.9`,
			brand:    'TELEFLORA',
			name:     'TELEFLORA 11朵粉紫玫瑰七夕花束预定当天自提',
			pic:      'http://rongyi.b0.upaiyun.com/commodity/text/201807191807420161.jpg',
			pics:     'http://a.vpimg3.com/upload/merchandise/pdcvis/2018/07/04/176/79c5de67-8f8f-4463-a82d-364d3dcd92e5_420x420_90.jpg,http://a.vpimg3.com/upload/merchandise/pdcvis/2018/07/04/62/bacab0f7-7b39-4631-b6ff-029e65ae5339_420x420_90.jpg,http://a.vpimg3.com/upload/merchandise/pdcvis/2018/07/04/115/51673b5a-f7ac-47f2-8dc3-ad6f8560631e_420x420_90.jpg',
			QRPic:    'http://rongyi.b0.upaiyun.com/commodity/text/201807181419502662.png',
			sTime:    '2016年秋季',
			catg:     '野兽干花',
			pType:    '桶装',
			artNo:    '367687980898',
			spec:     '72米色 09黑色'
		}
		feature.item = ipt.item
	}

	init = () => {
		let { data } = this.props
		let { feature } = data
		let ipt = deepCopy(feature)
		ipt.scrollTop = 0
		this.getItem(ipt)
		feature.map = {
			price:     '价格',
			oldPrice:  '原价',
			brand:     '品牌',
			name:      '商品名称',
			pic:       '图片',
			pics:      '图片列表',
			QRPic:     '二维码',
			sTime:     '上架时间',
			catg:      '产品分类',
			pType:     '包装种类',
			artNo:     '货号',
			spec:      '颜色规格'
		}
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
