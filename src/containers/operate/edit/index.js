/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-18T19:29:53+08:00
*/

'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';
import './index.less';

class TemplateEditComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="pg-template-edit">
                { this.props.children }
            </div>
        );
    }
}

TemplateEditComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateEditComponent)
