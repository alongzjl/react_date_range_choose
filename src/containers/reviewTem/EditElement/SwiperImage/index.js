/**
 * @Author: Along
 * @Date:   2018-05-03

 */


import React from 'react'
import Swiper from 'swiper'
import JumpRouter from '../JumpRouter'
import checkToJump from '../checkToJump'
import { Player,LoadingSpinner,ControlBar,BigPlayButton } from 'video-react'
import "video-react/dist/video-react.css"
import 'swiper/dist/css/swiper.css'
import './index.less'

class SwiperImage extends React.Component {
	
	state = {
		random: 1,
		realIndex:0,
		content:[],
	    delay:1000,
	    speed:1000,
	    autoplay:true
	}
	componentDidMount() {
		let number = parseInt(Math.random()*10000),
			 { data } = this.props, 
			 content = data.data.content,
			 swiperOptions = data.feature.swiperOptions,
			 delay = swiperOptions.autoplay ? swiperOptions.autoplayOptions.delay : 1000,
			 autoplay = !swiperOptions.autoplay ? false :true;
		let contentNew = content.map(_=>{
			return {
				img:_.img&&(_.img.img || _.img.video),
				title:_.title
			}
		});
		this.setState({ 
			random: number,
			delay:2000,
			speed:swiperOptions.speed,
			content:contentNew,
			autoplay:autoplay
		},()=>{this.init(this.props,this.state.random)})
	}    
	to = event => { 
		event.preventDefault()
	};
	init = (props,random) => {
		let swiperOptions = props.data.feature.swiperOptions;
		swiperOptions = this.formatObj(swiperOptions);
		this.initSwiper(swiperOptions,random,this.firstVideo);   
	};        
	 initSwiper = (swiperOptions,random,fn) => {
	 	 this.mySwiperImage && this.mySwiperImage.destroy(false)
	    this.mySwiperImage = new Swiper(`.swiper-container_${random}`, swiperOptions) 
	    setTimeout(()=>{
	      fn&&fn();
	    },500)  
	    this.slideChange()
	};
	formatObj = obj => { 
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
			tap:()=>{
				let { data } = that.props;
				data = data.data; 
				const params = data.content[that.mySwiperImage.realIndex].router;
				that.toPage(params)
			},
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
		//new_obj.loop = false;
		//new_obj.effect = 'flip';
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
  } 
firstVideo = () => {
	if(!this.state.autoplay) return
	let content = this.state.content[0],
        activeIndex = this.mySwiperImage.activeIndex;
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
  } 
  handleStateChange = (state, prevState) => {
    let activeIndex = this.mySwiperImage.activeIndex;
     if(state.ended){
          if(this.state.content.length > 1){
            this.mySwiperImage.slideTo(activeIndex+1,this.state.speed,false)
          }else{ 
            this.refs.RYPlayer.play()
          }
      }
  }  
	componentWillUnmount() {
		this.mySwiperImage.destroy(false)
	}
	toPage = data => {
		const {animate,animateParams,action} = this.props,
		dataStr = checkToJump('RYRouterSet',data);
	 	JumpRouter(dataStr,animate,animateParams,action);
	}; 
	render() {
		return ( 
			<div className="e-SwiperImage">
				<div className={`swiper-container swiper-container_${this.state.random} outer_box`}>
					<div className="swiper-wrapper">
						{ 
			             	this.state.content.map((_,index)=><div className="swiper-slide" key={index} style={cssColorFormat(this.props, 'swiperImage')}>
							 {/*<div className="text_show" style={cssColorFormat(this.props, 'text')}>{_.title}</div>*/}
			             	 {
				                _.img.indexOf('.mp4') > -1 ? <div className="videoRY"><Player src={_.img} ref={`RYPlayer_${index+1}`} >
				                  <LoadingSpinner /> 
				                  <BigPlayButton className="videoButton" /> 
				                  <ControlBar autoHide={true} disableDefaultControls={true} />
				                </Player><div className="shadow"></div></div> : <img src={_.img} />
				             } 
			             </div>)
			          }  
					</div>    
				</div>
				<PageRYSwiper totalPage={this.state.content.length} currentPage={this.state.realIndex} props={this.props} />
			</div>
		)
	} 
} 
//轮播单独渲染，不重复渲染
class SwiperContent extends React.Component {
	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.random == this.props.random){
			return false
		} else{
			return true
		}
	}
	render() {
		let { random,content,props } = this.props
		return(
			<div className={`swiper-container swiper-container_${random} outer_box`}>
				<div className="swiper-wrapper">
					{/*
						content.map((item,index) => <div className="swiper-slide" key={index} style={cssColorFormat(props, 'swiperImage')}><div className="text_show" style={cssColorFormat(props, 'text')}>{item.title}</div>{ compImgFormat(props, item.img) ? <img src={configData.resourceBasePath+compImgFormat(props, item.img)} /> : null }</div>)
					*/}
					{
             	content.map((_,index)=><div className="swiper-slide" key={index}>{
                _.indexOf('.mp4') > -1 ? <div className="videoRY"><Player src={_} ref={`RYPlayer_${index+1}`} >
                  <LoadingSpinner /> 
                  <BigPlayButton className="videoButton" /> 
                  <ControlBar autoHide={true} disableDefaultControls={true} />
                </Player><div className="shadow"></div></div> : <img src={_} />
             } 
             </div>)
          } 
				</div>   
			</div>
		)
	}
}
//渲染分页显示组件
function PageRYSwiper({ totalPage,currentPage,props }){
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
export default SwiperImage
