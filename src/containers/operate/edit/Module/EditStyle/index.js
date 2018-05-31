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
import ImageUpload from 'compEdit/EditCommon/ImageUpload'
import StyleManage from 'compEdit/EditCommon/StyleManage'

import {
	Row, Col,
	Checkbox, Collapse, InputNumber, Radio, Slider, Switch
} from 'antd'
const { Panel }   = Collapse
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

import * as variable from 'var'

var styleMap = variable.styleMap.name
var cssMap   = variable.styleMap.style
   
import './index.less'

class EditStyle extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(val, css, obj, node) { 
		let { data, actions, editConfig } = this.props
		let da = data.data
		let { curData } = editConfig
		let { parentComp } = curData
		if (node) {
			obj[css][node] = val
		} else {
			obj[css] = val
		}
		actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeAuth(val, style, css) {
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
	// 偏移
	renderTextAlign(cfg, data, obj, val, key, node) {
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
	// 边框样式
	renderSolid(cfg, data, obj, val, key, node) {
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, key, obj, node)} value={val}>
				<RadioButton value="solid">实线</RadioButton>
				<RadioButton value="double">双线</RadioButton>
				<RadioButton value="dashed">虚线</RadioButton>
				<RadioButton value="dotted">点状</RadioButton> 
			</RadioGroup> 
		)
	}
	// 边框样式
	renderBGSize(cfg, data, obj, val, key, node) {
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, key, obj, node)} value={val}>
				<RadioButton value="contain">居中</RadioButton>
				<RadioButton value="cover">充满</RadioButton>
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
	// 背景图
	renderBGImage(cfg, data, obj, val, key, node) {
		let onImage = url => {
			obj[key].img = url
			this.onChange.bind(this, url, key, obj, 'img')()
		}
		return (
			<ImageUpload
				data={this.props.data}
				enter={onImage}
				img={val}
			/>
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
