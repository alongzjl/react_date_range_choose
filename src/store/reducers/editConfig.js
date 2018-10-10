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
	let pageC = state.pageContent,
		{ curData, pageList, globalData } = state,
		{ router, groupIdx, idx, data, save, key, name } = action

	switch (action.type) {
		
		// 组件操作
		case types.ADD_COMP:
			var compData = getCompData(state, key)
			pageC[router].elements.push(compData)
			state.curPage       = pageC[router]
			state.curComp       = compData
			curData.compIdx     = state.curPage.elements.length - 1
			curData.contentType = 'comp'
			console.log('添加组件!')
			saveData()
			return Object.assign({}, state)

		case types.UPDATE_COMP:
			// var { parentComp, cusCompIdx } = curData
			// var sl = data.styleList,
			// 	sd = sl.list[sl.idx]
			// console.clear()
			// if (parentComp) {
			// 	var da = data.data.components[cusCompIdx]
			// 	if (da) {
			// 		var csl = da.styleList,
			// 			csd = csl.list[csl.idx]
			// 		csd.data = deepCopy(da.data)
			// 	}
			// 	console.log(data.data)
			// }
			// sd.data = deepCopy(data.data)
			// pageC[curData.router].elements[curData.compIdx] = data
			// state.curPage   = pageC[curData.router]
			// curData.compIdx = idx || curData.compIdx
			// console.log('更新组件!')
			// saveData()
			// return Object.assign({}, state)

			/* 除styleList代码 START */
			var { parentComp, cusCompIdx } = curData
			pageC[curData.router].elements[curData.compIdx] = data
			state.curPage   = pageC[curData.router]
			curData.compIdx = idx || curData.compIdx
			console.log('更新组件!')
			saveData()
			return Object.assign({}, state)
			/* 除styleList代码 END */

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
			var { parentComp } = curData
			if (!parentComp) {
				console.log('选择组件!')
				curData.cusCompIdx  = -1
			} else console.log('选择子组件!')
			state.curComp       = data
			curData.contentType = 'comp'
			// saveData()
			return Object.assign({}, state)


		// 页面操作
		case types.ADD_PAGE:
			var pageData = deepCopy(pagec),
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
			// saveData()
			return Object.assign({}, state)

		case types.COPY_PAGE:
			var route    = `p_${++state.pageList.maxPageIdx}`,
				pageData = deepCopy(pageC[router]),
				pageName = `${pageData.title} 副本`,
				gpData   = {
					router: route,
					title:  pageName
				}
			pageData.title  = pageName
			pageData.router = route
			pageC[route] = pageData
			pageList.group[groupIdx].pages.push(gpData)
			console.log('复制页面!')
			// saveData()
			return Object.assign({}, state)
		
		case types.UPDATE_PAGE:
			var pgp = pageList.group[groupIdx].pages[idx]
			pgp.title          = data.title
			pageC[data.router] = data
			state.curPage      = data
			console.log('更新页面!')
			save && saveData()
			return Object.assign({}, state)
		
		case types.DELETE_PAGE:
			delete pageC[router]
			pageList.group[groupIdx].pages.splice(idx, 1)
			state.curPage       = {}
			state.curComp       = {}
			curData.router      = route
			curData.compIdx     = -1
			curData.cusCompIdx  = -1
			curData.contentType = ''
			console.log('删除页面!')
			// saveData()
			return Object.assign({}, state)

		case types.SELECE_PAGE:
			// if (curData.router === router) return state
			var pd = pageC[router]
			curData.router       = router
			state.curPage        = pd
			state.curComp        = {}
			globalData.multiComp = { type: '', index: {}, list: [] }
			curData.router      = router
			curData.compIdx     = -1
			curData.cusCompIdx  = -1
			curData.contentType = 'page'
			curData.parentComp  = null
			curData.title       = pd.title

			console.log('选择页面!')
			// saveData()
			return Object.assign({}, state)

		case types.UPDATE_CUR:
			state.curData = data
			console.log('更新当前数据!')
			// saveData()
			return Object.assign({}, state)

		case types.UPDATE_GLOBAL:
			state.globalData = data
			console.log('更新全局数据!')
			// saveData()
			return Object.assign({}, state)

		case types.UPDATE_PAGELIST:
			state.pageList = data
			console.log('更新全局数据!')
			// saveData()
			return Object.assign({}, state)

		case types.UPDATE_CONFIG:
			console.log('更新整个config!')
			// saveData()
			return Object.assign(state, action.config)

		case types.UPDATE_COPYCOMP:
			console.log('复制组件!')
			globalData.copyComp = data
			return Object.assign({}, state)

		default:
			return state
	}
}


let startTime = Date.now()
function saveData() {
	var diffTime = Date.now() - startTime
	if (diffTime > 1000) {
		// 保存步骤
		// console.log(diffTime)
		window.storeState.saveHistory = true
	}
	startTime = Date.now()
	console.log(`操作间隔: ${diffTime} ms`)
}

// 获取组件数据
function getCompData(state, key) {
	let compData = deepCopy(comp[key])
	/* 除styleList代码 START */
	delete compData.styleList.list
	/* 除styleList代码 END */
	let init = initFn[key]
	if (init) init(state, compData.feature)
	return compData
}

const initFn = {
	storeList(state, feature) {
		let { body } = feature
		let { floors, catgs, storeList } = state.globalData
		let sl         = deepCopy(storeList)
		feature.floors = deepCopy(floors)
		feature.catgs  = deepCopy(catgs)
		feature.list   = sl.data
		body.page      = sl.page
		body.total     = sl.total
	},
	storeDetails(state, feature) {
		let { images, text } = deepCopy(state.globalData.storeDetails)
		feature.comp = {
			text: {
				key: 'data.content.text',
				value: text
			},
			wonderfulActivity: {
				key: 'feature.list',
				value: images
			}
		}
	},
	wonderfulActivity(state, feature) {
		let { images } = deepCopy(state.globalData.storeDetails)
		feature.list = images
	},
	date(state, feature) {
		feature.time = getTime()
	}
}
