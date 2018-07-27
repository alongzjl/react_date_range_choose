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

import { Checkbox, Collapse, Icon, Input, InputNumber, Select } from 'antd'
const  { TextArea } = Input
const  { Panel }    = Collapse
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
import Page              from './Page'
import ListByStore       from './ListByStore'
import ThemeColor        from './ThemeColor'
import filterContent     from './filter'

import * as variable from 'var'

var conMap = variable.contentMap
var plMap  = {
	listByGoods: 1
}

import './index.less'

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
	onChange(val, con, key, cfg, index) {
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

	cb(key) {
		// console.log(key)
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
				checked={val || cfg.defaultValue || false} onChange={v => this.onChange(v.target.checked, con, key,cfg, index)}
			/>
		)
	}
	// 绑定
	renderBind(cfg, con, val, key, index) {
		let { editConfig } = this.props
		let { parentComp } = editConfig.curData
		let { item, map }  = parentComp.feature
		let opts = Object.keys(map).map((_, i) => {
			return <Option key={i} value={_}>{map[_]}</Option>
		})
		return (
			<div>
				<Select
					value={val}
					style={{ width: '100%' }}
					onChange={v => { this.onChange(v, con, key, cfg, index) }}
				>
					<Option value={''}>无</Option>
					{ opts }
				</Select>
			</div>
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

	render() {
		let { data, actions, editConfig } = this.props
		let compName = data.name
		if (!compName) return false
		let { curData } = editConfig
		let { parentComp } = curData
		let da = data.data
		let { content } = da
		let compLay = da.componentLayout
		let compCon
		let childNode
		let activeKey
		let feature
		let parentLayout = {}
		if (compName === 'navigation')             compCon = (<Navigation        data={this.props}/>)
		else if (compName === 'navigationFloat')   compCon = (<NavigationFloat   data={this.props}/>)
		else if (compName === 'weather')           compCon = (<Weather           data={this.props}/>)
		else if (compName === 'wonderfulActivity') compCon = (<WonderfulActivity data={this.props}/>)
		else if (compName === 'swiperImage')       compCon = (<SwiperImage       data={this.props}/>)
		else if (compName === 'listByStore')       compCon = (<ListByStore       data={this.props}/>)
		else if (compName === 'map2D')             compCon = (<ThemeColor        data={this.props}/>)
		else if (compName === 'floorMap')          compCon = (<ThemeColor        data={this.props}/>)	
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
			parentLayout = plMap[compName]? da.style.filter: da.layout
			feature = parentComp.feature
		}
		return (
			<section className="ry-roll-screen-config">
				{ compCon }
				{
					compLay
					?
					<Collapse activeKey={['0', '1']}>
						<Panel header={`编辑布局`} key={0}>
							<CompLayout list={feature.list} item={feature.item} map={feature.map} layout={compLay} parentLayout={parentLayout} updateComp={this.updateComp} />
						</Panel>
						<Panel header={`子元素`} key={1}>
							<ChildElement name={compName} layout={compLay} updateComp={this.updateComp} />
						</Panel>
					</Collapse>
					: null
				}
				<Collapse activeKey={activeKey} onChange={this.cb}>
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
