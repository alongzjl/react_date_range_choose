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
import curData from 'state/cur/curData'
import './index.less'

import Element from './Element'

class ViewComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			load: false
		}
	}

	timeInit() {
		let { actions } = this.props
		setInterval(() => actions.updateTime(), 1000)
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
		let { location, actions, editConfig } = this.props
		let { query } = location
		let { id, s } = query
		if (!id) {
			message.error(`作品ID不存在!`)
			return resolve('模板数据')
		}
		s = s || 'business'
		let type = s === 'business'? 'case': 'template'
		// let key  = s === 'business'? 'Terminal': 'PC'
		let key  = 'PC'
		let api  = `/mcp-gateway/${type}/get?${type}Id=${id}`
		if (s === 'business') api += '&phase=RELEASE'
		else api += '&phase=DEV'
		return function(resolve, reject) {
			if (!id) return resolve('模板数据')
			Ajax.get(api).then(res => {
				let cfg = JSON.parse(res.data.config)[`config${key}`]
				delete res.data.config
				let cur = cfg.pageList.group[0].pages[0]
				let newCfg = {
					curComp: {},
					curData: { ...curData, ...cur },
					curPage: cfg.pageContent[cur.router]
				}
				window.tempCfg = res.data
				actions.updateConfig({ ...newCfg, ...cfg })
				resolve('模板数据')
			}).catch(e => reject(e))
		}
	}
	
	componentWillMount() {
		let { actions, editConfig } = this.props
		let { globalData } = editConfig
		let arr = ['getConfig', 'getWeather']
		let promises = arr.map(key => new Promise(this[key](globalData)))
		Promise.all(promises).then((o) => {
			this.setState({ load: true })
		// }).catch(e => {
		// 	console.log(e)
		})
	}

	componentDidMount() {
		// this.timeInit()
		// hashHistory.push('/operate/edit')
	}

	render() {
		let { location, editConfig } = this.props
		window.envType = 'view'
		return this.state.load
		?
		(
			<div className="pg-edit">
				<Element data={editConfig.curPage} location={location} />
			</div>
		)
		:
		(
			<div>loading</div>
		)
	}
}

ViewComponent.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ViewComponent)
