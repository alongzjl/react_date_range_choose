/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T13:25:03+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T13:28:52+08:00
 */

'use strict';

import * as types from '../constants';

export const addLayer = (layer) => ({
    type: types.ADD_LAYER,
    layer
});

export const updateLayer = (layer) => ({
    type: types.UPDATE_LAYER,
    layer
});

export const deleteLayer = (layer) => ({
    type: types.DELETE_LAYER,
    layer
});
