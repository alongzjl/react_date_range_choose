/**
 * @Author: Along
 * @Date:   2018-05-07
 * 2D地图组件
 */

import React from 'react'
import './index.less'

class FloorMap extends React.Component {
	/**
	 * 组件挂载完成
	*/
	componentDidMount(){

	}

	render() {
		return (
			<div className="e-map2d">
				<div id="e_map2D" className="e_map2D">
					<img src="http://rongyi.b0.upaiyun.com/system/mcp/V4/app/upload/e7c482d5-de5c-40de-b16c-f95a3b264a41.png" />
				</div>
			</div>
		)
	}
}

export default FloorMap
