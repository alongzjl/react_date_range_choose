/**
 * @Author: Along
 * @Date:   2018-08-06

 **/

import React from 'react'
import Layout from '../../Layout'
import JumpRouter from '../../../JumpRouter'
import checkToJump from '../../../checkToJump'
import {postJSON} from '../../Common/RYAjax'
import './index.less' 

export default class CatgByStore extends React.Component {
	state = {
		catgs:[]
	}
	componentDidMount(){
		let catgUrl = configData.RYPostUrl.api + '/mcp-gateway/terminalCategory/getTerminalCategoryList';
		this.showData(catgUrl);
		this.setIntervalTimerCatgs(catgUrl);
	} 
	//显示数据
	showData = catgUrl => { 
		let local = localStorage.getItem('RYCatgsList');
		local ? this.getCatgs() : this.postCatgs(catgUrl);
	} 
	//读取在线数据
	postCatgs = catgUrl => {
		RY_interent ? postJSON(catgUrl,{mallId:configData.mallId,currentPage:1,pageSize:100}).then(res=>{
			if(res.msg == 'success'){
				localStorage.setItem("RYCatgsList",JSON.stringify(res.data.data.list));
				this.setState({catgs:res.data.data.list}) 
			}
		}) : null
	} 
	//定时更新
	setIntervalTimerCatgs = catgUrl => {
		RY_interent ? postJSON(catgUrl,{mallId:configData.mallId,currentPage:1,pageSize:100}).then(res=>{
			if(res.msg == 'success'){
				localStorage.setItem("RYCatgsList",JSON.stringify(res.data.data.list));
			}
		}) : null
		this.timerCatgs = setInterval(()=>{
			this.postCatgs(catgUrl);
		},1000*parseInt(configData.RYPostUrl.getTime))
	}
	//获取本地数据
	getCatgs = () => {
		let local = localStorage.getItem('RYCatgsList');
		let catgShopsList = JSON.parse(local);
		this.setState({catgs:catgShopsList});
	} 
	//筛选分类
	toLists = categoryId => {
		const {ioOuter,action,data,have_goods,animate,animateParams } = this.props,
			router = data.data.content.router ? data.data.content.router.url : '',
			typeTo = have_goods ? 'shopFilter' : {categoryId:categoryId};
		have_goods ? ioOuter(categoryId) : null;
		let dataStr = checkToJump(typeTo,router,categoryId,203);
		JumpRouter(dataStr,animate,animateParams,action);
	}
	componentWillUnmount(){
		clearInterval(this.timerCatgs);
	}	
	render() { 
		let { data,ioInput } = this.props,
			catgs = this.state.catgs,
			styleObj = cssColorFormat(this.props, 'filter'),
			filterBox = cssColorFormat(this.props, 'filterBox'),
			filterFlex = cssColorFormat(this.props, 'filterFlex');
		return (
			<section className="e-catg-by-goods" style={filterBox} >
				<div className="e-catg-by-goods-box" style={filterFlex} >
					{
						catgs.map((_, i) => {
							return <div key={i} onClick={()=>{this.toLists(_.categoryId)}} ><CatgOne data={data} ioInput={ioInput} item={_} styleObj={styleObj} /></div>
						})
					}
				</div>
			</section>
		)
	}
}
//单个组件
class CatgOne extends React.Component {

	render(){
		let { ioInput,data,refresh,item,styleObj } = this.props,
			{ componentLayout } = data.data,
			{ mapParams } = ioInput,
			everyId = item.categoryId,
			cl = [],
			catgId = mapParams.catgId,
			isAV = everyId == catgId;
		componentLayout.map(_ => {
			let { active } = _.feature
			if ((isAV && active) || (!isAV && !active)) {
				cl.push(_)
			}
		})
		let dataNew = JSON.parse(JSON.stringify(data))
		dataNew.data.componentLayout = cl
		return (
				<div className="catgClick" >
					<Layout itemList={item} data={dataNew} styleObj={styleObj} refresh={true} />
				</div>
			)
	}
}
