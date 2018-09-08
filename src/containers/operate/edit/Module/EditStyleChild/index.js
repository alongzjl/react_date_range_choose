/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import Color       from 'compEdit/EditCommon/Color'
import ImageUpload from 'compEdit/EditCommon/ImageUpload'
import StyleFilter from 'compEdit/EditStyle/StyleFilter'
import {
	Row, Col,
	Checkbox, Collapse, InputNumber, Radio, Slider, Switch
} from 'antd'
const { Panel }   = Collapse
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

import * as comp from 'state/comp'
import * as variable from 'var'

var styleMap = variable.styleMap.name
var cssMap   = variable.styleMap.style

export default class EditStyle extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(val, css, obj, node, attribute) {
		let { data, updateComp } = this.props
		data = StyleFilter.lineHightAdaptation(data, val, css)
		data = StyleFilter.imageAdaptation(data, attribute)
		let da = data.data
		if (node) {
			obj[css][node] = val
		} else {
			obj[css] = val
		}
		updateComp()
	}

	/* 渲染组件开始 */
	// 数字
	renderNumber(cfg, data, obj, val, key, node) {
		return (
			<InputNumber
				min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
				value={val} onChange={v => this.onChange(v, key, obj, node)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 复合样式
	renderComplex(cfg, data, obj, val, key) {
		const child     = cfg.child
		const keys      = Object.keys(val)
		const childNode = keys.map((_, i) => {
			let cm  = child[_],
				dom = this[`render${cm.type}`].bind(this, cm, data, obj, val[_], key, _)()
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
	// 选择框偏移
	renderRadio(cfg, data, obj, val, key, node) {
		let option = cfg.option || [
			{ name: '左', value: 'left' },
			{ name: '中', value: 'center' },
			{ name: '右', value: 'right' }
		]
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, key, obj, node)} value={val}>
				{ option.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
			</RadioGroup>
		)
	}
	// 颜色
	renderColor(cfg, data, obj, val, key, node) {
		return (
			<Color
				data={data}
				color={val}
				action={'updateComp'}
				placement="bottomLeft"
			/>
		)
	}
	// 开关
	renderCheckbox(cfg, data, obj, val, key, node) {
		return (
			<Checkbox
				checked={val === cfg.true} onChange={v => this.onChange(v.target.checked? cfg.true: cfg.false, key, obj, node)}
			/>
		)
	}
	// 滑动开关
	renderSwitch(cfg, data, obj, val, key, node) {
		return (
			<Switch
				size="small"
				checked={val === cfg.true} onChange={v => this.onChange(v? cfg.true: cfg.false, key, obj, node)}
			/>
		)
	}
	// 滑块
	renderSlider(cfg, data, obj, val, key, node) {
		return (
			<Row>
				<Col span={12}>
					<Slider
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key, obj, node)}
					/>
				</Col>
				<Col span={3}></Col>
				<Col span={9}>
					<InputNumber
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key, obj, node)}
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
				let dom = this[`render${cm.type}`].bind(this, cm, data, layout, val, q)()
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
				let dom = this[`render${cm.type}`].bind(this, cm, data, style[p], val, q)()
				try { data.auth.style[p][q] } catch(e) {
					data.auth.style[p] = {}
					let s = style[p]
					for (let kk in s) {
						data.auth.style[p][kk] = false
					}
				}
				return (
					<div className="pgs-row" key={j}>
						<div className="pgsr-name">{ cm.name }</div>
						<div className="pgsr-ctrl">{ dom }</div>
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
				<Collapse defaultActiveKey={activeKey} onChange={this.cb}>
					{ childNode }
				</Collapse>
			</section>
		)
	}
}
