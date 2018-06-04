/**
 * @Author: Along
 * @Date:   2018-05-02
 
 */

import React from 'react'
import './index.less'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'
import { Input }    from 'antd'

import Custom       from 'compEdit/EditContent/Custom'

import { Collapse, Select } from 'antd'
const  { Option } = Select
const  { Panel }  = Collapse

class StoreList extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	render() {
		return (
			<Custom
				data={this.props.data}
			/>
		)
	}
}

StoreList.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StoreList)