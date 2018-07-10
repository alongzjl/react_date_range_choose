/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Col, Row, Radio, Select } from 'antd'
const { Option, OptGroup } = Select
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

import StoreListModal from 'compEdit/EditCommon/StoreListModal'

let paramMap = [
	{ name: '无',  value: '' },
	{ name: '业态', value: 'catg' },
	{ name: '楼层', value: 'floor' },
	{ name: '店铺', value: 'store' }
]
let typeMap = {
	catg:  '业态',
	floor: '楼层',
	store: '店铺'
}

class RouterJump extends React.Component {
	constructor(props) {
		super(props)
		const { content } = props
		const { param }   = content
		if (param === undefined) content.param = [{ type: '', value: '' }]
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentWillReceiveProps() {
		const { content } = this.props
		const { param }   = content
		if (param === undefined) content.param = [{ type: '', value: '' }]
	}

	onChange = val => {
		let { data, content, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		content.type = 'router'
		content.url  = val
		if (!val) content.param = [{ type: '', value: '' }]
		actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeParam = (val, key, param) => {
		let { data, content, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		param[key] = val
		if (key === 'type') param.value = ''
		actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeAuth(val, key) {
		let { data, actions } = this.props
		data.auth.content[key] = val
		actions.updateComp(null, data)
	}

	onSelect(newIdx) {
		let { data, parentKey, action, idx, actions } = this.props
		if (newIdx === idx) return
		data[parentKey].idx = newIdx
		if (action === 'updateComp') {
			data.style = { ...data[parentKey].list[newIdx].data }
			return actions[action](null, data)
		}
		else if (action === 'updateGlobal') return actions[action](data)
	}
	
	renderParamType() {
		let { content } = this.props
		let param = content.param
		if (envType !== 'business' || !content.url || !param.length) return false
		param = param[0]
		return (
			<Row style={{ marginTop: 8 }}>
				<Col span={7}>跳转类型</Col>
				<Col span={17}>
					<RadioGroup
						size="small"
						value={param.type}
						onChange={_ => this.onChangeParam(_.target.value, 'type', param)}
					>
						{ paramMap.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
					</RadioGroup>
				</Col>
			</Row>
		)
					// <Select
					// 	style={{ width: '100%' }}
					// 	value={param.type}
					// 	onChange={v => this.onChangeParam(v, 'type', param)}
					// >
					// 	{ paramMap.map((_, i) => <Option key={i} value={_.value}>{_.name}</Option>) }
					// </Select>
	}

	renderParamValue() {
		let { content } = this.props
		let param = content.param
		if (envType !== 'business' || !content.url || !param.length) return false
		param = param[0]
		let { type, value } = param
		if (!type) return false
		let dom = this[`render_${type}`](param)
		return (
			<Row style={{ marginTop: 8 }}>
				<Col
					span={7}
				>{typeMap[type]}</Col>
				<Col span={17}>
					{ dom }
				</Col>
			</Row>
		)
		// style={{ textAlign: 'right', paddingRight: 7 }}
	}
	render_catg(param) {
		let { type, value } = param
		let { catgList }   = storeData
		return <Select
			style={{ width: '100%' }}
			value={value}
			onChange={v => this.onChangeParam(v, 'value', param)}
		>
			<Option value={''}>无</Option>
			{ catgList.map((_, i) => <Option key={i} value={_.id}>{_.name}</Option>) }
		</Select>
	}
	render_floor(param) {
		let { type, value } = param
		let { floorList }   = storeData
		return <Select
			style={{ width: '100%' }}
			value={value}
			onChange={v => this.onChangeParam(v, 'value', param)}
		>
			<Option value={''}>无</Option>
			{ floorList.map((_, i) => <Option key={i} value={_.id}>{_.name}</Option>) }
		</Select>
	}
	render_store(param) {
		let { type, value, name } = param
		return <StoreListModal id={value} name={name} param={param} onOk={this.onOk} />
	}
	onOk = (row, param) => {
		let { id, name } = row
		this.onChangeParam(id, 'value', param)
		this.onChangeParam(name, 'name',  param)
	}

	render() {
		let { data, content, editConfig } = this.props
		let { pageList } = editConfig
		let pageGroup  = pageList.group
		let selectNode = pageGroup.map((gp, i) => {
			let { name, pages } = gp
			let pageNode  = pages.map((pg, j) => {
				let { router, title } = pg
				return (
					<Option key={j} value={router}>{ title }</Option>
				)
			})
			return (
				<OptGroup key={i} label={name}>
					{ pageNode }
				</OptGroup>
			)
		})
		let featureNode = (
			<OptGroup label={'功能'}>
				<Option value="back">返回</Option>
			</OptGroup>
		)
		let paramType  = this.renderParamType()
		let paramValue = this.renderParamValue()
		return (
			<div>
				<Select
					value={content.url || ''}
					style={{ width: '100%' }}
					onChange={this.onChange}
				>
					<Option value={''}>无</Option>
					{ data.name == 'button'? <Option value={'back'}>返回上一级</Option>: null }
					{ selectNode }
					{ featureNode }
				</Select>
				{ paramType }
				{ paramValue }
			</div>
		)
	}
}

RouterJump.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RouterJump)
