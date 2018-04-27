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

class Text extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	handleFocusBlurText(e) {
		let { data, actions } = this.props
		data.content.text = e.currentTarget.value
		actions.updateComp(data)
	}
	handleFocusBlur(e) {
		let { data, actions } = this.props
		data.content.routerOption = e.currentTarget.value
		actions.updateComp(data)
	}  

	render() {
		let { data } = this.props
		return (
			<div className="c-text">
				<h2>文本内容:</h2>
				<Input
					type="textarea"
					placeholder="请输入文本内容"
					defaultValue={data.content.text}
					onKeyUp={this.handleFocusBlurText.bind(this)} 
				/>
				<h2>跳转链接:</h2>
				<Input 
					type="textarea"
					placeholder="请输入点击跳转链接可不写"
					defaultValue={data.content.routerOption}
					onKeyUp={this.handleFocusBlur.bind(this)} 
				/> 
			</div>
		)
	}
}

Text.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Text)