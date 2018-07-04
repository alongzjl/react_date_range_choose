/**
 * @Author: Along
 * @Date:   2018-05-07

 */
  

import React from 'react'
import {
	Row, Col,
	Button, Card, Checkbox, Collapse, Select,message,Icon,InputNumber } from 'antd' 

const { Panel }    = Collapse
const Option = Select.Option;
  

import './index.less' 

class Map2D extends React.Component {
	
	cb = key => {
		console.log(key)
	};
	handleChange = value => {
		let {data,actions,editConfig} = this.props.data;
		let { curData, curComp } = editConfig
		let { parentComp } = curData
		data.data.content.themeColor = value;
		console.log(value); 
		actions['updateComp'](null, parentComp? parentComp: data)
	};
	
	render() {  
		let { data,editConfig } = this.props.data,
			theme = editConfig.globalData.theme.list,
			themeOptions = [];
			Object.keys(theme[0].colors).map((item,index)=>{
				theme[0].colors[item].color ? themeOptions.push(theme[0].colors[item]) : null
			}) 
		return ( 
			<div className="e-map2D-content">
				<Collapse activeKey={['0']} onChange={this.cb}>
					<Panel header='主题色' key={0}>
						<div className="pgs-row" key={0}>
							<div className="pgsr-name">选择主题色</div>
							<div className="pgsr-ctrl">
								<Select defaultValue={data.data.content.themeColor || '#fff'} style={{ width: 120 }} onChange={this.handleChange}>
     							{       
     								themeOptions.map((item,index)=><Option value={item.color} key={index}>{item.name}</Option>)
     							} 
   							 </Select>
							</div>
						</div> 
					</Panel>
				</Collapse>	
			</div>  
		) 
	}
}

export default Map2D