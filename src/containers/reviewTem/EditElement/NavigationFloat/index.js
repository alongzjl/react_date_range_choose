/**
 * @Author: Along
 * @Date:   2018-05-07

 */
 
import React from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import './index.less' 
import JumpRouter from '../JumpRouter'
import checkToJump from '../checkToJump'

class NavigationFloatShow extends React.Component {
	
	state = {
		realIndex:0,
		showTable:false,
		random:1,
		first:1
	}

	componentDidMount() {
		let { data } = this.props,
		number = parseInt(Math.random()*1e5),
		size = data.layout.size || 4;
		this.setState({
			random: number,
			first:true
		},()=>{
			if(data.layout.type == 1){
				this.initSwiper(size,this.state.random)
			}
		})
		window.RY_navigation_have = true
	}
	componentWillUnmount() {
		window.RY_navigation_have = false
		let { data } = this.props
		if(data.layout.type == 1){
			this.myNavgSwiper.destroy(false)
		}
	}
	initSwiper = (size,random) => {
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
					//clearInterval(RYTimer);
					//funcIn()
				},
				slidePrevTransitionStart:function(){
					realIndex = realIndex-1
					that.setState({realIndex:realIndex})
					//clearInterval(RYTimer);
					//funcIn()
				}
			},
      		observer : true,//修改swiper自己或子元素时，自动初始化swiper 
			observeParents : true//修改swiper的父元素时，自动初始化swiper 
		}
		this.myNavgSwiper && this.myNavgSwiper.destroy(false)
		setTimeout(()=>{this.myNavgSwiper = new Swiper(`.swiper-container_navg_${random}`, swiperOptions)},10)
	}
	to = event => {
		event.preventDefault()
	}
	toPageFloor = page => {
		this.setState({realIndex:page})
		this.myNavgSwiper.slideTo(page,500,false);
	}
	mainTab = e => {
		 if(!this.state.showTable){
		 	document.addEventListener('click',this.clickFunc)
		 }else{
		 	document.removeEventListener('click',this.clickFunc)
		 }
		this.setState({showTable:!this.state.showTable,first:false})
		e.stopPropagation();
	}
	clickFunc = () =>{
		setTimeout(()=>{
			window.RY_navigation_have ? this.setState({showTable:false,first:false}) : null
			document.removeEventListener('click',this.clickFunc)
		},10)
	}
	toPage = (e,data) => { 
		document.removeEventListener('click',this.clickFunc)
		const {animate,animateParams,action} = this.props,
		dataStr = checkToJump('RYRouterSet',data);
	 	JumpRouter(dataStr,animate,animateParams,action);
	 	 e.stopPropagation(); 
	} 
	
	render() {
		let { data } = this.props
		const layout_style = data.layout.type
		const shadow_style = data.data.layout,
			  style_obj = {top:-parseInt(shadow_style.top),left:-parseInt(shadow_style.left)}
		let chooseDom
		switch(layout_style){
			case 1 : chooseDom = (<RenderSwiper props={this.props} random={this.state.random} realIndex={this.state.realIndex} toPage={this.toPage} toPageFloor={this.toPageFloor} />);break
			case 2 : chooseDom = (<RenderDom props={this.props} toPage={this.toPage} />);break
			case 3 : chooseDom = (<RenderDomThree props={this.props} showTable={this.state.showTable} toPage={this.toPage} mainTab={this.mainTab} first={this.state.first} />);break
			case 4 : chooseDom = (<RenderDomFour props={this.props} showTable={this.state.showTable} toPage={this.toPage} mainTab={this.mainTab} first={this.state.first} />);break
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

//布局样式1
function RenderSwiper({ props,random,realIndex,toPage,toPageFloor }) { 
	const { data } = props; 
	const size = data.layout.size || 4,
		  pageSwitch = data.layout.pageSwitch || false,
		  allPages = data.data.content.length-size,
		  cssp = cssColorFormat(props, 'filterPage'),
		  cssn = cssColorFormat(props, 'filterPage');
	return (
			<div className="navigation_box">
				{
					pageSwitch ? <div className={realIndex < 1? 's-disabled': ''} style={{ ...cssp, ...cssColorFormat(props, 'PagePrev') }} onClick={()=>{toPageFloor(realIndex-1)}}></div> : null
				}
				<div style={{width:'100%',height:`${pageSwitch?'70%':'100%'}`}}>
					<div className={`swiper-container swiper-container_navg swiper-container_navg_${random}`}>
						<div className="swiper-wrapper"> 
							{ 
								data.data.content.map((_, i) => { 
									return (
										<div className="swiper-slide" key={i}>
											<OnlyNavigation props={props} data={_} key={i} clickFunc={toPage}></OnlyNavigation>
										</div>
									)
								})
							}
					    </div>    
				    </div>
				</div>
			    {
					pageSwitch ?  <div className={realIndex >= allPages? 's-disabled': ''} style={{ ...cssn, ...cssColorFormat(props, 'PageNext') }} onClick={()=>{toPageFloor(realIndex+1)}}></div> : null
				}
			</div>
		)
}
//布局样式2
function RenderDom({ props,toPage }) {
	const { data } = props;
	return (
			<div className="navigation_box">
				{
					data.data.content.map((item,index) => {
						return <OnlyNavigation props={props} data={item} key={index} clickFunc={toPage}></OnlyNavigation>
					})
				}
			</div>
		)
}
//布局样式三
function RenderDomThree({ props,mainTab,showTable,toPage,first }) {
	const { data } = props;
	const content = data.data.content;
	const mainCss = cssColorFormat(props,"mainTable");
	const classAni = showTable ? 'animated fadeInDown' : !first ? 'animated fadeOutUp' : null;
	return (
			<div className="navigation_box">
				<div className="mainTable" onClick={e=>{mainTab(e)}} style={{...mainCss,marginLeft:-(parseInt(mainCss.width)/2)}}></div>
				{
					content.map((item,index) => {
						const aniSty = {animationDuration:"0.1s",animationDelay:`${showTable ? 0.1*index : (content.length-index)*0.1}s`}
						if(index == 0){
							return <OnlyNavigation props={props} data={item} key={index} rysty={{...aniSty,marginTop:mainCss.height}} classAni={classAni} clickFunc={toPage}></OnlyNavigation>
						}else{
							return <OnlyNavigation props={props} data={item} key={index} rysty={aniSty} classAni={classAni} clickFunc={toPage}></OnlyNavigation>
						}
					})
				}
			</div>
		)
} 
//布局样式四
function RenderDomFour({ props,mainTab,showTable,toPage,first }) {
	let { data } = props,
	      content = data.data.content,
		  mainCss = cssColorFormat(props,"mainTable"),
		  css = cssColorFormat(props, 'filter'),
		  layout = data.data.layout,
		  layWidth = parseInt(layout.width),
		  layHeight = parseInt(layout.height)/2,
		  deg = parseInt(180/(content.length-1)),
		  number = content.length;
	  let pos_style = {...mainCss,left:0,marginTop:-(parseInt(mainCss.height)/2),top:"50%"};
	  if(data.layout.type == 4 && data.layout.position == 'right'){
	  		pos_style = {...pos_style,left:(parseInt(data.data.layout.width)-parseInt(mainCss.width))};
	  		layWidth = (-1*layWidth);
	  }
	let defaultStyle = content.map((item,index)=>{
 	  		let t,l,degSelf = -(90-deg*index)*Math.PI/180;
 	  		t = Math.sin(degSelf)*layHeight + parseInt(mainCss.height)/2-parseInt(css.height)/2;
			l = Math.cos(degSelf)*layWidth+parseInt(mainCss.width)/2-parseInt(css.width)/2;
 	  		return {position:"absolute",top:t,left:l}
	  });
	let mainAni = {marginTop:-(parseInt(mainCss.height)/2),marginLeft:-(parseInt(mainCss.width)/2)}
	let end = e =>{
		showTable ? e.target.style.transform = 'scale(1)' : e.target.style.transform = 'scale(.01)';
	}
	let func_click = showTable ? toPage : () => {}	
	return (
			<div className="navigation_box">
				<div className="mainTable" onClick={e=>{mainTab(e)}} style={pos_style}>
					<div 
						style={mainAni}
						className={`navAniFour ${first ? '' : showTable ? 'scaleBig' : 'scaleLitter'}`}
						onAnimationEnd={e=>{end(e)}}>
							{
								content.map((item,index) => {
									return <OnlyNavigation props={props} data={item} key={index} rysty={defaultStyle[index]} clickFunc={func_click}></OnlyNavigation>
								})
							}
						</div>
				</div>
			</div>
		) 
} 

function OnlyNavigation({data,props,rysty,classAni,clickFunc}) {
	let css = cssColorFormat(props, 'filter')
	if (data.highSwitch) css = { ...css, ...cssColorFormat(props, 'filterActive') }
	if(rysty) css = {...css,...rysty}
	return (
		<div className={`${classAni ? classAni : ''} only`} style={css} onClick={e=>clickFunc(e,data.router)} > 
			{ getImg(data.img) ? <img src={getImg(data.img)} /> : null }
			<p style={cssColorFormat(props, 'text')}>{data.title}</p>
		</div>   
	)   
}
export default NavigationFloatShow