/**
 * @Author: Along
 * @Date:   2018-05-02
 
 */

import React from 'react'
import './index.less'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import Custom       from 'compEdit/EditContent/Custom'

import { Collapse, Select } from 'antd'
const  { Option } = Select
const  { Panel }  = Collapse

class Page extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	render() {
		let { data, editConfig } = this.props
		let { curData }    = editConfig
		let { parentComp } = curData
		if (!parentComp) return false
		let api  = parentComp.feature.api
		let body = api.data
		return (
			<div>
				<Select>
					<Option></Option>
				</Select>
			</div>
		)
	}
}

Page.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page)