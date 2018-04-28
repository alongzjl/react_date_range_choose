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

import ColorPicker from 'rc-color-picker'
import { Input } from 'antd'

import './index.less'

class EditTheme extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	changeColor(c, key) {
		// var col = c.color.replace(/#((\S{2})(\S{2})(\S{2})|(\S)(\S)(\S))$/, `rgba(${parseInt($2, 16)}, ${parseInt($3, 16)}, ${parseInt($4, 16)}, ${c.alpha/100})`)
		var col = c.color.replace(/#((\S{2})(\S{2})(\S{2})|(\S)(\S)(\S))$/, ($0, $1, $2, $3, $4) => {
			return `rgba(${parseInt($2, 16)}, ${parseInt($3, 16)}, ${parseInt($4, 16)}, ${c.alpha/100})`
		})
		let { data, actions, editConfig } = this.props
		let colors = data.list[data.idx].colors
		colors[key].color = col
		editConfig.globalData.theme = data
		actions.updateGlobal(editConfig.globalData)
	}

	render() {
		let { data }  = this.props
		let colors    = data.list[data.idx].colors
		let childNode = Object.keys(colors).map((_, i) => {
			let col = colors[_]
			return (
				<div key={i}>
					{col.name} <ColorPicker color={col.color} onClose={c => this.changeColor(c, _)} placement="bottomLeft" />
				</div>
			)
		})
		return (
			<section className="ry-roll-screen-config">
				{ childNode }
			</section>
		)
	}
}

EditTheme.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditTheme)
