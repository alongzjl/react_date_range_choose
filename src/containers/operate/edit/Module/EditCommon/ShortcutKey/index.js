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

import { Icon, message } from 'antd'

import './index.less'
import * as variable from 'var'
let compMap = variable.compMap.name

class ShortcutKey extends React.Component {
	constructor(props) {
		super(props)
		let pf = navigator.platform
		let os = ''
		if (/Mac\S+/.test(pf)) os = 'mac'
		else if (/Win\S+/.test(pf)) os = 'win'
		this.state = {
			active: false,
			os: os,
			meta: false
		}
	}

	componentDidMount() {
		if (!this.state.os) return false
		let { parent } = this.props
		let doc = document.querySelector(`${parent || '.pg-center'}`)
		doc.addEventListener('mouseover',    this._handleMouseOver)
		doc.addEventListener('mouseout',     this._handleMouseOut)
		document.addEventListener('keydown', this._handleKeyDown)
		document.addEventListener('keyup',   this._handleKeyUp)
	}
	componentWillUnmount() {
		if (!this.state.os) return false
		let { parent } = this.props
		let doc = document.querySelector(`${parent || '.pg-center'}`)
		doc.removeEventListener('mouseover',    this._handleMouseOver)
		doc.removeEventListener('mouseout',     this._handleMouseOut)
		document.removeEventListener('keydown', this._handleKeyDown)
		document.removeEventListener('keyup',   this._handleKeyUp)
	}
	_handleMouseOver = e => {
		this.setState({ active: true })
	}
	_handleMouseOut = e => {
		this.setState({ active: false })
	}
	_handleKeyDown = e => {
		let { active, meta, os } = this.state
		if (!active) return
		let key   = e.key.toLocaleLowerCase(),
			ctrl  = e.ctrlKey? 'ctrl_': '',
			comd  = meta? 'meta_': '',
			shift = e.shiftKey? 'shift_': '',
			Fn   = this[`key_${os === 'mac'? comd: ctrl}${shift}${key}`]
		console.log(`keydown: ${key}`)
		if (!Fn) return
		Fn(e)
	}
	_handleKeyUp = e => {
		let key = e.key.toLocaleLowerCase()
		console.log(`keyup: ${key}`)
		if (key === 'meta') this.setState({ meta: false })
	}
	// OSX 下的command取代ctrl
	key_meta = (e) => {
		const { os } = this.state
		if (os != 'mac') return false
		this.setState({ meta: true })
	}
	// 复制
	key_ctrl_c = (e) => {
		this.copyComp(e)
	}
	key_meta_c = (e) => {
		this.copyComp(e)
	}
	// 粘贴
	key_ctrl_v = (e) => {
		this.pasteComp(e)
	}
	key_meta_v = (e) => {
		this.pasteComp(e)
	}
	// 删除
	key_delete = (e) => {
		this.removeComp(e)
	}
	key_backspace = (e) => {
		this.removeComp(e)
	}
	// 撤销
	key_ctrl_z = (e) => {
		var doc = document.querySelector('#btnRevoke')
		doc.click()
	}
	key_meta_z = (e) => {
		var doc = document.querySelector('#btnRevoke')
		doc.click()
	}
	// 恢复
	key_ctrl_y = (e) => {
		var doc = document.querySelector('#btnRecovery')
		doc.click()
	}
	key_meta_y = (e) => {
		var doc = document.querySelector('#btnRecovery')
		doc.click()
	}
	// 移动 1px
	key_arrowup = (e) => {
		this.moveComp(e, -1, 0)
	}
	key_arrowright = (e) => {
		this.moveComp(e, 0, 1)
	}
	key_arrowdown = (e) => {
		this.moveComp(e, 1, 0)
	}
	key_arrowleft = (e) => {
		this.moveComp(e, 0, -1)
	}
	// 移动 10px
	key_shift_arrowup = (e) => {
		this.moveComp(e, -10, 0)
	}
	key_shift_arrowright = (e) => {
		this.moveComp(e, 0, 10)
	}
	key_shift_arrowdown = (e) => {
		this.moveComp(e, 10, 0)
	}
	key_shift_arrowleft = (e) => {
		this.moveComp(e, 0, -10)
	}

	moveComp = (e, top, left) => {
		e.preventDefault()
		e.stopPropagation()
		let { actions, editConfig }  = this.props
		let { curData, curComp } = editConfig
		let { parentComp, compIdx, cusCompIdx } = curData
		let cl  = curComp.data.layout
		let par = parentComp? parentComp: curComp
		if (!par.name) return message.success(`组件未选中!`)
		// 子组件限制移动边界
		if (parentComp) {
			let pl      = parentComp.data.layout,
				minTop  = 0,
				minLeft = 0,
				maxTop  = pl.height - cl.height,
				maxLeft = pl.width  - cl.width,
				ctop    = cl.top  + top,
				cleft   = cl.left + left
			if (ctop < minTop)        top = top - ctop
			else if (ctop > maxTop)   top = maxTop - cl.top

			if (cleft < minLeft)      left = left - cleft
			else if (cleft > maxLeft) left = maxLeft - cl.left
		}
		cl.top  += top
		cl.left += left
		actions.updateComp(compIdx, par)
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
		let { parentComp, compIdx, cusCompIdx } = curData
		let par = parentComp? parentComp: curComp
		if (!par.name) return message.success(`组件未选中!`)
		if (parentComp) {
			editConfig.curComp = {}
			curData.cusCompIdx = -1
			curData.parentComp = null
			let comp = parentComp.data.components
			comp.splice(cusCompIdx, 1)
			message.success(`删除组件: ${compMap[parentComp.name]} - ${compMap[curComp.name]}!`)
			actions.updateComp(compIdx, parentComp)
			actions.updateCur(curData)
			actions.selectComp(parentComp)
		} else {
			message.success(`删除组件: ${compMap[curComp.name]}!`)
			actions.deleteComp(curData.compIdx)
		}
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