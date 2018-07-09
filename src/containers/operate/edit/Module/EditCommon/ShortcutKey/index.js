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
		let { keyDown } = this.props
		let { active, meta, os } = this.state
		if (!active) return
		let key   = e.key.toLocaleLowerCase(),
			ctrl  = e.ctrlKey? 'ctrl_': '',
			comd  = meta? 'meta_': '',
			shift = e.shiftKey? 'shift_': '',
			str   = `key_${os === 'mac'? comd: ctrl}${shift}${key}`,
			Fn    = this[str]
		console.log(`keydown: ${key}`)
		keyDown(key, e)
		Fn && Fn(e)
	}
	_handleKeyUp = e => {
		let { keyUp } = this.props
		let key = e.key.toLocaleLowerCase()
		console.log(`keyup: ${key}`)
		keyUp(key, e)
		if (key === 'meta') this.setState({ meta: false })
	}
	// OSX 下的command取代ctrl
	key_meta = (e) => {
		const { os } = this.state
		if (os != 'mac') return
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

	// 移动 (支持多选)
	moveComp = (e, top, left) => {
		e.preventDefault()
		e.stopPropagation()
		let { actions, editConfig }  = this.props
		let { curData, curComp, curPage, globalData } = editConfig
		let { parentComp, compIdx, cusCompIdx } = curData
		let { multiComp } = globalData
		let { parentIdx, list, type } = multiComp
		if (!list.length) return message.warning(`组件未选中!`)
		let par = parentComp? parentComp: curComp
		// 子组件限制移动边界
		if (parentComp) {
			let da = parentComp.data
			let cs = da.components
			let pl = da.layout
			list.map(_ => {
				let cl      = cs[_].data.layout,
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
				cl.top  += top
				cl.left += left
			})
		} else {
			let ce = curPage.elements
			list.map(_ => {
				let cl = ce[_].data.layout
				cl.top  += top
				cl.left += left
			})
		}
		actions.updateComp(compIdx, par)
	}

	// 复制 (支持多选)
	copyComp = (e) => {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let { curData, curPage, globalData } = editConfig
		let { parentComp } = curData
		let { copyComp, multiComp } = globalData
		let { parentIdx, list, type } = multiComp
		if (!list.length) return message.warning(`组件未选中!`)
		let comps = []
		let cComp = {}
		if (parentComp) {
			let cs = parentComp.data.components
			list.map(_ => comps.push(cs[_]))
			cComp.name = parentComp.name
		} else {
			let ce = curPage.elements
			list.map(_ => comps.push(ce[_]))
		}
		cComp.list = comps
		message.success(`复制组件!`)
		actions.updateCopyComp(deepCopy(cComp))
	}

	// 粘贴 (支持多选)
	pasteComp = (e) => {
		e.stopPropagation()
		let { actions, editConfig }  = this.props
		let { curData, curComp, curPage, globalData } = editConfig
		let { parentComp, pageGroupIdx, pageIdx } = curData
		let { copyComp }   = globalData
		let { name, list } = copyComp
		if (!copyComp) return message.warning(`没有可粘贴的组件!`)
		let par = parentComp? parentComp: curComp
		if ((parentComp && parentComp.name === name) || (name && curComp.name === name)) {
			par.data.components = par.data.components.concat(deepCopy(list))
		} else if (!name) {
			curPage.elements = curPage.elements.concat(deepCopy(list))
		} else {
			return message.warning(`不同级别无法粘贴组件!`)
		}
		// message.success(`粘贴组件: ${compMap[copyComp.name]}!`)
		message.success(`粘贴组件!`)
		actions.updatePage(pageGroupIdx, pageIdx, curPage, true)
	}

	// 删除 (支持多选)
	removeComp = (e) => {
		e.stopPropagation()
		let { actions, editConfig }  = this.props
		let { curData, curComp, curPage, globalData } = editConfig
		let { parentComp, compIdx, cusCompIdx, pageGroupIdx, pageIdx } = curData
		let { multiComp } = globalData
		let { parentIdx, list, type } = multiComp
		if (!list.length) return message.warning(`组件未选中!`)
		if (parentComp) {
			let cs = parentComp.data.components
			parentComp.data.components = cs.removeByIdx(list)
			editConfig.curComp = {}
			curData.cusCompIdx = -1
			curData.parentComp = null
			let comp = parentComp.data.components
			// message.success(`删除组件: ${compMap[parentComp.name]} - ${compMap[curComp.name]}!`)
			message.success(`删除组件!`)
			actions.updateComp(compIdx, parentComp)
			actions.updateCur(curData)
			actions.selectComp(parentComp)
		} else {
			let ce = curPage.elements
			curData.compIdx  = -1
			curPage.elements = ce.removeByIdx(list)
			message.success(`删除组件: ${compMap[curComp.name]}!`)
			actions.updatePage(pageGroupIdx, pageIdx, curPage)
		}
		globalData.multiComp = { type: '', index: {}, list: [] }
		actions.updateGlobal(globalData)
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