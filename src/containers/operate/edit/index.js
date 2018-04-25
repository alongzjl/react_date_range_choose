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

	/**
	 * [changeLayerList 改变图层列表]
	 * @param  {[type]} old_index [旧索引]
	 * @param  {[type]} new_index [新索引]
	 * @return {[type]}           [description]
	 */
	changeLayerList(old_index, new_index) {
		this.arrMove(this.props.layers, old_index, new_index);
	}

	/**
	 * [arrMove 数组移动]
	 * @param  {[type]} arr       [数组]
	 * @param  {[type]} old_index [旧索引]
	 * @param  {[type]} new_index [新索引]
	 * @return {[type]}           [description]
	 */
	arrMove(arr, old_index, new_index) {
		if (new_index >= arr.length) {
			var k = new_index - arr.length;
			while (k-- + 1) {
				arr.push(undefined);
			}
		}
		arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
		return arr;
	}

	/**
	 * [dragEnd 拖拽结束]
	 * @param  {[type]} index [索引]
	 * @param  {[type]} style [样式]
	 * @return {[type]}       [description]
	 */
	dragEnd(index, style) {
		var type = this.state.componmentList[index].val,
			top = style.top / this.props.scaleVal,
			minTop = this.state.isAdTemplate ? 608 : 0;

		this.ryRollScreenAdd({
			type,
			top: Math.max(top, minTop),
			left: style.left / this.props.scaleVal
		});
	}

	/**
	 * [setRangeStyle 设置样式范围]
	 * @param {[type]} item [项]
	 * @return {[type]}     [description]
	 */
	setRangeStyle(item) {
		if (item) {
			this.state.range.styleTop = item.top ? Math.round(item.top) : 0;
			this.state.range.styleLeft = item.left ? Math.round(item.left) : 0;
			this.state.range.styleWidth = item.width ? Math.round(item.width) : 0;
			this.state.range.styleHeight = item.height ? Math.round(item.height) : 0;
			this.state.range.radio = item.radio;
		}
	}

	/**
	 * [setFocusIndex 选中图层]
	 * @param {[type]} index [索引]
	 * @return {[type]}      [description]
	 */
	setFocusIndex(index) {
		let { layers } = this.props;
		const realIndex = layers.findIndex((item) => {
			return item.index === index;
		});
		const item = layers[realIndex];

		if (!item) {
			this.props.actions.setFocusItemIndex(-1);
			return;
		}

		this.props.actions.setFocusItem(item);
		this.props.actions.setFocusItemIndex(index);
		this.setRangeStyle(item);
	}

	/**
	 * [ryRollScreenAdd 添加组件]
	 * @param  {[type]} obj [拖拽得到对象（类型，坐标x，坐标y）]
	 * @return {[type]}     [description]
	 */
	ryRollScreenAdd(obj) {
		let newItem = {
			type: obj.type,
			top: obj.top,
			left: obj.left,
			width: 600,
			height: 600,
			radio: false,
			move: true,
			resize: true,
			edit: [
				{
					name: '删除',
					type: 'delete',
					onClick: this.removeItem
				}
			]
		};
		switch (obj.type) {
			case 5:
				newItem.width = 1080;
				newItem.height = 600;
				break;
			default:
				break;
		}

		this.addItemCore(newItem);
	}

	/**
	 * [removeItem 删除图层]
	 * @param  {[type]} data [数据]
	 * @return {[type]}      [description]
	 */
	removeItem() {
		let index = this.getFocusIndex();

		this.props.layers.splice(index, 1);

		let beforeItem = this.props.layers[index - 1],
			focusIndex = -1;

		if (beforeItem) {
			focusIndex = beforeItem.index;
		} else if (this.props.layers.length) {
			focusIndex = this.props.layers[0].index;
		}

		this.setFocusIndex(focusIndex);
	}

	/**
	 * [addItemCore 方便copy使用]
	 * @param  {[type]} item [项]
	 * @return {[type]}      [description]
	 */
	addItemCore(item) {
		let newItem = Object.assign({}, item);
		let newIndex = this.state.ryRollScreenDataIndex ++;

		newItem.index = newIndex;

		switch (newItem.type) {
			case 5:
				if (!newItem.url) {
					newItem.url = "http://www.rongyi.com";
				}
				break;
			default:
				break;
		}

		this.props.actions.addLayer(newItem);
		this.setFocusIndex(newIndex);
	}

	/**
	 * [getFocusIndex 获取图层索引]
	 * @return {[type]} [description]
	 */
	getFocusIndex() {
		return this.props.layers.findIndex((item) => {
			return item.index === this.props.focusData.focusDataIndex;
		});
	}

	render() {
		let { layers, scaleVal, focusData, actions } = this.props;
		return (
			<div className="pg-edit-box e-flex-fdc">
				<EditHeader></EditHeader>
				<div className="pg-body e-flex-box">
					<div className="pg-left scrollbar">
						<RyTitle config={{
							sTitle: '页面组件',
							sSubTitle: '点击或拖放来添加组件'
						}}>
						</RyTitle>
						<RyComponentList
							componmentList={this.state.componmentList}
							onDragEnd={this.dragEnd.bind(this)}
						/>
					</div>
					<div className="pg-center e-flex-box scrollbar">
						<RyPreviewWrapper
							classnames="preview-wrapper"
							actions={actions}
						//	data={layers}
							range={this.state.range}
							scaleVal={scaleVal}
							focusItem={focusData.focusItem}
						//	focusDataIndex={focusData.focusDataIndex}
						></RyPreviewWrapper>
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
								<div className="ui-btns">
									<a className="btn btn-danger">
										退出
									</a>
								</div>
							</div>
						</RyBorder>
						<Tabs defaultActiveKey="1" type="card">
							<TabPane tab="内容" key="1"><EditContent></EditContent></TabPane>
							<TabPane tab="样式" key="2">样式</TabPane>
							<TabPane tab="动画" key="3">动画</TabPane>
						</Tabs>
						{focusData.focusDataIndex >= 0 && (
							<div>
								<div className="ui-form">
									<RyComponentConfig
										mallId={this.state.mall_id}
										focusItem={focusData.focusItem}
										components={layers}
										focusIndex={focusData.focusDataIndex}
										scaleVal={scaleVal}
										range={this.state.range}
										actions={actions}
									></RyComponentConfig>
								</div>
							</div>
						)}
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
