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
	Checkbox, Collapse, InputNumber, Radio, Slider, Switch
} from 'antd'
const { Panel }   = Collapse
const RadioButton = Radio.Button
const RadioGroup  = Radio.Group

import * as variable from 'var'
var animeMap = variable.animeMap,
	aStyle   = animeMap.style,
	aGroup   = animeMap.group,
	aMap     = animeMap.map

import './index.less'

class EditAnimation extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange(val, key) {
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		let ani  = data.data.animation
		ani[key] = val
		actions.updateComp(null, parentComp? parentComp: data)
	}

	selectStyle(cls, item) {
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		let { parentComp } = curData
		let ani = data.data.animation
		let { direction } = ani
		ani.direction = ''
		if (cls === ani.className) {
			ani.className = ''
			return actions.updateComp(null, parentComp? parentComp: data)
		}
		if (!direction || !item.list) ani.direction = item.list? item.list[0] || '': ''
		ani.className = cls
		actions.updateComp(null, parentComp? parentComp: data)
	}

	// 无限循环
	renderSwitch(cfg, val, key) {
		let option = cfg.option
		return (
			<RadioGroup size="small" onChange={_ => this.onChange(_.target.value, key)} value={val}>
				{ option.map((_, i) => (<RadioButton key={i} value={_.value}>{_.name}</RadioButton>)) }
			</RadioGroup>
		)
	}
	// 滑块
	renderSlider(cfg, val, key) {
		return (
			<Row>
				<Col span={12}>
					<Slider
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key)}
					/>
				</Col>
				<Col span={3}></Col>
				<Col span={9}>
					<InputNumber
						min={cfg.min || 0} max={cfg.max || 100} step={cfg.step || 1}
						value={val} onChange={v => this.onChange(v, key)}
						style={{ width: '100%' }}
					/>
				</Col>
			</Row>
		)
	}

	render() {
		let { data }  = this.props
		let activeKey = aGroup.map((_, i) => `${i}`)
		let ani = data.data.animation
		let { className, direction, delay, duration, iterationCount } = ani
		let cls = className
		let dirList = aStyle[cls]? aStyle[cls].list || []: []
		let dir
		let typeChild = aGroup.map((_, i) => {
			let styleChild = _.list.map((p, j) => {
				let node = aStyle[p]
				return (
					<li key={j} className={p === cls? 's-active': ''} onClick={this.selectStyle.bind(this, p, node)}>{node.name}</li>
				)
			})
			return (
				<Panel header={_.name} key={i}>
					<ul className="pga-style">{ styleChild }</ul>
				</Panel>
			)
		})

		if (aStyle[cls]) {
			let dirOpt = dirList.map((_, i) => { return { name: aMap[_], value: _ } })
			dir = this.renderSwitch({ option: dirOpt }, direction, 'direction')
		}
		let sTime = this.renderSlider({ max: 20, step: .1 }, delay,     'delay')
		let dTime = this.renderSlider({ max: 20, step: .1 }, duration,  'duration')
		let iCountSwitch = this.renderSwitch({ option: [
			{ name: '数字', value: 1 },
			{ name: '无限', value: 'infinite' }
		] }, iterationCount === 'infinite'? 'infinite': 1, 'iterationCount')
		let iCount = iterationCount !== 'infinite'? this.renderSlider({ min: 1, max: 100, step: 1 }, iterationCount, 'iterationCount'): false
		return (
			<section className="pg-anime">
				<Collapse defaultActiveKey={['0']}>
					<Panel header={'动画设置'}>
						<div className="pgs-row">
							<div className="pgsr-name">延迟时间</div>
							<div className="pgsr-ctrl">{ sTime }</div>
						</div>
						<div className="pgs-row">
							<div className="pgsr-name">持续时间</div>
							<div className="pgsr-ctrl">{ dTime }</div>
						</div>
						<div className="pgs-row">
							<div className="pgsr-name">循环次数</div>
							<div className="pgsr-ctrl">
								{ iCountSwitch }
								{ iCount }
							</div>
						</div>
						<div className="pgs-row">
							<div className="pgsr-name">方向</div>
							<div className="pgsr-ctrl">{ dir }</div>
						</div>
					</Panel>
				</Collapse>
				<Collapse defaultActiveKey={activeKey}>
					{ typeChild }
				</Collapse>
			</section>
		)
	}
}

EditAnimation.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditAnimation)
