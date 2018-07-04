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
					<img src="http://rongyi.b0.upaiyun.com/commodity/text/201805311127327227.png" />
				</div>
			</div>
		)
	}
}

export default FloorMap
