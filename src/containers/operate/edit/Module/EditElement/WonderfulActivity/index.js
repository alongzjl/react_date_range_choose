/**
 * @Author: Along
 * @Date:   2018-05-03

 */


import React from 'react'
import Swiper from 'swiper'

import 'swiper/dist/css/swiper.css'
import './index.less'

class WonderfulActivity extends React.Component {
	state = {
		lists:[],
		random:1
	}
	componentWillReceiveProps(props) {
		this.init(props);
	}
	componentDidMount() {
		const content = this.props.data.data.content;
		const number = parseInt(Math.random()*100); 
		this.setState({ 
			random:number
		}); 
		if(content&&content.length > 0){
			this.setState({
				lists:content
			});
			this.init(this.props);  
		}else{
			this.getData(this.props,this.init);
		} 
	}    

	to = event => {
		event.preventDefault()
	};
	init = props => {
		let swiperOptions = props.data.feature.swiperOptions;
		swiperOptions = this.formatObj(swiperOptions);
		const type = props.data.feature.layout;
		//console.log(JSON.stringify(swiperOptions)); 
		this.mySwiper && this.mySwiper.destroy(false);  
		this.initSwiper(swiperOptions); 
	};      
	 initSwiper = (swiperOptions) => {
	 	this.mySwiper = new Swiper(`.swiper-container_${this.state.random}`, swiperOptions) 
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
	getData = (data,fn) => {
		Ajax.get('/store/wonderfulActivity').then(res => {
			console.log(res);
			this.setState({
				lists:res.data
			}) 
			fn&&fn(data);
		})
	};
	render() {   
		//console.log(this.props.data,JSON.stringify(this.props.data));
		return ( 
			<div className="e-WonderfulActivity"> 
				<div className={`swiper-container swiper-container_${this.state.random} outer_box`}>
					<div className="swiper-wrapper">
						{ 
							this.state.lists.map((item,index) => <div className="swiper-slide" key={index} style={cssColorFormat(this.props, 'swiperImage')}><div className="text_show" style={cssColorFormat(this.props, 'text')}>{item.title}</div><img src={item.url} /></div>)
						}
					</div> 
					 
					<div className="swiper-pagination"></div>
				</div> 
			</div>
		) 
	}
}
 
export default WonderfulActivity
 