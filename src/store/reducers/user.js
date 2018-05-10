/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T13:28:59+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T16:43:15+08:00
 */

import * as types from '../constants'

const initialState = {
	userInfo: {}
}
window.uif = initialState
export default function layers(state = initialState, action) {
	switch (action.type) {
		case types.UPDATE_USER:
			console.log('更新用户信息!')
			return Object.assign({}, action.user)

		default:
			return state
	}
}
