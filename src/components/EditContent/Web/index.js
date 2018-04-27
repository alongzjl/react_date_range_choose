/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Input } from 'antd'

class Web extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	handleFocusBlur(e) {
		let { data, actions, editConfig } = this.props
		data.content.url = e.currentTarget.value
		actions.updateComp(editConfig.curData.compIdx, data)
	}

	render() {
		let { comp, data, actions } = this.props
		return (
			<div className="c-web">
				<Input
					type="textarea"
					placeholder="请输入要打开的网址"
					defaultValue={data.content.url}
					onBlur={this.handleFocusBlur.bind(this)}
				/>
			</div>
		)
	}
}

Web.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Web)
