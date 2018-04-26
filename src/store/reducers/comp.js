/*
* @Author: Liao Hui
* @Date:   2017-04-10 17:50:56
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T13:06:11+08:00
*/

import * as types from '../constants'
import state from '../state'

const initialState = state

export default function comp(state = initialState, action) {
	switch (action.type) {
		// 添加组件
		case types.ADD_COMP:
			var con = Object.assign({}, state.compData[action.comp]),
				home = state.curData.router
			state.pageData.page.content[home].elements.push(con)
			state.curData.comp = con
			return Object.assign({}, state)
		
		case types.UPDATE_COMP:
			// debugger
			var page = state.pageData.page.content,
				home = state.curData.router,
				idx  = state.curData.compIdx
			page[home].elements[idx] = action.comp
			state.curData.comp = action.comp
			return Object.assign({}, state)
		
		// 选择组件
		case types.SELECE_COMP:
			// debugger
			state.curData.comp = action.comp
			return Object.assign({}, state)
		
		// 更新选择组件索引
		case types.UPDATE_COMPIDX:
			if (state.curData.compIdx === action.comp) return state
			state.curData.compIdx = action.comp
			return Object.assign({}, state)
		default:
			return state
	}
}