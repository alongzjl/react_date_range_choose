/*
* @Author: Liao Hui
* @Date:   2017-04-10 17:50:56
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T13:06:11+08:00
*/

import * as types from '../constants'
import state from 'state'

const comp = require('state/comp')

const initialState = state
export default function editConfig(state = initialState, action) {
	let curComp  = state.curComp,
		curData  = state.curData,
		curPage  = state.curPage,
		pageC    = state.pageContent,
		pageList = state.pageList,
		router   = action.router,
		key      = action.key,
		groupIdx = action.groupIdx,
		idx      = action.idx,
		data     = action.data

	switch (action.type) {
		
		// 组件操作
		case types.ADD_COMP:
			var compData = JSON.parse(JSON.stringify(comp[action.key]))
			pageC[router].elements.push(compData)
			state.curPage = pageC[router]
			state.curComp = compData
			curData.compIdx = state.curPage.elements.length - 1
			return Object.assign({}, state)


		case types.UPDATE_COMP:
			pageC[curData.router].elements[curData.compIdx] = data
			state.curPage = pageC[curData.router]
			state.curComp = data
			curData.compIdx = idx
			return Object.assign({}, state)


		case types.DELETE_COMP:
			state[action.router].elements.splice(action.idx, 1)
			return Object.assign({}, state)


		case types.SELECT_COMP:
			return Object.assign({}, action.data)


		// 页面操作
		case types.ADD_PAGE:
			state.group[groupIdx].pages.push({
				router: `p_${++state.maxPageIdx}`,
				title: name
			})
			return Object.assign({}, state)
		

		case types.UPDATE_PAGE:
			state.group[action.groupIdx].pages[action.idx] = action.data
			return Object.assign({}, state)
		

		case types.DELETE_PAGE:
			state.group[action.groupIdx].pages.splice(action.idx, 1)
			return Object.assign({}, state)


		case types.SELECE_PAGE:
			state.group[action.groupIdx].pages.splice(action.idx, 1)
			return Object.assign({}, state)

		case types.UPDATE_CUR:
			state.curData = data
			return Object.assign({}, state)

		default:
			return state
	}
}