/**
 * @Author: Along
 * @Date:   2018-07-25

 **/

import React from 'react'
import Layout from '../../Layout' 
import Swiper from 'swiper' 
import JumpRouter from '../../../JumpRouter'
import checkToJump from '../../../checkToJump'
import * as Server from 'server'
import 'swiper/dist/css/swiper.css'
import './index.less'

export default class SwiperByGoods extends React.Component {
	state = {
		recommendGoods:[],
		random: parseInt(Math.random()*10000),
		realIndex:0
	}
	componentDidMount() {
		Server.goods.getRecGoodsList(o => {
			this.setState({ recommendGoods: o })
		})
		this.init(this.props,this.state.random)
	}
	componentWillReceiveProps(props){
		this.init(props,this.state.random)
	}   
	init = (props,random) => {
		let { data } = props;
		let swiperOptions = deepCopy(data.data.content.swiperOptions);
		swiperOptions = this.formatObj(swiperOptions,random);
		this.destorySwiper();
		this.initSwiper(swiperOptions,random);   
	}; 
	destorySwiper = () => {
		let newS = this.mySwiperRecomImage;
		if(getAttr(newS) == 'String'){
			newS.destroy();
		}else if(getAttr(newS) == 'Array'){
			newS.forEach(item=>{
				item.destroy();
			}) 
		}
	}  
	componentWillUnmount(){
		this.destorySwiper();
	}      
	 initSwiper = (swiperOptions,random) => {
	 	this.mySwiperRecomImage = new Swiper(`.swiper-container_recom_${random}`, swiperOptions) 
	};  
	formatObj = (obj,random) => { 
		let new_obj = deepCopy(obj);
		new_obj.on = { 
			slideChange:()=>{
				this.mySwiperRecomImage ? this.setState({realIndex:this.mySwiperRecomImage.realIndex}) : null
			},    
			tap:()=>{     
				let { data } = this.props; 
				data = data.data; 
				const params = this.state.recommendGoods[this.mySwiperRecomImage.realIndex];
				this.toPage(params)
			} 
		}  
		let autoplay = obj['autoplay'];
		let delay = obj['delay'];
		if(autoplay){
			let autoplayDisableOnInteraction = obj['autoplayDisableOnInteraction'];
			new_obj.autoplay = {disableOnInteraction:false,delay:delay}
		}   
		//new_obj.watchSlidesProgress = true;
		new_obj.observer = true;//修改swiper自己或子元素时，自动初始化swiper 
		new_obj.observeParents = true;//修改swiper的父元素时，自动初始化swiper 
		return new_obj 
	}; 
	 
	toPage = item => {
		const { animate, animateParams,action,data } = this.props,
			router = data.data.content.router ? data.data.content.router.url : '',
			dataStr = checkToJump(item,router,item.commodityId,203);
			JumpRouter(dataStr,animate,animateParams,action);
	}  
	render() { 
		let props = this.props;
		let { data } = props;
		let swiperOptions = data.data.content.swiperOptions;
		return (
			<section className={`e-swiper-by-goods`}>
				{
					<div>
							<SlideOne 
								props={props} 
								random={this.state.random} 
								recommendGoods={this.state.recommendGoods}
								realIndex={this.state.realIndex}
							/>							
							{
								swiperOptions.pagination
								?
								<PageElement
									currentPage={this.state.realIndex}
									totalPage={this.state.recommendGoods.length}
									props={props}
								/>
								: null
							}
					</div>
				}
			</section>
		)
	}
} 

//推荐商品轮播
class SlideOne extends React.Component {
 
	render(){  
		let { props,random,recommendGoods,realIndex } = this.props,
			{ data } = props,
			{ content,componentLayout } = data.data,
			swiperBind = componentLayout.filter(item=>item.name == 'swiperBind'),
			contentBind = swiperBind.length>0 ? swiperBind[0].data.content.bind : 'no',
			styleObj = cssColorFormat(props, 'filterBox');
		return (  
			<div className={`swiper-container swiper-container_recom_${random}`}>
				<div className="swiper-wrapper">
					{
						recommendGoods.map((_, i) => {
							return (
								<div className="swiper-slide" key={i}>
									<Layout
										data={data}
										styleObj={styleObj}
										itemList={_}
										refresh={true} 
										type="recom"
										realIndex={realIndex==i?true:false}
									/>
								</div>  
							)
						})
					} 
				</div>    
			</div>
		)
	}
}
//渲染分页显示组件
function PageElement({ totalPage,currentPage,props }){
	let paginationBox = cssColorFormat(props, 'paginationBox'),
		pagination = cssColorFormat(props, 'pagination'),
		paginationActive = cssColorFormat(props, 'paginationActive')
	return (
		<section className="e-page">
			<div className="ep-page" style={paginationBox}>
				{
					Array.from(new Array(totalPage)).map((_, i) => {
						let cur = i
						let nCss = pagination
						if (currentPage === cur) nCss = { ...nCss, ...paginationActive }
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

