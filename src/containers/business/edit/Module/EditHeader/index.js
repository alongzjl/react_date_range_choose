/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-19T14:29:30+08:00
 */

import React from 'react'
import './index.less'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

const comp     = require('state/comp')
const compC    = require('state/compChild')
const compP    = require('state/compParent')
const compList = require('state/compList')

import * as actions from 'actions'

import { Icon, Input, message } from 'antd'
 
class Header extends React.Component {
	constructor(props) {
		super(props)

		let java = props.editConfig.java
		this.state = {
			name: java? java.name || '': ''
		}
	}
	componentWillMount() {
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	addComp(item) {
		let { actions, editConfig } = this.props
		let { curComp, curData } = editConfig
		let { parentComp } = curData
		let { key } = item
		if (curComp.type === 'advanced' || parentComp) {
			let compData = JSON.parse(JSON.stringify(comp[key])),
				Comp     = parentComp || curComp,
				auth     = compC[Comp.name]
			if (compData.type === 'base' && auth[key]) {
				Comp.data.components.push(compData)
				return actions.updateComp(null, Comp)
			} else {
				message.info('该高级组件内不能添加该基础组件!')
			}
		} else {
			if (compP[key]) {
				return actions.addComp(editConfig.curData.router, key)
			}
			message.info('该组件内只能添加在高级组件中!')
		} 
	}

	selectTheme() {
		let { actions, editConfig } = this.props
		editConfig.curData.contentType = 'theme'
		actions.updateCur(editConfig.curData)
	}

	saveData() {
		let { editConfig, location } = this.props
		let { query } = location
		let cfg = JSON.parse(JSON.stringify(editConfig))
		let config = {
			configPC: {
				pageContent: cfg.pageContent,
				pageList:    cfg.pageList,
				globalData:  cfg.globalData
			}
			// configTerminal: {
			// 	pageContent: cfg.pageContent,
			// 	pageList:    cfg.pageList,
			// 	globalData:  cfg.globalData
			// }
		}
		let da = {
			config: JSON.stringify(config),
			coverImgUrl: 'http://rongyi.com',
			name: this.state.name
		}
		if (query.id) da.id = query.id
		Ajax.post(`/mcp-gateway/template/${query.id? 'update': 'save'}`, da).then(res => {
			message.success(`${query.id? '更新': '保存'}成功!`)
			if (!query.id) {
				hashHistory.push(`/operate/edit?ct=${query.ct || 2}&id=${res.data}`)
			}
		})
		console.log(JSON.stringify(config))
	}

	tNameChange(name) {
		this.setState({ name: name })
	}

	render() {
		return (
			<div className="pe-header e-flex">
				<div className="peh-left">
					<Input
						value={this.state.name}
						placeholder={'模板名称'}
						onChange={e => this.tNameChange(e.target.value)}
					/>
				</div>

				<div className="peh-center"></div>

				<div className="peh-right">
					<section className="comp-list">
						<div className="cl-item" onClick={this.selectTheme.bind(this)}>
							<Icon type="appstore" />
							主题
						</div>
						<div className="cl-item" onClick={this.saveData.bind(this)}>
							<Icon type="code" />
							保存
						</div>
					</section>
				</div>
			</div>
		)
	}
}


Header.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
