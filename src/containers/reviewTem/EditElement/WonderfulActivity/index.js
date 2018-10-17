/**
 * @Author: Along
 * @Date:   2018-05-03

 */


import React from 'react'
import Swiper from 'swiper'

import 'swiper/dist/css/swiper.css'
import './index.less'

class WonderfulActivity extends React.Component {
	constructor(props) {
		super(props)
	}
	state = {
		random: 1,
		realIndex:0
	}
	componentDidMount() { 
		const number = parseInt(Math.random()*100);
		let { activities } = this.props
		this.init(this.props,this.state.random)
	}  
	to(e) {
		e.preventDefault()
	}
	init(props,random) {
		let swiperOptions = props.data.feature.swiperOptions
		swiperOptions = this.formatObj(swiperOptions,random)
		this.mySwiperWon&&this.mySwiperWon.destory(false);
		this.initSwiper(swiperOptions,random)
	}
	initSwiper = (swiperOptions,random) => {
		this.mySwiperWon = new Swiper(`.swiper-container_${random}`, swiperOptions)
	}
	formatObj(obj,random) {
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
				this.mySwiperWon ? this.setState({realIndex:this.mySwiperWon.realIndex}) : null
			}
		}  
		new_obj.watchSlidesProgress = true; 
		new_obj.observer = true;//修改swiper自己或子元素时，自动初始化swiper 
		new_obj.observeParents = true;//修改swiper的父元素时，自动初始化swiper 
		return new_obj
	}
	componentWillUnmount() {
		this.mySwiperWon&&this.mySwiperWon.destroy(false)
	}
	render() {  
		let { data,activities,name} = this.props
		return ( 
			<div className="e-WonderfulActivity">
				{ 
					<div style={{height:'100%'}}> 
						<WonderfulContent props={this.props} activities={activities} random={this.state.random} />
						<PageRYWon totalPage={activities.list.length} currentPage={this.state.realIndex} props={this.props} /> 
					</div> 
				} 
			</div> 
		)  
	}   
}
//轮播单独渲染，不重复渲染
class WonderfulContent extends React.Component {
	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.random == this.props.random){
			return false
		} else{
			return true
		}
	}
	render() {
		let { random,activities,props } = this.props
		activities = activities.list.map(_ => {
			return _.img.img 
		})   
		return(
			<div className={`swiper-container swiper-container_${random} outer_box`}>
				<div className="swiper-wrapper"> 
					{   
						activities.length>0 ? activities.map((item, i) => <div className="swiper-slide" key={i} style={cssColorFormat(props, 'swiperImage')}><img src={item} /></div>) : null
					}     
				</div>    
			</div>
		)
	}
} 
//渲染分页显示组件 
function PageRYWon({ totalPage,currentPage,props }){
	return (
			<section className="e-page">
				<div className="ep-page">{
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
				}</div>
			</section>
		) 
}
export default WonderfulActivity
