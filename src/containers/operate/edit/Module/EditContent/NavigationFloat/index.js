/**
 * @Author: Along
 * @Date:   2018-05-07

 */
  

import React from 'react'
import {
	Row, Col,
	Button, Card, Checkbox, Collapse, Select,message,Icon } from 'antd' 

const { Panel }    = Collapse
const Option = Select.Option;
  

import './index.less' 

class NavigationFoat extends React.Component {
	
	componentWillReceiveProps(props) {
		
	}; 
	componentDidMount() {
		
	};
	cb = key => {
		console.log(key)
	};
	handleChange = value => {
		let {data,actions,editConfig} = this.props.data;
		let { curData, curComp } = editConfig
		let { parentComp } = curData
		const num_add = value - data.data.content.length;
		let add_default = [];
		let obj = {   
			img: { type: 'custom', img: '' },			// 图片url
			title: `导航${data.data.content.length+1}`,		// 图片标题
			router: ''  	 		// 路由 
		}
		add_default.push(obj); 
		add_default = data.data.content.concat(add_default);
		data.data.content = add_default;
		console.log(value); 
		actions['updateComp'](null, parentComp? parentComp: data)
	};
	handleChangeStyle = value => {
		let {data,actions,editConfig} = this.props.data;
		let { curData, curComp } = editConfig
		let { parentComp } = curData
		data.layout.type = value;
		switch (value) {
			case 1 : data.data.layout.width = 80;
			break;
			case 2 : data.data.layout.width = 120; 
			break;
			case 3 : data.data.layout.width = 300;
			break;
			default:;
			break
		}
		if(data.layout.position == 'right'){
			if(data.layout.type == 1){
				data.data.layout.left = 460;
			}else if(data.layout.type == 2){
				data.data.layout.left = 420; 
			}  
		}  
		console.log(value); 
		actions['updateComp'](null, parentComp? parentComp: data)
	};
	handleChangePosition = value => {
		let {data,actions,editConfig} = this.props.data;
		let { curData, curComp } = editConfig
		let { parentComp } = curData
		data.layout.position = value;
		switch (value) { 
			case 'left' : data.data.layout.left = 0;data.data.layout.top = 220;
			break;
			case 'right' : 
					if(data.layout.type == 1){
						data.data.layout.left = 460;
					}else if(data.layout.type == 2){
						data.data.layout.left = 420; 
					} 
					data.data.layout.top = 220;
			break;   
			default:;   
			break
		}
		console.log(value); 
		actions['updateComp'](null, parentComp? parentComp: data)
	};    
	render() {  
		let { data } = this.props.data      
		const options = [2,3,4,5,6,7,8,9,10,11,12,13,14,15];
		const options_style = [{
				type:1,
				show:'布局样式一'
			},{
				type:2,
				show:'布局样式二'
			}];
		const options_position = [{type:'left',show:'左'},{type:'right',show:'右'}/*,{type:'top',show:'上'},{type:'bottom',show:'下'}*/];
		return ( 
			<div className="e-navigation-content">
				<Collapse activeKey={['0']} onChange={this.cb}>
					<Panel header='导航设置' key={0}>
						<div className="pgs-row" key={0}>
							<div className="pgsr-name">添加导航</div>
							<div className="pgsr-ctrl">
								<Row type="flex" align="middle" style={{ width: '100%' }}>
								<Col span={9}>
									<div className="add_img" onClick={this.handleChange}>
										<div className="add_text"><Icon type="plus" /></div>
									</div>
								</Col>
							</Row>
							</div>
						</div> 
						<div key={1} className="pgs-row">
							<div className="pgsr-name">布局方式</div>  
							<Select defaultValue={data.layout.type} style={{ width: 120 }} onChange={this.handleChangeStyle}>
     							{       
     								options_style.map((item,index)=><Option value={item.type} key={index}>{item.show}</Option>)
     							} 
   							 </Select>
   						</div> 
   						<div key={2} className="pgs-row">
   							<div className="pgsr-name">位置选择</div>  
							<Select defaultValue={data.layout.position} style={{ width: 120 }} onChange={this.handleChangePosition}>
     							{      
     								options_position.map((item,index)=><Option value={item.type} key={index}>{item.show}</Option>)
     							} 
   							 </Select>
   						</div>
					</Panel>
				</Collapse>	
			</div>  
		) 
	}
}

export default NavigationFoat