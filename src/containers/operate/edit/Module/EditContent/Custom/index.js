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

import { Collapse, Select } from 'antd'
const  { Option } = Select
const  { Panel }  = Collapse

class Custom extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	render() {
		let { data } = this.props
		let { feature } = data
		let activeKey = Array.from(new Array(2), (_, i) => `${i}`)
		return (
			<Collapse activeKey={activeKey}>
				<Panel header={`内容`} key={0}>
					<div className="pgs-row" key={0}>
						<div className="pgsr-name">内容</div>
						<div className="pgsr-ctrl"></div>
					</div>
				</Panel>
			</Collapse>
		)
	}
}

Custom.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Custom)