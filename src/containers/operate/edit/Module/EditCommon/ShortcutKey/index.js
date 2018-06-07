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

import { Row, Col, Icon, Select, message } from 'antd'
const { Option } = Select

import PictureList from '../PictureList'

import './index.less'
import * as variable from 'var'
let styleMap = variable.styleMap.name,
	compMap  = variable.compMap.name,
	compNum  = variable.compMap.num

class ShortcutKey extends React.Component {
	constructor(props) {
		super(props)
		let pf = navigator.platform
		let os = ''
		if (/Mac\S+/.test(pf)) os = 'mac'
		else if (/Win\S+/.test(pf)) os = 'win'
		this.state = {
			active: false,
			os: os
		}
	}

	componentDidMount() {
		if (!this.state.os) return false
		let { parent } = this.props
		let doc = document.querySelector(`${parent || '.pg-center'}`)
		doc.addEventListener('mouseover', this._handleMouseOver)
		doc.addEventListener('mouseout',  this._handleMouseOut)
		document.addEventListener('keydown', this._handleKeyDown)
	}
	componentWillUnmount() {
		if (!this.state.os) return false
		let { parent } = this.props
		let doc = document.querySelector(`${parent || '.pg-center'}`)
		doc.removeEventListener('mouseover', this._handleMouseOver)
		doc.removeEventListener('mouseout',  this._handleMouseOut)
		document.removeEventListener('keydown', this._handleKeyDown)
	}
	_handleMouseOver = e => {
		this.setState({ active: true })
	}
	_handleMouseOut = e => {
		this.setState({ active: false })
	}
	_handleKeyDown = e => {
		let active = this.state.active
		if (!active) return
		let key  = e.key.toLocaleLowerCase()
		let ctrl = e.ctrlKey? 'ctrl_': ''
		let Fn   = this[`key_${ctrl}${key}`]
		if (!Fn) return
		Fn(e)
	}
	// 复制
	key_ctrl_c = (e) => {
		this.copyComp(e)
	}
	// 粘贴
	key_ctrl_v = (e) => {
		this.pasteComp(e)
	}
	// 删除
	key_delete = (e) => {
		this.removeComp(e)
	}

	copyComp = (e) => {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let { curData, curComp, globalData } = editConfig
		let { parentComp } = curData
		let { copyComp } = globalData
		let par = parentComp? parentComp: curComp
		if (!par.name) return message.success(`组件未选中!`)
		message.success(`复制组件: ${compMap[par.name]}!`)
		actions.updateCopyComp(deepCopy(par))
	}

	pasteComp = (e) => {
		e.stopPropagation()
		let { actions, editConfig }  = this.props
		let { curData, curPage, globalData } = editConfig
		let { copyComp } = globalData
		if (!copyComp) return message.success(`没有可粘贴的组件!`)
		curPage.elements.push(deepCopy(copyComp))
		message.success(`粘贴组件: ${compMap[copyComp.name]}!`)
		actions.updatePage(curData.pageGroupIdx, curData.pageIdx, curPage)
	}

	removeComp = (e) => {
		e.stopPropagation()
		let { actions, editConfig }  = this.props
		let { curData, curComp } = editConfig
		if (!curComp.name) return message.success(`组件未选中!`)
		message.success(`删除组件: ${compMap[curComp.name]}!`)
		actions.deleteComp(curData.compIdx)
	}

	render() {
		return ENV === 'dev'
			?
			(<div className="shortcut-key">键盘操作: {this.state.active? '是': '否'}</div>)
			:
			false
	}
}

ShortcutKey.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ShortcutKey)