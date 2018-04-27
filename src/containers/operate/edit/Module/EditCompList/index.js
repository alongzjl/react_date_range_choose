/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T14:11:17+08:00
 */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

const compList = require('state/compList')

import './index.less'

class EditCompList extends React.Component {
	componentWillMount() {
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	addComp(item) {
		let { actions, editConfig } = this.props
		actions.addComp(editConfig.curData.router, item.key)
	}

	render() {
		let childNodes = compList.map((_, i) => {
			return (
				<div key={_.name} className="cl-item" onClick={this.addComp.bind(this, _)}>{_.name}</div>
			)
		})
		return (
			<section className="comp-list">
				{childNodes}
			</section>
		)
	}
}

EditCompList.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditCompList)
