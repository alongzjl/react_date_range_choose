/*
* @Author: Liao Hui
* @Date:   2017-04-19 18:20:17
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T13:01:43+08:00
*/

'use strict';

import * as types from '../constants';

export const setScaleVal = (scaleVal) => ({
    type: types.SET_SCALE_VAL,
    scaleVal
});
