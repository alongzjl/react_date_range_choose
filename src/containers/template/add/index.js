/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-18T19:15:01+08:00
*/

'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as actions from 'actions';
import TextInputComponent from 'public/TextInput';
import './index.less';

class TemplateAddComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resolution: '1080*1920'
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    onInput(resolution) {
        this.setState({
            resolution
        });
    }

    onClick() {
        hashHistory.push(`/template/edit/pageList/${this.state.resolution}`)
    }

    render() {
        return (
            <div className="pg-template-add">
                设置分辨率:
                <TextInputComponent text={this.state.resolution} onInput={this.onInput.bind(this)} />
                <a onClick={this.onClick.bind(this)} >创建</a>
            </div>
        );
    }
}

TemplateAddComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateAddComponent)
