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

import { Input } from 'antd'

import Color from 'compEdit/EditCommon/Color'

import './index.less'

class EditPage extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	handleFocus(e) {
		let { data, actions, editConfig } = this.props
		let curData = editConfig.curData
		data.title = e.currentTarget.value
		actions.updatePage(curData.pageGroupIdx, curData.pageIdx, data)
	}

	changeColor(c) {
		var col = c.color.replace(/#((\S{2})(\S{2})(\S{2})|(\S)(\S)(\S))$/, ($0, $1, $2, $3, $4) => {
			return `rgba(${parseInt($2, 16)}, ${parseInt($3, 16)}, ${parseInt($4, 16)}, ${c.alpha/100})`
		})
		debugger
		let { data, actions, editConfig } = this.props
		let curData = editConfig.curData
		data.feature.backgroundColor = col
		actions.updatePage(curData.pageGroupIdx, curData.pageIdx, data)
	}

	render() {
		let { data } = this.props
		return (
			<section className="ry-roll-screen-config">
				标题 <Input
						placeholder="页面标题"
						value={data.title}
						onChange={this.handleFocus.bind(this)}
					/>
				背景色
				<Color
					data={data}
					color={data.feature.backgroundColor}
					path={'feature.backgroundColor'}
					action={'updatePage'}
					placement="bottomLeft"
				/>
			</section>
		)
	}
}

EditPage.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPage)
