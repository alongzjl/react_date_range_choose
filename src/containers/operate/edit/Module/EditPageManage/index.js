/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-19T14:29:30+08:00
 */

import React from 'react'
//import $ from 'jquery'
import './index.less' 
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

import * as actions from 'actions'

import { Button, Icon } from 'antd'
 
class EditPageManage extends React.Component {
	componentWillMount() {
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	addPage(groupIdx) {
		let { actions, editConfig } = this.props
		actions.addPage(groupIdx, `页面${editConfig.pageList.group[groupIdx].pages.length + 1}`)
	}

	deletePage(router, groupIdx, idx) {
		let { actions } = this.props
		actions.deletePage(router, groupIdx, idx)
	}

	selectPage(router, groupIdx, idx) {
		let { actions, editConfig } = this.props
		editConfig.curData.pageGroupIdx = groupIdx
		editConfig.curData.pageIdx  = idx
		actions.updateCur(editConfig.curData)
		actions.selectPage(router)
	}

	render() {
		let { data, editConfig } = this.props
		let childNode = data.group[0].pages.map((_, i) => {
			return (
				<li
					key={i}
					className={`page-li${_.router === editConfig.curData.router? ' s-active': ''}`}
				>
					<div className="pl-name" onClick={this.selectPage.bind(this, _.router, 0, i)}>{ _.title }</div>
					<div className="pl-ctrl">
						<a
							style={{ display: data.group[0].pages.length > 1? 'block': 'none' }}
							onClick={this.deletePage.bind(this, _.router, 0, i)}
						><Icon type="delete" /></a>
					</div>
				</li>
			)
		})
		return (
			<div className="pe-page-manage">
				<div className="pem-add" onClick={this.addPage.bind(this, 0)}><Icon type="plus" /> 添加页面</div>
				<div className="page-list">
					<ul>{ childNode }</ul>
				</div>
			</div>
		)
	}
}


EditPageManage.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPageManage)
