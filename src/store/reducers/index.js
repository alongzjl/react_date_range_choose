/*
* @Author: wangxiang
* @Date:   2017-04-10 17:50:56
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-21T16:29:49+08:00
*/
import { combineReducers } from 'redux'
// import scaleVal    from './scale'
// import layers      from './layers'
// import focusData   from './focusData'
import editConfig  from './editConfig'
import user        from './user'

const rootReducer = combineReducers({
	// scaleVal,
	// layers,
	// focusData,
	editConfig,
	user
})

export default rootReducer
