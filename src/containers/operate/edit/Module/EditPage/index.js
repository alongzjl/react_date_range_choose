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

import { Collapse, Input } from 'antd'
const Panel = Collapse.Panel

import Color     from 'compEdit/EditCommon/Color'
import PageAnime from 'compEdit/EditCommon/PageAnime'

import './index.less'

class EditPage extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	handleFocus(e) {
		let { data, actions, editConfig } = this.props
		let curData = editConfig.curData
		data.title = e.currentTarget.value
		actions.updatePage(curData.pageGroupIdx, curData.pageIdx, data)
	}

	changeColor(c) {
		var col = c.color.replace(/#((\S{2})(\S{2})(\S{2})|(\S)(\S)(\S))$/, ($0, $1, $2, $3, $4) => {
			return `rgba(${parseInt($2, 16)}, ${parseInt($3, 16)}, ${parseInt($4, 16)}, ${c.alpha/100})`
		})
		let { data, actions, editConfig } = this.props
		let curData = editConfig.curData
		data.feature.backgroundColor = col
		actions.updatePage(curData.pageGroupIdx, curData.pageIdx, data)
	}

	render() {
		let ani = {
			className: '',
			direction: '',				// 方向
			delay: 0,					// 开始时间
			duration: 1,				// 持续时间
			iterationCount: 1			// 循环次数
		}
		let { data } = this.props
		if (!data || data.title === undefined) return false
		if (data.animation === undefined) {
			data.animation = {
				in: deepCopy(ani),
				out: deepCopy(ani),
				interval: 0
			}
		}
		let activeKey = ['0', '1']
		return (
			<section className="pg-page">
				<Collapse defaultActiveKey={activeKey}>
					<Panel header={'管理'} key="0">
						<div className="pgs-row">
							<div className="pgsr-name">标题</div>
							<div className="pgsr-ctrl">
								<Input
									placeholder="页面标题"
									value={data.title}
									onChange={this.handleFocus.bind(this)}
								/>
							</div>
						</div>
					</Panel>
					<Panel header={'编辑'} key="1">
						<div className="pgs-row">
							<div className="pgsr-name">背景色</div>
							<div className="pgsr-ctrl">
								<Color
									data={data}
									color={data.feature.backgroundColor}
									path={'feature.backgroundColor'}
									action={'updatePage'}
									placement="bottomLeft"
								/>
							</div>
						</div>
					</Panel>
				</Collapse>
				<PageAnime data={data} type={'in'} />
				<PageAnime data={data} type={'out'} />
			</section>
		)
	}
}

EditPage.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPage)
