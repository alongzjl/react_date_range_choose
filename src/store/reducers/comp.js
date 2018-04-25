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
		case types.ADD_COMP:
			debugger
			return action.comp
		default:
			return state
	}
}