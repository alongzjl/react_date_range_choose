/**
 * @Author: Along
 * @Date:   2018-05-03

 */


import React from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import { Player,LoadingSpinner,ControlBar,BigPlayButton } from 'video-react'
import "video-react/dist/video-react.css"
import './index.less'


class RYSwiper extends React.Component {
	state = {
		content:[]
	}
	componentDidMount(){
		let { data } = this.props
		data = data.data
		this.setState({content:data.content})
	}
	render(){
		
		return (<SwiperImageNew content={this.state.content} props={this.props}></SwiperImageNew>)
	}
}

//视频和图片组合轮播
/*class ImageAndVideo extends React.Component {

	render(){
		return ()
	}
}*/
//单独视频
function OneVideo({content}){

	return (<div className="e-video"> 
					<video src={content.img.video} controls={false} autoPlay loop>
						您的浏览器不支持 video 标签。
					</video> 
				</div>
			)
} 
 
//一张图片
function OneImage({content,props}){

	return (
				<div className="e-img">
					<img src={compImgFormat(props, content.img)} />
				</div>
			)
} 

//只有图片
class SwiperImageNew extends React.Component {

	state = {
		random: Date.now() + parseInt(Math.random()*1000),
		realIndex: 0
	}
	componentWillReceiveProps(props) {
		this.init(props);
	}
	componentDidMount() {
		this.init(this.props)
	} 
	init = props => {
		let swiperOptions = props.props.data.feature.swiperOptions;
		swiperOptions = formatObj(swiperOptions,()=>{
			this.mySwiperImage ? this.setState({realIndex:this.mySwiperImage.realIndex}) : null
		});      
		destroySwiper(this.mySwiperImage)
		this.mySwiperImage = new Swiper(`.swiper-container_${this.state.random}`, swiperOptions)   
	}        
	   
	componentWillUnmount() {
		destroySwiper(this.mySwiperImage)
	}
	render() {
		let { props,content } = this.props
		return ( 
			<div className="e-SwiperImage">
				<div className={`swiper-container swiper-container_${this.state.random} outer_box`}>
					<div className="swiper-wrapper">
						{
							content.map((item,index) => <div className="swiper-slide" key={index}><img src={compImgFormat(props, item.img)} style={cssColorFormat(props, 'swiperImage')} /></div>)
						}  
					</div>
				</div>
				<PageRY totalPage={content.length} currentPage={this.state.realIndex} props={props}></PageRY>
			</div>
		)
	}
}

//销毁swiper
function destroySwiper(swiper){
	if(getAttr(swiper) == 'Array'){
		swiper.map(_=>{
			_.destroy()
		}) 
	}else{
		swiper&&swiper.destroy()
	}
}
//轮播参数解析
function formatObj(obj,fn) {
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
		slideChange:()=>{ fn&&fn() }
	}
	new_obj.watchSlidesProgress = true;
	new_obj.observer = true;//修改swiper自己或子元素时，自动初始化swiper 
	new_obj.observeParents = true;//修改swiper的父元素时，自动初始化swiper 
	return new_obj  
};

class SwiperImage extends React.Component {
	
	componentWillReceiveProps(props) {
		clearTimeout(this.timerSlide)
		this.init(props);
	}
	componentDidMount() {
		this.init(this.props)
	} 
	state = {
		random: Date.now() + parseInt(Math.random()*1000),
		realIndex: 0,
		content:[{img:''}],
		delay:1000,
	    speed:1000,
	    autoplay:true
	}
	to = event => {
		event.preventDefault()
	};
	init = props => {
		let { data } = props, 
			 content = data.data.content,
			 swiperOptions = data.feature.swiperOptions,
			 delay = swiperOptions.autoplay ? swiperOptions.autoplayOptions.delay : 1000,
			 autoplay = !swiperOptions.autoplay ? false :true;
		let contentNew = content.map(_=>{
			let img = '';
			if(_.img){
				if(getAttr(_.img) == 'Object'){
					Object.keys(_.img).map(key=>{
						if(key == 'img') img = _.img[key]
						else if(key == 'video') img = _.img[key]
					})
				} 
			} 
			return {
				img:img,
				title:_.title
			}
		});
		if(contentNew.length <= 1){
			this.mySwiperImage && this.mySwiperImage.destroy(false);
			this.setState({content:contentNew})
			return false
		}
		swiperOptions = this.formatObj(swiperOptions);
		this.setState({ 
			delay:2000,
			speed:swiperOptions.speed,
			autoplay:autoplay,
			content:contentNew,
			realIndex:0
		},()=>{this.initSwiper(swiperOptions,this.firstVideo)})
	};      
	 initSwiper = (swiperOptions,fn) => {
	 	this.mySwiperImage && this.mySwiperImage.destroy(false);
	 	this.mySwiperImage = new Swiper(`.swiper-container_${this.state.random}`, swiperOptions) 
		 setTimeout(()=>{
	      fn&&fn();
	    },500)  
	    this.slideChange()
	}; 
	formatObj = (obj) => {
		let new_obj = {},that = this;
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
			transitionEnd:()=>{
				if(!that.mySwiperImage || !that.state.autoplay) return
				let realIndex = that.mySwiperImage.activeIndex;
				if(that.mySwiperImage.params.loop){
					if(realIndex == that.state.content.length + 1){
			            that.mySwiperImage.slideTo(1,0,false)
			            return false
			          }
				}
			}
		}
		new_obj.autoplay = false;
		new_obj.watchSlidesProgress = true;
		new_obj.observer = true;//修改swiper自己或子元素时，自动初始化swiper 
		new_obj.observeParents = true;//修改swiper的父元素时，自动初始化swiper 
		return new_obj  
	};
	slideChange = () => {
	    let that = this
	    this.mySwiperImage.on('slideChange',()=>{
	       if(!that.mySwiperImage || !that.state.autoplay) return
	       	let realIndex = that.mySwiperImage.activeIndex,
	            content = that.state.content[realIndex-1],
	            next = realIndex + 1
	        clearTimeout(that.timerSlide) 
	        that.setState({realIndex:that.mySwiperImage.realIndex})
	        console.log(that.mySwiperImage.realIndex+'---'+realIndex)
	        if(!that.mySwiperImage.params.loop){ 
	            content = that.state.content[realIndex]
	           if(realIndex == that.state.content.length - 1){
		            next = 0
		          }
		          realIndex = realIndex + 1
	        }else{
	        	if(realIndex == that.state.content.length + 1){
		             content = that.state.content[0]
		             realIndex = 1
		          }
	        }
	        that.refs[`RYPlayer_${realIndex-1}`] ? that.refs[`RYPlayer_${realIndex-1}`].pause() : null
	        that.refs[`RYPlayer_${realIndex+1}`] ? that.refs[`RYPlayer_${realIndex+1}`].pause() : null
	        if(content.img&&content.img.indexOf('.mp4') > -1){
	        	let { player } = that.refs[`RYPlayer_${realIndex}`].getState()
	            that.refs[`RYPlayer_${realIndex}`].load()
	            that.refs[`RYPlayer_${realIndex}`].play()
	            that.timerSlide = setTimeout(()=>{
	               that.mySwiperImage.slideTo(next,that.state.speed,false)
	            },player.duration*1000)
	         }else{  
	         	 that.timerSlide = setTimeout(()=>{that.mySwiperImage.slideTo(next,that.state.speed,false)},that.state.delay)
	         }  
	    })
	}; 
	firstVideo = () => {
		let content = this.state.content[0],
	        activeIndex = this.mySwiperImage.activeIndex;
	    if(!this.state.autoplay) return
	    if(content.img.indexOf('.mp4') > -1){
	      if(!this.refs) return 
	      let { player } = this.refs[`RYPlayer_1`].getState()
	      this.refs[`RYPlayer_1`].play()
	      setTimeout(()=>{
	         this.mySwiperImage.slideTo(activeIndex+1,this.state.speed,false)
	      },player.duration*1000)
	    }else{
	    	setTimeout(()=>{this.mySwiperImage.slideTo(activeIndex+1,this.state.speed,false)},this.state.delay);
	    }
	}; 
	componentWillUnmount() {
		this.mySwiperImage.destroy(false)
	};
	render() {
		return (
			<div className="e-SwiperImage" id="e-SwiperImage">
				{
					this.state.content.length > 1 ? <div className={`swiper-container swiper-container_${this.state.random} outer_box`}>
					<div className="swiper-wrapper">
						{ 
			             	this.state.content.map((_,index)=><div className="swiper-slide" key={index} style={cssColorFormat(this.props, 'swiperImage')}>
							 {/*<div className="text_show" style={cssColorFormat(this.props, 'text')}>{_.title}</div>*/}
			             	 {
				                _.img.indexOf('.mp4') > -1 ? <div className="videoRY"><Player src={_.img} ref={`RYPlayer_${index+1}`} >
				                  <BigPlayButton className="videoButton" /> 
				                  <ControlBar autoHide={true} disableDefaultControls={true} />
				                </Player><div className="shadow"></div></div> : <img src={_.img} />
				             } 
			             </div>)
			          }  
					</div>
				</div> : ( this.state.content[0].img.indexOf('.mp4') > -1 ? <div className="videoRY"><Player autoPlay src={this.state.content[0].img} loop >
				                  <BigPlayButton className="videoButton" /> 
				                  <ControlBar autoHide={true} disableDefaultControls={true} />
				                </Player><div className="shadow"></div></div> : <img src={this.state.content[0].img} />)
				} 
				<PageRY totalPage={this.state.content.length} currentPage={this.state.realIndex} props={this.props}></PageRY>
			</div>
		)
	}
}

//分页显示
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
				{ totalPage > 1 ? this.renderDom.bind(this, props, totalPage,currentPage)() : null }
			</section>
		)
	}
}
 
export default RYSwiper 
