/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'
import Custom from '../Custom'

class StoreList extends React.Component {
	
 	state = {
		paramsData:{
			currentPage:1,
			floor:  '',
			letter: '', 
			catg:   '',
			loading:false,
			changePage:false,
			haveFloorMap:false,
			mapParams:{floor:0,shopNo:''},
			clickStore:false
		},
		first:true,
		Update:false,
		shopsInfo:{
			data:[],
			page:{total:36,currentPage:1,totalPage:3}
		}   
	};        
	componentWillMount() {
		let { data,floors } = this.props
		const size = data.data.content.size
		this.state.paramsData.size = size
		let paramsData = this.state.paramsData
		let comp  = data.data.components
		comp = comp.filter(item=>item.name == 'floorMap')
		this.do_not_params(comp,floors,paramsData,size);
	};
	componentWillReceiveProps(props){
		let { data } = props
		const size = data.data.content.size
		this.do_data(size)
	}
	//无传楼层路由参数时
	do_not_params = (comp,floors,paramsData,size) => {
		if(comp.length>0){
			const floor = floors[0].recordId
			paramsData.floor = floor
			this.setState({paramsData:paramsData},()=>{this.do_data(size)})
		}else{
			this.do_data(size)
		}
	}
	do_data = size => {
		let paramsData = this.state.paramsData,
			shopsInfo = this.state.shopsInfo;
		let shops = new Array(size).fill().map((_, i) => {
			return {
				"id": i + 1,
				"name":  'UNIQLO',
				"recordId": "5331402521232f996c000061",
				"BERTH_NUMBER": "F3-37A",
				"LOCAL_LOGO": "http://rongyi.b0.upaiyun.com/commodity/text/201805311433385479.png",
			} 
		}) 
		shopsInfo.data = [shops,shops,shops] 
		paramsData.loading = true;
		this.setState({ 
			paramsData:paramsData,
			shopsInfo:shopsInfo,
			Update:true
		})
	}      
 	ioOuter = (ipt,params) => {
		let { data } = this.props;
		const size = data.data.content.size;
		if(!ipt.changePage){
			ipt.currentPage = 1;
			ipt.loading = false;
		}
		params ? (ipt.mapParams[params.type] = params.value) : null 
		if(params&&params.type == 'shopNo'){
			ipt.clickStore = true
			ipt.loading = true
			this.setState({paramsData:ipt})
		}else{
			ipt.clickStore = false
			this.changeData(ipt,size)
		}
	} 
	changeData = (ipt,size) => {
		this.setState({paramsData:ipt,Update:false},()=>{
			this.do_data(size)
		}); 
	}
	render() {
		let { data,categories,floors,animate,animateParams,action } = this.props
		let comp  = data.data.components,haveFloorMap = false
		comp = comp.filter(item=>item.name == 'floorMap')
		if(comp.length > 0){
			haveFloorMap = true
		}
		this.state.paramsData.haveFloorMap = haveFloorMap
		return (  
			<div style={{height:"100%"}}>
				<Custom 
					data={data}
					animate={animate}
					animateParams={animateParams}
					shopsInfo={this.state.shopsInfo}
					floors={floors}
					categories={categories}
					ioInput={this.state.paramsData}
					ioOuter={this.ioOuter}
					action={action}
					storeUpdate={this.state.Update}
				/>  
			</div>
			 
		)
	} 
}

export default StoreList
