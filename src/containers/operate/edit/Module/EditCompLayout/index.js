/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-19T14:29:30+08:00
 */

import React from 'react'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'

import * as actions from 'actions'

import { Icon, message } from 'antd'
import * as variable from 'var'
var compMap  = variable.compMap.name,
	compNum  = variable.compMap.num
 
class EditCompLayout extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	removeComp(e, idx) {
		e.stopPropagation()
		let { actions, data } = this.props
		message.success(`删除组件: ${compMap[data.elements[idx].name]}!`)
		actions.deleteComp(idx)
	}

	copyComp(e, item) {
		e.stopPropagation()
		let { actions } = this.props
		actions.updateCopyComp(deepCopy(item))
		message.success(`复制组件: ${compMap[item.name]}!`)
	}

	selectComp(e, data, idx) {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let { curData } = editConfig
		let { compIdx, cusCompIdx, contentType } = curData
		if (compIdx === idx && cusCompIdx < 0 && contentType === 'comp') return
		curData.compIdx    = idx
		curData.parentComp = null
		actions.updateCur(curData)	// 更新 当前数据
		actions.selectComp(data)
	}
	selectMulti(idx) {
		let { actions, editConfig } = this.props
		let { globalData, curData } = editConfig
		let { parentComp } = curData
		let { multiComp }  = globalData
		let { index, list, type } = multiComp
		
		var s = {}
		s[idx] = true
		multiComp.index = s
		multiComp.list  = [idx]
		multiComp.type = 'parent'
		delete multiComp.parentIdx
		actions.updateGlobal(globalData)
		console.log(JSON.stringify(multiComp.list))
	}
	onSortEnd(o, e) {
		let { data, actions, editConfig } = this.props
		let curData = editConfig.curData
		let eles = deepCopy(data.elements).reverse()
		let len  = eles.length - 1
		let old  = o.oldIndex
		let next = o.newIndex
		let item = eles[old]
		if (old === next) {
			this.selectComp(e, item, len - next)
			this.selectMulti(len - next)
			return
		}
		data.elements = arrayMove(eles, old, next).reverse()

		actions.updatePage(curData.pageGroupIdx, curData.pageIdx, data)
		this.selectComp(e, item, len - next)
	}
	render() {
		let { data, editConfig } = this.props
		let map  = deepCopy(compNum)
		let eles = data.elements
		if (!eles) return false
		eles = deepCopy(eles)
		let len  = eles.length - 1
		eles.reverse()
		let names = new Array(eles.length).fill().map((_, i) => {
			let name = eles[i].name,
				cn   = compMap[name]
			++map[name]
			return cn + map[name]
		})
		let ctrlNode = eles.map((_, i) => (
			<li key={i} className={`pecc-li`}>
				<a onClick={e => this.copyComp(e, _)}><Icon type="copy"/></a>
				<a onClick={e => this.removeComp(e, len - i)}><Icon type="delete"/></a>
			</li>
		))
		let SortableItem = SortableElement(({_, i, l}) => {
				return (
					<li className={`pecl-li${(l - i) === editConfig.curData.compIdx? ' s-active': ''}`}>
						<div className="pl-name">{ names[i] }</div>
						<div className="pl-ctrl">
							<a><Icon type="copy"/></a>
							<a><Icon type="delete"/></a>
						</div>
					</li>
				)
						// <div className="pl-ctrl">
						// 	<a onClick={e => this.copyComp(e, _)}><Icon type="copy"/></a>
						// 	<a onClick={e => this.removeComp(e, i)}><Icon type="delete"/></a>
						// </div>
			}
		)
		const SortableList = SortableContainer(({eles}) => {
			return (
				<ul>
					{
						eles.map((_, i) => (
							<SortableItem key={i} index={i} l={len} i={i} _={_} />
						))
					}
				</ul>
			)
		})
		return (
			<div className="pe-comp-layout">
				<div className="pecl-title">图层列表</div>
				<div className="pecl-list">
					<SortableList
						eles={eles}
						onSortEnd={(o, e) => this.onSortEnd(o, e)}
					/>
					<ul className="pecl-ctrl">{ ctrlNode }</ul>
				</div>
			</div>
		)
	}
}


EditCompLayout.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditCompLayout)
