/**
 * @Author: Along
 * @Date:   2018-11-01T17:21:39+08:00
 * @Last modified by:   Along
 * @Last modified time:  2018-11-01T13:47:49+08:00
 */

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { Row, Col, Icon, Select } from 'antd'
const { Option } = Select

import PictureAndVideo from '../PictureAndVideo'
import './index.less'

class ImageAndVideoComp extends React.Component {
	constructor(props) {
		super(props)
		var { width = 0, height = 0 } = props.data.data.layout
		this.state = { width,height,init:false }
	}
	componentWillReceiveProps(props) {
		var { width = 0, height = 0 } = props.data.data.layout
		this.setState({ width, height })
	}
	changeImg = () => {
		this.addImgVideoModal.show()
		this.setState({init:true})
	} 
	enter = (list,index) => {
		if (!list.length) return
		let { data, con  ,action, actions, editConfig } = this.props
		let da = data.data
		let { content }    = da
		let { curData }    = editConfig
		let { parentComp } = curData
		if(list[0].type == 2){
			delete con.img.img
			con.img.preview = list[0].preview
			con.img.video = list[0].url
			con.type = 'video'
		}else{    
			delete con.img.preview 
			con.img.img = list[0].url
			con.type = 'image'
		}      
		con.attribute = list[0].attribute
		data.data.content[index-1] = con
		actions[action](null, parentComp? parentComp: data)
	}  
	changeImgType = val => {
		let { data, img, action, actions, editConfig }  = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		img.type  = val
		if (action === 'updateComp') return actions[action](null, parentComp? parentComp: data)
	}
	removeImg = () => {
		this.enter([{ url: '' }])
	}
	initFn = () =>{
		this.setState({init:false})
	}
	render() {
		let { img, editConfig,con, index, data } = this.props
		let { width, height } = this.state
		let btnNode
		let imgVal   = img.img || img.preview
		let theme  = editConfig.globalData.theme
		let colors = JSON.parse(JSON.stringify(theme.list[theme.idx].colors))
		let selectNode
		let scaleNode
		colors.custom = {
			name:  '自定义',
			img: imgVal
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
		if(con.type == 'image'){
			selectNode = (
				<Col span={15}>
					<Select
						value={img.type}
						onChange={this.changeImgType}
						style={{ width: '100%' }}
					>
						{ options }
					</Select>
				</Col>
			)
		} 
		if (img.type === 'custom') {
			if (imgVal) {
				btnNode = (
					<div className="add_img" style={{ backgroundImage: `url('${imgVal}')` }}>
						<div className="shadow">
							<div className="add_text_change" onClick={this.changeImg}><Icon type="reload" /></div>
							<div className="add_text_remove" onClick={this.removeImg}><Icon type="close" /></div>
						</div>
					</div>
				)
				scaleNode = <div className="img_scale">{ width*2 } x { height*2 }</div>
			} else {
				btnNode = (
					<div className="add_img" onClick={this.changeImg}>
						<div className="add_text"><Icon type="plus" /></div>
					</div>
				)
			}
		} 
		return (
			<div className="pg-img-upload">
				<Row type="flex" align="middle" style={{ width: '100%' }}>
					<Col span={9}>
						{ btnNode }
						{ scaleNode }
					</Col>
					{ selectNode }
				</Row>
				<PictureAndVideo
					ref={com => { this.addImgVideoModal = com }}
					enter={this.enter}
					init={this.state.init}
					initFn={this.initFn}
					index={index+1}
				/>
			</div>
		)
	}
}

ImageAndVideoComp.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ImageAndVideoComp)
