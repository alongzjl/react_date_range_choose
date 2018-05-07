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

import { Checkbox, Collapse, Icon, Input, Select } from 'antd'
const  { TextArea } = Input
const  { Panel }    = Collapse
const Option = Select.Option

import RouterJump      from 'compEdit/EditCommon/RouterJump'
import ImageUploadComp from 'compEdit/EditCommon/ImageUploadComp'

// import Picture     from './Picture'
// import Web         from './Web'
// import Text        from './Text'
// import SwiperImage from './SwiperImage'
import Floor           from './Floor'
import StoreList       from './StoreList'
import Navigation      from './Navigation'
import NavigationFloat from './NavigationFloat'
import Date            from './Date'

var conMap = {
	text:   { name: '文本内容', type: 'Textarea', max: 1000, autosize: { minRows: 1, maxRows: 6 } },
	title:  { name: '标题',    type: 'Title',    max: 30 },
	img:    { name: '图片',    type: 'Image' },
	url:    { name: '网址',    type: 'Url' },
	router:  {name: '页面跳转', type: 'Router' } 
}

import './index.less'

class EditContent extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(val, key, index) {
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		data.content[index][key]  = val
		actions.updateComp(null, parentComp? parentComp: data)
	}  

	onChangeAuth(val, key, index) {
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		data.auth.content[index][key] = val
		actions.updateComp(null, parentComp? parentComp: data)
	} 

	cb(key) {
		// console.log(key)
	}
	deleteCom(index) { 
		let {data,actions,editConfig} = this.props;
		let { curData, curComp } = editConfig
		let { parentComp } = curData
		if(Object.prototype.toString.call(data.content)=='[object Array]'){
			let content = data.content.filter((item,i) => i!=index);
			data.content = content;
			actions.updateComp(null, parentComp? parentComp: data)
		}   
		
	}
	/* 渲染组件开始 */
	// 文本
	renderTextarea(cfg, data, val, key, index) {
		return (
			<TextArea
				min={cfg.min || 0} max={cfg.max || 100}
				autosize={cfg.autosize || false}
				value={val} onChange={v => this.onChange(v.target.value, key, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 标题
	renderTitle(cfg, data, val, key, index) {
		return (
			<Input
				min={cfg.min || 0} max={cfg.max || 100}
				value={val} onChange={v => this.onChange(v.target.value, key, index)}
				style={{ width: '100%' }}
			/>
		)
	} 
	// 跳转路由
	renderRouter(cfg, data, val, key,content,index,editConfig) {

		let childNodeRoouters = Object.keys(editConfig.pageContent).map((item,i) => {
			return (
					<Option value={editConfig.pageContent[item].router} key={item}>{editConfig.pageContent[item].title}</Option> 
				)  
		})   
		return ( 
			
			<Select defaultValue={editConfig.pageContent['p_1000'].router} style={{ width: '100%' }} onChange={value => this.onChange(value, key,index)}>
				{       
					childNodeRoouters 
				} 
			 </Select>
		)
	}
	// 上传图片
	renderImage(cfg, data, val, key, content,index) {
		return (
			<ImageUploadComp
				data={data}
				img={val}
				name={key}
				content={content}
				action={'updateComp'}
				style={{ width: '100%' }}
				index={index}
			/>
		)
	}
	// 网址
	renderUrl(cfg, data, val, key, index) {
		return (
			<Input
				min={cfg.min || 0} max={cfg.max || 100}
				defaultValue={val} onBlur={v => this.onChange(v.target.value, key, index)}
				style={{ width: '100%' }}
			/>
		)
	}
	// 楼层
	renderCheckbox(cfg, data, val, key) {
		return (
			<div>
				<span style={{ marginRight: 10 }}>{val.value}</span>
				<Checkbox
					value={cfg.defaultValue} onChange={v => this.onChange({ value: val.value, checked: v.target.checked }, key)}
				/>
			</div>
		)
	}

	renObj(data, content,index) {
		let childNode = Object.keys(content).map((p, i) => {
			if (!conMap[p]) return false
			let cm     = conMap[p]
			let val    = content[p]
			let render = this[`render${cm.type}`]
			if (!render) return false
			// 根据样式类型渲染对应组件
			let dom = this[`render${cm.type}`].bind(this, cm, data, val, p, index, editConfig)()
			return (
				<div className="pgs-row" key={i}>
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
		if (compName === 'navigation')           compCon = (<Navigation  data={this.props}/>)
		else if (compName === 'navigationFloat')            compCon = (<NavigationFloat       data={this.props}/>)
		else if (compName === 'date')            compCon = (<Date        data={this.props}/>)
		else if (compName === 'storeList')       compCon = (<StoreList   data={data}/>)
		else if (compName === 'floor')           compCon = (<Floor       data={data}/>)
		// if (compName === 'picture')           compCon = (<Picture     data={data}/>)
		// else if (compName === 'web')          compCon = (<Web         data={data}/>)
		// else if (compName === 'text')         compCon = (<Text        data={data}/>)
		// else if (compName === 'swiperImage')  compCon = (<SwiperImage data={data}/>)
		if (content.length) {
			activeKey = Array.from(new Array(content.length), (_, i) => `${i}`)
			childNode = content.map((_, i) => {
				return (
					<Panel header={`内容${i + 1}`} key={i}>
						{ this.renObj(data, _, i) }
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
			let con = this.renObj(data, content)
			childNode = (
				con.length
				? 
				<Panel header={'内容编辑'} key={0}>
					{ con }
				</Panel>
				:
				false
			)
		}
		return (
			<section className="ry-roll-screen-config">
				{ compCon }
				<Collapse activeKey={activeKey} onChange={this.cb}>
					{
						data.name == 'swiperImage' ? <Panel header={`内容`} key={0}>
							<div className="pgs-row" key={0}>
								<div className="pgsr-name">内容</div>
								<div className="pgsr-ctrl">
									<ImageUploadComp
										data={data}
										img={{}}
										name={`first`}
										content={data.content}
										action={'updateComp'}
										style={{ width: '100%' }}
									/>
								</div>
							</div>
						</Panel> : null
					}
					{
						!(data.name == 'swiperImage'&& data.content.length==1&&data.content[0].img.img == '') ? childNode : null
					}
				</Collapse>
				{ routerJump }
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
