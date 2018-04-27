/**
 * @Author: Liao Hui
 * @Date:   2018-04-19T10:15:40+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T18:03:10+08:00
 */

import React from 'react';
import $ from 'jquery';

class RyEditableBind extends React.Component {
	constructor(props) {
		super(props);
		if (!window.NAMESPACE_INDEX) {
			window.NAMESPACE_INDEX = 0;
		}
		window.NAMESPACE_INDEX += 1;

		this.state = {
			namespace: `.ryEditableBind${window.NAMESPACE_INDEX}`,
			beforePos: {},
			clickArea: '',
			minWidth: 30,
			minHeight: 26,
			boxMinWidth: -Infinity,
			boxMaxWidth: Infinity,
			boxMinHeight: -Infinity,
			boxMaxHeight: Infinity,
			isMouseDown: false,
			isCtrl: false,
			isCopy: false,
			isCopyed: false,
			isPaste: false,
			isClone: false,
			isFocus: false,
			checkRange: false,
			rangePos: null,
			$range: null,
			$clone: null,
			isRange: null
		}
	}

	componentWillMount() {}

	componentDidMount() {
		$(document)
			.on('mousedown' + this.state.namespace, this.fnMouseDown.bind(this))
			.on('mousemove' + this.state.namespace, this.fnMouseMove.bind(this))
			.on('mouseup' + this.state.namespace, this.fnMouseUp.bind(this))
			.on('keyup' + this.state.namespace, this.fnKeyUp.bind(this))
			.on('keydown' + this.state.namespace, this.fnKeyDown.bind(this))
	}

	componentWillUnmount() {
		$(document).off(this.state.namespace)
	}

	/**
   * [this.getRadio description]
   * @return {[type]} [description]
   */
	getRadio() {
		let item = this.state.beforePos.item;

		return this.props.config.bRadio
			? item.width / item.height
			: 0;
	}

	/**
   * [getRyEditable description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	getRyEditable(e) {
		var target = e.target,
			$target = $(target),
			inRange = $(this.element).find(target).length;

		if (!inRange) {
			return false;
		}

		if ($target.is('.ry-editable')) {
			return $target;
		}

		return $target.closest('.ry-editable');
	}
	/**
   * [fnMouseDown description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	fnMouseDown(e) {
		var target = e.target,
			$target = $(target),
			$ryEditable = this.getRyEditable(e),
			parentWidth = this.props.config.fParentWidth * this.props.config.fScaleVal,
			parentHeight = this.props.config.fParentHeight * this.props.config.fScaleVal;

		if ($ryEditable && !this.state.isMouseDown) {
			this.state.isMouseDown = true;
			this.state.isFocus = true;
			var index = $ryEditable.index();

			if (this.props.config && this.props.config.fnClick) {
				this.props.config.fnClick(index);
			}

			if (this.props.config && this.props.config.sRange) {
				this.state.$range = $(this.props.config.sRange);
				const rangeOffset = this.state.$range.offset();

				this.state.checkRange = true;

				this.state.rangePos = {
					minTop: rangeOffset.top,
					minLeft: rangeOffset.left,
					maxTop: rangeOffset.top + this.state.$range.height(),
					maxLeft: rangeOffset.left + this.state.$range.width()
				};
			}

			if (this.props.config && this.props.config.bClone) {
				e.preventDefault();
				const offset = $ryEditable.offset();
				this.state.$clone = $ryEditable.clone();
				this.state.isClone = true;
				this.state.$clone.width($ryEditable.outerWidth()).height($ryEditable.outerHeight()).css({margin: 0, position: 'absolute', top: offset.top, left: offset.left, zIndex: 9999}).addClass('disable').appendTo($('body'));

				this.state.beforePos = {
					$item: $ryEditable,
					index: index,
					item: this.props.config.aData[index],
					top: offset.top,
					left: offset.left,
					pageX: e.pageX,
					pageY: e.pageY,
					width: $ryEditable.outerWidth(),
					height: $ryEditable.outerHeight()
				};
			} else {
				this.state.beforePos = {
					$item: $ryEditable,
					index: index,
					item: this.props.config.aData[index],
					top: parseInt($ryEditable.css('top')),
					left: parseInt($ryEditable.css('left')),
					pageX: e.pageX,
					pageY: e.pageY,
					width: $ryEditable.outerWidth(),
					height: $ryEditable.outerHeight()
				};

				if ($target.hasClass('ui-resizable-se')) {
					this.state.clickArea = 'se';
					// 右下角
					this.state.boxMinWidth = Math.max(this.state.minWidth, ($ryEditable.find('.ui-btns').width() || 0) + 6);
					this.state.boxMaxWidth = parentWidth - this.state.beforePos.left;
					this.state.boxMinHeight = this.state.minHeight;
					this.state.boxMaxHeight = parentHeight - this.state.beforePos.top;
					let wh = this.getMaxWidthAndHeight(this.state.boxMaxWidth, this.state.boxMaxHeight);

					this.state.boxMaxWidth = wh.width;
					this.state.boxMaxHeight = wh.height;
				} else if ($target.hasClass('ui-resizable-sw')) {
					// 左下角
					this.state.clickArea = 'sw';
					this.state.boxMinWidth = Math.max(this.state.minWidth, ($ryEditable.find('.ui-btns').width() || 0) + 6);
					this.state.boxMaxWidth = this.state.beforePos.left + this.state.beforePos.item.layout.width;
					this.state.boxMinHeight = this.state.minHeight;
					this.state.boxMaxHeight = parentHeight - this.state.beforePos.top;

					let wh = this.getMaxWidthAndHeight(this.state.boxMaxWidth, this.state.boxMaxHeight);

					this.state.boxMaxWidth = wh.width;
					this.state.boxMaxHeight = wh.height;
				} else if ($target.hasClass('ui-resizable-nw')) {
					// 左上角
					this.state.clickArea = 'nw';
					this.state.boxMinWidth = Math.max(this.state.minWidth, ($ryEditable.find('.ui-btns').width() || 0) + 6);
					this.state.boxMaxWidth = this.state.beforePos.left + this.state.beforePos.item.layout.width;
					this.state.boxMinHeight = this.state.minHeight;
					this.state.boxMaxHeight = this.state.beforePos.top + this.state.beforePos.item.layout.height;

					let wh = this.getMaxWidthAndHeight(this.state.boxMaxWidth, this.state.boxMaxHeight);

					this.state.boxMaxWidth = wh.width;
					this.state.boxMaxHeight = wh.height;
				} else if ($target.hasClass('ui-resizable-ne')) {
					// 右上角
					this.state.clickArea = 'ne';
					this.state.boxMinWidth = Math.max(this.state.minWidth, ($ryEditable.find('.ui-btns').width() || 0) + 6);
					this.state.boxMaxWidth = parentWidth - this.state.beforePos.left; // this.state.beforePos.left + this.state.beforePos.item.layout.width;
					this.state.boxMinHeight = this.state.minHeight;
					this.state.boxMaxHeight = this.state.beforePos.top + this.state.beforePos.item.layout.height; // parentHeight - this.state.beforePos.top;

					let wh = this.getMaxWidthAndHeight(this.state.boxMaxWidth, this.state.boxMaxHeight);

					this.state.boxMaxWidth = wh.width;
					this.state.boxMaxHeight = wh.height;
				} else if ($target.hasClass('ui-resizable-w')) {
					this.state.clickArea = 'w';
					// 西方
					this.state.boxMinWidth = Math.max(this.state.minWidth, ($ryEditable.find('.ui-btns').width() || 0) + 6);
					this.state.boxMaxWidth = this.state.beforePos.left + this.state.beforePos.item.layout.width;

					// radio
					this.state.boxMinWidth = this.state.minWidth;
					this.state.boxMaxHeight = parentHeight - this.state.beforePos.top;

					let wh = this.getMaxWidthAndHeight(this.state.boxMaxWidth, this.state.boxMaxHeight);

					this.state.boxMaxWidth = wh.width;
					this.state.boxMaxHeight = wh.height;
				} else if ($target.hasClass('ui-resizable-s')) {
					this.state.clickArea = 's';
					// 南方
					this.state.boxMinHeight = this.state.minHeight;
					this.state.boxMaxHeight = parentHeight - this.state.beforePos.top; // parentHeight - this.state.beforePos.top;

					// radio
					this.state.boxMinWidth = this.state.minWidth;
					this.state.boxMaxWidth = parentWidth - this.state.beforePos.left;

					let wh = this.getMaxWidthAndHeight(this.state.boxMaxWidth, this.state.boxMaxHeight);

					this.state.boxMaxWidth = wh.width;
					this.state.boxMaxHeight = wh.height;
				} else if ($target.hasClass('ui-resizable-e')) {
					this.state.clickArea = 'e';
					// 东方
					this.state.boxMinWidth = Math.max(this.state.minWidth, ($ryEditable.find('.ui-btns').width() || 0) + 6);
					this.state.boxMaxWidth = parentWidth - this.state.beforePos.left;

					// radio
					this.state.boxMinHeight = this.state.minHeight;
					this.state.boxMaxHeight = parentHeight - this.state.beforePos.top;

					let wh = this.getMaxWidthAndHeight(this.state.boxMaxWidth, this.state.boxMaxHeight);

					this.state.boxMaxWidth = wh.width;
					this.state.boxMaxHeight = wh.height;
				} else if ($target.hasClass('ui-resizable-n')) {
					this.state.clickArea = 'n';
					// 北方
					this.state.boxMinHeight = this.state.minHeight;
					this.state.boxMaxHeight = this.state.beforePos.top + this.state.beforePos.item.layout.height;

					// radio
					this.state.boxMinWidth = this.state.minWidth;
					this.state.boxMaxWidth = parentWidth - this.state.beforePos.left;
					let wh = this.getMaxWidthAndHeight(this.state.boxMaxWidth, this.state.boxMaxHeight);

					this.state.boxMaxWidth = wh.width;
					this.state.boxMaxHeight = wh.height;
					// console.log(this.state.boxMaxWidth, this.state.boxMaxHeight);
				} else {
					this.state.clickArea = 'body';
				}
			}

			// console.log(this.state.beforePos);
		} else {
			this.state.isFocus = false;
		}
	}

	/**
   * [moveBody description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	moveBody(e) {
		// 拖拽
		e.preventDefault();
		this.setCss({
			top: this.getTop(e.pageY - this.state.beforePos.pageY + this.state.beforePos.top, 3),
			left: this.getLeft(e.pageX - this.state.beforePos.pageX + this.state.beforePos.left, 3)
		});
	}

	/**
   * [moveSE description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	moveSE(e) {
		// 右下角
		e.preventDefault();
		let newWidth = this.getWidth(e.pageX - this.state.beforePos.pageX + this.state.beforePos.item.layout.width, 2);
		let newHeight = this.getHeight(e.pageY - this.state.beforePos.pageY + this.state.beforePos.item.layout.height, 2);
		let wh = this.getWidthAndHeight(newWidth, newHeight, 2);
		console.clear()
		console.log(wh)
		debugger
		console.log(this.state.beforePos.item.layout.width)
		this.setCss({width: wh.width, height: wh.height});
	}

	/**
   * [moveS description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	moveS(e) {
		// 南方
		e.preventDefault();
		let fRadio = this.getRadio();
		let newHeight = this.getHeight(e.pageY - this.state.beforePos.pageY + this.state.beforePos.item.layout.height, 2);
		let newWidth = this.getWidth(
			fRadio
			? newHeight * fRadio
			: this.state.beforePos.item.layout.width,
		2);
		let wh = this.getWidthAndHeight(newWidth, newHeight, 2);

		this.setCss({width: wh.width, height: wh.height});
	}

	/**
   * [moveE description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	moveE(e) {
		// 东方
		e.preventDefault();
		let fRadio = this.getRadio();
		let newWidth = this.getWidth(e.pageX - this.state.beforePos.pageX + this.state.beforePos.item.layout.width, 2);
		let newHeight = this.getHeight(
			fRadio
			? newWidth / fRadio
			: this.state.beforePos.item.layout.height,
		2);
		let wh = this.getWidthAndHeight(newWidth, newHeight, 2);

		this.setCss({width: wh.width, height: wh.height});
	}

	/**
   * [moveNW description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	moveNW(e) {
		// 左上角
		e.preventDefault();
		let newWidth = this.getWidth(-(e.pageX - this.state.beforePos.pageX) + this.state.beforePos.item.layout.width);
		let newHeight = this.getHeight(-(e.pageY - this.state.beforePos.pageY) + this.state.beforePos.item.layout.height);
		let wh = this.getWidthAndHeight(newWidth, newHeight, 2);

		this.setCss({
			top: this.getTop(this.state.beforePos.top + this.state.beforePos.item.layout.height - wh.height, 1),
			left: this.getLeft(this.state.beforePos.left + this.state.beforePos.item.layout.width - wh.width, 1),
			width: wh.width,
			height: wh.height
		});
	}

	/**
   * [moveW description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	moveW(e) {
		// 西方
		e.preventDefault();

		let fRadio = this.getRadio();
		let newWidth = this.getWidth(-(e.pageX - this.state.beforePos.pageX) + this.state.beforePos.item.layout.width);
		let newHeight = this.getHeight(
			fRadio
			? newWidth / fRadio
			: this.state.beforePos.item.layout.height);
		let wh = this.getWidthAndHeight(newWidth, newHeight);

		this.setCss({
			width: wh.width,
			height: wh.height,
			left: this.getLeft(+ (e.pageX - this.state.beforePos.pageX) + this.state.beforePos.left, 1)
		});
	}

	/**
   * [moveN description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	moveN(e) {
		// 北方
		e.preventDefault();
		let fRadio = this.getRadio();
		let newHeight = this.getHeight(-(e.pageY - this.state.beforePos.pageY) + this.state.beforePos.item.layout.height);
		let newWidth = this.getWidth(
			fRadio
			? newHeight * fRadio
			: this.state.beforePos.item.layout.width);
		let wh = this.getWidthAndHeight(newWidth, newHeight, 2);

		this.setCss({
			top: this.getTop(this.state.beforePos.top + this.state.beforePos.item.layout.height - wh.height, 1),
			width: wh.width,
			height: wh.height
		});
	}

	/**
   * [moveSW description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	moveSW(e) {
		// 左下角
		e.preventDefault();
		let newWidth = this.getWidth(-(e.pageX - this.state.beforePos.pageX) + this.state.beforePos.item.layout.width);
		let newHeight = this.getHeight(e.pageY - this.state.beforePos.pageY + this.state.beforePos.item.layout.height, 2);
		let wh = this.getWidthAndHeight(newWidth, newHeight, 2);

		this.setCss({
			// top: +(e.pageY - this.state.beforePos.pageY) + this.state.beforePos.top,
			left: this.getLeft(this.state.beforePos.left + this.state.beforePos.item.layout.width - wh.width, 1),
			width: wh.width,
			height: wh.height
		});
	}

	/**
   * [moveNE description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	moveNE(e) {
		// 右上角
		e.preventDefault();
		let newWidth = this.getWidth(e.pageX - this.state.beforePos.pageX + this.state.beforePos.item.layout.width, 2);
		let newHeight = this.getHeight(-(e.pageY - this.state.beforePos.pageY) + this.state.beforePos.item.layout.height);
		let wh = this.getWidthAndHeight(newWidth, newHeight, 2);

		this.setCss({
			top: this.getTop(this.state.beforePos.top + this.state.beforePos.item.layout.height - wh.height, 1),
			// left: e.pageX - this.state.beforePos.pageX + this.state.beforePos.left,
			width: wh.width,
			height: wh.height
		});
	}

	/**
   * [fnCopy description]
   * @return {[type]} [description]
   */
	fnCopy(isCtrlV) {
		if (this.state.isCtrl && !this.state.isCopyed) {
			this.state.isCopyed = true;
			this.state.isPaste = true;
			if (this.props.config && this.props.config.fnCopy) {
				this.props.config.fnCopy(this.state.beforePos.index, isCtrlV);
			}
		}
	}

	/**
   * [moveClone description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	moveClone(e) {
		const newTop = e.pageY - this.state.beforePos.pageY + this.state.beforePos.top;
		const newLeft = e.pageX - this.state.beforePos.pageX + this.state.beforePos.left;

		this.state.$clone.css({top: newTop, left: newLeft});

		if (this.state.checkRange) {
			if (newTop >= this.state.rangePos.minTop && newTop <= this.state.rangePos.maxTop && newLeft >= this.state.rangePos.minLeft && newLeft <= this.state.rangePos.maxLeft) {
				this.state.isRange = true;
				if (this.state.isClone) {
					this.state.$clone.removeClass('disable').addClass('active');
				} else {
					this.state.beforePos.$item.removeClass('disable').addClass('active');
				}
			} else {
				this.state.isRange = false;
				if (this.state.isClone) {
					this.state.$clone.removeClass('active').addClass('disable');
				} else {
					this.state.beforePos.$item.removeClass('active').addClass('disable');
				}
			}
		}
	}

	/**
   * [moveSelf description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	moveSelf(e) {
		if (this.state.isCtrl) {
			this.fnCopy();
		}
		if (this.state.clickArea === 'body' && this.state.beforePos.item.layout.move) {
			this.moveBody(e);
		} else if (this.state.clickArea === 'se' && this.state.beforePos.item.layout.resize) {
			this.moveSE(e);
		} else if (this.state.clickArea === 's' && this.state.beforePos.item.layout.resize) {
			this.moveS(e);
		} else if (this.state.clickArea === 'e' && this.state.beforePos.item.layout.resize) {
			this.moveE(e);
		} else if (this.state.clickArea === 'nw' && this.state.beforePos.item.layout.resize) {
			this.moveNW(e);
		} else if (this.state.clickArea === 'w' && this.state.beforePos.item.layout.resize) {
			this.moveW(e);
		} else if (this.state.clickArea === 'n' && this.state.beforePos.item.layout.resize) {
			this.moveN(e);
		} else if (this.state.clickArea === 'sw' && this.state.beforePos.item.layout.resize) {
			this.moveSW(e);
		} else if (this.state.clickArea === 'ne' && this.state.beforePos.item.layout.resize) {
			this.moveNE(e);
		}
	}
	/**
   * [fnMouseMove description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	fnMouseMove(e) {
		if (this.state.isMouseDown) {
			if (this.state.isClone) {
				this.moveClone(e);
			} else {
				this.moveSelf(e);
			}
		}
	}

	/**
   * [fnMouseUp description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	fnMouseUp(e) {
		if (this.state.isMouseDown) {
			this.state.isMouseDown = false;

			if (this.props.config.oDockConfig && this.props.config.fnChangeDock) {
				this.props.config.fnChangeDock('v', false);
				this.props.config.fnChangeDock('h', false);
			}

			if (this.state.isClone) {
				if (this.state.checkRange && this.state.isRange) {
					this.state.$clone.remove();
					this.state.isRange = false;
					const newTop = e.pageY - this.state.beforePos.pageY + this.state.beforePos.top;
					const newLeft = e.pageX - this.state.beforePos.pageX + this.state.beforePos.left;

					if (this.props.config && this.props.config.fnDragEnd) {
						this.props.config.fnDragEnd(this.state.beforePos.index, {
							top: newTop - this.state.rangePos.minTop,
							left: newLeft - this.state.rangePos.minLeft
						});
					}

				} else if (e.pageY === this.state.beforePos.pageY && e.pageX === this.state.beforePos.pageX) {
					this.state.$clone.remove();
					if (this.props.config && this.props.config.fnDragEnd) {
						this.props.config.fnDragEnd(this.state.beforePos.index, {
							top: 0,
							left: 0
						});
					}
				} else {
					this.state.$clone.animate({
						top: this.state.beforePos.top,
						left: this.state.beforePos.left
					}, 300, () => {
						this.state.$clone.remove();
					});
				}
			}
		}
	}

	/**
   * [fnKeyUp description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
	fnKeyUp(e) {
		this.state.isCtrl = e.ctrlKey || e.metaKey;
		this.state.isCopyed = false;
	}

	/**
   * [fnKeyDown 键盘按下]
   * @param  {[type]} e [事件源]
   * @return {[type]}   [description]
   */
	fnKeyDown(e) {
		this.state.isCtrl = e.ctrlKey || e.metaKey;

		if (this.state.isFocus && this.props.config.bTextEdit !== true) {
			let newFocusItem = {};
			var maxWidth = this.props.config.fParentWidth * this.props.config.fScaleVal - this.state.beforePos.$item.width(),
				maxHeight = this.props.config.fParentHeight * this.props.config.fScaleVal - this.state.beforePos.$item.height();

			switch (e.keyCode) {
				case 38:
					e.preventDefault();
					newFocusItem.top = this.getMinMax((this.state.beforePos.item.top - 1) * this.props.config.fScaleVal, 0, maxHeight);
					break; // 上
				case 40:
					e.preventDefault();
					newFocusItem.top = this.getMinMax((this.state.beforePos.item.top + 1) * this.props.config.fScaleVal, 0, maxHeight);
					break; // 下
				case 37:
					e.preventDefault();
					newFocusItem.left = this.getMinMax((this.state.beforePos.item.left - 1) * this.props.config.fScaleVal, 0, maxWidth);
					break; // 左
				case 39:
					e.preventDefault();
					newFocusItem.left = this.getMinMax((this.state.beforePos.item.left + 1) * this.props.config.fScaleVal, 0, maxWidth);
					break; // 右
				case 46: // delete
				case 8: // backspace
					if (this.state.beforePos.item.edit && this.state.beforePos.item.edit[0] && this.state.beforePos.item.edit[0].onClick) {
						this.state.beforePos.item.edit[0].onClick();
					}
					break;
				case 67: // c
					if (this.state.isCtrl) {
						this.state.isCopy = true;
					}
					break;
				case 86:
					if (this.state.isCopy) {
						this.fnCopy(true);
					}
					break;
			}
			this.setCss(newFocusItem);
		}
	}

	/**
   * [setCss 整体控制样式、调用父的fnDragMove]
   * @param {[type]} css [样式]
   * @returns {[type]}   [description]
   */
	setCss(css) {
		if (this.props.config && this.props.config.fnDragMove) {
			this.props.config.fnDragMove(this.state.beforePos.index, css, this.state.isCtrl && this.state.isPaste);
		}
	}

	/**
   * [rangeBetween 比较区域范围]
   * @param  {[type]} val    [开始值]
   * @param  {[type]} center [中心值]
   * @param  {Number} buffer [缓存区域]
   * @return {[type]}        [description]
   */
	rangeBetween(val, center, buffer = 0) {
		return val >= center - buffer && val <= center + buffer;
	}

	/**
   * [getTop 获取Top]
   * @param  {[type]} top    [顶部]
   * @param  {[type]} pos    [位置]
   * @return {[type]}        [description]
   */
	getTop(top, pos) {
		var parentHeight = this.props.config.fParentHeight * this.props.config.fScaleVal,
			trueTop = top / this.props.config.fScaleVal,
			height = this.state.beforePos.$item.height(),
			trueCenter = (top + height / 2) / this.props.config.fScaleVal,
			trueBottom = (top + height) / this.props.config.fScaleVal,
			range = 20,
			dockedTop;

		if (pos) {
			top = this.getMinMax(top, 0, parentHeight - height);

			for (var i = 0, len = this.props.config.aData.length; i < len; i++) {
				let item = this.props.config.aData[i];
				if (item.index !== this.props.config.iFocusDataIndex) {
					if (this.rangeBetween(trueCenter, item.top + item.height / 2, range)) {
						dockedTop = (item.top + item.height / 2) * this.props.config.fScaleVal;

						top = dockedTop - height / 2;
						// console.log('自己top-center和别人top-center感应成功');
						break;
					}

					if (pos === 1 || pos === 3) {
						if (this.rangeBetween(trueTop, item.top, range)) {
							top = item.top * this.props.config.fScaleVal;
							dockedTop = top;
							// console.log('自己top和别人top感应成功');
							break;
						} else if (this.rangeBetween(trueTop, item.top + item.height, range)) {
							top = (item.top + item.height) * this.props.config.fScaleVal;
							dockedTop = top;
							// console.log('自己top和别人bottom感应成功');
							break;
						} else if (this.rangeBetween(trueTop, item.top + item.height / 2, range)) {
							top = (item.top + item.height / 2) * this.props.config.fScaleVal;
							dockedTop = top;
							// console.log('自己top和别人center感应成功');
							break;
						}
					}
					if (pos === 2 || pos === 3) {
						if (this.rangeBetween(trueBottom, item.top, range)) {
							top = item.top * this.props.config.fScaleVal - height;
							dockedTop = top + height;
							// console.log('自己bottom和别人top感应成功');
							break;
						} else if (this.rangeBetween(trueBottom, item.top + item.height, range)) {
							top = (item.top + item.height) * this.props.config.fScaleVal - height;
							dockedTop = top + height;
							// console.log('自己bottom和别人bottom感应成功');
							break;
						} else if (this.rangeBetween(trueBottom, item.top + item.height / 2, range)) {
							top = (item.top + item.height / 2) * this.props.config.fScaleVal - height;
							dockedTop = top + height;
							// console.log('自己bottom和别人center感应成功');
							break;
						}
					}
				}
			}

			if (this.props.config && this.props.config.oDockConfig && this.props.config.fnChangeDock) {
				if (dockedTop !== undefined) {
					this.props.config.fnChangeDock('h', true);
					this.props.config.fnChangeDock('top', dockedTop);
				} else {
					this.props.config.fnChangeDock('h', false);
				}
			}
		}

		return this.getMinMax(top, 0, parentHeight - height);
	}

	/**
   * [getLeft 获取Left]
   * @param  {[type]} left  [左侧]
   * @param  {[type]} pos   [位置]
   * @return {[type]}       [description]
   */
	getLeft(left, pos) {
		var parentWidth = this.props.config.fParentWidth * this.props.config.fScaleVal,
			trueLeft = left / this.props.config.fScaleVal,
			width = this.state.beforePos.$item.width(),
			trueCenter = (left + width / 2) / this.props.config.fScaleVal,
			trueRight = (left + width) / this.props.config.fScaleVal,
			range = 20,
			dockedLeft;

		if (pos) {
			left = this.getMinMax(left, 0, parentWidth - width);

			for (var i = 0, len = this.props.config.aData.length; i < len; i++) {
				let item = this.props.config.aData[i];
				if (item.index !== this.props.config.iFocusDataIndex) {
					if (this.rangeBetween(trueCenter, item.left + item.width / 2, range)) {
						dockedLeft = (item.left + item.width / 2) * this.props.config.fScaleVal;
						left = dockedLeft - width / 2;
						// console.log('自己left-center和别人left-center感应成功');
						break;
					}

					if (pos === 1 || pos === 3) {
						if (this.rangeBetween(trueLeft, item.left, range)) {
							left = item.left * this.props.config.fScaleVal;
							dockedLeft = left;
							// console.log('自己left和别人left感应成功');
							break;
						} else if (this.rangeBetween(trueLeft, item.left + item.width, range)) {
							left = (item.left + item.width) * this.props.config.fScaleVal;
							dockedLeft = left;
							// console.log('自己left和别人right感应成功');
							break;
						} else if (this.rangeBetween(trueLeft, item.left + item.width / 2, range)) {
							left = (item.left + item.width / 2) * this.props.config.fScaleVal;
							dockedLeft = left;
							// console.log('自己left和别人center感应成功');
							break;
						}
					}
					if (pos === 2 || pos === 3) {
						if (this.rangeBetween(trueRight, item.left, range)) {
							left = item.left * this.props.config.fScaleVal - width;
							dockedLeft = left + width;
							// console.log('自己right和别人left感应成功');
							break;
						} else if (this.rangeBetween(trueRight, item.left + item.width, range)) {
							left = (item.left + item.width) * this.props.config.fScaleVal - width;
							dockedLeft = left + width;
							// console.log('自己right和别人right感应成功');
							break;
						} else if (this.rangeBetween(trueRight, item.left + item.width / 2, range)) {
							left = (item.left + item.width / 2) * this.props.config.fScaleVal - width;
							dockedLeft = left + width;
							// console.log('自己right和别人center感应成功');
							break;
						}
					}
				}
			}

			if (this.props.config && this.props.config.oDockConfig && this.props.config.fnChangeDock) {
				if (dockedLeft != undefined) {
					this.props.config.fnChangeDock('v', true);
					this.props.config.fnChangeDock('left', dockedLeft);
				} else {
					this.props.config.fnChangeDock('v', false);
				}
			}
		}

		return this.getMinMax(left, 0, parentWidth - width);
	}

	/**
   * [getMaxWidthAndHeight 获取最大宽高]
   * @param  {[type]} maxWidth  [最大宽度]
   * @param  {[type]} maxHeight [最大高度]
   * @return {[type]}           [description]
   */
	getMaxWidthAndHeight(maxWidth, maxHeight) {

		if (this.props.config.fRadio) {
			var maxWidthRadioMaxHeight = maxWidth / maxHeight;

			if (maxWidthRadioMaxHeight > this.props.config.fRadio) {
				// 高度是准确的 再得到宽度
				maxWidth = this.state.boxMaxHeight * this.props.config.fRadio;
			} else {
				// 宽度是准确的 再得到最大高度
				maxHeight = this.state.boxMaxWidth / this.props.config.fRadio;
			}
		}

		return {width: maxWidth, height: maxHeight};
	}

	/**
   * [getWidthAndHeight 获得区域宽高]
   * @param  {[type]} newWidth  [新的宽度]
   * @param  {[type]} newHeight [新的高度]
   * @param  {[type]} pos       [位置]
   * @return {[type]}           [description]
   */
	getWidthAndHeight(newWidth, newHeight, pos) {
		let fRadio = this.getRadio();

		if (fRadio) {
			var newWidthBitHeight = newWidth / newHeight;

			if (fRadio > newWidthBitHeight) {
				newWidth = newHeight * fRadio;
				if (pos === 2) {
					// 计算智能感应的距离
					newWidth = this.getWidth(newWidth);
					// 按比率重新得边距
					newHeight = newWidth / fRadio;
				}
			} else {
				newHeight = newWidth / fRadio;
				if (pos === 2) {
					// 计算智能感应的距离
					newHeight = this.getHeight(newHeight);
					// 按比率重新得边距
					newWidth = newHeight * fRadio;
				}
			}
		}

		return {width: newWidth, height: newHeight};
	}

	/**
   * [getWidth 获取Width]
   * @param  {[type]} width    [宽度]
   * @param  {[type]} pos      [位置]
   * @return {[type]}          [description]
   */
	getWidth(width, pos) {
		var focusObj  = this.props.config.aData.filter(item => item)[0],
			trueLeft  = focusObj.layout.left,
			trueRight = trueLeft + width / this.props.config.fScaleVal,
			range = 20,
			dockedLeft

		if (pos) {
			width = this.getMinMax(width, this.state.boxMinWidth, this.state.boxMaxWidth);

			for (var i = 0, len = this.props.config.aData.length; i < len; i++) {
				let item = this.props.config.aData[i]
				if (item.index !== this.props.config.iFocusDataIndex) {
					if (pos === 2) {
						if (trueRight >= item.left - range && trueRight <= item.left + range) {
							width = (item.left - trueLeft) * this.props.config.fScaleVal
							dockedLeft = item.left * this.props.config.fScaleVal
							// console.log('自己right和别人left感应成功')
							break
						} else if (trueRight >= item.left + item.width - range && trueRight <= item.left + item.width + range) {
							width = (item.left + item.width - trueLeft) * this.props.config.fScaleVal
							dockedLeft = (item.left + item.width) * this.props.config.fScaleVal
							// console.log('自己right和别人right感应成功')
							break
						}
					}
				}
			}

			if (this.props.config && this.props.config.oDockConfig && this.props.config.fnChangeDock) {
				if (dockedLeft != undefined) {
					this.props.config.fnChangeDock('v', true)
					this.props.config.fnChangeDock('left', dockedLeft)
				} else {
					this.props.config.fnChangeDock('v', false)
				}
			}
		}

		return this.getMinMax(width, this.state.boxMinWidth, this.state.boxMaxWidth)
	}

	/**
   * [getHeight 获取Height]
   * @param  {[type]} height   [高度]
   * @param  {[type]} pos      [位置]
   * @return {[type]}          [description]
   */
	getHeight(height, pos) {
		var focusObj = this.props.config.aData.filter((item) => {
				return item.index === this.props.config.iFocusDataIndex;
			})[0],
			trueTop = focusObj.top,
			trueBottom = trueTop + height / this.props.config.fScaleVal,
			range = 20,
			dockedTop

		if (pos) {
			height = this.getMinMax(height, this.state.boxMinHeight, this.state.boxMaxHeight)

			for (var i = 0, len = this.props.config.aData.length; i < len; i++) {
				let item = this.props.config.aData[i]
				if (item.index !== this.props.config.iFocusDataIndex) {
					if (pos === 2) {
						if (trueBottom >= item.top - range && trueBottom <= item.top + range) {
							height = (item.top - trueTop) * this.props.config.fScaleVal
							dockedTop = item.top * this.props.config.fScaleVal
							// console.log('自己right和别人left感应成功')
							break
						} else if (trueBottom >= item.top + item.height - range && trueBottom <= item.top + item.height + range) {
							height = (item.top + item.height - trueTop) * this.props.config.fScaleVal
							dockedTop = (item.top + item.height) * this.props.config.fScaleVal
							// console.log('自己right和别人right感应成功')
							break
						}
					}
				}
			}

			if (this.props.config && this.props.config.oDockConfig && this.props.config.fnChangeDock) {
				if (dockedTop !== undefined) {
					this.props.config.fnChangeDock('h', true)
					this.props.config.fnChangeDock('top', dockedTop)
				} else {
					this.props.config.fnChangeDock('h', false)
				}
			}
		}

		return this.getMinMax(height, this.state.boxMinHeight, this.state.boxMaxHeight)
	}

	/**
   * [getMinMax 最大最小值比较]
   * @param  {[type]} val [值]
   * @param  {[type]} min [最小值]
   * @param  {[type]} max [最大值]
   * @return {[type]}     [description]
   */
	getMinMax(val, min, max) {
		return Math.min(Math.max(min, val), max)
	}

	render() {
		let {config} = this.props
		return (
			<div className="ry-editable-bind" ref={(instance) => {
				this.element = instance
			}}>
				{this.props.children}
			</div>
		)
	}
}

export default RyEditableBind
