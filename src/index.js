/*
* @Author: Liao Hui
* @Date:   2018-04-13T18:13:16+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-18T19:44:00+08:00
*/

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { Router, Route, hashHistory, Redirect } from 'react-router';
import Template from './containers/template';
import TemplateList from './containers/template/list';
import TemplateAdd from './containers/template/add';
import TemplateEdit from './containers/template/edit';
import TemplatePageList from './containers/template/edit/pageList';
import TemplatePageEdit from './containers/template/edit/pageEdit';
import NoMatch from './containers/NoMatch';

import 'styles/common.less';
import 'styles/animate.less';

const store = createStore(reducer, applyMiddleware(thunk));

// Render the main component into the dom
ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Redirect from="/" to="template" />
            <Route path="template" component={Template}>
                <Route path="list" component={TemplateList} />
                <Route path="add" component={TemplateAdd} />
                <Route path="edit" component={TemplateEdit}>
                    <Route path="pageList/:resolution" component={TemplatePageList} />
                    <Route path="pageEdit/:resolution/:pageName" component={TemplatePageEdit} />
                </Route>
            </Route>
            <Route path="*" component={NoMatch}/>
        </Router>
    </Provider>
), document.getElementById('app'));
