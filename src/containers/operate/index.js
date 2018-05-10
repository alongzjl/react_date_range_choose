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
	componentWillMount() {
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
	}

	componentDidMount() {
		hashHistory.push('/operate/edit/1080*1920/home')
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
