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

import { Collapse, Icon, Input } from 'antd'
const Panel  = Collapse.Panel

import './index.less'

var keyMap = {
	name: { name: '名称', type: 'Input', minlength: 0, maxlength: 8, }
	// img:  { name: '图片', type: 'Input', minlength: 0, maxlength: 30, },
}

class StyleManage extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(val, key) {
		// console.clear()
		// console.log(val)
		let { data, list, action, idx, actions } = this.props
		list[idx][key] = val
		if (action === 'updateComp') return actions[action](null, data)
		else if (action === 'updateGlobal') return actions[action](data)
	}

	onAdd(cur) {
		// console.clear()
		let { data, list, action, name, actions } = this.props
		let newData = JSON.parse(JSON.stringify(cur))
		newData.name = `${name}${list.length + 1}`
		delete newData.layout
		list.push(newData)
		if (action === 'updateComp') return actions[action](null, data)
		else if (action === 'updateGlobal') return actions[action](data)
	}

	onRemove(idx) {
		// console.clear()
		let { data, parentKey, list, action, actions } = this.props
		list.splice(idx, 1)
		data[parentKey].idx = 0
		if (action === 'updateComp') {
			data.style = { layout: data.style.layout, ...data[parentKey].list[0].data }
			return actions[action](null, data)
		}
		else if (action === 'updateGlobal') return actions[action](data)
	}

	onSelect(newIdx) {
		// console.clear()
		let { data, parentKey, list, action, idx, actions } = this.props
		if (newIdx === idx) return
		data[parentKey].idx = newIdx
		if (action === 'updateComp') {
			data.style = { layout: data.style.layout, ...data[parentKey].list[newIdx].data }
			return actions[action](null, data)
		}
		else if (action === 'updateGlobal') return actions[action](data)
	}

	renderInput(cfg, val, key) {
		return (
			<Input
				minLength={cfg.minlength || 0} maxLength={cfg.maxlength || 100}
				value={val} onChange={v => this.onChange(v.target.value, key)}
				style={{ width: '100%' }}
			/>
		)
	}

	cb(key) {
		console.log(key)
	}

	render() {
		let { add = true, edit = true, data, list, idx, name, max, editConfig } = this.props
		let activeKey = Array.from(new Array(2), (_, i) => `${i}`)
		let curData   = list[idx]
		let editNode
		let listNode  = list.map((_, k) => {
			let remDom
			if (list.length > 1) remDom = (<a className="pgs-sl-remove" onClick={this.onRemove.bind(this, k)}><Icon type="close" /></a>)
			return (
				<li
					key={k} title={_.name}
					className={ k === idx? 'pgs-sl-item s-active': 'pgs-sl-item' }
				>
					<div className="pgs-sl-sel" onClick={this.onSelect.bind(this, k)}>{ _.name }</div>
					{ remDom }
				</li>
			)
		})
		let addNode
		if (add && list.length < (max || 10)) {
			addNode = (
				<li
					key={-1}
					className="pgs-sl-item pgs-sl-add"
					onClick={this.onAdd.bind(this, curData)}
				>
					<div className="pgs-sl-sel"><Icon type="plus" /></div>
				</li>
			)
		}
		let keyNode = Object.keys(curData).map((p, i) => {
			let km  = keyMap[p]
			let val = curData[p]
			if (!km) return false
			let dom = this[`render${km.type}`].bind(this, km, val, p)()
			return ( 
				<div className="pgs-row" key={i}>
					<div className="pgsr-name">{ keyMap[p].name }</div>
					<div className="pgsr-ctrl">{ dom }</div>
					<div className="pgsr-auth"></div>
				</div>
			)
		})
		if (edit) {
			editNode = (
				<Panel header={`${name}设置`} key={1}>
					{ keyNode }
				</Panel>
			)
		}
		return (
			<Collapse defaultActiveKey={activeKey} onChange={this.cb}>
				<Panel header={`${name}管理`} key={0}>
					<ul className="pgs-sl">
						{ addNode }
						{ listNode }
					</ul>
				</Panel>
				{ editNode }
			</Collapse>
		)
	}
}

StyleManage.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StyleManage)
