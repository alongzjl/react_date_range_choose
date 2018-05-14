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
	getConfig() {
		let { location, actions, editConfig } = this.props
		let id = location.query.id
		return function(resolve, reject) {
			if (!id) return resolve('模板数据')
			Ajax.get(`/mcp-gateway/template/get?templateId=${id}`).then(res => {
				let cfg = JSON.parse(res.data.config).configPC
				delete res.data.config
				let cur = cfg.pageList.group[0].pages[0]
				let newCfg = {
					curComp: {},
					curData: { ...curData, ...cur },
					curPage: cfg.pageContent[cur.router],
					java: res.data,
					isView: true
				}
				actions.updateConfig({ ...newCfg, ...cfg })
				resolve('模板数据')
			}).catch(e => reject(e))
		}
	}
	
	componentWillMount() {
		let { actions, editConfig } = this.props
		let { globalData } = editConfig
		let arr = ['getConfig']
		let promises = arr.map(key => new Promise(this[key](globalData)))
		Promise.all(promises).then((o) => {
			actions.updateGlobal(globalData)
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
