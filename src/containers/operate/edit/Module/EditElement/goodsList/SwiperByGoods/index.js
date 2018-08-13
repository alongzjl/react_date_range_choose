import React from 'react'
import './index.less'

import Layout from 'compEdit/EditElement/Layout'
import SwiperElement from 'compEdit/EditCommon/SwiperElement'

export default class SwiperByGoods extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillReceiveProps(props) {}

	componentDidMount() {}

	componentWillUnmount() {}

	renderDom = e => {
		let { data, ioInput } = this.props,
			{ list } = ioInput,
			{ content, componentLayout, layout } = data.data,
			{ rel } = content
		let finalList = list
		if (envType === 'business') {
			// 根据rel获取推荐商品
		}

		let slide = finalList.map((_, i) => {
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
