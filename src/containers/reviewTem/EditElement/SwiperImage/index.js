/**
 * @Author: Along
 * @Date:   2018-05-03

 */


import React from 'react'
import Swiper from 'swiper'
import JumpRouter from '../JumpRouter'
import checkToJump from '../checkToJump'
import 'swiper/dist/css/swiper.css'
import './index.less'
 
class SwiperImageShow extends React.Component {
	state = {
		random: parseInt(Math.random()*10000),
		realIndex:0
	}
	componentDidMount() {
		this.init(this.props)
	} 
	componentWillReceiveProps(props) {
		this.init(props)
	}   
	
	init = props => {
		let swiperOptions = props.data.feature.swiperOptions;
		swiperOptions = this.formatObj(swiperOptions);
		if(getAttr(this.mySwiperImage) == 'Array'){
			this.mySwiperImage.map(_=>{
				_.destroy(false)
			})
		}else{
			this.mySwiperImage&&this.mySwiperImage.destroy(false)
		}
		this.initSwiper(swiperOptions);   
	}          
	 initSwiper = swiperOptions => {
	 	this.mySwiperImage = new Swiper(`.swiper-container_${this.state.random}`, swiperOptions) 
	}  
	formatObj = obj => { 
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
			},
			tap:()=>{
				let { data } = this.props;
				data = data.data; 
				const params = data.content[this.mySwiperImage.realIndex].router;
				this.toPage(params)
			}
		} 
		new_obj.watchSlidesProgress = true;
		new_obj.observer = true;//修改swiper自己或子元素时，自动初始化swiper 
		new_obj.observeParents = true;//修改swiper的父元素时，自动初始化swiper 
		return new_obj 
	};  
	componentWillUnmount() {
		if(getAttr(this.mySwiperImage) == 'Array'){
			this.mySwiperImage.map(_=>{
				_.destroy(false)
			})
		}else{
			this.mySwiperImage&&this.mySwiperImage.destroy(false)
		}
	} 
	toPage = data => {
	 	const {animate,animateParams,action} = this.props,
		dataStr = checkToJump('RYRouterSet',data);
		JumpRouter(dataStr,animate,animateParams,action);
	};
	render() { 
		let { data } = this.props;
		data = data.data;   
		return ( 
			<div className="e-SwiperImage-show">
				<SwiperContentShow random={this.state.random} props={this.props} content={data.content} />
				<PageRYSwiperShow totalPage={data.content.length} currentPage={this.state.realIndex} props={this.props} />
			</div>
		)
	} 
} 
//轮播单独渲染，不重复渲染
class SwiperContentShow extends React.Component {
	render() { 
		let { random,content,props } = this.props
		return(
			<div className={`swiper-container swiper-container_${random} outer_box`}>
				<div className="swiper-wrapper">
					{
						content.map((item,index) => <div className="swiper-slide" key={index} style={cssColorFormat(props, 'swiperImage')}>{ compImgFormat(props, item.img) ? <img src={compImgFormat(props, item.img)} /> : null }</div>)
					} 
				</div>   
			</div>
		) 
	}
}
//渲染分页显示组件
function PageRYSwiperShow({ totalPage,currentPage,props }){
	return (
		<section className="e-page">
			<div className="ep-page">
				{
					Array.from(new Array(totalPage)).map((_, i) => {
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
				}
			</div>
		</section>
	)
}
export default SwiperImageShow
