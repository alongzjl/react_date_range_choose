/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T18:21:51+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-23T14:49:10+08:00
 */

import React from 'react';
import $ from 'jquery';
import classnames from 'classnames';
import RyBorder from '../RyBorder';
import RyTitle from '../RyTitle';
import TextInputComponent from 'public/TextInput';
import './index.less';

class RyConfigPosition extends React.Component {
    componentWillMount() {}

    componentDidMount() {}

    componentWillUnmount() {}

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
        let { range } = this.props;
        return (
            <section className="ry-roll-screen-config-position">
                <RyBorder>
                    <RyTitle config={{sTitle: '位置'}}>
                    </RyTitle>
                    <ul className="ui-form-ul clearfix">
                        <li className="ui-form-li is-half">
                            <label className="ui-form-lbl">上</label>
                            <TextInputComponent text={range.styleTop} onInput={()=>{this.changeStyle('top')}} />
                        </li>
                        <li className="ui-form-li is-half">
                            <label className="ui-form-lbl">左</label>
                            <TextInputComponent text={range.styleLeft} onInput={()=>{this.changeStyle('left')}} />
                        </li>
                    </ul>
                    <RyTitle config={{sTitle: '尺寸'}}>
                    </RyTitle>
                    <ul className="ui-form-ul clearfix">
                        <li className="ui-form-li is-half">
                            <label className="ui-form-lbl">宽度</label>
                            <TextInputComponent text={range.styleWidth} onInput={()=>{this.changeStyle('width')}} />
                        </li>
                        <li className="ui-form-li is-half">
                            <label className="ui-form-lbl">高度</label>
                            <TextInputComponent text={range.styleHeight} onInput={()=>{this.changeStyle('height')}} />
                        </li>
                        <li style={{clear: 'both'}}>
                            <label className="ui-form-lbl">&nbsp;</label>
                            <input type="checkbox" onChange={this.changeRadio.bind(this)} value={ range.radio } />
                            <span className="ui-radio">限制拉伸比例</span>
                        </li>
                    </ul>
                </RyBorder>
            </section>
        );
    }
}

export default RyConfigPosition;
