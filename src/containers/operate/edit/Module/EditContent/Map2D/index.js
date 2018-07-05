/**
 * @Author: Along
 * @Date:   2018-05-07

 */
  

import React from 'react'
import {
	Row, Col,
	Button, Card, Checkbox, Collapse, Select,message,Icon,InputNumber } from 'antd' 
import ColorPicker from 'rc-color-picker'
const { Panel }    = Collapse
const Option = Select.Option;
  

import './index.less' 

class Map2D extends React.Component {
	
	cb = key => {
		console.log(key)
	};
	handleChange = value => {
		let {data,actions,editConfig} = this.props.data
		let { curData, curComp } = editConfig
		let { parentComp } = curData,
			theme  = editConfig.globalData.theme,
			themeColor = data.data.content.themeColor,
		 	colors = JSON.parse(JSON.stringify(theme.list[theme.idx].colors));
		value != 'custom' ? data.data.content.themeColor = {type:value,color:colors[value].color} : 
		 data.data.content.themeColor = {type:value,color:themeColor.color};
		console.log(value); 
		actions['updateComp'](null, parentComp? parentComp: data)
	};
	changeCustomColor = c => {
		var col = c.color.colorRGB()
		col.push(c.alpha/100)
		col = `rgba(${col.join(',')})`
		let { data, actions, editConfig }  = this.props.data
		let { curData } = editConfig
		let { parentComp } = curData
		data.data.content.themeColor = {type:'custom',color:col}
		return actions['updateComp'](null, parentComp? parentComp: data)
	}
	render() {
		let { data, editConfig }  = this.props.data,
			themeColor = data.data.content.themeColor,
			type = themeColor.type,
		 	theme  = editConfig.globalData.theme,
		 	colors = JSON.parse(JSON.stringify(theme.list[theme.idx].colors)),
		 	cp;
		colors.custom = {
			name:  '自定义',
			color: themeColor.color
		}
		if (!colors[type]) {
			return false
		}
		let options = Object.keys(colors).map((_) => {
			let col = colors[_]
			if (col.color === undefined) return false
			return (
				<Option key={col.name} value={_}>
					<div className="pgt-row">
						<span className="pgt-color mr5">
							<span className="pgt-color-icon" style={{backgroundColor: col.color}}></span>
						</span>
						{col.name}
					</div>
				</Option>
			)
		})
		if (type === 'custom') {
			cp = (
				<Col span={6}>
					<ColorPicker
						alpha={themeColor.alpha === undefined? 100: themeColor.alpha}
						color={themeColor.rgb || themeColor.color}
						onClose={this.changeCustomColor}
						placement={ 'bottomLeft' }
					/>
				</Col>
			)
		}
		return (
			<div className="e-map2D-content">
				<Collapse activeKey={['0']} onChange={this.cb}>
					<Panel header='主题色' key={0}>
						<div className="pgs-row" key={0}>
							<div className="pgsr-name">选择主题色</div>
							<div className="pgsr-ctrl">
								<Row>
									{ cp }
									<Col span={18}>
										<Select
											style={{ width: '100%' }}
											value={type}
											defaultValue={type}
											onChange={this.handleChange}
										>
											{ options }
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

export default Map2D