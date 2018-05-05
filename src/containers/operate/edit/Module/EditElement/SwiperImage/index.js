/**
 * @Author: Along
 * @Date:   2018-05-03

 */


import React from 'react'
import Swiper from 'swiper'

import 'swiper/dist/css/swiper.css'
import './index.less'

class SwiperImage extends React.Component {
	
	componentWillReceiveProps(props) {
		const switch_but = props.data.feature.switch;
		const autoPlayTime = props.data.feature.autoPlayTime;
		props.data.content.length >1 ? this.initSwiper(switch_but,autoPlayTime) : null;
	}
	componentDidMount() {
		const switch_but = this.props.data.feature.switch;
		const autoPlayTime = this.props.data.feature.autoPlayTime;
		this.props.data.content.length >1 ? this.initSwiper(switch_but,autoPlayTime) : null;
	}

	to = event => {
		event.preventDefault()
	}
	 initSwiper = (autoplay,autoPlayTime) => {
		this.swiper = new Swiper('.swiper-container', {
			loop:            true,
			autoplay:        autoplay,
			speed:           autoPlayTime,
			effect:          'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
			resistanceRatio: 0.5,
			mousewheel:      true,
			watchSlidesProgress: true
		 })
	}
	
	render() {
		let { data } = this.props
		// console.log(data)
		return (
			<div className="e-SwiperImage">
				{
					data.content.length > 1 ?
						<div className="swiper-container outer_box">
							<div className="swiper-wrapper">
								{
									data.content.map((item,index) => <div className="swiper-slide" key={index}><div className="text_show" style={cssColorFormat(this.props, 'text')}>{item.title}</div><img src={compImgFormat(this.props, item.img)} /></div>)
								}
							</div>
						</div> : <div className="outer_box"><div className="text_show" style={cssColorFormat(this.props, 'text')}>{data.content[0].title}</div><img src={compImgFormat(this.props, data.content[0].img)} /></div>
				}
			</div>
		)
	}
}

export default SwiperImage