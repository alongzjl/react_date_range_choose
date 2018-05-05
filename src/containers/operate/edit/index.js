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

import EditHeader     from 'compEdit/EditHeader'
import EditPage       from 'compEdit/EditPage'
import EditPageManage from 'compEdit/EditPageManage'
import EditContent    from 'compEdit/EditContent'
import EditElement    from 'compEdit/EditElement'
import EditStyle      from 'compEdit/EditStyle'
import EditAnimation  from 'compEdit/EditAnimation'
import EditTheme      from 'compEdit/EditTheme'

import tools from 'services/tools'
import * as actions from 'actions'

import 'rc-color-picker/assets/index.css'

import './index.less'

import { Tabs } from 'antd'
const TabPane = Tabs.TabPane

tools()

const curMap = {
	parentComp:   '父组件',
	router:       '路由',
	pageGroupIdx: '页面分组索引',
	pageIdx:      '页面索引',
	compIdx:      '组件索引',
	cusCompIdx:   '子组件索引',
	contentType:  '右侧面板类型',
}
const cTypeMap = {
	page:  '页面',
	comp:  '组件',
	theme: '主题'
}

class EditComponent extends React.Component {
	constructor(props) {
		super(props)
		let resolution = props.routeParams.resolution.split('*')
		this.state = {
			ryRollScreenDataIndex: 1,
			range: {
				width: parseInt(resolution[0]),
				height: parseInt(resolution[1])
			}
		}
	}

	componentWillMount() {
	}

	componentDidMount() {
	}

	selectPage() {
		let { actions, editConfig } = this.props
		actions.selectPage(editConfig.curData.router)
	}

	render() {
		let { editConfig } = this.props
		let theme   = editConfig.globalData.theme
		let colors  = theme.list[theme.idx].colors
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
				<EditHeader/>
				<div className="pg-body e-flex-box">
					<div className="pg-left scrollbar">
						<EditPageManage data={editConfig.pageList} />
					</div>
					<div className="pg-center e-flex e-flex-box scrollbar" onClick={this.selectPage.bind(this)}>
						<EditElement data={editConfig.curPage}></EditElement>
					</div>
					<div className="pg-right scrollbar">
						{ editTab }
					</div>


					<div className="pg-float scrollbar">
						{ Object.keys(curData).map((_, i) => {
							var im = curData[_]
							return (
								<p key={i}>
									<span>{curMap[_]}<br/>{_}</span>
									{typeof im === 'object'? im? '{...}': 'null': _ === 'contentType'? cTypeMap[im]: im}
								</p>
							)
						}) }
					</div>
				</div>
			</div>
		);
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
