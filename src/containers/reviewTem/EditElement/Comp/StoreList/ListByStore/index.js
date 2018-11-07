/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import Swiper from 'swiper'
import JumpRouter from '../../../JumpRouter'
import checkToJump from '../../../checkToJump'
import aniTime from '../../Common/aniTime'
import './index.less'
import 'swiper/dist/css/swiper.css'



class ListByStore extends React.Component {
	state = {
		random:1
	}
	componentDidMount() {
		const random = parseInt(Math.random()*1e5)
		this.props.ioInput.loading ? this.setState({random:random},()=>{this.initSwiper(this.props,random)}) : null
	}
	componentWillReceiveProps(nextProps) {
		if(!nextProps.ioInput.changePage){
			const random = parseInt(Math.random()*1e5)
			nextProps.ioInput.loading&&!nextProps.ioInput.clickStore ? this.setState({random:random},()=>{this.initSwiper(nextProps,random)}) : null
		}
	}
	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.ioInput.clickStore){
			return false
		}else{
			return nextProps.ioInput.changePage ?  nextProps.storeUpdate : true
		}
	} 
	componentWillUnmount(){
		this.myStoreSwiper && this.myStoreSwiper.destroy(false)
	}  
	initSwiper = (props,random) => {
		let { ioInput,ioOuter } = props;
		const swiperOptions = {
			direction : 'horizontal',
			on:{
				slideNextTransitionStart:function(){
					ioInput.currentPage += 1;
					ioInput.changePage = true;
					ioOuter(ioInput)
					clearInterval(RYTimer);
					funcIn()
				},
				slidePrevTransitionStart:function(){
					ioInput.currentPage -= 1;
					ioInput.changePage = true;
					 ioOuter(ioInput)
					 clearInterval(RYTimer);
					 funcIn()
				}
			}
		} 
		this.myStoreSwiper && this.myStoreSwiper.destroy(false)
		this.myStoreSwiper = new Swiper(`.swiper-container_store_${random}`, swiperOptions)
	}
	toDetails = item => {
		const { animate, animateParams,action,data,ioInput,ioOuter } = this.props,
			shopNo = item.BERTH_NUMBER,
			router = data.data.content.router ? data.data.content.router.url : '',
			dataStr = checkToJump(item,router,item.recordId,203);
		if(ioInput.haveFloorMap){ 
			ioOuter(ioInput,{type:'shopNo',value:shopNo}) 
		}else{ 
			JumpRouter(dataStr,animate,animateParams,action)
		}
	}      
	end = e =>{
		e.target.style.opacity = 1;
	}
	render() {
		let { type,ioInput,shops } = this.props
		let dom
		switch(type){
			case "Style1" : dom = (<RenderSwiper props={this.props} ioInput={ioInput} shops={shops} random={this.state.random} toDetails={this.toDetails} />);break
				default :  dom = (<RenderSwiper props={this.props} ioInput={ioInput} shops={shops} random={this.state.random} toDetails={this.toDetails} />);break
		}
		return (
			<section className={`e-list-by-store ${type}`} style={{...cssColorFormat(this.props, 'filterBox'),height:"100%",width:"100%"}}>
				{dom}
			</section>
		)
	}
}
//页面渲染
function RenderSwiper({ props,ioInput, shops,random,toDetails }) {
	let type_ani = props.data.data.content.animationType || 1,classAni = 'fadeInCenter';
	return (
			<div style={{width:"100%",height:"100%"}} >
				{
					ioInput.loading ? <div className={`swiper-container swiper-container_store_${random}`}>
						<div className="swiper-wrapper"> 
							{
								shops.data.map((item,index)=>{
									if(ioInput.currentPage == (index+1)){
										return (<div className="swiper-slide" key={index}>{
											type_ani == 1 ? <RenderDom props={props} list={item} toDetails={toDetails} classAni={classAni} /> :
											<RenderDomTwo props={props} list={item} toDetails={toDetails} classAni={classAni} />
										}</div>)
									}else{
										return (<div className="swiper-slide" key={index}>{
											type_ani == 1 ? <RenderDom props={props} list={item} toDetails={toDetails} opacity={0} classAni={'noRY'} /> :
											<RenderDomTwo props={props} list={item} toDetails={toDetails} opacity={0} classAni={'noRY'} />
										}</div>)
									}
								})
							}
						</div>    
					</div> : <div style={{height:"100%",width:"100%",display:"flex"}}>{/*<img src="./loading.gif" style={{margin:"auto"}} />*/}</div>
				}
			</div>
			
		)
} 

//动画一
function RenderDom({ props, list,toDetails,opacity,classAni }) {
	let end = e =>{
		e.target.style.opacity = 1;
	}
	let newArr = aniTime(props,list)
	let defaultStyle = cssColorFormat(props, 'filter'),
		animationStyle = {"animationDuration":"0.5s","animationDelay":"0s","animationIterationCount":1};
	
	let node = list.length>0 ? newArr.map((_, i) => {
		if(_.show == 'none') return false
		return ( 
			<div
				key={i}
				className="outDom"
				style={defaultStyle}
				onClick={()=>{toDetails(_)}}>
				<div 
					className={`ep-item-two ${classAni}`}
					style={{...animationStyle,opacity:opacity,animationDelay:`${0.1*(_.show)}s`}}
					onAnimationEnd={e=>{end(e)}}>
					<p>{
						_.LOCAL_LOGO ? <img style={cssColorFormat(props, 'image')} src={_.LOCAL_LOGO} /> : <img className="img_no_store" style={cssColorFormat(props, 'image')} src='./image/no_store.png' />
					}</p> 
					<p><span style={cssColorFormat(props, 'title')}>{_.NAME}</span></p> 
					<p> 
						<i    style={cssColorFormat(props, 'posIcon')}></i>  
						<span style={cssColorFormat(props, 'text')}>{_.BERTH_NUMBER}</span> 
					</p>
				</div>
			</div> 
		)
	}): (<div style={{fontSize:"30px",margin:"200px auto 0",color:"#000",textAlign:"center"}}>暂无数据</div>)
	return (<div className="boxStores">{ node }</div>)
} 
//动画二
function RenderDomTwo({ props, list,toDetails,opacity,classAni }) {
	let end = e =>{
		e.target.style.opacity = 1;
	}
	let defaultStyle = cssColorFormat(props, 'filter'),
		animationStyle = {"animationDuration":"0.5s","animationDelay":"0s","animationIterationCount":1};
	defaultStyle = {...defaultStyle,...animationStyle};

	let node = list != 0 && list.length>0 ? list.map((_, i) => {
		return ( 
			<div
				key={i}
				style={{...defaultStyle,opacity:opacity,animationDelay:`${0.1*i}s`}}
				className={`ep-item ${classAni}`} 
				onClick={()=>{toDetails(_)}}
				onAnimationEnd={e=>{end(e)}}
			>
				<p>{
					_.LOCAL_LOGO ? <img style={cssColorFormat(props, 'image')} src={_.LOCAL_LOGO} /> : <img className="img_no_store" style={cssColorFormat(props, 'image')} src='./image/no_store.png' />
				}</p>
				<p><span style={cssColorFormat(props, 'title')}>{_.NAME}</span></p> 
				<p> 
					<i    style={cssColorFormat(props, 'posIcon')}></i>  
					<span style={cssColorFormat(props, 'text')}>{_.BERTH_NUMBER}</span> 
				</p>
			</div> 
		) 
	}): (<div style={{fontSize:"30px",margin:"200px auto 0",color:"#000",textAlign:"center"}}>暂无数据</div>)
	return (<div className="boxStores">{ node }</div>)  
} 
export default ListByStore
