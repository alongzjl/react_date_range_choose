/**
 * @Author: Along
 * @Date:   2018-05-03

 */
 import React from 'react'
import './index.less'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

import {
	Row, Col,
	Checkbox, Collapse, InputNumber, Radio, Slider, Switch,Select
} from 'antd'
const { Panel }    = Collapse
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group
const Option = Select.Option

const setOptions = {
	loop:{name:'开启循环',type:'Switch',true:true,false:false}, 
	autoplay:{name:'自动播放',type:'Switch',true:true,false:false}, 
	delay: {name:'停留时间', type: 'Number', min: 500, max: 3000, step: 100 },
	reverseDirection:{name:'反向自动轮播',type:'Switch',true:true,false:false},
 

	speed: {name:'切换速度', type: 'Number', min: 100, max: 3000, step: 100 },
	effect :{name:'切换方式',type:'Select',option: [
		{ name: '普通切换', value: 'slide' },
		{ name: '淡入', value: 'fade' },
		{ name: '方块', value: 'cube' },
		{ name: '3d流', value: 'coverflow' },
		{ name: '3d翻转', value: 'flip' },
	]},


	pagination:{name:'分页显示',type:'Switch',true:true,false:false},
	type :{name:'显示类型',type:'Select',option: [
		{ name: '圆点', value: 'bullets' },
		{ name: '分布式', value: 'fraction' },
		{ name: '进度条', value: 'progressbar' },
	]},
	progressbarOpposite:{name:'分页方向',type:'Select',option: [
		{ name: '与轮播方向平行', value: 0 },
		{ name: '与轮播方向垂直', value: 1 },
	]}, 
	dynamicBullets:{name:'动态隐藏',type:'Switch',true:true,false:false},
	clickable:{name:'点击切隐藏分页器',type:'Switch',true:true,false:false},
	hideOnClick:{name:'点击切换轮播',type:'Switch',true:true,false:false},

	layout :{name:'布局选择',type:'Select',option: [
		{ name: '方式一', value: 1 },
		{ name: '方式二', value: 2 },
		
	]}, 
 }

class SwiperImage extends React.Component {
	
	onChange = (val,key) => { 
		let { data, actions, editConfig } = this.props.data
		let { curData } = editConfig
		let { parentComp } = curData 
		if(key == 'delay'||key=='reverseDirection'){
			data.feature['swiperOptions']['autoplayOptions'][key] = val
		}else if(key == 'type'||key=='progressbarOpposite'||key=='dynamicBullets'||key=='clickable'||key=='hideOnClick'){
			data.feature['swiperOptions']['paginationOptions'][key] = val
		}else if(key != 'layout'){
			 data.feature['swiperOptions'][key] = val
		}   
		if(key == 'progressbarOpposite'){
			data.feature['swiperOptions']['paginationOptions'][key] = Boolean(val); 
		} 
		if(key == 'layout'){
			 data.feature[key] = val;
		}     
		actions.updateComp(null, parentComp? parentComp: data)
	}; 
	onChangeAuth(val, key) {
		let { data, actions, editConfig } = this.props.data
		let { curData } = editConfig
		let { parentComp } = curData
		data.auth.feature[key] = val
		actions.updateComp(null, parentComp? parentComp: data)
	}    

	// 数字
	renderNumber(cfg, data, val, key) {
		return (
			<InputNumber
				min={cfg.min || 0} max={cfg.max} step={cfg.step || 1}
				value={val} onChange={v => this.onChange(v, key)}
				style={{ width: '100%' }}
			/>
		)
	} 
	//选择 
	renderSelect(cfg, data, val, key) {
		let option = cfg.option; 
		key == 'progressbarOpposite' ? val = Number(val) : null;  
		return (   
			<Select defaultValue={val} style={{ width: 120 }} onChange={value => this.onChange(value, key)}>
				{        
					option.map((item,index)=><Option value={item.value} key={index}>{item.name}</Option>)
				} 
			 </Select>
		) 
	} 
	// 滑动开关
	renderSwitch(cfg, data, val,key) {
		return ( 
			<Switch
				size="small"
				checked={val === cfg.true} onChange={v => this.onChange(v? cfg.true: cfg.false,key)}
			/>
		)
	}
	renObj(data, content) {
		let childNode = Object.keys(content).map((p, i) => {
			if (!setOptions[p]) return false
			let cm     = setOptions[p]
			let val    = content[p]
			let render = this[`render${cm.type}`]
			if (!render) return false
			// 根据样式类型渲染对应组件
			let dom = this[`render${cm.type}`].bind(this, cm, data, val, p)()
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name">{ cm.name }</div>
					<div className="pgsr-ctrl">{ dom }</div>
					<div className="pgsr-auth"> 
						<Checkbox checked={data.auth.feature[p]} onChange={_ => this.onChangeAuth(_.target.checked, p)} />
					</div>
				</div> 
			)
		})
		return childNode
	} 
	
	render() {
		let { data } = this.props.data;   
		const swiperOptions = data.feature.swiperOptions;
		const dom_show_1 = this.renObj(data,swiperOptions);
		let dom_show_2 = null,dom_show_3 = null;
		if(swiperOptions['autoplay']){
			dom_show_2 = this.renObj(data,swiperOptions['autoplayOptions'])
		}   
		if(swiperOptions['pagination']){
			dom_show_3 = this.renObj(data,swiperOptions['paginationOptions'])
		}   
		return (  
			<div className="c-SwiperImage"> 
				<Collapse activeKey={['0']} onChange={this.cb}>
					<Panel header='轮播设置' key={0}>
						<div className="pgs-row" key={0}> 
							<div className="pgsr-name">布局样式</div>
							<div className="pgsr-ctrl"> 
								{
									this.renderSelect(setOptions.layout,data,1,'layout')
								}
							</div>
						</div> 
						{ dom_show_1 }{ dom_show_2 }{ dom_show_3 }
					</Panel>  
				</Collapse>	
			</div>   
		)
	}
} 
 
export default SwiperImage