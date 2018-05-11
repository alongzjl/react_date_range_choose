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
		this.mySwiperImage && this.mySwiperImage.destroy(false); 
		this.initSwiper(swiperOptions);  
	};     
	 initSwiper = (swiperOptions) => {
	 	this.mySwiperImage = new Swiper('.swiper-container-image', swiperOptions) 
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
		new_obj.observer = true;//修改swiper自己或子元素时，自动初始化swiper 
		new_obj.observeParents = true;//修改swiper的父元素时，自动初始化swiper 
		return new_obj  
	};  
	swiperType = () => {
		return {
        	
			
		 }  
	};
	render() {
		let { data } = this.props;
		data = data.data;   
		return ( 
			<div className="e-SwiperImage">
				{
					<div className="swiper-container-image outer_box">
						<div className="swiper-wrapper">
							{
								data.content.map((item,index) => <div className="swiper-slide" key={index} style={cssColorFormat(this.props, 'swiperImage')}><div className="text_show" style={cssColorFormat(this.props, 'text')}>{item.title}</div><img src={compImgFormat(this.props, item.img)} /></div>)
							} 
						</div>   
						 
						<div className="swiper-pagination"></div>
					</div>
				}  
			</div>
		)
	}
} 

export default SwiperImage

/*
<div className="swiper-button-prev"></div>  
<div className="swiper-button-next"></div>							*/