/*
* @Author: wangxiang
* @Date:   2017-04-10 17:50:56
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T16:29:49+08:00
*/
import { combineReducers } from 'redux';
import scaleVal from './scale';
import layers from './layers';
import focusData from './focusData';

const rootReducer = combineReducers({
    scaleVal,
    layers,
    focusData
});

export default rootReducer;
