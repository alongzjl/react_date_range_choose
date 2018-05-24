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
		this.init(this.props)
	} 
	state = {
		random: parseInt(Math.random()*1000)
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
	 	this.mySwiperImage = new Swiper(`.swiper-container_${this.state.random}`, swiperOptions) 
	}; 
	formatObj = (obj) => {
		let new_obj = {};
		for(var key in obj){ 
			if(key == 'autoplay'&& obj[key]){
				new_obj.autoplay = obj['autoplayOptions']
			}else if(key == 'slideOptions'){
				for(var i in obj['slideOptions']){
					new_obj[i] = obj['slideOptions'][i]
				}  
			}else{
				if(key != 'autoplayOptions'){
					new_obj[key] = obj[key];
				}  
			} 
		}
		new_obj.pagination = {
				el: '.swiper-pagination',//分页元素
				type: 'bullets',          //类型 ‘fraction’  分式 ‘progressbar’  进度条
				clickable :true,  //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
		}  
		new_obj.watchSlidesProgress = true;
		new_obj.observer = true;//修改swiper自己或子元素时，自动初始化swiper 
		new_obj.observeParents = true;//修改swiper的父元素时，自动初始化swiper 
		return new_obj  
	};  
	swiperType = () => {
		return {
        	
			
		 }
	}
	render() {
		let { data } = this.props
		data = data.data
		const a = cssColorFormat(this.props, 'swiperImage')
		return (
			<div className="e-SwiperImage">
				<div className={`swiper-container swiper-container_${this.state.random} outer_box`}>
					<div className="swiper-wrapper">
						{
							data.content.map((item,index) => <div className="swiper-slide" key={index}><div className="text_show" style={cssColorFormat(this.props, 'text')}>{item.title}</div><img src={compImgFormat(this.props, item.img)} style={cssColorFormat(this.props, 'swiperImage')} /></div>)
						}
					</div>
				</div>
				<div className="swiper-pagination"></div>
			</div>
		)
	}
}

export default SwiperImage

/*
<div className="swiper-button-prev"></div>  
<div className="swiper-button-next"></div>							*/