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

let startTime = Date.now()
function saveData() {
	var diffTime = Date.now() - startTime
	// if (diffTime > 1000) {
		// 保存步骤
	// }
	startTime = Date.now()
	console.log(`操作间隔: ${diffTime} ms`)
}

const initialState = state
export default function editConfig(state = initialState, action) {
	let curData    = state.curData,
		pageC      = state.pageContent,
		pageList   = state.pageList,
		router     = action.router,
		groupIdx   = action.groupIdx,
		idx        = action.idx,
		data       = action.data,
		name       = action.name

	switch (action.type) {
		
		// 组件操作
		case types.ADD_COMP:
			var compData = JSON.parse(JSON.stringify(comp[action.key]))
			pageC[router].elements.push(compData)
			state.curPage       = pageC[router]
			state.curComp       = compData
			curData.compIdx     = state.curPage.elements.length - 1
			curData.contentType = 'comp'
			console.log('添加组件!')
			saveData()
			return Object.assign({}, state)


		case types.UPDATE_COMP:
			var sl = data.styleList,
				sd = sl.list[sl.idx]
			sd.data = JSON.parse(JSON.stringify(data.style))
			delete sd.data.layout
			pageC[curData.router].elements[curData.compIdx] = data
			state.curPage   = pageC[curData.router]
			curData.compIdx = idx || curData.compIdx
			console.log('更新组件!')
			saveData()
			return Object.assign({}, state)


		case types.DELETE_COMP:
			pageC[curData.router].elements.splice(idx, 1)
			state.curPage = pageC[curData.router]
			state.curComp = {}
			curData.compIdx     = -1
			curData.cusCompIdx  = -1
			curData.parentComp  = null
			curData.contentType = 'page'
			console.log('删除组件!')
			saveData()
			return Object.assign({}, state)


		case types.SELECT_COMP:
			let { parentComp } = curData
			if (!parentComp) {
				console.log('选择组件!')
				curData.cusCompIdx  = -1
			} else console.log('选择子组件!')
			state.curComp       = data
			curData.contentType = 'comp'
			saveData()
			return Object.assign({}, state)


		// 页面操作
		case types.ADD_PAGE:
			var pageData = JSON.parse(JSON.stringify(pagec)),
				route    = `p_${++state.pageList.maxPageIdx}`
			pageData.router     = route
			pageData.title      = name
			curData.router      = route
			curData.compIdx     = -1
			curData.cusCompIdx  = -1
			curData.contentType = 'page'
			pageC[route]        = pageData
			state.curPage       = pageData
			state.curComp       = {}
			pageList.group[groupIdx].pages.push({
				router: route,
				title:  name
			})
			console.log('创建页面!')
			saveData()
			return Object.assign({}, state)
		

		case types.UPDATE_PAGE:
			var pgp = pageList.group[groupIdx].pages[idx]
			pgp.title          = data.title
			pageC[data.router] = data
			state.curPage      = data
			console.log('更新页面!')
			saveData()
			return Object.assign({}, state)
		

		case types.DELETE_PAGE:
			delete pageC[router]
			pageList.group[groupIdx].pages.splice(idx, 1)
			state.curPage       = {}
			state.curComp       = {}
			curData.router      = ''
			curData.compIdx     = -1
			curData.cusCompIdx  = -1
			curData.contentType = ''
			console.log('删除页面!')
			saveData()
			return Object.assign({}, state)


		case types.SELECE_PAGE:
			// if (curData.router === router) return state
			curData.router      = router
			state.curPage       = pageC[router]
			state.curComp       = {}
			curData.router      = router
			curData.compIdx     = -1
			curData.cusCompIdx  = -1
			curData.contentType = 'page'
			console.log('选择页面!')
			saveData()
			return Object.assign({}, state)

		case types.UPDATE_CUR:
			state.curData = data
			console.log('更新当前数据!')
			saveData()
			return Object.assign({}, state)

		case types.UPDATE_GLOBAL:
			state.globalData = data
			console.log('更新全局数据!')
			saveData()
			return Object.assign({}, state)

		default:
			return state
	}
}