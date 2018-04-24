/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T16:14:38+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T16:21:21+08:00
 */
import * as types from '../constants';

const initialState = {
    focusItem: {},
    focusDataIndex: -1
};

export default function focusData(state = initialState, action) {
    switch (action.type) {
        case types.SET_FOCUS_ITEM:
            return Object.assign({}, state, {focusItem: action.item});
        case types.SET_FOCUS_ITEM_INDEX:
            return Object.assign({}, state, {focusDataIndex: action.index});

        default:
            return state
    }
}
