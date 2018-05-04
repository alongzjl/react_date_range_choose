/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-19T14:29:30+08:00
 */

import React from 'react'
import './index.less' 
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

const comp     = require('state/comp')
const compList = require('state/compList')

import * as actions from 'actions'

import { Icon, message } from 'antd'
 
class Header extends React.Component {
	componentWillMount() {
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	addComp(item) {
		let { actions, editConfig } = this.props
		let { curData, curComp } = editConfig
		if (curComp.type === 'advanced') {
			var compData = JSON.parse(JSON.stringify(comp[item.key]))
			if (compData.type === 'base') {
				curComp.components.push(compData)
				actions.updateComp(null, curComp)
			} else {
				message.info('高级组件内只能添加基础组件!')
			}
		} else {
			actions.addComp(editConfig.curData.router, item.key)
		}
	}

	selectTheme() {
		let { actions, editConfig } = this.props
		editConfig.curData.contentType = 'theme'
		actions.updateCur(editConfig.curData)
	}

	createData() {
		let { actions, editConfig } = this.props
		console.clear()
		let cfg = JSON.parse(JSON.stringify(editConfig))
		console.log(cfg)
		let config = {
			configPC: {
				pageContent: cfg.pageContent,
				pageList:    cfg.pageList,
				globalData:  cfg.globalData,
			},
			configTerminal: {
				pageContent: cfg.pageContent,
				pageList:    cfg.pageList,
				globalData:  cfg.globalData,
			},
		}
		console.log(JSON.stringify(config))
	}

	render() {
		let compListNode = compList.map((_, i) => {
			return (
				<div key={i} className="cl-item" onClick={this.addComp.bind(this, _)}>{_.name}</div>
			)
		})
		return (
			<div className="pe-header e-flex">
				<div className="peh-left"></div>

				<div className="peh-center">
					<section className="comp-list">
						{ compListNode }
					</section>
				</div>

				<div className="peh-right">
					<section className="comp-list">
						<div className="cl-item" onClick={this.selectTheme.bind(this)}>
							<Icon type="appstore" /> 主题
						</div>
						<div className="cl-item" onClick={this.createData.bind(this)}>
							<Icon type="code" /> 数据
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
