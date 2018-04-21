/*
* @Author: wangxiang
* @Date:   2017-04-10 17:50:56
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T13:35:44+08:00
*/
import { combineReducers } from 'redux';
import scaleVal from './scale';
import layers from './layers';

const rootReducer = combineReducers({
    scaleVal,
    layers
});

export default rootReducer;
