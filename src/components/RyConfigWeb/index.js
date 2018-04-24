/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:39+08:00
 */

import React from 'react';
import $ from 'jquery';
import classnames from 'classnames';
import RyBorder from '../RyBorder';
import RyTitle from '../RyTitle';
import './index.less';

class RyConfigWeb extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  onChange(e) {
      let { focusItem, actions } = this.props;
      focusItem.url = e.target.value;
      actions.updateLayer(focusItem);
      actions.setFocusItem(focusItem);
  }

  render() {
    let { focusItem } = this.props;
    return (
        <section className="ry-roll-screen-config-web">
            <RyBorder>
                <RyTitle config={{sTitle: '网页链接'}}></RyTitle>
                <form className="form-inline ui-date-config">
                    <div className="form-group wp100">
                        <textarea className="form-control wp100" rows="3" value={focusItem.url} onChange={(e)=>{this.onChange(e)}} />
                    </div>
                </form>
            </RyBorder>
        </section>
    );
  }
}

export default RyConfigWeb;
