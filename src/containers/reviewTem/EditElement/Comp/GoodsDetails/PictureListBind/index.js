/**
 * @Author: Along
 * @Date:   2018-07-25

 **/

import React from 'react'
import './index.less'

export default class PictureListBind extends React.Component {
	state = {

	}
	shouldComponentUpdate(nextProps,nextState){
		return nextProps.refresh
	}
	render() {
		let { imgList } = this.props,
			css  = cssColorFormat(this.props, 'image'),
			filterBox = cssColorFormat(this.props, 'filterBox')
		return	(
				<div className="e-picture-list-bind">
					<div className="eplb-box" style={filterBox}>
						{ imgList.map((_, i) => <div key={i} style={css}><img src={_} /></div>) }
					</div>
				</div>
			)
	}
}
