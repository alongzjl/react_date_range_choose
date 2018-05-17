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

import { Checkbox, Collapse, Select } from 'antd'
const { Option, OptGroup } = Select
const Panel  = Collapse.Panel

import './index.less'

class RouterJump extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(val) {
		let { data, content, idx, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		content.type = 'router'
		content.url  = val
		actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeAuth(val, key) {
		let { data, actions } = this.props
		data.auth.content[key] = val
		actions.updateComp(null, data)
	}

	onSelect(newIdx) {
		// console.clear()
		let { data, parentKey, action, idx, actions } = this.props
		if (newIdx === idx) return
		data[parentKey].idx = newIdx
		if (action === 'updateComp') {
			data.style = { ...data[parentKey].list[newIdx].data }
			return actions[action](null, data)
		}
		else if (action === 'updateGlobal') return actions[action](data)
	}

	cb(key) {
		// console.log(key)
	}

	render() {
		let { data, content, editConfig } = this.props
		let { pageList } = editConfig
		let pageGroup  = pageList.group
		let selectNode = pageGroup.map((gp, i) => {
			let { name, pages } = gp
			let pageNode  = pages.map((pg, j) => {
				let { router, title } = pg
				return (
					<Option key={j} value={router}>{ title }</Option>
				)
			})
			return (
				<OptGroup key={i} label={name}>
					{ pageNode }
				</OptGroup>
			)
		})
		let featureNode = (
			<OptGroup label={'功能'}>
				<Option value="back">返回</Option>
			</OptGroup>
		)
		return (
			<Select
				value={content.url || ''}
				style={{ width: '100%' }}
				onChange={this.onChange.bind(this)}
			>
				<Option value={''}>无</Option>
				{ 
					data.name == 'button' ? <Option value={'back'}>返回上一级</Option> : null
				}     
				{ selectNode }
				{ featureNode }
			</Select>
		)
	}
}

RouterJump.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RouterJump)
