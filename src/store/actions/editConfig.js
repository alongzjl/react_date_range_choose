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

export const deleteComp = (router, idx) => ({
	type: types.DELETE_COMP,
	router,
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

export const deletePage = (groupIdx, idx) => ({
	type: types.DELETE_PAGE,
	groupIdx,
	idx
})

export const selectPage = (groupIdx, idx) => ({
	type: types.SELECE_PAGE,
	groupIdx,
	idx
})

export const updateCur = (data) => ({
	type: types.UPDATE_CUR,
	data
})