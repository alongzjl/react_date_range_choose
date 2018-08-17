import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'
import SwiperElement from 'compEdit/EditCommon/SwiperElement'
import * as Server from 'server'

export default class SwiperByGoods extends React.Component {
	constructor(props) {
		super(props)
		var { relist } = props.ioInput
		this.state = {
			list: envType !== 'business'? relist: []
		}
		if (envType === 'business') this.getData()
	}

	componentWillReceiveProps(props) {}
	componentDidMount() {}
	componentWillUnmount() {}

	getData = cb => {
		Server.goods.getRecGoodsList(o => {
			this.setState({ list: o })
		})
	}

	renderDom = e => {
		let { content, componentLayout, layout } = this.props.data.data,
			{ list } = this.state
		let slide = list.map((_, i) => {
			return (
				<div className="swiper-slide" key={i}>
					<Layout
						data={_}
						layout={layout}
						components={componentLayout}
						autoplay={true}
						styleObj={cssColorFormat(this.props, 'filterBox')}
					/>
				</div>
			)
		})
		return <SwiperElement props={this.props} options={content.swiperOptions} random={parseInt(Math.random() * 1e9)}>{ slide }</SwiperElement>
	}
	render() {
		let dom = this.renderDom()

		return (
			<section className={`e-swiper-by-goods`}>
				{ dom }
			</section>
		)
	}
}
