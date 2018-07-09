/*
 * @Author: liaohui
 * @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-23T14:40:00+08:00
*/

'use strict';

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import EditHeader     from 'compEditB/EditHeader'
import EditPage       from 'compEditB/EditPage'
import EditPageManage from 'compEditB/EditPageManage'
import EditContent    from 'compEditB/EditContent'
import EditElement    from 'compEditB/EditElement'
import EditStyle      from 'compEditB/EditStyle'
import EditAnimation  from 'compEdit/EditAnimation'
import EditTheme      from 'compEditB/EditTheme'

import * as actions from 'actions'

import 'rc-color-picker/assets/index.css'

import './index.less'

import { Tabs } from 'antd'
const TabPane = Tabs.TabPane

class EditComponent extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
	}

	componentDidMount() {
	}

	selectPage() {
		let { actions, editConfig } = this.props
		let { curData } = editConfig
		actions.selectPage(curData.router)
	}

	render() {
		let { editConfig, location } = this.props
		let theme  = editConfig.globalData.theme
		let colors = theme.list[theme.idx].colors
		let { curData } = editConfig
		let type = curData.contentType
		let editTab
		window.curThemeColor = colors
		if (type === 'page') {
			editTab = (<EditPage data={editConfig.curPage} />)
		} else if(type === 'comp') {
			editTab = (
				<Tabs defaultActiveKey="1" type="card">
					<TabPane tab="内容" key="1"><EditContent   data={editConfig.curComp} /></TabPane>
					<TabPane tab="样式" key="2"><EditStyle     data={editConfig.curComp} /></TabPane>
					<TabPane tab="动画" key="3"><EditAnimation data={editConfig.curComp} /></TabPane>
				</Tabs>
			)
		} else if (type === 'theme') {
			editTab = (<EditTheme data={editConfig.globalData.theme} />)
		}
		return (
			<div className="pg-edit-box">
				<EditHeader location={location}/>
				<div className="pg-body e-flex-box">
					<div className="pg-left scrollbar">
						<EditPageManage data={editConfig.pageList} />
					</div>
					<div className="pg-center e-flex-box scrollbar" onClick={this.selectPage.bind(this)}>
						<EditElement data={editConfig.curPage} location={location}></EditElement>
					</div>
					<div className="pg-right scrollbar">
						{ editTab }
					</div>

				</div>
			</div>
		)
	}
}

EditComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditComponent)
