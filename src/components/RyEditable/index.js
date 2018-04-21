/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T10:48:06+08:00
 */

import React from 'react';
import classnames from 'classnames';
import './index.less';

class RyEditable extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let { config } = this.props;
    return (
        <section
            className={
                classnames([
                    'ry-editable',
                    config.bMove ? 'ui-move' : '',
                    config.bFocus ? 'is-click' : '',
                    config.bMove || config.bResize || config.aEdit !== undefined && config.aEdit.length ? 'can-edit' : ''
                ])
            }
        >
            <div className="ui-content" style={{
                'width': config.iWidth,
                'height': config.iHeight,
                'transform': 'scale(' + config.fScaleVal + ')'
            }}>
                { this.props.children }
            </div>

            {config.bResize && config.bFocus && (
                <div className="ui-resizable ui-resizable-n"></div>
            )}
            {config.bResize && config.bFocus && (
                <div className="ui-resizable ui-resizable-e"></div>
            )}
            {config.bResize && config.bFocus && (
                <div className="ui-resizable ui-resizable-s"></div>
            )}
            {config.bResize && config.bFocus && (
                <div className="ui-resizable ui-resizable-w"></div>
            )}
            {config.bResize && config.bFocus && (
                <div className="ui-resizable ui-resizable-ne"></div>
            )}
            {config.bResize && config.bFocus && (
                <div className="ui-resizable ui-resizable-nw"></div>
            )}
            {config.bResize && config.bFocus && (
                <div className="ui-resizable ui-resizable-sw"></div>
            )}
            {config.bResize && config.bFocus && (
                <div className="ui-resizable ui-resizable-se"></div>
            )}
            {config.aEdit !== undefined && config.aEdit.length && config.bFocus && (
                <div className="ui-btns"></div>
            )}
        </section>

    );
  }
}

export default RyEditable;
