/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-19T14:29:30+08:00
 */

import React from 'react';
import $ from 'jquery';
import './index.less';

class RyTitle extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let { config } = this.props;
    return (
        <section className="ry-title">
            { config.sTitle !== '' && (
                <h3 className="ui-title" title={config.sTitle}>
                    {config.sTitle}
                </h3>
            )}
            { config.sSubTitle !== '' && (
                <p className="ui-desc">
                    {config.sSubTitle}
                </p>
            )}
            <div className="ui-btns"></div>
        </section>
    );
  }
}

export default RyTitle;
