/**
 * @Author: Along
 * @Date:   2018-05-07
 * 2D地图组件
 */

import React from 'react'
import './index.less'

class Map2D extends React.Component {
	/**
	 * 组件挂载完成
	*/
	componentDidMount(){
		// $('#e_map2D').ry2dMap({
		// 	builds: [{
		// 		name: '1栋',
		// 		floors: [{
		// 			name: 'B1',
		// 			bg: 'resources/map2/png/map_B1.png',
		// 			nav: 'resources/map2/dong/1/B1.tmx'
		// 		}, {
		// 			name: 'L1',
		// 			bg: 'resources/map2/png/map_L1.png',
		// 			nav: 'resources/map2/dong/1/L1.tmx'
		// 		}, {
		// 			name: 'L2',
		// 			bg: 'resources/map2/png/map_L2.png',
		// 			nav: 'resources/map2/dong/1/L2.tmx'
		// 		}, {
		// 			name: 'L3',
		// 			bg: 'resources/map2/png/map_L3.png',
		// 			nav: 'resources/map2/dong/1/L3.tmx'
		// 		}, {
		// 			name: 'L4',
		// 			bg: 'resources/map2/png/map_L4.png',
		// 			nav: 'resources/map2/dong/1/L4.tmx'
		// 		}]
		// 	}, {
		// 		name: '2栋',
		// 		floors: [{
		// 			name: 'B1',
		// 			bg: 'resources/map2/png/map1_B1.png',
		// 			nav: 'resources/map2/dong/2/B1.tmx'
		// 		}, {
		// 			name: 'L1',
		// 			bg: 'resources/map2/png/map_L1.png',
		// 			nav: 'resources/map2/dong/2/L1.tmx'
		// 		}]
		// 	}],
		// 	// rootPath: 'file:///mnt/sdcard/myapp',
		// 	pubs: ['Escalator', 'Elevator', 'ATM', 'Toliet', 'Services Center', 'Nursely Room'],
		// 	themeColor: '#CFAD81',
		// 	// 多栋不同城
		// 	startPoint: {
		// 		buildIndex: 0,
		// 		floorIndex: 0,
		// 		x: 356,
		// 		y: 356
		// 	},
		// 	endPoint: {
		// 		buildIndex: 0,
		// 		shopNo: 'B1-49',
		// 		icon: 'resources/shop/5959ae0b1c17e61769408a8b_201707041033329633.jpg'
		// 	}
		// })
	}

	render() {
		let { type,data } = this.props
		// let style = cssColorFormat(this.props, 'text')
		return (
			<div className="e-map2d">
				<div id="e_map2D" className="e_map2D">
					<img src="http://rongyi.b0.upaiyun.com/commodity/text/201805251653337024.png"/>
				</div>
			</div>
		)
	}
}

export default Map2D
