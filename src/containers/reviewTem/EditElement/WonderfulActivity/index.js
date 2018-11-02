/**
 * @Author: Along
 * @Date:   2018-05-03

 */


import React from 'react'
import Swiper from 'swiper'

import 'swiper/dist/css/swiper.css'
import './index.less'

class WonderfulActivityShow extends React.Component {
	constructor(props) {
		super(props)
	}
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
		let swiperOptions = props.data.feature.swiperOptions
		swiperOptions = this.formatObj(swiperOptions)
		if(getAttr(this.mySwiperWon) == 'Array'){
			this.mySwiperWon.map(_=>{
				_.destroy(false)
			})
		}else{
			this.mySwiperWon&&this.mySwiperWon.destroy(false)
		}
		this.initSwiper(swiperOptions)
	}
	initSwiper = swiperOptions => {
		this.mySwiperWon = new Swiper(`.swiper-container_${this.state.random}`, swiperOptions)
	} 
	formatObj(obj) {
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
		if(getAttr(this.mySwiperWon) == 'Array'){
			this.mySwiperWon.map(_=>{
				_.destroy(false)
			})
		}else{
			this.mySwiperWon&&this.mySwiperWon.destroy(false)
		}
	}
	render() {  
		let { data,activities,name} = this.props
		return ( 
			<div className="e-WonderfulActivity">
				{ 
					<div style={{height:'100%'}}> 
						<WonderfulContentShow props={this.props} activities={activities} random={this.state.random} />
						<PageRYWonShow totalPage={activities.list.length} currentPage={this.state.realIndex} props={this.props} /> 
					</div> 
				} 
			</div> 
		)  
	}   
}
//轮播单独渲染，不重复渲染
class WonderfulContentShow extends React.Component {
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
function PageRYWonShow({ totalPage,currentPage,props }){
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
export default WonderfulActivityShow
