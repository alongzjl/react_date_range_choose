/**
 * @Author: Along
 * @Date:   2018-07-25

 **/

import React from 'react'
import './index.less'
import Custom from '../Custom'

export default class GoodsListShow extends React.Component {
	
	state = {
		paramsData:{mapParams:{catgId:'noCatgId'}},
		have_goods:false
	}
	componentWillMount(){
		let ipt = this.state.paramsData,
			{ data } = this.props,
			comp = data.data.components,
			goods = comp.filter(item=>item.name == 'listByGoods'); 
		if(goods.length > 0){ 
			this.setState({have_goods:true});
		}else{ 
			let noGoodsShow = {mapParams:{catgId:'noShow'}};
			this.setState({paramsData:noGoodsShow});
		} 
		
	}
	ioOuter = id => {
		let ipt = this.state.paramsData,
			catgId = ipt.mapParams.catgId;
		if(catgId != id){
			ipt.mapParams.catgId = id;
			this.setState({mapParams:ipt})
		} 
	}

	render() {
		let { data,animate,animateParams,action } = this.props
		return (
			<div style={{height:"100%"}}>
				{
					<Custom 
						data={data}
						animate={animate}
						animateParams={animateParams}
						ioInput={this.state.paramsData}
						ioOuter={this.ioOuter}
						action={action}
						have_goods={this.state.have_goods}
					/>
				}
			</div>
		)
	}
}
