/**
 * @Author: Along
 * @Date:   2018-05-03
 */


import React from 'react'
// import Swiper from 'react-id-swiper'
import Swiper from 'swiper'
import './index.less'


export default class SwiperBind extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			idx: 0,
			random: parseInt(Math.random() * 1e9)
		}
	}
	componentWillReceiveProps(props) {
		this.init(props)
	}
	componentDidMount() {
		this.init(this.props)
	}
	componentWillUnmount() {
		this.swiper.destroy(false)
	}
	init = props => {
		this.initSwiper()
	}
	initSwiper = (opts) => {
		if (this.swiper) this.swiper.destroy()
		let { random } = this.state
		let { data } = this.props,
			{ feature } = data,
			{ width, height } = data.data.layout,
			{ swiperOptions } = feature
		let params = {
			width,
			height,
			autoplay: true,
			delay: 3000,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true
			},
			// spaceBetween: 0
		}
		this.swiper && this.swiper.destroy(false)
		this.swiper = new Swiper(`.swiper-container_${random}`, params) 
	}
	renderDom = (list) => {
		let { random } = this.state
		let slide = list.map((_, i) => {
			return <div className="swiper-slide" key={i}><img src={_}  style={cssColorFormat(this.props, 'swiperImage')} /></div>
		})
		return (
			<div className={`swiper-container swiper-container_${random}`}>
				<div className="swiper-wrapper">
					{ slide }
				</div>
				<div className={`swiper-pagination swiper-pagination_${random}`}></div>
			</div>
		)
	}
	render() {
		let props = this.props,
			{ ioInput } = props,
			ipt = ioInput? ioInput: props,
			{ data } = props,
			{ item } = ipt,
			{ bind } = data.data.content,
			imgs = bind? item[bind].split(','): [null]
		let dom = this.renderDom(imgs)

		return (
			<section className="e-swiper-bind" style={cssColorFormat(this.props, 'swiperImage')}>
				{ dom }
			</section>
		)
	}
}
