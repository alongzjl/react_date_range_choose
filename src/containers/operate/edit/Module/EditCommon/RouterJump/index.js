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

import { Row, Col, Checkbox, Collapse, Icon, Input, Select } from 'antd'
const { Option, OptGroup } = Select
const Panel  = Collapse.Panel

import './index.less'

class RouterJump extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(val) {
		console.clear()
		console.log(val)
		let { data, content, idx, actions } = this.props
		if (idx < 0) {
			content.router = {
				type: 'router',
				url: val
			}
		}
		actions.updateComp(null, data)
	}

	onChangeAuth(val, key) {
		console.clear()
		console.log(val)
		let { data, actions } = this.props
		data.auth.content[key] = val
		actions.updateComp(null, data)
	}

	onSelect(newIdx) {
		console.clear()
		let { data, parentKey, list, action, idx, actions } = this.props
		if (newIdx === idx) return
		data[parentKey].idx = newIdx
		if (action === 'updateComp') {
			data.style = { layout: data.style.layout, ...data[parentKey].list[newIdx].data }
			return actions[action](null, data)
		}
		else if (action === 'updateGlobal') return actions[action](data)
	}

	cb(key) {
		console.log(key)
	}

	render() {
		let { data, content, idx, actions, editConfig } = this.props
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
		return (
			<Collapse defaultActiveKey={['100']} onChange={this.cb}>
				<Panel header={`页面跳转`} key={100}>
					<div className="pgs-row">
						<div className="pgsr-name">跳转页面</div>
						<div className="pgsr-ctrl">
							<Select
								value={content.router.url || ''}
								style={{ width: '100%' }}
								onChange={this.onChange.bind(this)}
							>
								<Option value={''}>无</Option>
								{ selectNode }
							</Select>
						</div>
						<div className="pgsr-auth">
							<Checkbox checked={data.auth.content.router} onChange={_ => this.onChangeAuth(_.target.checked, 'router')} />
						</div>
					</div>
				</Panel>
			</Collapse>
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
