/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T13:28:59+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T16:43:15+08:00
 */

import * as types from '../constants'

const initialState = {
		year:    '',	// 年
		month:   '',	// 月
		week:    '',	// 周
		date:    '',	// 日
		time:    '',	// 时
		minutes: '',	// 分
		seconds: ''		// 秒
}
export default function layers(state = initialState, action) {
	switch (action.type) {
		case types.UPDATE_TIME:
			return Object.assign({}, getTime())

		default:
			return state
	}
}