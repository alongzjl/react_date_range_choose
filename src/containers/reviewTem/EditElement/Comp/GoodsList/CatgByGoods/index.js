/**
 * @Author: Along
 * @Date:   2018-08-06

 **/

import React from 'react'
import Layout from '../../Layout'
import JumpRouter from '../../../JumpRouter'
import checkToJump from '../../../checkToJump'
import './index.less' 
import * as Server from 'server'

export default class CatgByStore extends React.Component {
	state={
		catgs:[]
	}
	componentDidMount(){
		Server.goods.getCategoryList(o => {
			this.setState({ catgs: o })
		})
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
