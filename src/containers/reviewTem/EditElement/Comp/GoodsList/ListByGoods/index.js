/**
 * @Author: Along
 * @Date:   2018-07-25

 **/

import React from 'react'
import Layout from '../../Layout'
import IscrollAlong from '../IscrollAlong';
import JumpRouter from '../../../JumpRouter'
import checkToJump from '../../../checkToJump'
import {postJSON} from '../../Common/RYAjax'
import './index.less'

export default class ListByGoods extends React.Component {
	constructor(props) {
		super(props)
		this.currentPage = 1
	}
	state = {
		list:[],
		noUp:false,
		noDown:false,
		shops:[],
		no_data_goods:false
	}
	componentDidMount(){
		let shopsUrl=configData.RYPostUrl.api + '/mcp-gateway/commodity/getTerminalCommodityList';
		this.initData(this.props);
		this.setIntervalTimerShops(shopsUrl); 
	}
	componentWillReceiveProps(props){
		this.initData(props);
	}
	initData = props =>{
		let shopsUrl=configData.RYPostUrl.api + '/mcp-gateway/commodity/getTerminalCommodityList';
		let { ioInput } = props,
			catgId = ioInput.mapParams.catgId;
		let catgIdPost = catgId=='noCatgId' || catgId=='noShow' ? '' : catgId;
		this.showData(shopsUrl,catgIdPost,1); 
	} 
	//展示数据
	showData = (shopsUrl,catgIdPost,page,fn) => {
		let local = localStorage.getItem('RYShopsList'); 
		local ? this.getList(page,fn) : this.postShops(shopsUrl,catgIdPost,page,fn); 
	} 
	//请求在线数据
	postShops = (shopsUrl,catgId,page,fn) => {
		RY_interent ? postJSON(shopsUrl,{mallId:configData.mallId,categoryId:catgId,currentPage:page,pageSize:12}).then(res=>{
			if(res.msg == 'success'){
				const list = res.data.data.list;
				let no_data = list&&list.length == 0 ? true : false;
				fn ? fn({shops:list,no_data_goods:no_data}) : 
					this.setState({shops:list,no_data_goods:no_data,totalPage:res.data.page.totalPage});
			} 
		}) : this.setState({no_intnet:true});
	}  
	//定时刷新
	setIntervalTimerShops = shopsUrl => {
		//初始缓存基础数据
		RY_interent ? postJSON(shopsUrl,{mallId:configData.mallId,categoryId:'',currentPage:1,pageSize:1000}).then(res=>{
			if(res.msg == 'success'){
				const list = res.data;
				localStorage.setItem('RYShopsList',JSON.stringify(list));
			}
		}) : null 
		this.timerShops = setInterval(()=>{
			let { ioInput } = this.props,
				catgId = ioInput.mapParams.catgId;
				catgIdPost = catgId=='noCatgId' || catgId=='noShow' ? '' : catgId;
			RY_interent ? postJSON(shopsUrl,{mallId:configData.mallId,categoryId:catgIdPost,currentPage:1,pageSize:1000}).then(res=>{
				if(res.msg == 'success'){
					const list = res.data.data.list;
					this.setState({
						shops:list
					})
				} 
			}) : null
		},1000*parseInt(configData.RYPostUrl.getTime))
	}  
	//获取本地数据
	getList = (page,fn) => {
		let { ioInput } = this.props, 
			catgId = ioInput.mapParams.catgId,
			categoryId = catgId == 'noCatgId' || catgId=='noShow' ? '' : catgId, 
			shopsObj = JSON.parse(localStorage.getItem('RYShopsList')), 
			shopsList = shopsObj.data.list;  
		categoryId ? shopsList = shopsList.filter(item=>item.categoryId == categoryId) : null;
		let no_data = shopsList.length == 0 ? true : false,
			currentData = shopsList.slice(12*(page-1),page*12);
		fn ? fn({shops:currentData,no_data_goods:no_data}) : 
			this.setState({shops:currentData,no_data_goods:no_data,totalPage:Math.ceil(shopsList.length/12)});
	} 
	//跳转页面
	toDetails = item => {
		const { animate, animateParams,action,data } = this.props,
			router = data.data.content.router ? data.data.content.router.url : '',
			dataStr = checkToJump(item,router,item.commodityId,203);
			JumpRouter(dataStr,animate,animateParams,action)
	}
	//下拉刷新
	onDown = () => {
		this.initData(this.props);
	} 
	//上啦加载
	onUp = () => { 
		this.currentPage++;
		let shopsUrl=configData.RYPostUrl.api + '/mcp-gateway/commodity/getTerminalCommodityList',
			{ ioInput } = this.props,
			catgId = ioInput.mapParams.catgId,
			shops = this.state.shops,
		 	catgIdPost = catgId=='noCatgId' || catgId=='noShow' ? '' : catgId;
		if(this.currentPage <= this.state.totalPage){
			this.showData(shopsUrl,catgIdPost,this.currentPage,data=>{
				let shopsPull = data.shops;
				this.setState({
					shops:shops.concat(shopsPull)
				})   
			}); 
		}else{
			this.setState({
				shops:shops
			})
		}
	}
	componentWillUnmount(){
		clearInterval(this.timerShops);
	}	
	render() {
		let { data} = this.props,
			list = this.state.shops,
			styleObj = cssColorFormat(this.props, 'filter'),
			layoutObj = cssColorFormat(this.props, 'layout');
		return ( 
			<section className="e-list-by-goods" style={{height:layoutObj.height}}>
				{
					this.state.no_data_goods ? <div className="no_intnet_RY"><img src="./image/noshop.png" /></div> : <IscrollAlong key="0" id='goodsList'
					  detectionHeight={true}
					  children={this.state.list}
					  iscrollOptions={{
		                 preventDefault: false,
		             }}
		             noUp={this.currentPage < this.state.totalPage?this.state.noUp:true}
		             noDown={this.state.noDown}
			         onDown={() => this.onDown()}
	    			onUp={()=> this.onUp()}>
						{
							list.map((_, i) => <div className="goodsClick" key={i} onClick={()=>{this.toDetails(_)}}><Layout itemList={_} data={data} styleObj={styleObj} refresh={true} /></div>)
							
						}
					</IscrollAlong>
				}
			</section>
		)
	}
}


