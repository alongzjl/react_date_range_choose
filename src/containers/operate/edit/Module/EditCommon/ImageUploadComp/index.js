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
import VideoList from '../VideoList' 

import './index.less'

class ImageUploadComp extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	showList() {
		this.addImgModal.show()
	}

	enter(imgList, index) {
		let { data, name, action, actions, editConfig } = this.props
		let da = data.data
		let { content }    = da
		let { curData }    = editConfig
		let { parentComp } = curData
		const length = content.length;
		if (getAttr(content) === 'Array') {
			if (name == 'first') { 
				imgList = imgList.map((item, i) => {
					var obj = {
						img:    { img: item.url, type: 'custom' },
						title:  `图片${i + 1}`,
						router: content[i]? content[i].router: {}
					}
					return obj
				})
				da.content = imgList
			} else { 
				content[index][name].img = imgList[0].url
			}
		} else if (data.name == 'video'){
			content[name] = imgList[0].url
		} else {
			content[name].img = imgList[0].url
		}
		actions[action](null, parentComp? parentComp: data)
	}

	cb(key) {
		// console.log(key)
	}

	changeImgType(val) {
		let { data, img, action, actions, editConfig }  = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		img.type  = val
		if (action === 'updateComp') return actions[action](null, parentComp? parentComp: data)
	}

	render() {
		let { img, name, actions, editConfig, index, data } = this.props
		let btnNode
		let imgVal = img && img.img
		let theme   = editConfig.globalData.theme
		let colors  = JSON.parse(JSON.stringify(theme.list[theme.idx].colors))
		let selectNode
		colors.custom = {
			name:  '自定义',
			img: imgVal
		}
		if(name == 'first'){ 
			return (
					<div className="pg-img-upload">
						<Row type="flex" align="middle" style={{ width: '100%' }}>
							<Col span={9}>
								<div className="add_img" onClick={this.showList.bind(this)}>
									<div className="add_text"><Icon type="plus" /></div>
								</div>
							</Col>
						</Row>
						<PictureList
							ref={com => { this.addImgModal = com }}
							props={this.props}
							data={this.props}
							actions={actions}
							index={0}
							type={data.name}
							firstAdd={true} 
							enter={this.enter}
						/>
					</div>
				)
		}else if(name == 'src'){
			return (
					<div className="pg-img-upload">
						<Row type="flex" align="middle" style={{ width: '100%' }}>
							<Col span={9}>
								<div className="add_img" onClick={this.showList.bind(this)}>
									<div className="add_text"><Icon type="plus" /></div>
								</div>
							</Col>
						</Row> 
						<VideoList
							ref={com => { this.addImgModal = com }}
							props={this.props}
							data={this.props}
							actions={actions}
							index={0}
							type={data.name}
							firstAdd={true}
							enter={this.enter}
						/>
					</div>
				)
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
		if (img.type === 'custom') {
			if (imgVal) {
				btnNode = (
					<Col span={9}>
						<div className="add_img" style={{ backgroundImage: `url('${imgVal}')` }} onClick={this.showList.bind(this)}>
							<div className="shadow">
								<div className="add_text_change"><Icon type="reload" /></div>
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
		return (
			<div className="pg-img-upload">
				<Row type="flex" align="middle" style={{ width: '100%' }}>
					{ btnNode }
					{ selectNode }
				</Row>
				<PictureList
					ref={com => { this.addImgModal = com }}
					props={this.props}
					data={this.props}
					actions={actions}
					index={0}
					enter={this.enter}
					index={index}
				/>
			</div>
		)
	}
}

ImageUploadComp.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageUploadComp)
