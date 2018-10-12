
 
import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'
import {
	Row, Col, Collapse, InputNumber, Slider, Icon
} from 'antd'
import './index.less'
const Panel  = Collapse.Panel


let musicMap = { type: 'Slider', min: 0, max: 100, step: 1 }
class BackMusic extends React.Component {
	
	onChange(val, key) {
		let { data, action, actions } = this.props
		data.data.music[key] = val
		actions[action](data)
	} 
	addMusic = () => {
		
	}
	removeMusic = () => {

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
	cb = key => {
		console.log(key)
	}
	render() {
		let { data, action, actions } = this.props,
			activeKey = Array.from(new Array(1), (_, i) => `${i}`),
			music = data.data.music,
			btnNode
		if (music.url) {
				btnNode = (
					<div className="add_img add_video">
						<div className="shadow">
							<div className="add_text_change" onClick={this.addMusic}><Icon type="reload" /></div>
							<div className="add_text_remove" onClick={this.removeMusic}><Icon type="close" /></div>
						</div>
					</div>
				)
			} else {
				btnNode = (
					<div className="add_img" onClick={this.addMusic}>
						<div className="add_text"><Icon type="plus" /></div>
					</div> 
				)
			}
		return (
			<Collapse defaultActiveKey={activeKey} onChange={this.cb}>
				<Panel header={`背景音乐管理`} key={0}>
					<div className="pgs-row" key={0}>
						<div className="pgsr-name">背景音乐</div>
						<div className="pgsr-ctrl">
							<div className="pg-img-upload">
								<Row type="flex" align="middle" style={{ width: '100%' }}>
									<Col span={9}>
										{ btnNode }
									</Col>
								</Row>
							</div>
						</div>
						<div className="pgsr-auth"></div>
					</div>
					<div className="pgs-row" key={1}>
						<div className="pgsr-name">音量调节</div>
						<div className="pgsr-ctrl">
							{this.renderSlider.bind(this,musicMap,music.volume,'volume')()}
						</div>
						<div className="pgsr-auth"></div>
					</div>
				</Panel>
			</Collapse>
		)
	}
}

BackMusic.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(BackMusic)
