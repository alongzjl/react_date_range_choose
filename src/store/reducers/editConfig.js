/*
* @Author: Liao Hui
* @Date:   2017-04-10 17:50:56
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T13:06:11+08:00
*/

import * as types from '../constants'
import state from 'state'

const comp  = require('state/comp')
const pagec = require('state/page/content')

const initialState = state
export default function editConfig(state = initialState, action) {
	let curComp    = state.curComp,
		curData    = state.curData,
		curPage    = state.curPage,
		globalData = state.globalData,
		pageC      = state.pageContent,
		pageList   = state.pageList,
		router     = action.router,
		key        = action.key,
		groupIdx   = action.groupIdx,
		idx        = action.idx,
		data       = action.data,
		name       = action.name

	switch (action.type) {
		
		// 组件操作
		case types.ADD_COMP:
			var compData = JSON.parse(JSON.stringify(comp[action.key]))
			pageC[router].elements.push(compData)
			state.curPage = pageC[router]
			state.curComp = compData
			curData.compIdx     = state.curPage.elements.length - 1
			curData.contentType = 'comp'
			return Object.assign({}, state)


		case types.UPDATE_COMP:
			pageC[curData.router].elements[curData.compIdx] = data
			state.curPage   = pageC[curData.router]
			state.curComp   = data
			curData.compIdx = idx || curData.compIdx
			return Object.assign({}, state)


		case types.DELETE_COMP:
			pageC[curData.router].elements.splice(idx, 1)
			state.curPage = pageC[curData.router]
			state.curComp = {}
			curData.compIdx = -1
			return Object.assign({}, state)


		case types.SELECT_COMP:
			state.curComp       = data
			curData.contentType = 'comp'
			return Object.assign({}, state)


		// 页面操作
		case types.ADD_PAGE:
			var pageData = JSON.parse(JSON.stringify(pagec)),
				route    = `p_${++state.pageList.maxPageIdx}`
			pageData.router = route
			pageData.title  = name
			curData.router  = route
			curData.compIdx = -1
			curData.contentType = 'page'
			pageC[route]    = pageData
			state.curPage   = pageData
			state.curComp   = {}
			pageList.group[groupIdx].pages.push({
				router: route,
				title:  name
			})
			return Object.assign({}, state)
		

		case types.UPDATE_PAGE:
			var pgp = pageList.group[groupIdx].pages[idx]
			pgp.title = data.title
			pageC[data.router] = data
			state.curPage = data
			return Object.assign({}, state)
		

		case types.DELETE_PAGE:
			delete pageC[router]
			pageList.group[groupIdx].pages.splice(idx, 1)
			state.curPage  = {}
			state.curComp  = {}
			curData.router  = ''
			curData.compIdx = -1
			curData.contentType = ''
			return Object.assign({}, state)


		case types.SELECE_PAGE:
			// if (curData.router === router) return state
			curData.router  = router
			state.curPage   = pageC[router]
			state.curComp   = {}
			curData.router  = router
			curData.compIdx = -1
			curData.contentType = 'page'
			return Object.assign({}, state)

		case types.UPDATE_CUR:
			state.curData = data
			return Object.assign({}, state)

		case types.UPDATE_GLOBAL:
			state.globalData = data
			return Object.assign({}, state)

		default:
			return state
	}
}