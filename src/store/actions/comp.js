/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T13:25:03+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T13:28:52+08:00
 */

'use strict';

import * as types from '../constants'

export const addComp = (comp) => ({
	type: types.ADD_COMP,
	comp
})

export const updateComp = (comp) => ({
	type: types.UPDATE_COMP,
	comp
})

export const deleteComp = (comp) => ({
	type: types.DELETE_COMP,
	comp
})

export const selectComp = (comp) => ({
	type: types.SELECE_COMP,
	comp
})

export const updateCompIdx = (comp) => ({
	type: types.UPDATE_COMPIDX,
	comp
})