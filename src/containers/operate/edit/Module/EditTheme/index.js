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

import ColorPicker from 'rc-color-picker'
import StyleManage from 'compEdit/EditCommon/StyleManage'
import { Collapse, Icon, Input, Select } from 'antd'
const Panel  = Collapse.Panel
const Option = Select.Option

const keyMap = {
	color:   { color: '#000000', },
	picture: { img: '', },
}

import './index.less'

class EditTheme extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			keyType: 'color',
			keyValue: '',
			editKey: '',
			cache: {},
		}
	}

	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	changeColor(c, key) {
		var col = c.color.colorRGB()
		col.push(c.alpha/100)
		col = `rgba(${col.join(',')})`
		let { data, actions, editConfig } = this.props
		let colors = data.list[data.idx].colors
		colors[key].color = col
		colors[key].alpha = c.alpha
		colors[key].rgb   = c.color
		actions.updateGlobal(editConfig.globalData)
		window.curThemeColor = colors
	}
	onChangeType(val) {
		this.setState({ keyType: val })
	}
	onChangeValue(val) {
		this.setState({ keyValue: val })
	}
	addKey() {
		let { keyType, keyValue } = this.state
		if (keyValue.replace(/\s+/g, '') === '') return
		let { data, actions, editConfig }  = this.props
		let obj     = JSON.parse(JSON.stringify(keyMap[keyType]))
		obj.name    = keyValue
		data.list.map(_ => {
			_.colors[`${keyType}${++data.max[keyType]}`] = obj
		})
		actions.updateGlobal(editConfig.globalData)
		window.curThemeColor = data.list[data.idx].colors
		this.setState({ keyValue: '' })
	}
	removeKey(key) {
		let { data, actions, editConfig }  = this.props
		data.list.map(_ => { delete _.colors[key] })
		actions.updateGlobal(editConfig.globalData)
		window.curThemeColor = data.list[data.idx].colors
	}
	enterEditKey(col, key, state) {
		let { keyType, keyValue } = state
		if (keyValue.replace(/\s+/g, '') === '') return
		let { data, actions, editConfig }  = this.props
		let obj = JSON.parse(JSON.stringify(col))
		obj.name = keyValue
		if (keyType === 'color') {
			delete obj.img
			obj.color = obj.color || '#000000'
		}
		else if (keyType === 'picture') {
			delete obj.color
			obj.img = obj.img || ''
		}
		data.list.map(_ => {
			_.colors[key] = obj
		})
		actions.updateGlobal(editConfig.globalData)
		window.curThemeColor = data.list[data.idx].colors
		this.setState({ editKey: '' })
	}
	editKey(key, col) {
		var da = { editKey: key, cache: {} }
		da.cache[key] = {
			keyType: '',
			keyValue: col.name
		}
		if (col.color) da.cache[key].keyType = 'color'
		this.setState(da)
	}
	cancelEditKey(key) {
		this.setState({ editKey: '' })
	}
	renderEdit(key, col) {
		let state = this.state.cache[key]
		return (
			<div className="pgs-row">
				<div className="pgsr-name">
					<Select defaultValue={state.keyType} onChange={_ => {
						state.keyType = _
					}} style={{ width: '90%' }}>
						<Option value="color">颜色</Option>
						<Option value="picture">图片</Option>
					</Select>
				</div>
				<div className="pgsr-ctrl">
					<Input defaultValue={state.keyValue} onChange={_ => {
						state.keyValue = _.target.value
					}} placeholder="字段名" />
				</div>
				<div className="pgsr-auth" style={{ width: 40 }}>
					<div className="pgt-edit">
						<div className onClick={this.enterEditKey.bind(this, col, key, state)}><Icon type="check" /></div>
						<div className onClick={this.cancelEditKey.bind(this)}><Icon type="close"/></div>
					</div>
				</div>
			</div>
		)
	}
	renderTheme(_, col) {
		let dom
		if (col.color) {
			dom = (
				<ColorPicker
					alpha={col.alpha || 100}
					color={col.rgb || col.color}
					onClose={c => this.changeColor(c, _)}
					placement="bottomLeft"
				/>
			)
		}
		return (
			<div className="pgs-row" key={_}>
				<div className="pgsr-name">{ col.name }</div>
				<div className="pgsr-ctrl">{ dom }</div>
				<div className="pgsr-auth" style={{ width: 40 }}>
					<div className="pgt-edit">
						<div className onClick={this.editKey.bind(this, _, col)}><Icon type="edit"/></div>
						<div className onClick={this.removeKey.bind(this, _)}><Icon type="close"/></div>
					</div>
				</div>
			</div>
		)
	}

	render() {
		let { data, editConfig }  = this.props
		let activeKey = ['0', '1']
		let state     = this.state
		let colors    = data.list[data.idx].colors
		let addNode
		if (Object.keys(colors).length < 50) {
			addNode = (
				<div className="pgs-row">
					<div className="pgsr-name">
						<Select value={state.keyType} onChange={_ => this.onChangeType(_)} style={{ width: '90%' }}>
							<Option value="color">颜色</Option>
							<Option value="picture">图片</Option>
						</Select>
					</div>
					<div className="pgsr-ctrl">
						<Input value={state.keyValue} onChange={_ => this.onChangeValue(_.target.value)} placeholder="字段名" />
					</div>
					<div className="pgsr-auth" style={{ width: 20 }}>
						<div className="pgt-edit">
							<div className onClick={this.addKey.bind(this)}><Icon type="plus"/></div>
						</div>
					</div>
				</div>
			)
		}
		let childNode = Object.keys(colors).map((_, i) => {
			let col = colors[_]
			let dom = this[state.editKey === _? 'renderEdit': 'renderTheme'](_, col)
			return (
				<div key={_}>{ dom }</div>
			)
		})
		return (
			<section className="pg-theme">
				<StyleManage
					data={editConfig.globalData}
					list={data.list}
					idx={data.idx}
					parentKey={'theme'}
					action={'updateGlobal'}
					name={'主题'}
					max={10}
				/>
				<Collapse defaultActiveKey={activeKey}>
					<Panel header={'主题编辑'}>
						{ addNode }
						{ childNode }
					</Panel>
				</Collapse>
			</section>
		)
	}
}

EditTheme.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditTheme)
