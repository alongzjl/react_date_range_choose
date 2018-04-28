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

import RyTitle  from 'components/RyTitle'
import RyBorder from 'components/RyBorder'
import RyComponentList   from 'components/RyComponentList'
import RyPreviewWrapper  from 'components/RyPreviewWrapper'
import RyComponentConfig from 'components/RyComponentConfig'
import * as actions from 'actions'

import 'rc-color-picker/assets/index.css'
import './index.less'

import { Tabs } from 'antd'
const TabPane = Tabs.TabPane

class TemplateListPageEditComponent extends React.Component {
	constructor(props) {
		super(props);
		let resolution = props.routeParams.resolution.split('*');
		this.state = {
			ryRollScreenDataIndex: 1,
			range: {
				width: parseInt(resolution[0]),
				height: parseInt(resolution[1]),
				styleTop: 0,
				styleLeft: 0,
				styleWidth: 0,
				styleHeight: 0,
				radio: true
			},
			componmentList: [
				{
					val: 5,
					text: '网页'
				}
			]
		}
	}

	componentWillMount() {
	}

	componentDidMount() {
	}

	render() {
		let { editConfig, scaleVal, actions } = this.props
		let type = editConfig.curData.contentType,
			editTab
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
			<div className="pg-edit-box e-flex-fdc">
				<EditHeader/>
				<div className="pg-body e-flex-box">
					<div className="pg-left scrollbar">
						<EditPageManage data={editConfig.pageList} />
					</div>
					<div className="pg-center e-flex e-flex-box scrollbar">
						<EditElement data={editConfig.curPage}></EditElement>
					</div>
					<div className="pg-right scrollbar">
						{ editTab }
					</div>
				</div>
			</div>
		);
	}
}

TemplateListPageEditComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TemplateListPageEditComponent)
