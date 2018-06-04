/**
 * @Author: Along
 * @Date:   2018-05-02
 
 */

import React from 'react'
import './index.less'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import Custom       from 'compEdit/EditContent/Custom'

import { Collapse, Checkbox, Select } from 'antd'
const  { Option } = Select
const  { Panel }  = Collapse

class Floor extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	onChange(checked, val, idx) {
		val.checked = checked
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		parentComp.feature.floors[idx]  = val
		actions.updateComp(null, parentComp? parentComp: data)
	}

	render() {
		let { data, editConfig, ioInput } = this.props
		let { curData }    = editConfig
		let { parentComp } = curData
		let floors = parentComp.feature.floors
		let floorNode = floors.map((_, i) => {
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name">{_.name}</div>
					<div className="pgsr-ctrl">
						<Checkbox
							checked={_.checked} onChange={v => this.onChange(v.target.checked, _, i)}
						/>
					</div>
				</div>
			)
		})
		return (
			<Collapse activeKey={['0']}>
				<Panel header={`楼层信息`} key={0}>
					<div className="pgs-row" key={-1}>
						<div className="pgsr-name">名称</div>
						<div className="pgsr-ctrl">是否显示</div>
					</div>
					{ floorNode }
				</Panel>
			</Collapse>
		)
	}
}

Floor.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Floor)