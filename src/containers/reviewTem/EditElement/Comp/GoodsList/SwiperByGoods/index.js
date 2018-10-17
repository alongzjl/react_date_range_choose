/**
 * @Author: Along
 * @Date:   2018-07-25

 **/

import React from 'react'
import Layout from '../../Layout' 
import Swiper from 'swiper' 
import JumpRouter from '../../../JumpRouter'
import checkToJump from '../../../checkToJump'
import {postJSON} from '../../Common/RYAjax'
import 'swiper/dist/css/swiper.css'
import './index.less'

export default class SwiperByGoods extends React.Component {
	state = {
		recommendGoods:[],
		no_intnet:false,
		recomState:true,
		no_data:false,
		random: parseInt(Math.random()*10000),
		realIndex:0,
		loaded:false
	}
	componentWillMount(){

	}
	componentDidMount() {
		let Url=configData.RYPostUrl.api + '/mcp-gateway/commodity/getTerminalRecommendCommodityList';
		this.getShowData(Url);
		this.setIntervalTimer(Url);
	}  
	init = (props,random) => {
		let { data } = props;
		let swiperOptions = data.data.content.swiperOptions;
		swiperOptions = this.formatObj(swiperOptions,random);
		this.mySwiperRecomImage&&this.mySwiperRecomImage.destory(false);
		this.initSwiper(swiperOptions,random);   
	};       
	 initSwiper = (swiperOptions,random) => {
	 	this.mySwiperRecomImage = new Swiper(`.swiper-container_recom_${random}`, swiperOptions) 
	};  
	formatObj = (obj,random) => { 
		let new_obj = obj;
		new_obj.on = {
			slideChange:()=>{
				this.mySwiperRecomImage ? setTimeout(()=>{this.setState({realIndex:this.mySwiperRecomImage.realIndex})},500) : null
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
	//获取去展示数据
	getShowData = Url => {
		let local = localStorage.getItem('RYRecommendShopsList');
		local ? this.getList() : this.postData(Url);
	} 
	//获取在线数据
	postData = Url => {
		RY_interent ? postJSON(Url,{mallId:configData.mallId,currentPage:1,pageSize:1000}).then(res=>{
			if(res.msg == 'success'){
				let list = res.data.data.list;
				let no_data = !list || (list&&list.length == 0) ? true : false;
				localStorage.setItem('RYRecommendShopsList',JSON.stringify(list));
				this.setState({recommendGoods:list,no_data:no_data,loaded:true},()=>{
					!no_data ? this.init(this.props,this.state.random) : null
				}); 
			}else if(res.msg == 'fail'){
				this.setState({recomState:false});
			} 
		}) : this.setState({no_intnet:true});
	} 
	//dingshi更新
	setIntervalTimer = Url => {
		RY_interent ? postJSON(Url,{mallId:configData.mallId,currentPage:1,pageSize:1000}).then(res=>{
			if(res.msg == 'success'){
				let list = res.data.data.list;
				let no_data = !list || (list&&list.length == 0) ? true : false;
				localStorage.setItem('RYRecommendShopsList',JSON.stringify(list));
			}  
		}) : null
		this.timerRecommend = setInterval(()=>{
			RY_interent ? postJSON(Url,{mallId:configData.mallId,currentPage:1,pageSize:1000}).then(res=>{
				if(res.msg == 'success'){
					let list = res.data.data.list;
					let no_data = !list || (list&&list.length == 0) ? true : false;
					localStorage.setItem('RYRecommendShopsList',JSON.stringify(list));
					this.setState({recommendGoods:list,no_data:no_data,loaded:true}); 
				} 
			}) : null
		},1000*parseInt(configData.RYPostUrl.getTime))
	} 
	//获取本地数据
	getList = () => {
		let newList = JSON.parse(localStorage.getItem('RYRecommendShopsList'));
		let no_data = newList.length == 0 ? true : false;
		this.setState({recommendGoods:newList,no_data:no_data,loaded:true},()=>{
			!no_data ? this.init(this.props,this.state.random) : null
		});  
	}    
	componentWillUnmount(){
		this.mySwiperRecomImage&&this.mySwiperRecomImage.destroy(false)
		clearInterval(this.timerRecommend);
	}
	render() { 
		let props = this.props;
		let { data } = props;
		let swiperOptions = data.data.content.swiperOptions;
		return (
			<section className={`e-swiper-by-goods`}>
				{
					!this.state.no_intnet ? (this.state.recomState ? <div>
							<SlideOne 
								props={props} 
								random={this.state.random} 
								loaded={this.state.loaded}
								no_data={this.state.no_data} 
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
						</div> : <div className="no_intnet_RY"><img src="./image/shopfail.png" /></div>) :
					<div className="no_intnet_RY"><img src="./image/no_inter.png" /></div>
				}
			</section>
		)
	}
} 

//推荐商品轮播
class SlideOne extends React.Component {

	shouldComponentUpdate(nextProps,nextState){
		return nextProps.loaded
	} 
	componentDidUpdate(){
		
		
	}  
	render(){  
		let { props,random,recommendGoods,no_data,loaded,realIndex } = this.props,
			{ data } = props,
			{ content,componentLayout } = data.data,
			swiperBind = componentLayout.filter(item=>item.name == 'swiperBind'),
			contentBind = swiperBind.length>0 ? swiperBind[0].data.content.bind : 'no',
			styleObj = cssColorFormat(props, 'filterBox');
		return (  
			!loaded ? <div className="no_intnet_RY"><img src="./image/shoploading.png" /></div> : 
			 (!no_data ? <div className={`swiper-container swiper-container_recom_${random}`}>
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
			</div> : <div className="no_intnet_RY"><img src="./image/noshop.png" /></div>)
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

