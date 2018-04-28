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

class Picture extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	handleFocusBlur(e) {
		let { data, actions } = this.props
		data.content.routerOption = e.currentTarget.value
		actions.updateComp(null, data)
	}

	render() {
		let { data } = this.props
		return (
			<div className="c-picture">
				<Input
					type="textarea"
					placeholder="请输入要跳转的网址"
					defaultValue={data.content.routerOption}
					onBlur={this.handleFocusBlur.bind(this)} 
				/>
			</div>
		)
	}
}

Picture.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Picture)