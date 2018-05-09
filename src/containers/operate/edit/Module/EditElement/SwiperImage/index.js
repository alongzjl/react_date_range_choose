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
		this.init(props);
	}
	componentDidMount() {
		this.init(this.props);
	} 

	to = event => {
		event.preventDefault()
	};
	init = props => {
		let swiperOptions = props.data.feature.swiperOptions;
		swiperOptions = this.formatObj(swiperOptions);
		const type = props.data.feature.layout;
		if(type == 2){ 
			swiperOptions.on = this.swiperType();
			swiperOptions.centeredSlides = true;
			swiperOptions.loopedSlides = 3;
		} 
		console.log(swiperOptions); 
		props.data.content.length >1 ? this.initSwiper(swiperOptions) : null;
	}; 
	 initSwiper = (swiperOptions) => {
	 	new Swiper('.swiper-container', swiperOptions) 
	};
	formatObj = (obj) => {
		let new_obj = {};
		for(var key in obj){ 
			if(key == 'pagination'&& obj[key]){
				new_obj.pagination = obj['paginationOptions'];
			}else if(key == 'autoplay'&& obj[key]){
				new_obj.autoplay = obj['autoplayOptions']
			}else{
				if(key != 'autoplayOptions'&&key != 'paginationOptions'&&key != 'pagination'){
					new_obj[key] = obj[key];
				} 
			} 
		}
		new_obj.watchSlidesProgress = true;

		return new_obj
	};
	swiperType = () => {
		return {
        	
			 progress: function(progress) {
		    	for (var i = 0; i < this.slides.length; i++) {
					var slide = this.slides.eq(i);
					var slideProgress = this.slides[i].progress;
					var modify = 1;
					if (Math.abs(slideProgress) > 1) {
						modify = (Math.abs(slideProgress) - 1) * 0.3;
					}
					const translate = slideProgress * modify * (-60) + 'px';  
					const scale = 1 - Math.abs(slideProgress) / 3;
					const zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
					slide.transform('translateX(' + translate + ') scale(' + scale + ')');
					slide.css('zIndex', zIndex);
					slide.css('opacity', 1);
					if (Math.abs(slideProgress) > 3) {
						slide.css('opacity', 0);
					}  
				}   
			},  
			setTransition: function(transition) {
				for (var i = 0; i < this.slides.length; i++) {
					var slide = this.slides.eq(i)
					slide.transition(transition);
				}
			}
		 }
	};
	render() {
		let { data,feature } = this.props
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
							<div className="swiper-pagination"></div>
						</div> : <div className="outer_box"><div className="text_show" style={cssColorFormat(this.props, 'text')}>{data.content[0].title}</div><img src={compImgFormat(this.props, data.content[0].img)} /></div>
				}
			</div>
		)
	}
}

export default SwiperImage