/**
 * @Author: Along
 * @Date:   2018-05-10
 
 */ 

import React from 'react'
import './index.less'
import RNMsgChannel from 'react-native-webview-messaging'
import checkToJump from '../../checkToJump'
import Custom from '../Custom'

class StoreDetailsNew extends React.Component {
	state = {
		shopDetais:[{NAME:'',LOCAL_LOGO:'',BERTH_NUMBER:'',CONTACT:'',LOCAL_URL:[{LOCAL_URL:''}],DESCRIPTION:''}],
		first:0
	}
	componentWillMount() {
		let { query } = this.props;
		if(query.params){
			const params = JSON.parse(query.params)
			params['store'] ? RNMsgChannel.emit('RY_shopParams',{id:params['store'],currentPage:1}) : null;
		}
	}
	componentDidMount(){
		let { query } = this.props;
		if(query.params){
			const params = JSON.parse(query.params)
			RNMsgChannel.on('RY_shops', data => {
				const first = this.state.first + 1
				first<=2&&params['store'] ? this.setState({
					shopDetais:data.data[0],
					first:first
				}) : null
			});
		}
	}
	shouldComponentUpdate(nextProps,nextState){
		let { query } = nextProps;
		if(query.params){
			return nextState.first == 1 ? true : false
		}else{
			return true
		}
	}
	render() { 
		let { data, query,animate,animateParams,page } = this.props;
		let shopDetais = query.detail ? JSON.parse(query.detail) : this.state.shopDetais[0];
		if(query.params&&this.state.first == 0){
			return false
		}
		let comp  = data.data.components;
		data.data.components = comp.map(item=>{
			if(item.name == 'button'){
				let queryData = checkToJump(shopDetais,item.data.content.router.url)
				item.data.content.router.RYDetail = queryData
			}
			return item
		}) 
		let ioInput = {itemDetails:shopDetais,mapParams:{}}
		return (   
			<Custom
				data={data}
				animate={animate}
				animateParams={animateParams}
				page={page}
				ioInput={ioInput}
			/>  
		)
	}
}
 
export default StoreDetailsNew
