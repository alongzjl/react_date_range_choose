/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react';
import $ from 'jquery';
import classnames from 'classnames';
import RyConfigPosition from '../RyConfigPosition';
import RyConfigWeb from '../RyConfigWeb';
import './index.less';

class RyComponentConfig extends React.Component {
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

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
        return arr; // for testing purposes
    }

    /**
   * [getFocusIndex 获取图层索引]
   * @return {[type]} [description]
   */
    getFocusIndex() {
        return this.props.components.findIndex((item) => {
            return item.index === this.props.focusIndex;
        });
    }

    /**
   * [changeStyle 右边form改变，来改变图层信息]
   * @param  {[type]} type [类型]
   * @return {[type]}      [description]
   */
    changeStyle(type) {
        let focusIndex = this.getFocusIndex();
        const item = this.props.components[focusIndex];
        let rangeType = 'style' + type.replace(/^[a-z]/, function($0) {
            return $0.toUpperCase();
        });
        let formVal = this.props.range[rangeType];
        let newVal = formVal || 0;

        if (this.props.range.radio) {
            let radio = item.width / item.height;
            if (type === 'width') {
                item.height = newVal / radio;
                this.props.range.styleHeight = formVal / radio;
            } else if (type === 'height') {
                item.width = newVal * radio;
                this.props.range.styleWidth = formVal * radio;
            }
        }

        item[type] = newVal;
    }

    /**
   * [changeRadio 是否按比率]
   * @return {[type]} [description]
   */
    changeRadio() {
        let focusIndex = this.getFocusIndex();

        this.props.components[focusIndex].radio = this.props.range.radio;
    }

    render() {
        let { focusItem, components, focusIndex, range, actions } = this.props;
        return (
            <section className="ry-roll-screen-config">
                <RyConfigPosition
                    focusItem={focusItem}
                    components={components}
                    focusIndex={focusIndex}
                    range={range}
                    actions={actions}
                >
                </RyConfigPosition>
                <RyConfigWeb
                    focusItem={focusItem}
                    actions={actions}
                >
                </RyConfigWeb>
            </section>
        );
    }
}

export default RyComponentConfig;
