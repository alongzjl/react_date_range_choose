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

class PostMessage extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		window.addEventListener('message', this._handleMessage, false)
	}
	componentWillUnmount() {
		window.removeEventListener('message', this._handleMessage)
	}
	
	_handleMessage = e => {
		let { origin } = window.location,
			{ data } = e
		if (e.origin !== origin) return
		console.log(data)
	}
	
	render() {
		return null
	}
}

export default PostMessage