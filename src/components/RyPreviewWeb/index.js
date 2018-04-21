/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T16:03:17+08:00
 */

import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './index.less';

class RyPreviewWeb extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
    $(this.iFrame).attr('src', this.props.config.sSrc);
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="ry-preview-web">
        <iframe title="web" ref={(instance) => { this.iFrame = instance; }} className="ui-iframe" />
        <div className="ui-mask"></div>
      </div>
    );
  }
}

export default RyPreviewWeb;
