/**
 * @Author: Along
 * @Date:   2018-07-25

 **/

import React from 'react'
import Layout from '../../Layout'
import IscrollAlong from '../IscrollAlong';
import JumpRouter from '../../../JumpRouter'
import checkToJump from '../../../checkToJump'
import * as Server from 'server'
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
		totalPage:3
	}
	componentDidMount(){
		this.getData([]);
	}
	getData = list=> {
		Server.goods.getList(6, o => {
			list = list.concat(o)
			this.setState({ list: list })
		})
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
		this.getData([]);
	} 
	//上啦加载
	onUp = () => { 
		this.currentPage++;
		if(this.currentPage <= 3){
			this.getData(this.state.list); 
		}else{
			let list = this.state.list
			this.setState({
				list:list
			}) 
		}
	}
	render() {
		let { data} = this.props,
			list = this.state.list,
			styleObj = cssColorFormat(this.props, 'filter'),
			layoutObj = cssColorFormat(this.props, 'layout');
		return ( 
			<section className="e-list-by-goods" style={{height:layoutObj.height}}>
				{
					<IscrollAlong key="0" id='goodsList'
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


