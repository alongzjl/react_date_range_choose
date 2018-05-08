/**
 * @Author: Along
 * @Date:   2018-05-05

 */
 

import React from 'react'
import {
	Row, Col,
	Button, Card, Checkbox, Collapse, Select,message,Icon } from 'antd'

const { Panel }    = Collapse
const Option = Select.Option;
  

import './index.less' 

class Navigation extends React.Component {
	
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
		const num_add = value - data.content.length;
		let add_default = [];
		let obj = {   
					img: { type: 'custom', img: 'http://ryoms.v4.rongyi.com/ryoms/images/menu-icon/icon3_2.png' },			// 图片url
					title: `导航${data.content.length+1}`,		// 图片标题
					router: '',  	 		// 路由 
				}
		add_default.push(obj); 
		add_default = data.content.concat(add_default);
		data.content = add_default;
		console.log(value);
		actions['updateComp'](null, parentComp? parentComp: data)
	};    
	render() {  
		let { data } = this.props.data      
		const options = [2,3,4,5,6,7,8,9,10,11,12,13,14,15];
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
					</Panel> 
				</Collapse>	
			</div>  
		) 
	}
}

export default Navigation