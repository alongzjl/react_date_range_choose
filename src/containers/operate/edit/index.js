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

import EditHeader    from './Module/EditHeader'
import EditContent   from './Module/EditContent'
import EditElement   from './Module/EditElement'
import EditStyle     from './Module/EditStyle'
import EditAnimation from './Module/EditAnimation'

import RyTitle  from 'components/RyTitle'
import RyBorder from 'components/RyBorder'
import RyComponentList   from 'components/RyComponentList'
import RyPreviewWrapper  from 'components/RyPreviewWrapper'
import RyComponentConfig from 'components/RyComponentConfig'
import * as actions from 'actions'

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
		let { comp, scaleVal, actions } = this.props

		return (
			<div className="pg-edit-box e-flex-fdc">
				<EditHeader/>
				<div className="pg-body e-flex-box">
					<div className="pg-left scrollbar">
						<RyTitle config={{
							sTitle: '页面组件',
							sSubTitle: '点击或拖放来添加组件'
						}}>
						</RyTitle>
					</div>
					<div className="pg-center e-flex e-flex-box scrollbar">
						<EditElement data={comp.curData.page}></EditElement>
					</div>
					<div className="pg-right scrollbar">
						<RyBorder config="{bBg: true}">
							<div className="RyTitle">
								<h3 className="ui-title">
									<span>{this.state.caseName}</span>
								</h3>
								<p className="ui-desc">
									{this.state.range.width + '*' + this.state.range.height}
								</p>
							</div>
						</RyBorder>
						<Tabs defaultActiveKey="1" type="card">
							<TabPane tab="内容" key="1"><EditContent   data={comp.curData.comp} /></TabPane>
							<TabPane tab="样式" key="2"><EditStyle     data={comp.curData.comp} /></TabPane>
							<TabPane tab="动画" key="3"><EditAnimation data={comp.curData.comp} /></TabPane>
						</Tabs>
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
