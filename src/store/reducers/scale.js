/*
* @Author: Liao Hui
* @Date:   2017-04-10 17:50:56
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T13:06:11+08:00
*/

import * as types from '../constants'

const initialState = 1;

export default function scaleVal(state = initialState, action) {
    switch (action.type) {
        case types.SET_SCALE_VAL:
            return action.scaleVal;

        default:
            return state
    }
}
