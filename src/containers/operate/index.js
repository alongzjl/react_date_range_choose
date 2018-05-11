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
import './index.less'


class OperateComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			load: false
		}
	}

	getFloor(globalData) {
		return function(resolve, reject) {
			Ajax.get('/store/getFloor').then(res => {
				globalData.floors = res.data || []
				resolve('楼层')
			}).catch(e => reject(e))
		}
	}
	getCatg(globalData) {
		return function(resolve, reject) {
			Ajax.get('/store/getCatg').then(res => {
				globalData.catgs = res.data || []
				resolve('分类')
			}).catch(e => reject(e))
		}
	}
	getStoreList(globalData) {
		return function(resolve, reject) {
			Ajax.get('/store/getStoreList').then(res => {
				globalData.storeList = res
				resolve('店铺列表')
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
			// stores.listObj  = {}
			// stores.authObj  = {}
			// for (var l of da0.systemList)  { stores.listObj[l] = 1 }
			// for (var a of da1.authorities) { stores.authObj[a] = 1 }
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
		// this.getUserInfo(() => {
			let { type, actions, editConfig } = this.props
			let { globalData } = editConfig
			let arr = ['getFloor', 'getCatg', 'getStoreList']
			let promises = arr.map(key => new Promise(this[key](globalData)))
			Promise.all(promises).then((o) => {
				actions.updateGlobal(globalData)
				this.setState({ load: true })
			}).catch(e => {
				console.log(e)
			})
		// })
	}

	componentDidMount() {
		// this.props
		// debugger
		// hashHistory.push('/operate/edit')
	}

	render() {
		let { type, actions, editConfig } = this.props
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

OperateComponent.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OperateComponent)
