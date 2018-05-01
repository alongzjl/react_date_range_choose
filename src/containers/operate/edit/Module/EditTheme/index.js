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
import { Collapse, Input, Radio } from 'antd'
const Panel       = Collapse.Panel
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

import './index.less'

class EditTheme extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	changeColor(c, key) {
		var col = c.color.colorRGB()
		col.push(c.alpha/100)
		col = `rgba(${col.join(',')})`
		let { data, actions, editConfig } = this.props
		let colors = data.list[data.idx].colors
		colors[key].color = col
		colors[key].alpha = c.alpha
		colors[key].rgb   = c.color
		editConfig.globalData.theme = data
		actions.updateGlobal(editConfig.globalData)
		window.curThemeColor = colors
	}

	render() {
		let { data }  = this.props
		let activeKey = ['0', '1']
		let colors    = data.list[data.idx].colors
		let childNode = Object.keys(colors).map((_, i) => {
			let col = colors[_]
			return (
				<div className="pgs-row" key={_}>
					<div className="pgsr-name">{col.name}</div>
					<div className="pgsr-ctrl">
						<ColorPicker
							alpha={col.alpha || 100}
							color={col.rgb || col.color}
							onClose={c => this.changeColor(c, _)}
							placement="bottomLeft"
						/>
					</div>
					<div className="pgsr-auth"></div>
				</div>
			)
		})
		return (
			<section className="pg-theme">
				<Collapse defaultActiveKey={activeKey}>
					<Panel header={'管理'} key="0">
						
					</Panel>
					<Panel header={'编辑'} key="1">
						{ childNode }
					</Panel>
				</Collapse>
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
