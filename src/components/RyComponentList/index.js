/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T14:11:17+08:00
 */

import React from 'react';
import $ from 'jquery';
import RyEditable from '../RyEditable';
import RyEditableBind from '../RyEditableBind';
import './index.less';

class RyComponentList extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let { componmentList, onDragEnd } = this.props;
    let childNodes = componmentList.map((item, index) => {
        return (
            <RyEditable
                key={index}
                className="ry-roll-screen-componment-list-item"
                config={{
                    bMove: true
                }}>
                <div className="ry-roll-screen-componment-list-item">
                    <div className="ui-drag-inactive-preview c-wraper">
                        <div className="c-thumbnail c-thumbnail-5"></div>{item.text}
                    </div>
                </div>
                {/* <div className="ui-drag-active-preview">释放鼠标添加组件</div> */}
            </RyEditable>
        );
    });
    return (
        <section className="ry-roll-screen-componment-list">
            <RyEditableBind config={{
                sRange: '.ry-roll-screen-preview',
                aData: componmentList,
                bClone: true,
                fnDragEnd: onDragEnd
            }}>
                {childNodes}
            </RyEditableBind>
        </section>
    );
  }
}

export default RyComponentList;
