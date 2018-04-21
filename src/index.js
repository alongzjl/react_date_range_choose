/*
* @Author: Liao Hui
* @Date:   2018-04-13T18:13:16+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-18T19:44:00+08:00
*/

import 'core-js/fn/object/assign'
import React        from 'react'
import ReactDOM     from 'react-dom'
import { Provider } from 'react-redux'
import thunk        from 'redux-thunk'
import reducer      from 'store/reducers'
import { createStore, applyMiddleware }         from 'redux'
import { Router, Route, hashHistory, Redirect } from 'react-router'

import operate         from 'operate'
import operateList     from 'operate/list'
import operateAdd      from 'operate/add'
import operateEdit     from 'operate/edit'
import operatePageList from 'operate/edit/pageList'
import operatePageEdit from 'operate/edit/pageEdit'

import NoMatch          from './containers/NoMatch'

import 'styles/common.less'
import 'styles/animate.less'
import 'antd/dist/antd.less'

const store = createStore(reducer, applyMiddleware(thunk))

// Render the main component into the dom
ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Redirect from="/" to="operate" />
            <Route path="operate" component={operate}>
                <Route path="list" component={operateList} />
                <Route path="add" component={operateAdd} />
                <Route path="edit" component={operateEdit}>
                    <Route path="pageList/:resolution" component={operatePageList} />
                    <Route path="pageEdit/:resolution/:pageName" component={operatePageEdit} />
                </Route>
            </Route>
            <Route path="*" component={NoMatch}/>
        </Router>
    </Provider>
), document.getElementById('app'))
