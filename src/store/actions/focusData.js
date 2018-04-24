/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T16:11:06+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T16:14:16+08:00
 */

 'use strict';

 import * as types from '../constants';

 export const setFocusItem = (item) => ({
     type: types.SET_FOCUS_ITEM,
     item
 });

 export const setFocusItemIndex = (index) => ({
     type: types.SET_FOCUS_ITEM_INDEX,
     index
 });
