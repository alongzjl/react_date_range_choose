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

import { Row, Col, Checkbox, Collapse, Icon, Input, Select } from 'antd'
const { Option, OptGroup } = Select
const Panel  = Collapse.Panel

import PictureList from '../PictureList'

import './index.less'

class ImageUpload extends React.Component {
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
		let { data, img, name, content, actions, editConfig } = this.props
		content[name] = imgUrl
		actions.updateComp(null, data)
	}

	cb(key) {
		console.log(key)
	}

	render() {
		let { data, img, name, content, actions, editConfig } = this.props
		let btnNode
		if (img) {
			btnNode = (
				<div className="add_img" style={{ backgroundImage: `url('${img}')` }} onClick={this.showList.bind(this)}>
					<div className="shadow">
						<div className="add_text_change">更换图片</div>
					</div>
				</div>
			)
		} else {
			btnNode = (
				<div className="add_img" onClick={this.showList.bind(this)}>
					<div className="add_text">+</div>
					<div>添加图片</div>
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

ImageUpload.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageUpload)
