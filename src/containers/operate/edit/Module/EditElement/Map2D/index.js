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
		window.domReady('e_map2D')
	    window.AndroidCallJsRyWayfinding({
	        maps: [{
	            name: 'B1',
	            bg: 'resources/map2/png/map_B1.png',
	            nav: 'resources/map2/B1.tmx'
	        }, {
	            name: 'L1',
	            bg: 'resources/map2/png/map_L1.png',
	            nav: 'resources/map2/L1.tmx'
	        }, {
	            name: 'L2',
	            bg: 'resources/map2/png/map_L2.png',
	            nav: 'resources/map2/L2.tmx'
	        }, {
	            name: 'L3',
	            bg: 'resources/map2/png/map_L3.png',
	            nav: 'resources/map2/L3.tmx'
	        }, {
	            name: 'L4',
	            bg: 'resources/map2/png/map_L4.png',
	            nav: 'resources/map2/L4.tmx'
	        }],
	        // rootPath: 'file:///mnt/sdcard/myapp',
	        pubs: ['Escalator', 'Elevator', 'ATM', 'Toliet', 'Services Center', 'Nursely Room'],
	        startPoint: '0,356,356',
	        endPoint: '0,356,356',
	        // endPoint: '4,791,219',
	        endIcon: 'resources/shop/5959ae0b1c17e61769408a8b_201707041033329633.jpg'
	    });
	}

	render() {
		let { type,data } = this.props
		let style = cssColorFormat(this.props, 'text')
		return (   
			<div className="e-map2d" style={style}>
				<div id="e_map2D" className="e_map2D"></div>
			</div>
		)  
	}  
} 
 
export default Map2D
