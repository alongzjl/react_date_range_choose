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
import { Row, Col, Input, Select } from 'antd'
const Option = Select.Option

import './index.less'

class Color extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	changeCustomColor(c) {
		var col = c.color.colorRGB()
		col.push(c.alpha/100)
		col = `rgba(${col.join(',')})`
		let { data, color, path, action, actions, editConfig }  = this.props
		let curData = editConfig.curData
		color.color = col
		color.alpha = c.alpha
		color.rgb   = c.color
		if (action === 'updatePage') return actions[action](curData.pageGroupIdx, curData.pageIdx, data)
		if (action === 'updateComp') return actions[action](null, data)
	}

	changeColorType(val) {
		let { data, color, action, actions, editConfig }  = this.props
		let curData = editConfig.curData
		color.type  = val
		if (action === 'updatePage') return actions[action](curData.pageGroupIdx, curData.pageIdx, data)
		if (action === 'updateComp') return actions[action](null, data)
	}

	render() {
		let { data, color, placement, editConfig }  = this.props
		let theme   = editConfig.globalData.theme
		let colors  = JSON.parse(JSON.stringify(theme.list[theme.idx].colors))
		let cp
		colors.custom = {
			name:  '自定义',
			color: color.color,
		}
		let options = Object.keys(colors).map((_, i) => {
			let col = colors[_]
			if (!col.color) return false
			return (
				<Option key={col.name} value={_}>
					<div className="pgt-row">
						<span className="pgt-color mr5">
							<span className="pgt-color-icon" style={{backgroundColor: col.color}}></span>
						</span>
						{col.name}
					</div>
				</Option>
			)
		})
		if (color.type === 'custom') {
			cp = (
				<Col span={6}>
					<ColorPicker
						alpha={color.alpha || 100}
						color={color.rgb || color.color}
						onClose={this.changeCustomColor.bind(this)}
						placement={ placement || 'bottomLeft' }
					/>
				</Col>
			)
		}
		return (
			<div>
			<Row>
				{ cp }
				<Col span={18}>
					<Select
						style={{ width: '100%' }}
						value={color.type}
						defaultValue={color.type}
						onChange={this.changeColorType.bind(this)}
					>
						{ options }
					</Select>
				</Col>
			</Row>
			</div>
		)
	}
}

Color.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Color)
