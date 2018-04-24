/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:54:37+08:00
 */

import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './index.less';

class RyPreviewWeb extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.config.sSrc
        }
    }

  componentWillMount() {
  }

  componentDidMount() {
    $(this.iFrame).attr('src', this.props.config.sSrc);
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps) {
      if(nextProps.config.sSrc !== this.state.url) {
          this.state = {
              url: nextProps.config.sSrc
          }
          $(this.iFrame).attr('src', nextProps.config.sSrc);
      }
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
