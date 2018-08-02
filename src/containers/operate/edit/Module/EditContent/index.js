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

import { Checkbox, Collapse, Icon, Input, InputNumber, Radio, Select, Switch } from 'antd'
const  { TextArea } = Input
const  { Panel }    = Collapse
const RadioButton   = Radio.Button
const RadioGroup    = Radio.Group
const Option = Select.Option

import RouterJump        from 'compEdit/EditCommon/RouterJump'
import ImageUploadComp   from 'compEdit/EditCommon/ImageUploadComp'
import HtmlUpload        from 'compEdit/EditCommon/HtmlUpload'
import CompLayout        from 'compEdit/EditCommon/CompLayout'
import ChildElement      from './ChildElement'

import SwiperImage       from './SwiperImage'
import Navigation        from './Navigation'
import NavigationFloat   from './NavigationFloat'
import Weather           from './Weather'
import WonderfulActivity from './WonderfulActivity'
import ListByStore       from './ListByStore'
import ThemeColor        from './ThemeColor'
import filterContent     from './filter'
import SwiperByGoods     from './SwiperByGoods'

import * as variable from 'var'

var conMap = variable.contentMap
var plMap  = {
	listByGoods:   'filterBox',
	swiperByGoods: 'filterBox'
}
var mockMap  = {
	listByGoods: { type: 'list', name: 'goods', field: 'size' },
	goodsBlock:  { type: 'item', name: 'goods' },
	goodsBar:    { type: 'item', name: 'goods' },
	pictureListBind: { type: 'item', name: 'goods' },
	swiperByGoods:   { type: 'item', name: 'goods' }
}

import './index.less'

const compContent = (name, data, onChange) => {
	var props  = { data, onChange }
	var render = {
		navigation:        <Navigation        {...props} />,
		navigationFloat:   <NavigationFloat   {...props} />,
		weather:           <Weather           {...props} />,
		wonderfulActivity: <WonderfulActivity {...props} />,
		swiperImage:       <SwiperImage       {...props} />,
		listByStore:       <ListByStore       {...props} />,
		map2D:             <ThemeColor        {...props} />,
		floorMap:          <ThemeColor        {...props} />,
		swiperByGoods:     <SwiperByGoods     {...props} />
	}
	return render[name]
}

class EditContent extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	updateComp = () => {
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { content } = data.data
		let { parentComp } = curData
		actions.updateComp(null, parentComp? parentComp: data)
	}
	onChange = (val, con, key, cfg, index) => {
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { content } = data.data
		let { parentComp } = curData
		val = val > cfg.max ? cfg.max : val 
		con[key] = val
		actions.updateComp(null, parentComp? parentComp: data)
	}

	onChangeAuth(val, key) {
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		data.auth.content[key] = val
		actions.updateComp(null, parentComp? parentComp: data)
	}

	deleteCom(index) { 
		let { data, actions, editConfig } = this.props;
		let { curData, curComp } = editConfig
		let { content } = data.data
		let { parentComp } = curData
		if(getAttr(content) === 'Array') {
			content = content.filter((item,i) => i!=index)
			data.data.content = content
			actions.updateComp(null, parentComp? parentComp: data)
		}   
		
	}
	/* 渲染组件开始 */
	// 文本
	renderTextarea(cfg, con, val, key, index) {
		return (
			<TextArea
				min={cfg.min || 0} max={cfg.max || 100}
				placeholder={cfg.placeholder || '右侧编辑内容'}
				autosize={cfg.autosize || false}
				value={val} onChange={v => this.onChange(v.target.value, con, key,cfg, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 数字
	renderNumber(cfg, con, val, key, index) {
		return (
			<InputNumber
				min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
				value={val} onChange={v => this.onChange(v, con, key,cfg, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 标题
	renderTitle(cfg, con, val, key, index) {
		return (
			<Input
				min={cfg.min || 0} max={cfg.max || 100}
				value={val} onChange={v => this.onChange(v.target.value, con, key,cfg, index)}
				style={{ width: '100%' }}
			/>
		)
	} 
	// 跳转路由
	renderRouter(cfg, con, val, key, index) {
		let { data, actions } = this.props
		return (
			<RouterJump data={data} content={val} actions={actions} />
		)
	}
	// 上传图片
	renderImage(cfg, con, val, key, index) {
		let { data } = this.props
		return (
			<ImageUploadComp
				data={data}
				img={val}
				name={key}
				action={'updateComp'}
				style={{ width: '100%' }}
				index={index}
			/>
		)
	}
	// 上传视频
	renderVideo(cfg, con, val, key, index) {
		let { data } = this.props
		return (
			<ImageUploadComp
				data={data}
				img={val}
				name={`video`}
				action={'updateComp'}
				style={{ width: '100%' }}
			/>
		)
	}
	// 上传组件
	renderFile(cfg, con, val, key, index) {
		return (
			<HtmlUpload
				data={val}
				style={{ width: '100%' }}
				onChange={v => this.onChange(v, con, key,cfg, index)}
			/>
		)
	}
	// 网址
	renderUrl(cfg, con, val, key, index) {
		return (
			<Input
				minLength={cfg.min || 0} maxLength={cfg.max || 100}
				defaultValue={val} onBlur={v => this.onChange(v.target.value, con, key,cfg, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 文本
	renderInput(cfg, con, val, key, index) {
		return (
			<Input
				minLength={cfg.min || 0} maxLength={cfg.max || 100}
				defaultValue={val} onChange={v => this.onChange(v.target.value, con, key,cfg, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 开关
	renderCheckbox(cfg, con, val, key, index) {
		return (
			<Checkbox
				checked={val || cfg.defaultValue || false} onChange={v => this.onChange(v.target.checked, con, key, cfg, index)}
			/>
		)
	}
	renderSwitch(cfg, con, val, key, index) {
		return (
			<Switch
				size="small"
				checked={val || false} onChange={v => this.onChange(v, con, key, cfg, index)}
			/>
		)
	}
	// 筛选框
	renderRadio(cfg, con, val, key, index) {
		let { option } = cfg
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, con, key, cfg, index)} value={val}>
				{ option.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
			</RadioGroup>
		)
	}
	// 筛选框
	renderRadioMix(cfg, con, val, key, index) {
		let { option } = cfg
		return (
			<div className="sc-radio-group">
				{ option.map((_, i) => (
					<span
						key={i}
						className={`sc-radio-button-wrapper${val === _.value? ' s-active': ''}`}
						value={_.value}
						onClick={e => this.onChange(_.value, con, key, cfg, index)}
					>{_.name}</span>
				)) }
			</div>
		)
	}
	// 绑定
	renderBind(cfg, con, val, key, index) {
		let { data } = this.props
		let { item, map } = this.createMock(data.name)
		let opts = Object.keys(map).map((_, i) => {
			return <Option key={i} value={_}>{map[_]}</Option>
		})
		return (
			<div>
				<Select
					value={val}
					style={{ width: '100%' }}
					onChange={v => this.onChange(v, con, key, cfg, index)}
				>
					<Option value={''}>无</Option>
					{ opts }
				</Select>
			</div>
		)
	}
	// 复合
	renderOptions(cfg, con, val, key, index) {
		const keys      = Object.keys(val)
		const childNode = keys.map((_, i) => {
			if (_ === 'name') return null
			let v  = val[_],
				cm = conMap[_],
				fn = this[`render${cm.type}`],
				dom = fn.bind(this, cm, val, v, _)()
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name" style={{ width: 52 }}>{ cm.name }</div>
					<div className="pgsr-ctrl">{ dom }</div>
				</div>
			)
		})

		return (
			<div>{ childNode }</div>
		)
	}

	renObj(data, content, index) {
		content = filterContent(data,content)
		let ci = 0
		let childNode = Object.keys(content).map((p, i) => {
			if (!conMap[p]) return false
			let cm     = conMap[p]
			let val    = content[p]
			let render = this[`render${cm.type}`]
			if (!render) return false
			// 根据样式类型渲染对应组件
			let dom = this[`render${cm.type}`].bind(this, cm, content, val, p, index)()
			ci++
			return (
				<div className="pgs-row" key={i} style={{display:`${content.isShowDom&&(p=='size'||p=='pageSwitch') ? content.isShowDom :'flex'}`}}>
					<div className="pgsr-name">{ cm.name }</div>
					<div className="pgsr-ctrl">{ dom }</div>
					<div className="pgsr-auth">
						<Checkbox checked={data.auth.content[p]} onChange={_ => this.onChangeAuth(_.target.checked, p)} />
					</div>
					{  
						data.name !='picture'&&cm.name=='图片'?<div className="delete" onClick={()=>{this.deleteCom(index)}}><Icon type="close-circle" style={{ fontSize: 18}} /></div>:null
					} 
				</div> 
			)
		})
		if (!ci) return false
		return childNode
	}

	createMock(cn, da) {
		var obj = {},
			mk  = mockMap[cn]
		if (!mk) return {}
		var { type, name, field } = mk
		obj[type]  = mock[type][name]()
		obj.map    = mock.map[name]()
		if (da) obj.layout = plMap[cn]? da.style[plMap[cn]]: da.layout
		return obj
	}

	render() {
		let { data, actions, editConfig } = this.props
		let compName = data.name
		if (!compName) return false
		let { curData } = editConfig
		let { parentComp } = curData
		let da = data.data
		let { content } = da
		let compLay = da.componentLayout
		let mockData = {}
		let parentLayout,
			childNode,
			activeKey,
			feature,
			compCon = compContent(compName, this.props, this.onChange)

		if (content.length) {
			activeKey = Array.from(new Array(content.length + 1), (_, i) => `${i}`)
			childNode = content.map((_, i) => {
				return (
					<Panel header={`内容${i + 1}`} key={i + 1}>
						{ this.renObj(data, _, i) }
					</Panel>
				)
			})
		} else {
			activeKey = ['0']
			let con = this.renObj(data, content)
			childNode = (
				con.length
				? 
				<Panel header={'内容编辑'} key={0}>
					{ con }
				</Panel>
				: null
			)
		}
		if (parentComp) {
			mockData = this.createMock(compName, da)
		}
		return (
			<section className="ry-roll-screen-config">
				{
					compLay
					?
					<Collapse defaultActiveKey={['0', '1']}>
						<Panel header={`编辑布局`} key={0}>
							<CompLayout list={mockData.list} item={mockData.item} map={mockData.map} props={this.props} layout={compLay} parentLayout={mockData.layout} updateComp={this.updateComp} />
						</Panel>
						<Panel header={`子元素`} key={1}>
							<ChildElement name={compName} layout={compLay} map={mockData.map} updateComp={this.updateComp} />
						</Panel>
					</Collapse>
					: null
				}
				{ compCon }
				<Collapse defaultActiveKey={activeKey}>
					{ childNode }
				</Collapse>
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
