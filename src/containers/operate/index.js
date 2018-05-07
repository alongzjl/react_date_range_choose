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

	componentWillMount() {
		let { type, actions, editConfig } = this.props
		let { globalData } = editConfig
		Ajax.get('/store/getFloor').then(res => {
			let floors = res.data.map(_ => {
				_.checked = true
				return _
			})
			globalData.floors = floors
			actions.updateGlobal(globalData)
			this.setState({ load: true })
		}).catch(e => {

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
