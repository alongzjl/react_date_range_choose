/**
 * @Author: Along
 * @Date:   2018-05-05

 */

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import React from 'react'
import {
	Row, Col,
	Button, Card, Checkbox, Collapse, Select,message } from 'antd'

const { Panel }    = Collapse
const Option = Select.Option

import ImageUpload from 'compEdit/EditCommon/ImageUpload'

import './index.less'

class Weather extends React.Component {
	
	componentWillReceiveProps(props) {}
	componentDidMount() {}
	componentWillUnmount() {}
	
	onChange(val, con, key, index) {
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		actions.updateComp(null, parentComp? parentComp: data.data)
	}

	renderImage(obj, val, key, index) {
		let { data } = this.props
		let onImage = url => {
			obj[key].img = url
			this.onChange.bind(this, url, obj, key)()
		}
		return (
			<ImageUpload
				data={data.data}
				enter={onImage}
				img={val}
			/>
		)
	}

	render() {
		let { data } = this.props
		let icon = data.data.data.content.weatherIcon
		let type = weather.type
		let node
		if (icon) {
			let key = ''
			node = Object.keys(icon).map((_, i) => {
				let dom = this.renderImage(icon, icon[_], _, i)
				return (
					<div key={i} className="pgs-row">
						<div className="pgsr-name">{ _ }</div>
						<div className="pgsr-ctrl">{ dom }</div>
					</div>
				)
			})
			node = (
				<Panel header="图标选择" key={0}>
					{ node }
				</Panel>
			)
		}
		return (
			<div className="e-date-content">
				<Collapse activeKey={['0']}>
					{ node }
				</Collapse>
			</div>
		)
	}
}

Weather.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Weather)