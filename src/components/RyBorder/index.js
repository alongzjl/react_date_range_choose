/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T11:25:06+08:00
 */

import React from 'react';
import $ from 'jquery';
import classnames from 'classnames';
import './index.less';

class RyBorder extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    let { config } = this.props;
    return (
        <section className={
            classnames(['ry-border', config.bBg ? 'ui-bg' : ''])
        }>
            { this.props.children }
        </section>
    );
  }
}

export default RyBorder;
