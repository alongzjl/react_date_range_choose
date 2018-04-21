/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T13:28:59+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T16:43:15+08:00
 */

import * as types from '../constants';
import $ from 'jquery';

const initialState = [

];

export default function layers(state = initialState, action) {
    switch (action.type) {
        case types.ADD_LAYER:
            state.push(action.layer);
            return $.extend(true, [], state);
        case types.UPDATE_LAYER:
            let realIndex = state.findIndex((item) => {
                return item.index === action.layer.index;
            });
            state[realIndex] = action.layer;
            return $.extend(true, [], state);
        case types.DELETE_LAYER:
            return $.extend(true, [], state);

        default:
            return state
    }
}
