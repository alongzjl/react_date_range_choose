/*
* @Author: liaohui
* @Date:   2017-06-26 17:06:16
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-18T19:49:11+08:00
*/

'use strict';

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as actions from 'actions';
import './index.less';

class TemplateListPageListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [
                {enName: 'home', cnName: '首页'}
            ]
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }

    editPage(route) {
        let { params } = this.props;
        hashHistory.push(`/template/edit/pageEdit/${params.resolution}/${route}`);
    }

    render() {
        let childNodes = this.state.pages.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.cnName}</td>
                    <td>
                        <a onClick={() => { this.editPage(item.enName); }} > 编辑 </a>
                    </td>
                </tr>
            )
        });
        return (
            <div className="pg-template-edit-page-list">
                <table>
                    <thead>
                        <tr>
                            <th>页面名称</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {childNodes}
                    </tbody>
                </table>
            </div>
        );
    }
}

TemplateListPageListComponent.defaultProps = {
};

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateListPageListComponent)
