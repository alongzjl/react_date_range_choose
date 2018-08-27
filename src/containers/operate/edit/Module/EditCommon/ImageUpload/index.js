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

import { Row, Col, Icon, Select } from 'antd'
const { Option } = Select

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

	enter(imgList, attribute) {
		let { enter, img } = this.props
		let url = img.img = imgList[0].url
		enter && enter(url, attribute)
	}

	changeImgType(val) {
		let { data, img, actions, editConfig }  = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		img.type  = val
		return actions['updateComp'](null, parentComp? parentComp: data)
	}
	removeImg() {
		this.enter([{ url: '' }])
	}

	cb(key) {
		console.log(key)
	}

	render() {
		let { img, actions, editConfig } = this.props
		let btnNode, selectNode
		let imgVal  = img && img.img
		let theme   = editConfig.globalData.theme
		let colors  = deepCopy(theme.list[theme.idx].colors)
		colors.custom = {
			name: '自定义',
			img:  imgVal
		}
		if (img.type === 'custom') {
			if (imgVal) {
				btnNode = (
					<Col span={9}>
						<div className="add_img" style={{ backgroundImage: `url('${imgVal}')` }}>
							<div className="shadow">
								<div className="add_text_change" onClick={this.showList.bind(this)}><Icon type="reload" /></div>
								<div className="add_text_remove" onClick={this.removeImg.bind(this)}><Icon type="close" /></div>
							</div>
						</div>
					</Col>
				)
			} else {
				btnNode = (
					<Col span={9}>
						<div className="add_img" onClick={this.showList.bind(this)}>
							<div className="add_text"><Icon type="plus" /></div>
						</div>
					</Col>
				)
			}
		}
		let options = Object.keys(colors).map((_) => {
			let col = colors[_]
			if (col.img === undefined) return false
			return (
				<Option key={col.name} value={_}>
					{col.name}
				</Option>
			)
		})
		selectNode = (
			<Col span={15}>
				<Select
					value={img.type}
					onChange={this.changeImgType.bind(this)}
					style={{ width: '100%' }}
				>
					{ options }
				</Select>
			</Col>
		)
		return (
			<div>
				<Row type="flex" align="middle" style={{ width: '100%' }}>
					{ btnNode }
					{ selectNode }
				</Row>
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