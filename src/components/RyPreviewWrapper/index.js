/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T13:13:00+08:00
 */

import React from 'react';
import $ from 'jquery';
import classnames from 'classnames';
import RyEditable from '../RyEditable';
import RyEditableBind from '../RyEditableBind';
import RyPreviewWeb from '../RyPreviewWeb';
import RyPreview from '../RyPreview';
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
        this.state.this.state.dockConfig[key] = val;
    }

    /**
       * [changeWeb 改变web网址]
       * @param  {[type]} index [索引]
       * @return {[type]}       [description]
       */
    changeWeb(index) {
        return function(url) {
            this.props.data[index].detailMap.url = url;
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
        this.state.distance = 10;
        setFocusIndexUtil(index, this.state);
        this.setRangeStyle(this.props.focusItem);
    }

    /**
       * [changeCss 内部拖拽，得到样式]
       * @param  {[type]}  realIndex [真实索引]
       * @param  {[type]}  css       [样式]
       * @param  {Boolean} isPause   [是否暂停]
       * @return {[type]}            [description]
       */
    changeCss(realIndex, css, isPause) {
        if (isPause) {
            // console.log('isPause');
            realIndex = this.props.data.findIndex((item) => {
                return item.index === this.props.focusItem.index;
            });
        }

        //  console.log(oldIndex, realIndex);

        $.each(css, (k, v) => {
            let val = v / this.props.scaleVal;
            if (k === 'top') {
                let minTop = 0;
                val = Math.max(minTop, val);
            }
            css[k] = val;
        });

        // $applyAsync(() => {
        //     RollScreenUtil.changeStickerCss(this.props.focusItem, css.width, css.height);
        // });
        $.extend(this.props.data[realIndex], css);
        this.setRangeStyle(this.props.data[realIndex]);
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
        let childNodes = this.props.data.map((item, index) => {
            return (
                <RyEditable
                    key={index}
                    config={{
                        bMove: item.move,
                        bResize: !item.detailMap.baseMap,
                        aEdit: item.edit,
                        fScaleVal: this.props.scaleVal,
                        bFocus: this.props.focusDataIndex === item.index,
                        iWidth: item.width,
                        iHeight: item.height
                    }}
                    style={{
                        'position': 'absolute',
                        'width': item.width * this.props.scaleVal,
                        'height': item.height * this.props.scaleVal,
                        'top': item.top * this.props.scaleVal,
                        'left': item.left * this.props.scaleVal
                    }}
                >
                    <RyPreviewWeb className={
                        classnames([this.props.focusDataIndex === index ? 'preview-weather' : ''])
                    } config={{
                        sSrc: item.detailMap.url,
                        fnChangeTextEdit: this.changeTextEdit,
                        fnChangeWeb: this.changeWeb(index)
                    }}>
                    </RyPreviewWeb>
                </RyEditable>
            );
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
                        fnClick: this.clickItem,
                        fScaleVal: this.props.scaleVal,
                        fParentWidth: this.props.range.width,
                        fParentHeight: this.props.range.height,
                        bRadio: this.props.range.radio,
                        fnDragMove: this.changeCss,
                        aData: this.props.data,
                        iFocusDataIndex: this.props.focusDataIndex,
                        oDockConfig: this.state.dockConfig,
                        fnChangeDock: this.changeDock,
                        bTextEdit: this.state.textEdit
                    }}>
                        {childNodes}
                    </RyEditableBind>
                </RyPreview>
            </section>
        );
    }
}

export default RyPreviewWrapper;
