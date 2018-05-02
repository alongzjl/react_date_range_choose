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
import StyleManage from 'compEdit/EditCommon/StyleManage'
import { Collapse, Icon, Input, Select } from 'antd'
const Panel  = Collapse.Panel
const Option = Select.Option

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
		let { data, editConfig }  = this.props
		let activeKey = ['0', '1']
		let colors    = data.list[data.idx].colors
		let addNode
		if (Object.keys(colors).length < 50) {
			addNode = (
				<div className="pgs-row">
					<div className="pgsr-name">
						<Select
							style={{ width: '90%' }}
						>
							<Option value="color">颜色</Option>
						</Select>
					</div>
					<div className="pgsr-ctrl">
						<Input placeholder="字段名" />
					</div>
					<div className="pgsr-auth">
						<Icon type="plus" />
					</div>
				</div>
			)
		}
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
				<StyleManage
					data={editConfig.globalData}
					list={data.list}
					idx={data.idx}
					parentKey={'theme'}
					action={'updateGlobal'}
					name={'主题'}
					max={10}
				/>
				<Collapse defaultActiveKey={activeKey}>
					<Panel header={'主题编辑'}>
						{ addNode }
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
