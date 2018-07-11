/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-19T14:29:30+08:00
 */

import React from 'react'
import './index.less'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

const pageC    = require('state/page')
const comp     = require('state/comp')
const compC    = require('state/compChild')
const compP    = require('state/compParent')
const compList = require('state/compList')

import * as actions from 'actions'

import { Input, message, Spin } from 'antd'
import * as variable from 'var'
let compMap = variable.compMap.name
 
class Header extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: tempCfg.name || '',
			loading: false
		}
	}
	componentWillMount() {}
	componentDidMount() {}
	componentWillUnmount() {}

	addComp(item) {
		let { actions, editConfig } = this.props
		let { curComp, curData } = editConfig
		let { parentComp } = curData
		let { key } = item
		if (!key) return
		if (curComp.type === 'advanced' || parentComp) {
			let compData = JSON.parse(JSON.stringify(comp[key])),
				Comp     = parentComp || curComp,
				auth     = compC[Comp.name]
			if (compData.type === 'base' && auth[key]) {
				Comp.data.components.push(compData)
				message.success(`添加子组件: ${compMap[key]}!`)
				return actions.updateComp(null, Comp)
			} else {
				message.info('该高级组件内不能添加该基础组件!')
			}
		} else {
			if (compP[key]) {
				message.success(`添加组件: ${compMap[key]}!`)
				return actions.addComp(editConfig.curData.router, key)
			}
			message.info('该组件内只能添加在高级组件中!')
		} 
	}
	selectTheme() {
		let { actions, editConfig } = this.props
		editConfig.curData.contentType = 'theme'
		actions.updateCur(editConfig.curData)
	}
	saveData() {
		let { editConfig, location } = this.props
		let { query } = location
		let { templateType, id, composeType, adsFlag } = tempCfg
		let cfg = deepCopy(editConfig)

		let gd = cfg.globalData
		cfg.globalData = {
			data:    gd.data,
			theme:   gd.theme,
			feature: gd.feature
		}
		// this.setState({ loading: true })
		let config = {
			configPC: {
				// pageContent: dataFormat.save.pageEach(cfg.pageContent),
				pageContent: cfg.pageContent,
				pageList:    cfg.pageList,
				globalData:  cfg.globalData
			}
		}
		// this.setState({ loading: false })
		// return false
		let da = {
			adsFlag: adsFlag || 0,
			config: JSON.stringify(config),
			coverImgUrl:  '',
			templateType: templateType,
			composeType:  composeType,
			name:         this.state.name
		}
		this.setState({ loading: true })
		if (id) da.id = id
		Ajax.post(`/mcp-gateway/template/${query.id? 'update': 'save'}?`, da).then(res => {
			if (!query.id) {
				tempCfg.id = res.data
				hashHistory.push(`/operate/edit?id=${res.data}`)
			}
			Ajax.createCrop({
				url: `${window.location.origin}${window.location.pathname}#/view?id=${tempCfg.id}&s=template`,
				w: 540,
				h: 960,
				t: 1000
			}).then(cover => {
				Ajax.post(`/mcp-gateway/template/updateCoverImgUrl`, {
					templateId: tempCfg.id,
					coverImgUrl: cover.data
				}).then(() => {
					this.setState({ loading: false })
					message.success(`${query.id? '更新': '保存'}成功!`)
				}).catch(e => { this.setState({ loading: false }) })
			}).catch(e => { this.setState({ loading: false }) })
		}).catch(e => { this.setState({ loading: false }) })
		// console.log(JSON.stringify(config))
	}
	tNameChange(name) {
		this.setState({ name: name })
		tempCfg.name = name
	}
	closeWin() {
		window.location.href = 'about:blank'
		window.close()
	}
	render() {
		let loading = this.state.loading? (<div className="spin-mask"><Spin /></div>): false
		let compListNode = compList.map((_, i) => {
			let { icon, child, name } = _
			return (
				<dl key={i} className={`cl-item${child? ' cl-item-child': ''}`}>
					<dt onClick={this.addComp.bind(this, _)}>
						<div className="cl-item-icon">
							<img src={require(`images/icon/${icon}.png`)}/>
						</div>
						{name}
						{ child && (<s className="icon-arrow-down"></s>) }
					</dt>
					{
						child && (
						<dd>
							{
								child && child.map((__, j) => {
									return (
										<div key={j} onClick={this.addComp.bind(this, __)}>
											<div className="cl-item-icon">
												<img src={require(`images/icon/${__.icon}.png`)}/>
											</div>
											{__.name}
										</div>
									)
								})
							}
						</dd>
						)
					}
				</dl>
			)
		})
					// <Input
					// 	value={this.state.name}
					// 	placeholder={'模板名称'}
					// 	onChange={e => this.tNameChange(e.target.value)}
					// />
		return (
			<div className="pe-header e-flex">
				{ loading }
				<div className="peh-left">
					<div className="logo"></div>
				</div>

				<div className="peh-center">
					<section className="comp-list">
						{ compListNode }
					</section>
				</div>

				<div className="peh-right">
					<section className="comp-list comp-list-b">
						<div className="cl-item" onClick={this.selectTheme.bind(this)}>
							<div className="cl-item-icon">
								<img src={require(`images/icon/theme.png`)}/>
							</div>
							主题
						</div>
						<div className="cl-item" onClick={this.saveData.bind(this)}>
							<div className="cl-item-icon">
								<img src={require(`images/icon/save.png`)}/>
							</div>
							保存
						</div>
						<div className="cl-item" onClick={this.closeWin}>
							<div className="cl-item-icon">
								<img src={require(`images/icon/exit.png`)}/>
							</div>
							离开
						</div>
					</section>
				</div>
			</div>
		)
	}
}


Header.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
