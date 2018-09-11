/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import { Row, Col, Icon, Select } from 'antd'
const { Option } = Select

import PictureList from '../PictureList'

// import './index.less'

export default class ImageUploadGroup extends React.Component {
	constructor(props) {
		super(props)
		var { width = 0, height = 0 } = props.data.data.layout
		this.state = {
			idx: null,
			width, height
		}
	}

	componentWillMount() {}

	componentDidMount() {}

	componentWillReceiveProps(props) {
		var { width = 0, height = 0 } = props.data.data.layout
		this.setState({ width, height })
	}

	componentWillUnmount() {}

	showList = idx => {
		this.setState({ idx })
		this.addImgModal.show()
	}

	enter = imgList => {
		if (!imgList.length) return
		let { imgs } = this.props,
			{ idx } = this.state,
			url = imgList[0].url,
			cb  = this.props.enter
		imgs[idx] = url
		cb && cb(imgs)
	}

	removeImg(idx) {
		let { imgs } = this.props,
			cb = this.props.enter
		imgs.splice(idx, 1)
		cb && cb(imgs)
	}
	renderGroup(imgs) {
		var len  = imgs.length
		var node = imgs.map((_, i) => (
			<Col key={i} span={8}>
				<div className="add_img" style={{ backgroundImage: `url('${_}')` }}>
					<div className="shadow">
						<div className="add_text_change" onClick={this.showList.bind(this, i)}><Icon type="reload" /></div>
						<div className="add_text_remove" onClick={e => this.removeImg(i)}><Icon type="close" /></div>
					</div>
				</div>
			</Col>))
		if (len < 10) {
			node.push((
				<Col key={len} span={8}>
					<div className="add_img" onClick={this.showList.bind(this, len)}>
						<div className="add_text"><Icon type="plus" /></div>
					</div>
				</Col>
			))
		}
		return node
	}

	render() {
		let { imgs } = this.props
		let btnNode = this.renderGroup(imgs)

		return (
			<div>
				<Row type="flex" align="middle" style={{ width: '100%' }}>
					{ btnNode }
				</Row>
				<PictureList
					ref={com => { this.addImgModal = com }}
					props={this.props}
					data={this.props}
					enter={this.enter.bind(this)}
					index={0}
				/>
			</div>
		)
	}
}
