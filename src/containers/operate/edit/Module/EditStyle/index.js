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

import Color           from 'compEdit/EditCommon/Color'
import StyleManage     from 'compEdit/EditCommon/StyleManage'

import {
	Row, Col,
	Checkbox, Collapse, InputNumber, Radio, Slider, Switch
} from 'antd'
const { Panel }   = Collapse
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

var styleMap = {
	image:        '图片样式',
	posIcon:      '图标样式',
	text:         '文本样式',
	title:        '标题样式',
	filterBox:    '盒样式',
	filter:       '元素样式',
	filterActive: '激活样式',
	swiperImage:  '轮播样式'
}
// 定义样式名称 & 渲染类型 & 相关配置
var cssMap = {
	display:           {name:'显示文本',   type: 'Switch', true: 'block',      false: 'none'  },
	top:               { name: '上',      type: 'Number', min: -300, max: 540 },
	left:              { name: '左',      type: 'Number', min: -200, max: 960 },
	width:             { name: '宽',      type: 'Number', min: 0, max: 540 },
	height:            { name: '高',      type: 'Number', min: 0, max: 960 },
	borderRadius:      { name: '圆角',    type: 'Number' },
	borderWidth:       { name: '边宽',    type: 'Number' },
	lineHeight:        { name: '行高',    type: 'Number' },
	fontSize:          { name: '字号',    type: 'Number', min: 6, max: 90, step: 2 },
	textAlign:         { name: '对齐方式', type: 'TextAlign', option: [
		{ name: '左', value: 'left' },
		{ name: '中', value: 'center' },
		{ name: '右', value: 'right' },
	] },
	color:             { name: '字体颜色', type: 'Color' },
	fontWeight:        { name: '粗细',    type: 'Switch', true: 'bold',      false: 'normal' },
	fontStyle:         { name: '斜体',    type: 'Switch', true: 'italic',    false: 'normal' },
	textDecoration:    { name: '下划线',  type: 'Switch', true: 'underline', false: 'none' },
	opacity:           { name: '透明度',  type: 'Slider', min: 0, max: 1, step: 0.01 },
	backgroundColor:   { name: '背景颜色', type: 'Color' },
	backgroundSize:    { name: '背景样式', type: 'BGSize' },
	boxShadow:         { name: '元素阴影', type: 'Complex', child: {
		h_shadow:   { name: '水平偏移', type: 'Number', max: 20 },
		v_shadow:   { name: '垂直偏移', type: 'Number', max: 20 },
		blur_dis:   { name: '模糊距离', type: 'Number', max: 20 },
		spread_dis: { name: '阴影大小', type: 'Number', max: 20 },
		color:      { name: '阴影颜色', type: 'Color' }
	} },
	textShadow:         { name: '文字阴影', type: 'Complex', child: {
		h_shadow:   { name: '水平偏移', type: 'Number', max: 20 },
		v_shadow:   { name: '垂直偏移', type: 'Number', max: 20 },
		blur_dis:   { name: '模糊距离', type: 'Number', max: 20 },
		color:      { name: '阴影颜色', type: 'Color' }
	} },
	borderRadius:       { name: '圆角', type: 'Complex', child: {
		topLeft:     { name: '上左', type: 'Number', max: 100 },
		topRight:    { name: '上右', type: 'Number', max: 100 },
		bottomLeft:  { name: '下左', type: 'Number', max: 100 },
		bottomRight: { name: '下右', type: 'Number', max: 100 }
	} }, 
	// boxShadow:         { name: '元素阴影', type: 'Shadow', min: 0, max: 20, step: 1 },
	// textShadow:        { name: '文字阴影', type: 'Shadow', min: 0, max: 20,  step: 1 },
	transformRotate:   { name: '旋转角度', type: 'Number', max: 180 },
	borderWidth:       { name: '边框宽度', type: 'Number' },
	borderStyle:       { name: '边框样式', type: 'Solid' },
	borderColor:       { name: '边框颜色', type: 'Color' },
	margin:            { name: '外边距', type: 'Complex', child: {
		top:     { name: '上', type: 'Number', max: 40 },
		right:   { name: '右', type: 'Number', max: 40 },
		bottom:  { name: '下', type: 'Number', max: 40 },
		left:    { name: '左', type: 'Number', max: 40 }
	} },
	marginTop:         { name: '外边距上', type: 'Number', max: 20 },
	marginRight:       { name: '外边距右', type: 'Number', max: 20 },
	marginBottom:      { name: '外边距下', type: 'Number', max: 20 },
	marginLeft:        { name: '外边距左', type: 'Number', max: 20 },
	padding:           { name: '内边距', type: 'Complex', child: {
		top:     { name: '上', type: 'Number', max: 40 },
		right:   { name: '右', type: 'Number', max: 40 },
		bottom:  { name: '下', type: 'Number', max: 40 },
		left:    { name: '左', type: 'Number', max: 40 }
	} },
	paddingTop:        { name: '内边距上', type: 'Number', max: 20 },
	paddingRight:      { name: '内边距右', type: 'Number', max: 20 },
	paddingBottom:     { name: '内边距下', type: 'Number', max: 20 },
	paddingLeft:       { name: '内边距左', type: 'Number', max: 20 },
	justifyContent:    { name: '对齐方式', type: 'TextAlign', option: [
		{ name: '左', value: 'flex-start' },
		{ name: '中', value: 'center' },
		{ name: '右', value: 'flex-end' }
	] }
} 
   
import './index.less'

class EditStyle extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(val, style, css, node) { 
		let { data, actions, editConfig } = this.props
		let da = data.data
		let { curData } = editConfig
		let { parentComp } = curData
		if(node) {
			da.style[style][css][node] = val
		} else {
			style === 'feature'
			?
			data[style][css] = val
			:
			style === 'layout'
			?
			da.layout[css] = val
			:
			da.style[style][css] = val
		}
		actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeAuth(val, style, css) {
		// console.clear()
		// console.log(val)
		let { data, actions, editConfig } = this.props
		let { curData }    = editConfig
		let { parentComp } = curData
		data.auth.style[style][css] = val
		actions.updateComp(null, parentComp? parentComp: data)
	}

	cb(key) {
		console.log(key)
	}

	/* 渲染组件开始 */
	// 数字
	renderNumber(cfg, data, val, cls, key, node) {
		return (
			<InputNumber
				min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
				value={val} onChange={v => this.onChange(v, cls, key, node)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 复合样式
	renderComplex(cfg, data, val, cls, key) {
		const child     = cfg.child
		const keys      = Object.keys(val)
		const childNode = keys.map((_, i) => {
			let cm  = child[_],
				dom = this[`render${cm.type}`].bind(this, cm, data, val[_], cls, key, _)()
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name" style={{ width: 52 }}>{ cm.name }</div>
					<div className="pgsr-ctrl">{ dom }</div>
				</div>
			)
		})

		return (
			<div>{ childNode }</div>
		)
	}
	// 偏移
	renderTextAlign(cfg, data, val, cls, key, node) {
		let option = cfg.option || [
			{ name: '左', value: 'left' },
			{ name: '中', value: 'center' },
			{ name: '右', value: 'right' }
		]
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, cls, key, node)} value={val}>
				{ option.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
			</RadioGroup>
		)
	}
	// 边框样式
	renderSolid(cfg, data, val, cls, key, node) {
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, cls, key, node)} value={val}>
				<RadioButton value="solid">实线</RadioButton>
				<RadioButton value="double">双线</RadioButton>
				<RadioButton value="dashed">虚线</RadioButton>
				<RadioButton value="dotted">点状</RadioButton> 
			</RadioGroup> 
		)
	}
	// 边框样式
	renderBGSize(cfg, data, val, cls, key, node) {
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, cls, key, node)} value={val}>
				<RadioButton value="contain">居中</RadioButton>
				<RadioButton value="cover">充满</RadioButton>
			</RadioGroup> 
		)
	}
	// 颜色
	renderColor(cfg, data, val, cls, key, node) {
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
	renderCheckbox(cfg, data, val, cls, key, node) {
		return (
			<Checkbox
				checked={val === cfg.true} onChange={v => this.onChange(v.target.checked? cfg.true: cfg.false, cls, key, node)}
			/>
		)
	}
	// 滑动开关
	renderSwitch(cfg, data, val, cls, key, node) {
		return (
			<Switch
				size="small"
				checked={val === cfg.true} onChange={v => this.onChange(v? cfg.true: cfg.false, cls, key, node)}
			/>
		)
	}
	// 滑块
	renderSlider(cfg, data, val, cls, key, node) {
		return (
			<Row>
				<Col span={12}>
					<Slider
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, cls, key, node)}
					/>
				</Col>
				<Col span={3}></Col>
				<Col span={9}>
					<InputNumber
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, cls, key, node)}
						style={{ width: '100%' }}
					/>
				</Col>
			</Row>
		)
	}

	render() {
		let { data } = this.props
		let da       = data.data
		let { style, layout } = da
		if (!style) return false
		let styleList  = data.styleList				// 样式列表
		let styles     = Object.keys(style)	// 具体样式
		let activeKey  = Array.from(new Array(styles.length), (_, i) => `${i}`)
		// 位置大小
		let layoutNode = Object.keys(layout).map((q, j) => {
				if (!cssMap[q]) return
				let cm     = cssMap[q],
					val    = layout[q],
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
			let cnode = Object.keys(style[p]).map((q, j) => {
				if (!cssMap[q]) return
				++ci
				let cm     = cssMap[q],
					val    = style[p][q],
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
			</section>
		)
	}
}

EditStyle.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditStyle)
