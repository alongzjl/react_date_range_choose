/**
 * @Author: Along
 * @Date:   2018-05-05

 */
 

import React from 'react'
import {
	Row, Col,
	Button, Card, Checkbox, Collapse, Select,message } from 'antd'

const { Panel }    = Collapse
const Option = Select.Option;
  

import './index.less' 

class Date extends React.Component {
	
	componentWillReceiveProps(props) {
		
	}; 
	componentDidMount() {
		let {actions,editConfig} = this.props.data; 
		let { globalData } = editConfig;
		this.timer = setInterval(()=>{
			actions['updateGlobal'](globalData); 
		},1000) 
	}; 
	componentWillUnmount(){
		clearInterval(this.timer);
	}; 
	cb = key => {
		console.log(key)
	};
	handleChange = value => {
		let {data,actions,editConfig} = this.props.data; 
		let { curData, curComp } = editConfig 
		let { parentComp } = curData
		data.data.content.type = value;
		data.data.layout.width = value != 2 ? 540 : 250; 
		data.data.layout.height = value == 3 ? 100 : 150;     
		console.log(value);    
		actions['updateComp'](null, parentComp? parentComp: data)
	};
	handleChangeDate = value => {
		let {actions,editConfig} = this.props.data; 
		let { globalData } = editConfig 
		globalData.date.format_date = value;
		console.log(globalData);    
		actions['updateGlobal'](globalData)
	};
	handleChangeTime = value => {
		let {actions,editConfig} = this.props.data; 
		let { globalData } = editConfig 
		globalData.date.format_time = value;
		console.log(globalData);     
		actions['updateGlobal'](globalData) 
	};      
	render() {   
		const options = [{type:1,show:'天气+日期常规'},{type:2,show:'日期迷你'},{type:3,show:'日期常规'}];
		const options_date = [{value:'-',show:'YYYY-MM-DD',type:1},{value:'/',show:'YYYY/MM/DD',type:1},{value:'rongyi',show:'YYYY年M月D日',type:2}];
		const options_time = [{value:':',show:'HH:mm:ss',type:1},{value:'rongyi',show:'HH:mm',type:2}];
		return (  
			<div className="e-date-content">
				<Collapse activeKey={['0']} onChange={this.cb}>
					<Panel header='模式选择' key={0}>
						<div key={0} className="pgs-row">
							<div className="pgsr-name">选择样式</div>  
							<Select defaultValue={options[0].show} style={{ width: 120 }} onChange={this.handleChange}>
     							{     
     								options.map((item,index)=><Option value={item.type} key={index}>{item.show}</Option>) 
     							}   
   							 </Select>
						</div>
						<div key={1} className="pgs-row">
							<div className="pgsr-name">日期格式</div>  
							<Select defaultValue={options_date[0].show} style={{ width: 120 }} onChange={this.handleChangeDate}>
     							{     
     								options_date.map((item,index)=><Option value={item.value} key={index}>{item.show}</Option>) 
     							}   
   							 </Select>
						</div>   
						<div key={2} className="pgs-row">
							<div className="pgsr-name">时间格式</div>  
							<Select defaultValue={options_time[0].show} style={{ width: 120 }} onChange={this.handleChangeTime}>
     							{     
     								options_time.map((item,index)=><Option value={item.value} key={index}>{item.show}</Option>) 
     							}   
   							 </Select>
						</div>
					</Panel>
				</Collapse>	
			</div>  
		) 
	}
}

export default Date