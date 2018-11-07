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
import { content_do,everySame,destroySwiper,formatObj,sameCheck } from './content_do'

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
	content_show = (obj,props) => {
		let contentOri = JSON.stringify(props.data.data.content),
			objReturn = content_do(contentOri),
			content = objReturn.content,
			date = objReturn.date 
		if(getAttr(content) == 'Array'){
			let type = this.oneSwiper(content),newObj = {newContent:content,type:type,...obj}
			sameCheck(this.state.newContent,content) ? this.setState(newObj) : null
			clearInterval(this.timer)
			return false
		}   
		let now = new Date().getTime()
		date.map((_,i)=>{
			if(i == date.length-1&&now >= _){
				let arr_content = content[_],
					type = this.oneSwiper(arr_content),
					newObj = {newContent:arr_content,type:type,...obj}
				sameCheck(this.state.newContent,arr_content) ? this.setState(newObj) : null
				clearInterval(this.timer)
			}else if(i == 0&&_ > now){
				let arr_start = JSON.parse(contentOri) 
				arr_start = arr_start.filter(_=>_.date == '')
				let type = this.oneSwiper(arr_start),newObj = {newContent:arr_start,type:type,...obj}
				sameCheck(this.state.newContent,arr_start) ? this.setState(newObj) : null
			}else{ 
				if(now >= _ && now < date[i+1]){
					let arr_content = content[_],
						type = this.oneSwiper(arr_content),
						newObj = {newContent:arr_content,type:type,...obj}
					sameCheck(this.state.newContent,arr_content) ? this.setState(newObj) : null
				} 
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
			type = 1
		} 
		return type
	} 
	getData = props => { 
		let { data } = props,
			{ feature} = data, 
			swiperOptions = JSON.stringify(feature.swiperOptions),
			content = JSON.stringify(data.data.content)
		this.content_show({content:content,swiperOptions:swiperOptions},props)	
	}   
	componentWillUnmount(){
		clearInterval(this.timer)
	}  
	shouldComponentUpdate(newProps, newState){
		let { data } = newProps,
			{ feature} = data, 
			swiperOptions = JSON.stringify(feature.swiperOptions),
			content = JSON.stringify(data.data.content)
		if(this.state.content != content || this.state.swiperOptions != swiperOptions){
			return true
		} 
		return false
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
	return (<div className="e-video" id="RY-SwiperImage"> 
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
				<div className="e-img" id="RY-SwiperImage">
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
		let { prop,content } = props,
			swiperOptions = deepCopy(prop.data.feature.swiperOptions);
		if(swiperOptions.autoplay){
			content[0].delayOnly ? swiperOptions.autoplayOptions.delay = content[0].delayOnly*1000 : swiperOptions.autoplayOptions['delay'] = swiperOptions.autoplayOptions.delayBig*1000
		}  
		swiperOptions['speed'] = swiperOptions.speedBig*1000 
		delete swiperOptions.speedBig
		delete swiperOptions.autoplayOptions.delayBig
		swiperOptions = formatObj(swiperOptions,()=>{
			this.mySwiperImage&&!this.mySwiperImage.destroyed ? this.setState({realIndex:this.mySwiperImage.realIndex}) : 
			this.setState({realIndex:0})
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
			<div className="e-SwiperImage" id="RY-SwiperImage">
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
		delay:5,
	    speed:1000,
	    autoplay:true
	}
	init = props => {
		let { prop,content } = props,
			{ data } = prop, 
			swiperOptions = deepCopy(data.feature.swiperOptions),
			delay = swiperOptions.autoplayOptions.delayBig || 5, 
			autoplay = !swiperOptions.autoplay ? false :true; 
		swiperOptions['speed'] = swiperOptions.speedBig*1000 
		delete swiperOptions.speedBig 
		delete swiperOptions.autoplayOptions
		swiperOptions.autoplay = false;
		swiperOptions = formatObj(swiperOptions,()=>{},()=>{
			if(!this.mySwiperImage || this.mySwiperImage.destroyed || !this.state.autoplay) return
			let realIndex = this.mySwiperImage.activeIndex;
			if(this.mySwiperImage.params.loop){ 
				if(realIndex == content.length + 1){
		            this.mySwiperImage.slideTo(1,0,false)
		            return false 
		          }
			}
		});   
		this.setState({ 
			speed:swiperOptions.speed, 
			autoplay:autoplay,
			realIndex:0, 
			delay:delay
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
	slideChange = () => {
	    let that = this,{ content } = that.props
	    that.mySwiperImage.on('slideChange',()=>{
	       if(!that.mySwiperImage || that.mySwiperImage.destroyed || !that.state.autoplay){
	       		that.setState({realIndex:0})
	       		return
	       } 
	       	let realIndex = that.mySwiperImage.activeIndex,
	            con = content[realIndex-1],
	            next = realIndex + 1
	        clearTimeout(that.timerSlide) 
	        that.setState({realIndex:that.mySwiperImage.realIndex})
	        if(!that.mySwiperImage.params.loop){ 
	            con = content[realIndex]
	           if(realIndex == content.length - 1){
		            next = 0
		          }
		          realIndex = realIndex + 1
	        }else{
	        	if(realIndex == content.length + 1){
		             con = content[0]
		             realIndex = 1
		          }
	        }
	        that.refs[`RYPlayer_${realIndex-1}`] ? that.refs[`RYPlayer_${realIndex-1}`].pause() : null
	        that.refs[`RYPlayer_${realIndex+1}`] ? that.refs[`RYPlayer_${realIndex+1}`].pause() : null
	        if(con.type == 'video'){
	        	let { player } = that.refs[`RYPlayer_${realIndex}`].getState()
	            that.refs[`RYPlayer_${realIndex}`].load()
	            that.refs[`RYPlayer_${realIndex}`].play()
	            that.timerSlide = setTimeout(()=>{
	               that.mySwiperImage && !that.mySwiperImage.destroyed ? that.mySwiperImage.slideTo(next,that.state.speed,false) : null
	            },player.duration*1000)
	         }else{  
	         	 let delay = con.delayOnly ? con.delayOnly : that.state.delay
	         	  that.timerSlide = setTimeout(()=>{
	               that.mySwiperImage && !that.mySwiperImage.destroyed ? that.mySwiperImage.slideTo(next,that.state.speed,false) : null
	         	 },delay*1000)
	         }      
	    }) 
	}; 
	firstVideo = () => {
		let { content } = this.props,
	        activeIndex = this.mySwiperImage.activeIndex;
	    if(!this.state.autoplay) return
	    if(content[0].type == 'video'){
	      if(!this.refs) return 
	      let { player } = this.refs[`RYPlayer_1`].getState()
	      this.refs[`RYPlayer_1`].play()
	      setTimeout(()=>{
	         this.mySwiperImage.slideTo(activeIndex+1,this.state.speed,false)
	      },player.duration*1000)
	    }else{ 
	    	let delay = content[0].delayOnly ? content[0].delayOnly : this.state.delay
	    	setTimeout(()=>{
	    		this.mySwiperImage && !this.mySwiperImage.destroyed ? this.mySwiperImage.slideTo(activeIndex+1,this.state.speed,false) : null
	    	},delay*1000);  
	    }
	};  
	componentWillUnmount() {
		destroySwiper(this.mySwiperImage)
	};
	render() {
		let { prop,content } = this.props
		return (
			<div className="e-SwiperImage" id="RY-SwiperImage">
				<div className={`swiper-container swiper-container_${this.state.random} outer_box`}>
					<div className="swiper-wrapper">
						{ 
			             	content.map((_,index)=><div className="swiper-slide" key={index} style={cssColorFormat(prop, 'swiperImage')}>
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
				<PageRY totalPage={content.length} currentPage={this.state.realIndex} props={prop}></PageRY>
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
