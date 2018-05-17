/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T16:33:06+08:00
*/

'use strict';

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as actions from 'actions'
import { message }  from 'antd'
import curData from 'state/cur/curData'
import './index.less'


class BusinessComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			load: false
		}
	}

	timeInit() {
		let { actions } = this.props
		actions.updateTime()
	}
	getConfig() {
		let { location, actions, editConfig } = this.props
		let { query } = location
		let { name, templateId, templateThemeId, caseType, composeType } = query
		let tid  = templateId,
			cid  = query.id,
			type = cid? 'case': 'template',
			id   = cid? cid: tid
		if (!cid && !tid) {
			message.error(`未选择模板!`)
			return resolve('模板数据')
		}

		return function(resolve, reject) {
			Ajax.get(`/mcp-gateway/${type}/get?${type}Id=${id}`).then(res => {
				let cfg = JSON.parse(res.data.config).configPC
				delete res.data.config
				let cur = cfg.pageList.group[0].pages[0]
				let newCfg = {
					curComp: {},
					curData: { ...curData, ...cur },
					curPage: cfg.pageContent[cur.router]
				}
				window.tempCfg          = res.data
				if (type === 'template') {
					delete tempCfg.id
					tempCfg.caseType        = caseType        || ''
					tempCfg.templateThemeId = templateThemeId || ''
					tempCfg.templateId      = templateId      || ''
					tempCfg.composeType     = composeType     || ''
					tempCfg.name            = name            || ''
				}
				actions.updateConfig({ ...newCfg, ...cfg })
				let { globalData } = editConfig
				resolve('模板数据')
			}).catch(e => reject(e))
		}
	}
	initData(cb) {
		let { actions } = this.props
		let stores = {}
		let promise = new Promise((resolve, reject) => {
			let _res1 = ''
			Ajax.postLogin('/easy-roa/v1/user/getBsTop', {
				ryst: getCookie('RYST') || '123456',
				bsst: getCookie('BSST') || '123456',
				channel: '002'
			}).then(res1 => {
				console.log('res1')
				_res1 = res1
				return Ajax.postLogin('/easy-roa/v1/user/getBsUser', {
					bsst: getCookie('BSST') || '123456',
					channel: '002'
				})
			}).then((res2) => {
				console.log('res2')
				resolve([_res1.data, res2.data])
			}).catch(e => {
				reject(e)
			})
		})
		promise.then(res => {
			var da0 = res[0],
				da1 = res[1]
			stores.userInfo = da0.userInfo
			stores.list     = da0.systemList
			stores.auths    = da1.authorities
			stores.userInfo.mallMid = da1.userInfo.mallMid
			stores.userInfo.mallId  = da1.userInfo.mallId
			stores.userInfo.id      = da1.userInfo.id
			actions.updateUser(stores)
			window.uif = stores
			cb && cb()
		})
	}
	getUserInfo(cb) {
		if (ENV === 'dev'){
			Ajax.postLogin('/bsoms/user/ajaxLogin', {
				password: 'RYxyz123',
				userName: 'xcyh001',
				verifyCode: ''
			}).then(res => {
				this.initData(cb)
			})
		} else {
			this.initData(cb)
		}
	}
	componentWillMount() {
		this.getUserInfo(() => {
			let { actions, editConfig } = this.props
			let { globalData } = editConfig
			let arr = ['getConfig']
			let promises = arr.map(key => new Promise(this[key](globalData)))
			Promise.all(promises).then((o) => {
				this.setState({ load: true })
			})//.catch(e => {
			// 	console.log(e)
			// })
		})
	}

	componentDidMount() {
		this.timeInit()
		// hashHistory.push('/operate/edit')
	}

	render() {
		window.envType = 'business'
		return this.state.load
		?
		(
			<div className="pg-edit">
				{ this.props.children }
			</div>
		)
		:
		(
			<div>loading</div>
		)
	}
}

BusinessComponent.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BusinessComponent)
