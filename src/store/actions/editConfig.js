/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T13:25:03+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T13:28:52+08:00
 */

'use strict';

import * as types from '../constants'


// 组件操作
export const addComp = (router, key) => ({
	type: types.ADD_COMP,
	router,
	key
})

export const updateComp = (idx, data) => ({
	type: types.UPDATE_COMP,
	idx,
	data
})

export const deleteComp = (idx) => ({
	type: types.DELETE_COMP,
	idx
})


export const selectComp = (data) => ({
	type: types.SELECT_COMP,
	data
})

// 页面操作
export const addPage = (groupIdx, name) => ({
	type: types.ADD_PAGE,
	groupIdx,
	name
})

export const updatePage = (groupIdx, idx, data) => ({
	type: types.UPDATE_PAGE,
	groupIdx,
	idx,
	data
})

export const deletePage = (router, groupIdx, idx) => ({
	type: types.DELETE_PAGE,
	router,
	groupIdx,
	idx
})

export const selectPage = (router) => ({
	type: types.SELECE_PAGE,
	router
})

// 当前操作项
export const updateCur = (data) => ({
	type: types.UPDATE_CUR,
	data
})

// 全局项
export const updateGlobal = (data) => ({
	type: types.UPDATE_GLOBAL,
	data
})

// 整合Config
export const updateConfig = (config) => ({
	type: types.UPDATE_CONFIG,
	config
})

// pageList
export const updatePageList = (data) => ({
	type: types.UPDATE_PAGELIST,
	data
})

// 快速操作
export const updateCopyComp = (data) => ({
	type: types.UPDATE_COPYCOMP,
	data
})