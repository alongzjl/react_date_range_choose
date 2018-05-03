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
		//props.data.content.length >1 ? this.initSwiper() : null;
	}; 
	componentDidMount() {
		this.props.data.content.length >1 ? this.initSwiper() : null;
	};

	to = event => {
		event.preventDefault();
	};
	 initSwiper = () => {
    	this.swiper = new Swiper('.swiper-container', {
            loop: true,
            autoplay:true,  
            speed:1000,     
            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
            resistanceRatio : 0.5, 
             mousewheel: true,
             watchSlidesProgress : true
         }); 
    };
    
	render() { 
		let { data } = this.props;
		console.log(data);
		return (
			<div className="e-SwiperImage">
				{ 
					data.content.length>1 ? 
						<div className="swiper-container outer_box">
			                <div className="swiper-wrapper">
			                    {
			                        data.content.map((item,index) => <div className="swiper-slide" key={index}><div className="text_show" style={cssColorFormat(this.props, 'text')}>{item.text}</div><img src={item.img} onDragStart={(event)=>{event.preventDefault();}} /></div>)
			                    } 
			                </div> 
			            </div> : <div className="outer_box"><div className="text_show" style={cssColorFormat(this.props, 'text')}>{item.text}</div><img src={data.content[0].img} onDragStart={(event)=>{event.preventDefault();}} /></div>
				}
				 	 
			</div> 
		)
	}
}

export default SwiperImage