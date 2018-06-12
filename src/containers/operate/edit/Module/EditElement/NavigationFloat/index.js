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
		showTable:false
	}

	componentDidMount() {
		/*let { data } = this.props
		const size = data.layout.size;
		this.initSwiper(size)*/
	}
	componentWillReceiveProps(props) {
		let { data } = props
		const size = data.layout.size;
		if(data.layout.type == 2){
			this.initSwiper(size)
		}
	}
	componentWillUnmount() {
		this.myNavgSwiper.destroy(false)
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
		setTimeout(()=>{this.myNavgSwiper = new Swiper(`.swiper-container_navg`, swiperOptions)},10)
	}
	to = event => {
		event.preventDefault()
	}
	toPageFloor(page) {
		this.setState({realIndex:page})
		this.myNavgSwiper.slideTo(page,500,false);
	}
	mainTab() {
		this.setState({showTable:!this.state.showTable})
	}
	//布局样式一
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
	//布局样式二
	renderSwiper(props) { 
		const { data } = props;
		const size = data.layout.size,
			  allPages = data.data.content.length-size,
			  cssp = cssColorFormat(props, 'filterPage'),
			  cssn = cssColorFormat(props, 'filterPage');
		const page = this.state.realIndex;
		return (
				<div className="navigation_box" style={{pointerEvents:`${data.data.content.length > size ? "auto" : "none"}`}}>
					{
						data.data.content.length > size ? <div className={page < 1? 's-disabled': ''} style={{ ...cssp, ...cssColorFormat(props, 'PagePrev') }} onClick={this.toPageFloor.bind(this, page-1)}></div> : null
					}
					<div className={`swiper-container swiper-container_navg`}>
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
				    {
						data.data.content.length > size ?  <div className={page >= allPages? 's-disabled': ''} style={{ ...cssn, ...cssColorFormat(props, 'PageNext') }} onClick={this.toPageFloor.bind(this, page+1)}></div> : null
					}
				</div>
			)
	}
	//布局样式三
	renderDomThree(props) {
		const { data } = props;
		const content = data.data.content;
		const mainCss = cssColorFormat(props,"mainTable");
		return (
				<div className="navigation_box">
					<div className="mainTable" onClick={this.mainTab.bind(this)} style={{...mainCss,marginLeft:-(mainCss.width/2)}}></div>
					{
						this.state.showTable ? content.map((item,index) => {
							if(index == 0){
								return <OnlyNavigation props={props} data={item} key={index} height={mainCss.height}></OnlyNavigation>
							}else{
								return <OnlyNavigation props={props} data={item} key={index}></OnlyNavigation>
							}
							
						}) : null
					}
				</div>
			)
	} 
	render() {
		let { data } = this.props
		const layout_style = data.layout.type
		let chooseDom
		if(layout_style == 1){
			chooseDom = this.renderDom.bind(this,this.props)();
		}else if(layout_style == 2){
			chooseDom = this.renderSwiper.bind(this,this.props)();
		}else if(layout_style == 3){
			chooseDom = this.renderDomThree.bind(this,this.props)();
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

function OnlyNavigation({data,props,height}) {
	let css = cssColorFormat(props, 'filter')
	if (data.highSwitch) css = { ...css, ...cssColorFormat(props, 'filterActive') }
	if(height) css = {...css,marginTop:height}
	return (
		<div className="only" style={css}>  
			<img src={getImg(data.img)} />
			<p style={cssColorFormat(props, 'text')}>{data.title}</p>
		</div> 
	)
}
export default NavigationFloat