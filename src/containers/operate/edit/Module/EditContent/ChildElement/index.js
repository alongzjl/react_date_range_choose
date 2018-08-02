/**
 * @Author: Along
 * @Date:   2018-05-02
 
 */

import React from 'react'
import './index.less'

import { Row, Col, Collapse, Checkbox, Icon, Input, Select } from 'antd'
const  { TextArea } = Input
const  { Option, OptGroup } = Select
const  { Panel }  = Collapse

import ImageUpload from 'compEdit/EditCommon/ImageUpload'

import * as cElement from 'state/ChildElement'
import * as variable from 'var'

const comp  = require('state/comp')
var compMap = variable.compMap,
	cmName  = compMap.name,
	cmNum   = compMap.num,
	conMap  = variable.contentMap

var fieldMap = {
	img:  1,
	text: 1,
	bind: 1
}

export default class ChildElement extends React.Component {
	state = { key: '' }

	componentWillMount() {}

	componentDidMount() {}

	update = () => {
		this.props.updateComp()
	}
	onChange = v => {
		this.setState({ key: v })
	}
	addElement = () => {
		let { layout, updateComp } = this.props
		let { key } = this.state
		if (!key) return
		layout.push(deepCopy(comp[key]))
		updateComp()
	}
	removeElement = idx => {
		let { layout, updateComp } = this.props
		layout.splice(idx, 1)
		updateComp()
	}
	selList(comps) {
		let { key } = this.state
		if (key && !comps[key]) return this.setState({ key: '' })
		let opts = Object.keys(comps).map((_, i) => {
			return <Option key={i} value={_}>{cmName[_]}</Option>
		})
		return (
			<Select
				value={this.state.key}
				style={{ width: '60%', marginRight: 10 }}
				onChange={this.onChange}
			>
				<Option value={''}>无</Option>
				{ opts }
			</Select>
		)
	}
	childList(layout) {
		var num = deepCopy(cmNum)
		return layout.map((_, i) => {
			var { name, data } = _,
				{ content } = data
			num[name] += 1
			var numN = num[name]
			var node = Object.keys(content).map((p, j) => {
				if (!fieldMap[p]) return false
				let cm     = conMap[p]
				let val    = content[p]
				let render = this[`render${cm.type}`]
				if (!render) return false
				let dom = render.bind(this, cm, content, val, p, i)()
				return (
					<div key={j}>
						<Row>
							<Col span={21}>{ dom }</Col>
							<Col span={1}></Col>
							<Col span={2}>
								<span onClick={() => { this.removeElement(i) }}><Icon type="close" /></span>
							</Col>
						</Row>
					</div>
				)
			})
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name">{cmName[name]}{numN}</div>
					<div className="pgsr-ctrl">
						{ node }
					</div>
				</div>
			)
		})
	}
	// 文本
	renderTextarea(cfg, con, val, key) {
		return (
			<TextArea
				min={cfg.min || 0} max={cfg.max || 100}
				placeholder={cfg.placeholder || '请填入内容'}
				autosize={cfg.autosize || false}
				value={val}
				onChange={v => { con[key] = v.target.value; this.update() }}
				style={{ width: '100%' }}
			/>
		)
	}
	// 图片
	renderImage(cfg, con, val) {
		return (
			<ImageUpload
				enter={this.update}
				img={val}
			/>
		)
	}
	// 绑定
	renderBind(cfg, con, val, key, idx) {
		let { name, map } = this.props
		let dataMap = deepCopy(map)
		if (name === 'swiperByGoods') dataMap.desc = '商品描述'
		let opts = Object.keys(dataMap).map((_, i) => {
			return <Option key={i} value={_}>{dataMap[_]}</Option>
		})
		return (
			<div>
				<Select
					value={val}
					style={{ width: '68.5%' }}
					onChange={v => { con[key] = v; this.update() }}
				>
					<Option value={''}>无</Option>
					{ opts }
				</Select>
			</div>
		)
	}

	render() {
		let { name, layout } = this.props
		let { key } = this.state
		let comps = cElement[name]
		let selList = this.selList(comps)
		let childAdd = (
			<div className="pgs-row">
				<div className="pgsr-name">添加元素</div>
				<div className="pgsr-ctrl">
					{ selList }
					<a onClick={this.addElement} disabled={!key || layout.length > 19}>添加</a>
				</div>
			</div>
		)
		let childList = this.childList(layout)
		return (
			<div>
				{ childAdd }
				{ childList }
			</div>
		)
	}
}
