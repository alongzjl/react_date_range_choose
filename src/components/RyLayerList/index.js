/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T09:46:25+08:00
 */

import React from 'react';
import $ from 'jquery';
import classnames from 'classnames';
import './index.less';

class RyLayerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reverseData: [],
            beforeVal: ''
        }
    }

    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

    componentWillReceiveProps(nextProps) {
        this.fnWatchConfig();
    }

    /**
   * [fnChange 坐标位置改变]
   * @param  {[type]} beforeIndex [之前的index]
   * @param  {[type]} toIndex     [改变后的index]
   * @return {[type]}             [description]
   */
    fnChange(beforeIndex, toIndex) {
        var len = this.state.reverseData.length - 1;

        this.props.config.fnChange(len - beforeIndex, len - toIndex);
    }

    /**
   * [fnClick 点击]
   * @param  {[type]} e     [事件源]
   * @param  {[type]} index [索引]
   * @return {[type]}       [description]
   */
    fnClick(e, index) {
        if ($(e.target).hasClass('ui-close')) {
            close(index);
        } else {
            this.click(this.state.reverseData[index].index);
        }
    }

    /**
   * [click 选中点击]
   * @param  {[type]} focusIndex [选中索引]
   * @return {[type]}            [description]
   */
    click(focusIndex) {
        this.props.config.fnSetFocusIndex(focusIndex);
    }
    /**
   * [close 关闭]
   * @param  {[type]} index [索引]
   * @return {[type]}       [description]
   */
    close(index) {
        this.props.config.fnRemoveItem(this.state.reverseData[index]);
    }

    /**
   * [addLayerName 添加图层名称]
   * @param {[type]} arr [数组]
   * @return {[type]} 返回数组
   */
    addLayerName(arr) {
        let source = $.extend(true, [], arr),
            typeMap = {
                10: '广告控件',
                9: '文字',
                8: '图片/视频',
                4: '天气/日期',
                5: '网页'
            },
            typeIndexMap = {},
            rtv = [];

        source.forEach(x => {
            if (!typeIndexMap[x.type]) {
                typeIndexMap[x.type] = 0;
            }
            typeIndexMap[x.type] += 1;

            x.layerName = typeMap[x.type] + typeIndexMap[x.type];
        });
        rtv = source.reverse();
        return rtv;
    }

    /**
   * [fnWatchConfig 监听config变化]
   * @param  {[type]} newVal [新值]
   * @return {[type]}        [description]
   */
    fnWatchConfig() {
        let {config} = this.props;
        var isEqual = config && this.state.beforeVal && this.state.beforeVal === config.aRollScreenData.map((item) => {
            return item.index;
        }).join(',');

        // console.log(newVal.aRollScreenData.length, isEqual);

        if (config && config.aRollScreenData && config.aRollScreenData.length && !isEqual) {
            this.state.reverseData = [];
            setTimeout(() => {
                this.state.beforeVal = config.aRollScreenData.map((item) => {
                    return item.index;
                }).join(',');
                this.state.reverseData = this.addLayerName(config.aRollScreenData);
                this.setState({
                    reverseData: this.state.reverseData
                })
            });
        }
    }

    render() {
        let {config} = this.props;
        let childNodes = this.state.reverseData.map((item, index) => {
            return (
                <div
                    key={index}
                    index={item.index}
                    className={
                        classnames(['ry-roll-screen-layer-item', item.index === config.iFocusDataIndex ? 'active' : ''])
                    }
                >
                    <div className="c-wraper">
                        <div className="c-thumbnail c-thumbnail-right c-thumbnail-5"></div>
                        <span>
                            {item.layerName}
                        </span>
                    </div>
                    <div className="ui-hidden">
                        <a className="ui-close"></a>
                    </div>
                </div>
            );
        })
        return (
            <div
                className="ui-layer-list ry-roll-screen-layer-list"
            >
                {childNodes}
            </div>
        );
    }
}

export default RyLayerList;
