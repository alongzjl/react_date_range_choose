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

import {
	Row, Col,
	Button, Card, Checkbox, Collapse, Input, InputNumber, Radio, Select, Slider, Switch
} from 'antd'
const { TextArea } = Input
const { Panel }    = Collapse

import RouterJump  from 'compEdit/EditCommon/RouterJump'
import ImageUploadComp from 'compEdit/EditCommon/ImageUploadComp'

import Picture     from './Picture'
import Web         from './Web'
import Text        from './Text'
import SwiperImage from './SwiperImage'

var conMap = {
	text:  { name: '文本内容', type: 'Textarea', max: 1000, autosize: { minRows: 1, maxRows: 6 }, },
	title: { name: '标题',    type: 'Title',    max: 30, },
	img:   { name: '图片',    type: 'Image', },
}

import './index.less'

class EditContent extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(val, key) {
		console.clear()
		console.log(val)
		let { data, actions } = this.props
		data.content[key] = val
		actions.updateComp(null, data)
	}

	onChangeAuth(val, key) {
		console.clear()
		console.log(val)
		let { data, actions } = this.props
		data.auth.content[key] = val
		actions.updateComp(null, data)
	}

	cb(key) {
		console.log(key)
	}

	/* 渲染组件开始 */
	// 文本
	renderTextarea(cfg, data, val, key) {
		return (
			<TextArea
				min={cfg.min || 0} max={cfg.max || 100}
				autosize={cfg.autosize || false}
				value={val} onChange={v => this.onChange(v.target.value, key)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 标题
	renderTitle(cfg, data, val, key) {
		return (
			<Input
				min={cfg.min || 0} max={cfg.max || 100}
				value={val} onChange={v => this.onChange(v.target.value, key)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 上传图片
	renderImage(cfg, data, val, key, content) {
		return (
			<ImageUploadComp
				data={data}
				img={val}
				name={key}
				content={content}
				action={'updateComp'}
				style={{ width: '100%' }}
			/>
		)
	}

	renObj(data, content) {
		let childNode = Object.keys(content).map((p, i) => {
			if (!conMap[p]) return false
			let cm     = conMap[p]
			let val    = content[p]
			let render = this[`render${cm.type}`]
			if (!render) return false
			// 根据样式类型渲染对应组件
			let dom = this[`render${cm.type}`].bind(this, cm, data, val, p, content)()
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name">{ cm.name }</div>
					<div className="pgsr-ctrl">{ dom }</div>
					<div className="pgsr-auth">
						<Checkbox checked={data.auth.content[p]} onChange={_ => this.onChangeAuth(_.target.checked, p)} />
					</div>
				</div>
			)
		})
		return childNode
	}

	render() {
		let { data, actions } = this.props

		let compName = data.name
		let content  = data.content
		let compCon
		let childNode
		let activeKey
		let routerJump
		// if (compName === 'picture')           compCon = (<Picture data={data}></Picture>)
		// else if (compName === 'web')          compCon = (<Web data={data}></Web>)
		// else if (compName === 'text')         compCon = (<Text data={data}></Text>)
		// else if (compName === 'swiper-image') compCon = (<SwiperImage data={data}></SwiperImage>)
		if (content.length) {
			activeKey = Array.from(new Array(content.length), (_, i) => `${i}`)
			childNode = content.map((_, i) => {
				return (
					<Panel header={`内容${i + 1}`} key={i}>
						{ this.renObj(data, _) }
					</Panel>
				)
			})
		} else {
			activeKey = ['0']
			if (content.router !== undefined) {
				routerJump = (
					<RouterJump data={data} content={content} idx={-1} actions={actions} />
				)
			}
			childNode = (
				<Panel header={'内容编辑'} key={0}>
					{ this.renObj(data, content) }
				</Panel>
			)
		}
		return (
			<section className="ry-roll-screen-config">
				<Collapse defaultActiveKey={activeKey} onChange={this.cb}>
					{ childNode }
				</Collapse>
				{ routerJump }
				{ compCon }
			</section>
		)
	}
}

EditContent.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditContent)
