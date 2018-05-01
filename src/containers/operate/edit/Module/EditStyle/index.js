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

import Color from 'compEdit/EditCommon/Color'

import {
	Row, Col,
	Button, Card, Checkbox, Collapse, InputNumber ,Radio, Select, Slider, Switch
} from 'antd'
const Option      = Select.Option
const Panel       = Collapse.Panel
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

var styleMap = {
	layout: '组件样式',
	image:  '图片样式',
	text:'文本样式',
}
var cssMap = {
	top:               { name: '上',      type: 'Number' },
	left:              { name: '左',      type: 'Number' },
	width:             { name: '宽',      type: 'Number' },
	height:            { name: '高',      type: 'Number' },
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
}

import './index.less'

class EditStyle extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onSliderChange(data, val, style, css) {
		data.style[style][css] = val
	}
	onChange(val, style, css) {
		console.clear()
		console.log(val)
		let { data, actions } = this.props
		data.style[style][css] = val
		actions.updateComp(null, data)
	}

	cb(key) {
		console.log(key)
	}

	renderNumber(cfg, data, val, cls, key) {
		return (
			<InputNumber
				min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
				value={val} onChange={v => this.onChange(v, cls, key)}
				style={{ width: '100%' }}
			/>
		)
	}
	renderTextAlign(cfg, data, val, cls, key) {
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, cls, key)} value={val}>
				<RadioButton value="left">左</RadioButton>
				<RadioButton value="center">中</RadioButton>
				<RadioButton value="right">右</RadioButton>
			</RadioGroup>
		)
	}
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
	renderCheckbox(cfg, data, val, cls, key) {
		return (
			<Checkbox
				checked={val === cfg.true} onChange={v => this.onChange(v.target.checked? cfg.true: cfg.false, cls, key)}
			/>
		)
	}
	renderSwitch(cfg, data, val, cls, key) {
		return (
			<Switch
				size="small"
				checked={val === cfg.true} onChange={v => this.onChange(v? cfg.true: cfg.false, cls, key)}
			/>
		)
	}
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
		let { data, actions } = this.props
		if (!data.style) return false
		let styles    = Object.keys(data.style)
		let activeKey = Array.from(new Array(styles.length), (_, i) => i + '')
		let childNode = styles.map((p, i) => {
			if (!styleMap[p]) return
			let ci    = 0
			let cnode = Object.keys(data.style[p]).map((q, j) => {
				if (!cssMap[q]) return
				++ci
				var cm     = cssMap[q],
					val    = data.style[p][q],
					render = this[`render${cm.type}`]
				if (!render) return
				var dom = this[`render${cm.type}`].bind(this, cm, data, val, p, q)()
				return (
					<div className="pgs-row" key={j}>
						<div className="pgsr-name">{cm.name}</div>
						<div className="pgsr-ctrl">{ dom }</div>
						<div className="pgsr-auth"></div>
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
