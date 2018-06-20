/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-19T14:29:30+08:00
 */

import React from 'react'
import './index.less'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

const comp     = require('state/comp')
const compC    = require('state/compChild')
const compP    = require('state/compParent')
const compList = require('state/compList')

import * as actions from 'actions'

import { Icon, Input, message, Spin } from 'antd'
 
class Header extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: tempCfg.name || '',
			loading: false
		}
	}
	componentWillMount() {}
	componentDidMount() {}
	componentWillUnmount() {}

	selectTheme() {
		let { actions, editConfig } = this.props
		editConfig.curData.contentType = 'theme'
		actions.updateCur(editConfig.curData)
	}

	formatStyle(data) {
		let { style, layout } = data
		Object.keys(data.style).map(_ => style[_] = cssFormatByTerm(style[_]))
		data.layout = cssFormatByTerm(layout)
	}
	formatEle(obj) {
		let { type, data, styleList } = obj
		if (type === 'base') {
			this.formatStyle(data)
			delete obj.auth
		} else if (type === 'advanced') {
			data.layout = cssFormatByTerm(data.layout)
			data.components.map(_ => this.formatEle(_))
		}
	}
	formatPage(obj) {
		obj.elements.map(_ => this.formatEle(_))
	}

	saveData() {
		let { editConfig, location } = this.props
		let { query } = location
		let { caseType, id, composeType, templateId, templateThemeId } = tempCfg
		let cfg = deepCopy(editConfig)

		cfg.pageContent = dataFormat.save.pageEach(cfg.pageContent)

		let newCon = deepCopy(cfg.pageContent)
		Object.keys(newCon).map(_ => this.formatPage(newCon[_]))

		// console.log(newCon)
		let gd = cfg.globalData
		cfg.globalData = {
			data:    gd.data,
			theme:   gd.theme,
			feature: gd.feature
		}
		let config = {
			configPC: {
				pageContent: cfg.pageContent,
				pageList:    cfg.pageList,
				globalData:  cfg.globalData
			},
			configTerminal: {
				pageContent: newCon,
				pageList:    cfg.pageList,
				globalData:  cfg.globalData
			}
		}
		editConfig.globalData.theme.idx
		let da = {
			config: JSON.stringify(config),
			coverImgUrl:  '',
			caseType: caseType,
			composeType:  composeType,
			name:         this.state.name,
			templateId:   templateId,
			templateThemeId: editConfig.globalData.theme.idx || 0,
			mallId: uif.userInfo.mallMid
		}
		this.setState({ loading: true })
		if (id) da.id = id
		Ajax.post(`/mcp-gateway/case/${query.id? 'update': 'save'}`, da).then(res => {
			if (!query.id) {
				tempCfg.id = res.data
				hashHistory.push(`/business/edit?id=${res.data}`)
			}
			Ajax.createCrop({
				url: `${window.location.origin}${window.location.pathname}#/view?id=${tempCfg.id}`,
				w: 540,
				h: 960
			}).then(cover => {
				Ajax.post(`/mcp-gateway/case/updateCoverImgUrl`, {
					caseId: tempCfg.id,
					coverImgUrl: cover.data
				}).then(() => {
					this.setState({ loading: false })
					message.success(`${query.id? '更新': '保存'}成功!`)
				}).catch(e => { this.setState({ loading: false }) })
			}).catch(e => { this.setState({ loading: false }) })
		}).catch(e => { this.setState({ loading: false }) })
		// console.log(JSON.stringify(config))
	}

	tNameChange(name) {
		this.setState({ name: name })
		tempCfg.name = name
	}
	closeWin() {
		window.location.href = 'about:blank'
		window.close()
	}
	render() {
		let loading = this.state.loading? (<div className="spin-mask"><Spin /></div>): false
		return (
			<div className="pe-header e-flex">
				{ loading }
				<div className="peh-left">
					<Input
						value={this.state.name}
						placeholder={'模板名称'}
						onChange={e => this.tNameChange(e.target.value)}
					/>
				</div>

				<div className="peh-center"></div>

				<div className="peh-right">
					<section className="comp-list">
						<div className="cl-item" onClick={this.selectTheme.bind(this)}>主题</div>
						<div className="cl-item" onClick={this.saveData.bind(this)}>保存</div>
						<div className="cl-item" onClick={this.closeWin}>离开</div>
					</section>
				</div>
			</div>
		)
	}
}


Header.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
