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
import { content_do,everySame,destroySwiper,formatObj } from './content_do'

class RYSwiper extends React.Component {
	state = {
		content:'',
		type:1, //1--一张图片  2--一个视频 3--图片集合且delay一致 4--其他
		newContent:[],
		swiperOptions:''
	}
	componentDidMount(){
		this.getData(this.props)
	}
	componentWillReceiveProps(props){
		this.getData(props)
	}
	intervalTimer = () => {
		this.content_show()
		clearInterval(this.timer)
		this.timer = setInterval(this.content_show,60000)
	} 
	content_show = () => {
		let content = content_do(this.state.content)
		if(getAttr(content) == 'Array'){
			let type = this.oneSwiper(content)
			this.setState({newContent:content,type:type})
			return false
		} 
		let now = new Date().getTime()
		Object.keys(content).map(_=>{
			if(_ == now){
				let arr_content = content[_],
					type = this.oneSwiper(arr_content)
				this.setState({newContent:arr_content,type:type})
			}
		})
	} 
	oneSwiper = item => {
		let arr_content = item,type=1
		if(arr_content.length == 1){
			type = arr_content[0].type == "image" ? 1 : 2
		}else if(arr_content.length > 1){
			type = everySame(arr_content) ? 3 : 4
		}else{

		} 
		return type
	}
	getData = props => {
		let { data } = props,
			{ feature} = data, 
			swiperOptions = JSON.stringify(feature.swiperOptions),
			content = JSON.stringify(data.data.content)
		if(this.state.content != content || this.state.swiperOptions != swiperOptions){
			this.setState({content:content,swiperOptions:swiperOptions},()=>{this.intervalTimer()})
		} 
	} 
	componentWillUnmount(){
		clearInterval(this.timer)
	}  
	render(){ 
		let type = this.state.type,renderDom
		switch(type){
			case 1 : renderDom = (<OneImage content={this.state.newContent} prop={this.props}></OneImage>);break
			case 2 : renderDom = (<OneVideo content={this.state.newContent}></OneVideo>);break
			case 3 : renderDom = (<SwiperImage content={this.state.newContent} prop={this.props}></SwiperImage>);break
			case 4 : renderDom = (<SwiperImageVideo content={this.state.newContent} prop={this.props}></SwiperImageVideo>);break

		}
		return renderDom
	}
}

//单独视频
function OneVideo({content}){
	if(content.length == 0) return false
	return (<div className="e-video"> 
					<video src={content[0].img.video} controls={false} autoPlay loop>
						您的浏览器不支持 video 标签。
					</video> 
				</div>
			)
} 
 
//一张图片
function OneImage({content,prop}){
	if(content.length == 0) return false
	return (
				<div className="e-img">
					<img src={compImgFormat(prop, content[0].img)} />
				</div>
			)
}  

//只有图片且delay设置一样
class SwiperImage extends React.Component {

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
		let swiperOptions = props.prop.data.feature.swiperOptions;
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
		let { prop,content } = this.props
		return ( 
			<div className="e-SwiperImage">
				<div className={`swiper-container swiper-container_${this.state.random} outer_box`}>
					<div className="swiper-wrapper">
						{
							content.map((item,index) => <div className="swiper-slide" key={index}><img src={compImgFormat(prop, item.img)} style={cssColorFormat(prop, 'swiperImage')} /></div>)
						}  
					</div>
				</div>
				<PageRY totalPage={content.length} currentPage={this.state.realIndex} props={prop}></PageRY>
			</div>
		)
	}
}
//视频和图片组合轮播
class SwiperImageVideo extends React.Component {
	
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
		content:[],
		delay:1000,
	    speed:1000,
	    autoplay:true
	}
	init = props => {
		let { prop,content } = props,
			{ data } = prop, 
			swiperOptions = data.feature.swiperOptions,
			delay = swiperOptions.autoplay ? swiperOptions.autoplayOptions.delay : 1000,
			autoplay = !swiperOptions.autoplay ? false :true;
		swiperOptions = formatObj(swiperOptions,()=>{},()=>{
			if(!this.mySwiperImage || this.mySwiperImage.destroyed || !this.state.autoplay) return
			let realIndex = this.mySwiperImage.activeIndex;
			if(this.mySwiperImage.params.loop){ 
				if(realIndex == this.state.content.length + 1){
		            this.mySwiperImage.slideTo(1,0,false)
		            return false
		          }
			}
		});
		swiperOptions.autoplay = false;
		this.setState({ 
			delay:2000,
			speed:swiperOptions.speed,
			autoplay:autoplay,
			content:content,
			realIndex:0
		},()=>{this.initSwiper(swiperOptions,this.firstVideo)})
	};      
	 initSwiper = (swiperOptions,fn) => {
	 	destroySwiper(this.mySwiperImage)
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
	        if(content.type == 'video'){
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
	    if(content.type == 'video'){
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
		destroySwiper(this.mySwiperImage)
	};
	render() {
		let { prop } = this.props
		return (
			<div className="e-SwiperImage" id="e-SwiperImage">
				<div className={`swiper-container swiper-container_${this.state.random} outer_box`}>
					<div className="swiper-wrapper">
						{ 
			             	this.state.content.map((_,index)=><div className="swiper-slide" key={index} style={cssColorFormat(prop, 'swiperImage')}>
							 {
				                _.type == 'video' ? <div className="videoRY"><Player src={_.img.video} ref={`RYPlayer_${index+1}`} >
				                  <BigPlayButton className="videoButton" /> 
				                  <ControlBar autoHide={true} disableDefaultControls={true} />
				                </Player><div className="shadow"></div></div> : <img src={compImgFormat(prop, _.img)} />
				             } 
			             </div>)
			          }  
					</div>
				</div>
				<PageRY totalPage={this.state.content.length} currentPage={this.state.realIndex} props={prop}></PageRY>
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
