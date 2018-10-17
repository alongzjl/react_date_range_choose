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
import Layout from '../../Layout'
import aniTime from '../../common/aniTime'
import './index.less'
import 'swiper/dist/css/swiper.css'



class ListByStoreNew extends React.Component {
	state = {
		random:parseInt(Math.random()*1e5)
	}
	componentDidMount() {
		this.props.ioInput.loading ? this.initSwiper(this.props,this.state.random) : null
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
			shopNo = item.BERTH_NUMBER || item.berthNumber,
			router = data.data.content.router ? data.data.content.router.url : '',
			id = item.recordId || item.id, 
			dataStr = checkToJump(item,router,id,203);
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
		let { ioInput,shops,type } = this.props
		return ( 
			<section className={`e-list-by-store2 ${type}`} style={{...cssColorFormat(this.props, 'filterBox'),height:"100%",width:"100%"}}>
				<RenderSwiperNew props={this.props} ioInput={ioInput} shops={shops} random={this.state.random} toDetails={this.toDetails} />
			</section>
		)
	}
}
//页面渲染
function RenderSwiperNew({ props,ioInput, shops,random,toDetails }) {
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
											type_ani == 1 ? <RenderDomNew props={props} list={item} toDetails={toDetails} classAni={classAni} /> :
											<RenderDomTwoNew props={props} list={item} toDetails={toDetails} classAni={classAni} />
										}</div>)
									}else{
										return (<div className="swiper-slide" key={index}>{
											type_ani == 1 ? <RenderDomNew props={props} list={item} toDetails={toDetails} opacity={0} classAni={'noRY'} /> :
											<RenderDomTwoNew props={props} list={item} toDetails={toDetails} opacity={0} classAni={'noRY'} />
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
function RenderDomNew({ props, list,toDetails,opacity,classAni }) {
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
						<Layout itemList={_} data={props.data} styleObj={{}} refresh={true} type={"NewStore"} />
				</div>
			</div> 
		)
	}): (<div className="no_intnet_RY"><img src="./image/no_shop_KD.png" /></div>)
	return (<div className="boxStores">{ node }</div>) 
}  
//动画二
function RenderDomTwoNew({ props, list,toDetails,opacity,classAni }) {
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
				<Layout itemList={_} data={props.data} styleObj={{}} refresh={true} type={"NewStore"} />
			</div>  
		)  
	}): (<div className="no_intnet_RY"><img src="./image/no_shop_KD.png" /></div>)
	return (<div className="boxStores">{ node }</div>)
} 

export default ListByStoreNew
