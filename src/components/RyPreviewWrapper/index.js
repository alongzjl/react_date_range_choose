/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T17:39:44+08:00
 */

import React from 'react';
import $ from 'jquery';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import classnames from 'classnames';
import RyEditable from '../RyEditable';
import RyEditableBind from '../RyEditableBind';
import RyPreviewWeb from '../RyPreviewWeb';
import RyPreview from '../RyPreview';

import * as actions from 'actions'

import { setFocusIndexUtil, setRangeStyleUtil } from 'services';
import './index.less';

class RyPreviewWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dockConfig: {},
			textEdit: false,
			alignLeftMap: {
				1: 'left',
				2: 'center',
				3: 'right'
			},
			distance: 10
		}
	}

	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	/**
	   * [changeDock 改变dockConfig]
	   * @param  {[type]} key      [键]
	   * @param  {[type]} val      [值]
	   * @return {[type]}          [description]
	   */
	changeDock(key, val) {
		this.state.dockConfig[key] = val;
		this.setState({
			dockConfig: this.state.dockConfig
		});
	}

	/**
	   * [changeWeb 改变web网址]
	   * @param  {[type]} index [索引]
	   * @return {[type]}       [description]
	   */
	changeWeb(index) {
		return function(url) {
			this.props.data[index].url = url;
		};
	}

	/**
	   * [scale 得到缩放级别]
	   * @param  {[type]} scale [缩放值]
	   * @return {[type]}       [description]
	   */
	scale(scale) {
		this.props.actions.setScaleVal(scale);
	}

	/**
	   * [clickItem 选中可拖拽区域]
	   * @param  {[type]} realIndex [真实索引]
	   * @return {[type]}           [description]
	   */
	clickItem(realIndex) {
		let index = this.props.data[realIndex].index;
		this.setFocusIndex(index);
	}

	/**
	   * [setFocusIndex 选中图层]
	   * @param {[type]} index [索引]
	   * @return {[type]}      [description]
	   */
	setFocusIndex(index) {
		let { data } = this.props;
		const realIndex = data.findIndex((item) => {
			return item.index === index;
		});
		const item = data[realIndex];

		if (!item) {
			this.props.actions.setFocusItemIndex(-1);
			return;
		}

		this.props.actions.setFocusItem(item);
		this.props.actions.setFocusItemIndex(index);
		// this.setRangeStyle(this.props.focusItem);
	}

	/**
	   * [changeCss 内部拖拽，得到样式]
	   * @param  {[type]}  realIndex [真实索引]
	   * @param  {[type]}  css       [样式]
	   * @param  {Boolean} isPause   [是否暂停]
	   * @return {[type]}            [description]
	   */
	changeCss(realIndex, css, isPause) {
		let { data, actions, scaleVal, focusItem } = this.props;
		if (isPause) {
			realIndex = data.findIndex((item) => {
				return item.index === focusItem.index;
			});
		}

		$.each(css, (k, v) => {
			let val = v / scaleVal;
			if (k === 'top') {
				let minTop = 0;
				val = Math.max(minTop, val);
			}
			css[k] = val;
		});
		$.extend(data[realIndex], css);
		actions.updateLayer(data[realIndex]);
	}

	/**
	   * [setRangeStyle 设置样式]
	   * @param {[type]} item [每项]
	   * @return {[type]}     [description]
	   */
	setRangeStyle(item) {
		setRangeStyleUtil(item, this.state);
	}

	render() {
		let { comp, scaleVal, focusItem } = this.props
		debugger
		let childNodes = comp.curData.page.elements.map((item, index) => {
			debugger
			let style = {
				position: 'absolute',
				width:    item.width  * scaleVal,
				height:   item.height * scaleVal,
				top:      item.top    * scaleVal,
				left:     item.left   * scaleVal,
			}
			return (
				<RyEditable
					key={index}
					config={{
						bMove:     item.move,
						bResize:   true,
						aEdit:     item.edit,
						fScaleVal: scaleVal,
						bFocus:    comp.curData.compIdx === item.index,
						iWidth:    item.width,
						iHeight:   item.height
					}}
					style={style}>
					<RyPreviewWeb className={
						classnames([comp.curData.compIdx === index ? 'preview-weather' : ''])
					} config={{
						sSrc: item.url,
						fnChangeTextEdit: this.changeTextEdit,
						fnChangeWeb: this.changeWeb(index)
					}}>
					</RyPreviewWeb>
				</RyEditable>
			)
		})
		return (
			<section className="ry-roll-screen-preview-wrapper">
				<RyPreview config={{
					width: this.props.range.width,
					height: this.props.range.height,
					scale: this.scale.bind(this)
				}}>
					{this.state.dockConfig.h && (
						<div className="inductionLine-h" style={{top: this.state.dockConfig.top}}></div>
					)}
					{this.state.dockConfig.h && (
						<div className="inductionLine-v" style={{left: this.state.dockConfig.left}}></div>
					)}
					<RyEditableBind config={{
						fnClick: this.clickItem.bind(this),
						fScaleVal: this.props.scaleVal,
						fParentWidth: this.props.range.width,
						fParentHeight: this.props.range.height,
						bRadio: this.props.range.radio,
						fnDragMove: this.changeCss.bind(this),
						aData: this.props.data,
						iFocusDataIndex: this.props.focusDataIndex,
						oDockConfig: this.state.dockConfig,
						fnChangeDock: this.changeDock.bind(this),
						bTextEdit: this.state.textEdit
					}}>
						{childNodes}
					</RyEditableBind>
				</RyPreview>
			</section>
		)
	}
}

RyPreviewWrapper.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RyPreviewWrapper)

