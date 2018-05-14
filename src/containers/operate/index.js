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


class OperateComponent extends React.Component {
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
					java: res.data
				}
				actions.updateConfig({ ...newCfg, ...cfg })
				resolve('模板数据')
			}).catch(e => reject(e))
		}
	}
	/* Mock 数据 */
	getFloor(globalData) {
		return function(resolve, reject) {
			// Ajax.get('/store/getFloor').then(res => {
				// globalData.floors = res.data
				globalData.floors = [
					{
						id:      '5a532b82130b38000b1884a7',
						name:    'L1',
						picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
						sort:    1
					}
				]
				resolve('楼层')
			// }).catch(e => reject(e))
		}
	}
	getCatg(globalData) {
		return function(resolve, reject) {
			Ajax.get('/store/getCatg').then(res => {
				globalData.catgs = [
					{
						id:      '5a532b82130b38000b1884a7',
						name:    '服饰',
						picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
						sort:    1
					}
				]
				resolve('分类')
			}).catch(e => reject(e))
		}
	}
	getStoreList(globalData) {
		return function(resolve, reject) {
			// Ajax.get('/store/getStoreList').then(res => {
				// globalData.storeList = res
				globalData.storeList = {
					data: [{
						id: 1,
						name:  '法拉利',
						price: '698.99',
						floor: 'L1',
						no:    '101',
						mall_id: '54f403eae4b002000cf63762',
						pic: 'http://img.weiye.me/zcimgdir/headimg/32d7529d24439f8c4a22f753c918326e_o.jpg'
					}],
					page: 1,
					page_size: 12,
					total: 0,
					total_page: 1
				}
				resolve('店铺列表')
			// }).catch(e => reject(e))
		}
	}
	getStoreDetails(globalData) {
		return function(resolve, reject) {
			// Ajax.get('/store/storeDetails').then(res => {
				// globalData.storeDetails = res.data
				globalData.storeDetails = {
					images: [{
						title: '促销图文',
						url:   'http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png'
					}],
					text: '发斯蒂芬斯蒂芬斯蒂芬和法国恢复'
				}
				resolve('店铺详情')
			// })
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
			let arr = ['getConfig', 'getFloor', 'getCatg', 'getStoreList', 'getStoreDetails']
			let promises = arr.map(key => new Promise(this[key](globalData)))
			Promise.all(promises).then((o) => {
				actions.updateGlobal(globalData)
				this.setState({ load: true })
			}).catch(e => {
				console.log(e)
			})
		})
	}

	componentDidMount() {
		this.timeInit()
		// hashHistory.push('/operate/edit')
	}

	render() {
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
