/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-18T19:00:45+08:00
*/

'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as actions from 'actions';
import './index.less';

class TemplateListComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentDidMount() {
    }

    onClick() {
        hashHistory.push('/template/add');
    }

    render() {
        return (
            <div className="pg-template-list">
                <a onClick={this.onClick.bind(this)}>创建模板</a>
            </div>
        );
    }
}

TemplateListComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateListComponent)
