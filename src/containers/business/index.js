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
import { Spin } from 'antd'
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
	getWeather() {
		return (resolve) => {
			window.weather = {
				temp: '33℃',
				type: '小雨',
				iconName: '07.png',
				humidity: null,
				direct: '西南风',
				power: '<3级',
				aqi: '108',
				aqiInfo: '轻度污染'
			}
			resolve('天气数据')
		}
	}
	getConfig() {
		let { location, actions } = this.props
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
		let api = `/mcp-gateway/${type}/get?${type}Id=${id}`
		if (type === 'template') api += '&phase=RELEASE'

		return function(resolve, reject) {
			Ajax.get(api).then(res => {
				let cfg = JSON.parse(res.data.config).configPC
				delete res.data.config
				let cur = cfg.pageList.group[0].pages[0]
				let newCfg = {
					curComp: {},
					curData: { ...curData, ...cur },
					curPage: cfg.pageContent[cur.router]
				}
				window.tempCfg = res.data
				if (type === 'template') {
					delete tempCfg.id
					tempCfg.caseType        = caseType        || ''
					tempCfg.templateThemeId = templateThemeId || ''
					tempCfg.templateId      = templateId      || ''
					tempCfg.composeType     = composeType     || ''
					tempCfg.name            = name            || ''
				}
				if (type === 'template') {
					let theme = cfg.globalData.theme
					if (theme.list[templateThemeId]) theme.idx = templateThemeId * 1
					else theme.idx = 0
				}
				actions.updateConfig({ ...newCfg, ...cfg })
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
				_res1 = res1
				return Ajax.postLogin('/easy-roa/v1/user/getBsUser', {
					bsst: getCookie('BSST') || '123456',
					channel: '002'
				})
			}).then((res2) => {
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
			}).then(() => {
				this.initData(cb)
			})
		} else {
			this.initData(cb)
		}
	}
	componentWillMount() {
		this.getUserInfo(() => {
			let { editConfig } = this.props
			let { globalData } = editConfig
			let arr = ['getConfig', 'getWeather']
			let promises = arr.map(key => new Promise(this[key](globalData)))
			Promise.all(promises).then(() => {
				this.setState({ load: true })
			})//.catch(e => {
			// 	console.log(e)
			// })
		})
		window.onbeforeunload = (e) => {
			e.returnValue = '确定离开当前页面吗, 离开的话会丢失未保存的数据哦?'
		}
	}

	componentDidMount() {
		this.timeInit()
	}

	render() {
		window.envType = 'business'
		document.title = '作品编辑器'
		return this.state.load
		?
		(
			<div className="pg-edit">
				{ this.props.children }
			</div>
		)
		:
		(
			<Spin />
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
