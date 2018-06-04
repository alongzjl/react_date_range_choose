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
import { Router, Route, hashHistory } from 'react-router'

// require('public/RyWayFinding-1.2.3.min')

import Operate      from 'operate'
import OperateEdit  from 'operate/edit'
import Business     from 'business'
import BusinessEdit from 'business/edit'
import View from 'view'

import NoMatch     from './containers/NoMatch'

import 'styles/common.less'
import 'styles/animate.less'
import 'antd/dist/antd.less'

const store = createStore(
	reducer,
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render((
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="operate" component={Operate}>
				<Route path="edit" component={OperateEdit} />
			</Route>
			<Route path="business" component={Business}>
				<Route path="edit" component={BusinessEdit} />
			</Route>
			<Route path="view" component={View} />
			<Route path="*" component={NoMatch} />
		</Router>
	</Provider>
), document.getElementById('app'))
