/**
 * @Author: Along
 * @Date:   2018-05-02
 
 */

import React from 'react'
import './index.less'
import {
	Row, Col,
	Button, Card, Checkbox, Collapse, Select,message,Icon } from 'antd'

const { Panel }    = Collapse
const Option = Select.Option;

class ListByStore extends React.Component {
	state = {

	};
	cb = e =>{
		console.log(e)
	};
	onChange = value => {
		let {data,actions,editConfig} = this.props.data;
		let { curData, curComp } = editConfig
		let { parentComp } = curData
		data.data.content.animationType = value;
		actions['updateComp'](null, parentComp? parentComp: data)
	}
	render() {
		const { data } = this.props
		const type = data.data.data.content.animationType
		let option = [{name:'淡入',value:1},{name:'弹入',value:2}]
		return (
			<div className="e-listByStore-content">
				<Collapse activeKey={['0']} onChange={this.cb}>
					<Panel header='店铺动效' key={0}>
						<div className="pgs-row" key={0}>
							<div className="pgsr-name">选择动画</div>
							<div className="pgsr-ctrl">
								<Row type="flex" align="middle" style={{ width: '100%' }}>
								<Col span={9}>
									<Select defaultValue={type} style={{ width: 120 }} onChange={value => this.onChange(value)}>
										{        
											option.map((item,index)=><Option value={item.value} key={index}>{item.name}</Option>)
										} 
									 </Select>
								</Col>
							</Row>
							</div>
						</div>
					</Panel> 
				</Collapse>	
			</div>  
		)
	}
}

export default ListByStore