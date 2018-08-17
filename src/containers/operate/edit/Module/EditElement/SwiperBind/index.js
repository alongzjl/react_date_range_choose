/**
 * @Author: Along
 * @Date:   2018-05-03
 */


import React from 'react'
import './index.less'

import SwiperElement from 'compEdit/EditCommon/SwiperElement'

export default class SwiperBind extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			random: parseInt(Math.random() * 1e9)
		}
	}

	componentWillReceiveProps(props) {}

	componentDidMount() {}

	componentWillUnmount() {}

	renderDom = (list, options) => {
		let { random } = this.state,
			slide = list.map((_, i) => {
			return <div className="swiper-slide" key={i}><img src={_}  style={cssColorFormat(this.props, 'swiperImage')} /></div>
		})
		return <SwiperElement props={this.props} options={options}>{ slide }</SwiperElement>
	}
	render() {
		let props = this.props
		let { ioInput } = props
		let ipt = ioInput? ioInput: props
		let { data } = props
		let { item } = ipt
		let { bind, swiperOptions } = data.data.content
		let imgs = bind? item[bind] || []: []
		let dom = this.renderDom(imgs, swiperOptions)

		return (
			<section className="e-swiper-bind" style={cssColorFormat(this.props, 'swiperImage')}>
				{ dom }
			</section>
		)
	}
}
