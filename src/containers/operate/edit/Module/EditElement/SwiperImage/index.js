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
			swiperOptions.spaceBetween = 30;
			swiperOptions.slidesPerView = 3;
		}  
		//this.mySwiper&&this.mySwiper.destroy(false);    
		console.log(swiperOptions); 
		props.data.content.length >1 ? this.initSwiper(swiperOptions) : null;
	}; 
	 initSwiper = (swiperOptions) => {
	 	this.mySwiper = new Swiper('.swiper-container', swiperOptions) 
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
		new_obj.navigation = {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	      }; 
		return new_obj
	};
	swiperType = () => {
		return {
        	
			
		 }
	};
	render() {
		let { data } = this.props;
		const borderRadius = data.style.swiperImage.borderRadius;
		return ( 
			<div className="e-SwiperImage">
				{
					data.content.length > 1 ?
						<div className="swiper-container outer_box">
							<div className="swiper-wrapper">
								{
									data.data.content.map((item,index) => <div className="swiper-slide" key={index} style={cssColorFormat(this.props, 'swiperImage')}><div className="text_show" style={cssColorFormat(this.props, 'text')}>{item.title}</div><img src={compImgFormat(this.props, item.img)} /></div>)
								}
							</div> 
							 
    						<div className="swiper-pagination"></div>
						</div> : <div className="outer_box" style={cssColorFormat(this.props, 'swiperImage')}><div className="text_show" style={cssColorFormat(this.props, 'text')}>{data.content[0].title}</div><img src={compImgFormat(this.props, data.content[0].img)} /></div>
				}
			</div>
		)
	}
}

export default SwiperImage

/*
<div className="swiper-button-prev"></div>  
<div className="swiper-button-next"></div>							*/