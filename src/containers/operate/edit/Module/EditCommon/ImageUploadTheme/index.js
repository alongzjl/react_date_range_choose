/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Icon } from 'antd'

import PictureList from '../PictureList'

import './index.less'

class ImageUploadTheme extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	showList() {
		this.addImgModal.show()
	}

	enter(imgUrl) {
		let { name, action, content, actions, editConfig } = this.props
		content[name] = imgUrl
		actions[action](editConfig.globalData)
	}

	cb(key) {
		console.log(key)
	}

	render() {
		let { img, actions } = this.props
		let btnNode
		if (img) {
			btnNode = (
				<div className="add_img" style={{ backgroundImage: `url('${img}')` }} onClick={this.showList.bind(this)}>
					<div className="shadow">
						<div className="add_text_change"><Icon type="reload" /></div>
					</div>
				</div>
			)
		} else {
			btnNode = (
				<div className="add_img" onClick={this.showList.bind(this)}>
					<div className="add_text"><Icon type="plus" /></div>
				</div>
			)
		}
		return (
			<div>
				{ btnNode }
				<PictureList
					ref={com => { this.addImgModal = com }}
					props={this.props}
					data={this.props}
					actions={actions}
					enter={this.enter.bind(this)}
					index={0}
				/>
			</div>
		)
	}
}

ImageUploadTheme.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageUploadTheme)
