/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import Color       from 'compEdit/EditCommon/Color'
// import ThemeManage from 'compEdit/EditCommon/ThemeManage'
import StyleManage from 'compEdit/EditCommon/StyleManage'

import {
	Row, Col,
	Checkbox, Collapse, InputNumber, Radio, Slider, Switch
} from 'antd'
const { Panel }   = Collapse
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

var styleMap = {
	layout: '组件样式',
	image:  '图片样式',
	text:   '文本样式'
}
// 定义样式名称 & 渲染类型 & 相关配置
var cssMap = {
	top:               { name: '上',      type: 'Number' },
	left:              { name: '左',      type: 'Number' },
	width:             { name: '宽',      type: 'Number', min: 0, max: 432 },
	height:            { name: '高',      type: 'Number', min: 0, max: 768 },
	borderRadius:      { name: '圆角',    type: 'Number' },
	borderWidth:       { name: '边宽',    type: 'Number' },
	lineHeight:        { name: '行高',    type: 'Number' },
	fontSize:          { name: '字号',    type: 'Number', min: 12, max: 90, step: 2 },
	textAlign:         { name: '对齐方式', type: 'TextAlign' },
	color:             { name: '字体颜色', type: 'Color' },
	fontWeight:        { name: '粗细',    type: 'Switch', true: 'bold',      false: 'normal' },
	fontStyle:         { name: '斜体',    type: 'Switch', true: 'italic',    false: 'normal' },
	textDecoration:    { name: '下划线',  type: 'Switch', true: 'underline', false: 'none' },
	opacity:           { name: '透明度',  type: 'Slider', min: 0, max: 1, step: 0.01 },
	backgroundColor:   { name: '背景颜色', type: 'Color' },
	boxShadow:         { name: '元素阴影', type: 'Shadow', min: 0, max: 20, step: 1 },
	textShadow:        { name: '文字阴影', type: 'Shadow', min: 0, max: 20, step: 1 },
	transformRotate:   { name: '旋转角度', type: 'Number', min: 0, max: 180, step: 1 },   
	borderWidth:       { name: '边框宽度', type: 'Number' },
	borderStyle:       { name: '边框样式', type: 'Solid' },  
	borderColor:       { name: '边框颜色', type: 'Color' }, 
} 
   
import './index.less'

class EditStyle extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(val, style, css, shadow) { 
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		if(shadow) {
			data.style[style][css][shadow] = val
		} else {
			style == 'feature'? data[style][css] = val: data.style[style][css] = val
		}
		actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeAuth(val, style, css) {
		// console.clear()
		// console.log(val)
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		data.auth[style][css] = val
		actions.updateComp(null, parentComp? parentComp: data)
	}

	cb(key) {
		console.log(key)
	}

	/* 渲染组件开始 */
	// 数字
	renderNumber(cfg, data, val, cls, key) {
		return (
			<InputNumber
				min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
				value={val} onChange={v => this.onChange(v, cls, key)}
				style={{ width: '100%' }}
			/>
		)
	}
	//描边
	renderShadow(cfg, data, val, cls, key) {
		const h_shadow   = val.h_shadow
		const v_shadow   = val.v_shadow
		const blur_dis   = val.blur_dis
		const spread_dis = val.spread_dis
		const color      = val.color
		return (
			<div>
				<div>
					水平偏移:
					<InputNumber
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={h_shadow} onChange={v => this.onChange(v, cls, key,'h_shadow')}
						style={{  width: '50%' }}
					/> 
				</div>
				<div>
					垂直偏移:
					<InputNumber
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={v_shadow} onChange={v => this.onChange(v, cls, key,'v_shadow')}
						style={{ width: '50%' }}
					/>
				</div> 
				<div>
					模糊距离:
					<InputNumber
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={blur_dis} onChange={v => this.onChange(v, cls, key,'blur_dis')}
						style={{ width: '50%' }}
					/>
				</div>
				<div>
					阴影大小:
					<InputNumber
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={spread_dis} onChange={v => this.onChange(v, cls, key,'spread_dis')}
						style={{ width: '50%' }}
					/>
				</div> 
				<div>
					阴影颜色:
					<Color
						data={data}
						color={color}
						path={`style.${cls}.${key}`}
						action={'updateComp'}
						placement="bottomLeft"
					/>
				</div>
			</div>
		)
	}
	// 偏移
	renderTextAlign(cfg, data, val, cls, key) {
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, cls, key)} value={val}>
				<RadioButton value="left">左</RadioButton>
				<RadioButton value="center">中</RadioButton>
				<RadioButton value="right">右</RadioButton>
			</RadioGroup>
		)
	}
	// 边框样式
	renderSolid(cfg, data, val, cls, key) {
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, cls, key)} value={val}>
				<RadioButton value="solid">实线</RadioButton>
				<RadioButton value="double">双线</RadioButton>
				<RadioButton value="dashed">虚线</RadioButton>
				<RadioButton value="dotted">点状</RadioButton> 
			</RadioGroup> 
		)
	}
	// 颜色
	renderColor(cfg, data, val, cls, key) {
		return (
			<Color
				data={data}
				color={val}
				path={`style.${cls}.${key}`}
				action={'updateComp'}
				placement="bottomLeft"
			/>
		)
	}
	// 开关
	renderCheckbox(cfg, data, val, cls, key) {
		return (
			<Checkbox
				checked={val === cfg.true} onChange={v => this.onChange(v.target.checked? cfg.true: cfg.false, cls, key)}
			/>
		)
	}
	// 滑动开关
	renderSwitch(cfg, data, val, cls, key) {
		return (
			<Switch
				size="small"
				checked={val === cfg.true} onChange={v => this.onChange(v? cfg.true: cfg.false, cls, key)}
			/>
		)
	}
	// 滑块
	renderSlider(cfg, data, val, cls, key) {
		return (
			<Row>
				<Col span={12}>
					<Slider
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, cls, key)}
					/>
				</Col>
				<Col span={3}></Col>
				<Col span={9}>
					<InputNumber
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, cls, key)}
						style={{ width: '100%' }}
					/>
				</Col>
			</Row>
		)
	}

	render() {
		let { data } = this.props
		if (!data.style) return false
		let styleList  = data.styleList				// 样式列表
		let styles     = Object.keys(data.style)	// 具体样式
		let activeKey  = Array.from(new Array(styles.length), (_, i) => `${i}`)
		// 位置大小
		let layoutNode = Object.keys(data.layout).map((q, j) => {
				if (!cssMap[q]) return
				let cm     = cssMap[q],
					val    = data.layout[q],
					render = this[`render${cm.type}`]
				if (!render) return
				// 根据样式类型渲染对应组件
				let dom = this[`render${cm.type}`].bind(this, cm, data, val, 'layout', q)()
				return (
					<div className="pgs-row" key={j}>
						<div className="pgsr-name">{ cm.name }</div>
						<div className="pgsr-ctrl">{ dom }</div>
						<div className="pgsr-auth"></div>
					</div>
				)
			})
		// 子组件循环渲染
		let childNode = styles.map((p, i) => {
			if (!styleMap[p]) return
			let ci    = 0
			let cnode = Object.keys(data.style[p]).map((q, j) => {
				if (!cssMap[q]) return
				++ci
				let cm     = cssMap[q],
					val    = data.style[p][q],
					render = this[`render${cm.type}`]
				if (!render) return
				// 根据样式类型渲染对应组件
				let dom = this[`render${cm.type}`].bind(this, cm, data, val, p, q)()
				return (
					<div className="pgs-row" key={j}>
						<div className="pgsr-name">{ cm.name }</div>
						<div className="pgsr-ctrl">{ dom }</div>
						<div className="pgsr-auth">
							<Checkbox checked={data.auth.style[p][q]} onChange={_ => this.onChangeAuth(_.target.checked, p, q)}></Checkbox>
						</div>
					</div>
				)
			})
			if (ci === 0) return
			return (
				<Panel header={styleMap[p]} key={i}>
					{ cnode }
				</Panel>
			)
		})
		return (
			<section className="pg-style">
				<Collapse defaultActiveKey={['0']} onChange={this.cb}>
					<Panel header={'组件样式'} key={0}>
						{ layoutNode }
					</Panel>
				</Collapse>
				<StyleManage
					data={data}
					add={false}
					edit={false}
					list={styleList.list}
					idx={styleList.idx}
					parentKey={'styleList'}
					action={'updateComp'}
					name={'样式'}
				/>
				<Collapse defaultActiveKey={activeKey} onChange={this.cb}>
					{ childNode }
				</Collapse>
				{
					data.name == 'swiperImage' ? <StyleManageSwiper feature={data} onChange={this.onChange.bind(this)} onChangeAuth={this.onChangeAuth.bind(this)} ></StyleManageSwiper> : null
				}
				
			</section>
		)
	}
}

class StyleManageSwiper extends React.Component {
	
	render (){
		let activeKey = Array.from(new Array(1), (_, i) => `${i}`)
		const feature = this.props.feature.feature;
		return (
			<Collapse defaultActiveKey={activeKey}>
				<Panel header={`轮播设置`} key={0}>
					<div className="pgs-row" key={2}>
						<div className="pgsr-name">自动循环</div>
						<div className="pgsr-ctrl">
							<Switch
								size="small"
								checked={feature.switch} onChange={v => this.props.onChange(v? true: false,'feature','switch')}
							/>
						</div>
					</div>
					<div className="pgs-row" key={4}>
						<div className="pgsr-name">循环间隔</div>
						<div className="pgsr-ctrl">
							<InputNumber
								min={100} max={5000} step={100}
								value={feature.autoPlayTime} onChange={v => this.props.onChange(v,'feature','autoPlayTime')}
								style={{ width: '100%' }}
							/>
						</div>
					</div>
				</Panel>
			</Collapse>
		)
	}
}

EditStyle.defaultProps = {
}
StyleManageSwiper.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditStyle)
