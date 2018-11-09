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
		this.getData(props);
	}
	componentDidMount() {
		this.getData(this.props)
	} 
	state = {
		random: Date.now() + parseInt(Math.random()*1000),
		realIndex: 0
	}
	to = event => {
		event.preventDefault()
	};
	init = props => {
		let swiperOptions = props.data.feature.swiperOptions;
		swiperOptions = this.formatObj(swiperOptions);
		const type = props.data.feature.layout;
		this.mySwiperImage && this.mySwiperImage.destroy(false);
		clearTimeout(this.timer)
		this.initSwiper(swiperOptions);  
	};      
	 initSwiper = (swiperOptions) => {
	 	this.timer = setTimeout(()=>{ this.mySwiperImage = new Swiper(`.swiper-container_${this.state.random}`, swiperOptions)  },10) 
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
		new_obj.on = {
			slideChange:()=>{
				this.mySwiperImage ? this.setState({realIndex:this.mySwiperImage.realIndex}) : null
			}
		}
		new_obj.watchSlidesProgress = true;
		new_obj.observer = true;//修改swiper自己或子元素时，自动初始化swiper 
		new_obj.observeParents = true;//修改swiper的父元素时，自动初始化swiper 
		return new_obj  
	};  
	componentWillUnmount() {
		clearTimeout(this.timer)
		this.mySwiperImage && this.mySwiperImage.destroy(false)
	} 
	getData = props => { 
		let { data } = props,
			{ feature} = data, 
			swiperOptions = JSON.stringify(feature.swiperOptions),
			content = JSON.stringify(data.data.content)
		this.setState({content:content,swiperOptions:swiperOptions})
	}  
	shouldComponentUpdate(newProps, newState){
		let { data } = newProps,
			{ feature} = data, 
			swiperOptions = JSON.stringify(feature.swiperOptions),
			content = JSON.stringify(data.data.content)
		if(this.state.content != content || this.state.swiperOptions != swiperOptions){
			this.init(newProps)
			return true
		}else if(this.state.realIndex != newState.realIndex){
			return true
		}
		return false
	}    
	render() {
		let { data } = this.props
		data = data.data
		return (
			<div className="e-SwiperImage">
				<div className={`swiper-container swiper-container_${this.state.random} outer_box`}>
					<div className="swiper-wrapper">
						{
							data.content.map((item,index) => <div className="swiper-slide" key={index}><img src={compImgFormat(this.props, item.img)} style={cssColorFormat(this.props, 'swiperImage')} /></div>)
						}
					</div>
				</div>
				<PageRY totalPage={data.content.length} currentPage={this.state.realIndex} props={this.props}></PageRY>
			</div>
		)
	}
}

class PageRY extends React.Component {
	
	renderDom(props, totalPage,currentPage) {
		let node = Array.from(new Array(totalPage)).map((_, i) => {
			let cur = i
			let nCss = cssColorFormat(props, 'pageSet')
			if (currentPage === cur) nCss = { ...nCss, ...cssColorFormat(props, 'filterActive') }
			return (
				<div
					key={i}
					style={nCss}
					className={`ep-item${currentPage === cur? ' s-active': ''}`}
				>
				</div>
			)
		})
		node = (
			<div className="ep-page">{node}</div>
		)
		return node
	}

	render() {
		let { totalPage,currentPage,props } = this.props
		return (
			<section className="e-page">
				{ this.renderDom.bind(this, props, totalPage,currentPage)() }
			</section>
		)
	}
}

export default SwiperImage
