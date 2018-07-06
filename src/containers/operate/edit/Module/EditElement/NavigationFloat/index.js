/**
 * @Author: Along
 * @Date:   2018-05-07

 */
 

import React from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import './index.less' 

class NavigationFloat extends React.Component {
	
	state = {
		realIndex:0,
		showTable:false,
		id: `swiperContainerNav_${Math.floor(Math.random()*1e9)}`
	}

	componentDidMount() {
		let { data } = this.props
		const size = data.layout.size;
		const that = this;
		data.layout.type == 1 ? this.initSwiper(size) : null
	}
	componentWillReceiveProps(props) {
		let { data } = props
		const size = data.layout.size;
		if(data.layout.type == 1){
			setTimeout(()=>{this.initSwiper(size)},10)
		}
	}
	componentWillUnmount() {
		let { data } = this.props
		if(data.layout.type == 1){
			this.myNavgSwiper&&this.myNavgSwiper.destroy(false)
		}
	}
	initSwiper = size => {
		let that = this,
			realIndex = this.state.realIndex;
		const swiperOptions = {
			direction : 'vertical',
			 slidesPerView: size,
      		spaceBetween: 0,
      		on:{
				slideNextTransitionStart:function(){
					realIndex = realIndex+1
					that.setState({realIndex:realIndex})
				},
				slidePrevTransitionStart:function(){
					realIndex = realIndex-1
					that.setState({realIndex:realIndex})
				}
			},
      		observer : true,//修改swiper自己或子元素时，自动初始化swiper 
			observeParents : true//修改swiper的父元素时，自动初始化swiper 
		}
		this.myNavgSwiper && this.myNavgSwiper.destroy(false)
		setTimeout(()=>{this.myNavgSwiper = new Swiper(`#${this.state.id}`, swiperOptions)},5)
	}
	to = event => {
		event.preventDefault()
	}
	toPageFloor(page) {
		this.setState({realIndex:page})
		this.myNavgSwiper.slideTo(page,500,false);
	}
	mainTab = e => {
		this.setState({showTable:!this.state.showTable})
		e.stopPropagation();
	}
	//布局样式一
	renderSwiper(props) { 
		const { data } = props;
		const size = data.layout.size,
			  pageSwitch = data.layout.pageSwitch,
			  allPages = data.data.content.length-size,
			  cssp = cssColorFormat(props, 'filterPage'),
			  cssn = cssColorFormat(props, 'filterPage');
		const page = this.state.realIndex;
		return (
				<div className="navigation_box">
					{
						pageSwitch ? <div className={page < 1? 's-disabled': ''} style={{ ...cssp, ...cssColorFormat(props, 'PagePrev') }} onClick={this.toPageFloor.bind(this, page-1)}></div> : null
					}
					<div style={{width:'100%',height:`${pageSwitch?'70%':'100%'}`}}>
						<div id={this.state.id} className={`swiper-container`}>
							<div className="swiper-wrapper"> 
								{ 
									data.data.content.map((_, i) => {
										return (
											<div className="swiper-slide" key={i}>
												<OnlyNavigation props={props} data={_} key={i}></OnlyNavigation>
											</div>
										)
									})
								}
						    </div>    
					    </div> 
					</div>
				    {
						pageSwitch ?  <div className={page >= allPages? 's-disabled': ''} style={{ ...cssn, ...cssColorFormat(props, 'PageNext') }} onClick={this.toPageFloor.bind(this, page+1)}></div> : null
					}
				</div>
			)
	}
	//布局样式二
	renderDom(props) {
		const { data } = props;
		return (
				<div className="navigation_box">
					{
						data.data.content.map((item,index) => {
							return <OnlyNavigation props={props} data={item} key={index}></OnlyNavigation>
						})
					}
				</div>
			)
	}
	//布局样式三
	renderDomThree(props) {
		const { data } = props;
		const content = data.data.content;
		const mainCss = cssColorFormat(props,"mainTable");
		const classAni = this.state.showTable ? 'animated fadeInDownBig' : 'animated fadeOutUpBig';
		return (
				<div className="navigation_box">
					<div className="mainTable" onClick={e=>{this.mainTab(e)}} style={{...mainCss,marginLeft:-(mainCss.width/2)}}></div>
					{
						 content.map((item,index) => {
							const aniSty = {animationDuration:"0.5s",animationDelay:`${this.state.showTable ? index/4 : (content.length-index)/4}s`}
							if(index == 0){
								return <OnlyNavigation props={props} data={item} key={index} rysty={{...aniSty,marginTop:mainCss.height}} classAni={classAni}></OnlyNavigation>
							}else{
								return <OnlyNavigation props={props} data={item} key={index} rysty={aniSty} classAni={classAni}></OnlyNavigation>
							}
							
						})
					}
				</div>
			)
	} 
	//布局样式四
	renderDomFour(props) {
		let { data } = props,
		      content = data.data.content,
			  mainCss = cssColorFormat(props,"mainTable"),
			  css = cssColorFormat(props, 'filter'),
			  classAni = this.state.showTable ? 'animated fadeInRight' : 'animated fadeOutLeft',
			  layout = data.data.layout,
			  layWidth = layout.width,
			  layHeight = parseInt(layout.height/2),
			  deg = parseInt(180/(content.length-1)),
			  number = content.length;
		  let pos_style = {...mainCss,left:0,marginTop:-(mainCss.height/2),top:"50%"};
		  if(data.layout.type == 4 && data.layout.position == 'right'){
		  		pos_style = {...pos_style,left:(data.data.layout.width-mainCss.width)};
		  		layWidth = (-1*layWidth);
		  		classAni = this.state.showTable ? 'animated fadeInLeft' : 'animated fadeOutRight'
		  }
		let defaultStyle = content.map((item,index)=>{
	 	  		let t,l,degSelf = -(90-deg*index)*Math.PI/180;
	 	  		t = Math.sin(degSelf)*layHeight + mainCss.height/2-css.height/2;
				l = Math.cos(degSelf)*layWidth+mainCss.width/2-css.width/2;
	 	  		return {position:"absolute",top:t,left:l,animationDuration:"0.5s",animationDelay:`${index/4}s`}
		  });
		return (
				<div className="navigation_box">
					<div className="mainTable" onClick={e=>{this.mainTab(e)}} style={pos_style}>
						{
							content.map((item,index) => {
								return <OnlyNavigation props={props} data={item} key={index} rysty={defaultStyle[index]} classAni={classAni}></OnlyNavigation>
							})
						}
					</div>
				</div>
			)
	}
	render() {
		let { data } = this.props
		const layout_style = data.layout.type
		let chooseDom
		if(layout_style == 1){
			chooseDom = this.renderSwiper.bind(this,this.props)();
		}else if(layout_style == 2){
			chooseDom = this.renderDom.bind(this,this.props)();
		}else if(layout_style == 3){
			chooseDom = this.renderDomThree.bind(this,this.props)();
		}else if(layout_style == 4){
			chooseDom = this.renderDomFour.bind(this,this.props)();
		}
		return (
			<div className="e-navigationFloat">
				{
					chooseDom
				}
			</div>
		)
	}
}

function OnlyNavigation({data,props,rysty,classAni}) {
	let css = cssColorFormat(props, 'filter')
	if (data.highSwitch) css = { ...css, ...cssColorFormat(props, 'filterActive') }
	if(rysty) css = {...css,...rysty}
	return (
		<div className={`${classAni ? classAni : ''} only`} style={css}>  
			<img src={getImg(data.img)} />
			<p style={cssColorFormat(props, 'text')}>{data.title}</p>
		</div> 
	)
}
export default NavigationFloat