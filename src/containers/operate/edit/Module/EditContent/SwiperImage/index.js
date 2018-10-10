/**
 * @Author: Along
 * @Date:   2018-05-03

 */
import React from 'react'
import './index.less'

import  SwiperSame  from '../SwiperSame'

import { Row, Col, Collapse, Icon } from 'antd'
const  { Panel }    = Collapse


class SwiperImage extends React.Component {

	constructor(props) {
		super(props)

	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	addImg() {
		let props = this.props.data
		if (!props.editConfig) props = props.data
		if (!props.editConfig) return
		let { data, actions, editConfig } = props
		let { curData }    = editConfig
		let { content }    = data.data
		let { parentComp } = curData
		content.push({
			img: { type: 'custom', img: '' },
			router: {},
			type:'image'
		})
		actions.updateComp(null, parentComp? parentComp: data)
	}
	addVideo() {
		let props = this.props.data
		if (!props.editConfig) props = props.data
		if (!props.editConfig) return
		let { data, actions, editConfig } = props
		let { curData }    = editConfig
		let { content }    = data.data
		let { parentComp } = curData
		content.push({
			img: { type: 'custom', video: '' },
			router: {},
			type:'video'
		})
		actions.updateComp(null, parentComp? parentComp: data)
	}
	render() {
		let props = this.props.data
		if (!props.editConfig) props = props.data
		if (!props.editConfig) return
		let { data, actions, editConfig } = props
		let { curData }    = editConfig
		let { content }    = data.data
		return (
			<div>
				{ content.length > 1? <SwiperSame data={props} />: false }
				<Collapse activeKey={['0']} onChange={this.cb}>
					<Panel header={`添加`} key={0}>
						<div className="pgs-row" key={0}>
							<div className="pgsr-name">添加</div>
							<div className="pgsr-ctrl">
								<div className="pg-img-upload">
									<Row type="flex" align="middle" style={{ width: '100%' }}>
										<Col span={9}>
											<div className="add_img" onClick={this.addImg.bind(this)}>
												<div className="add_text"><Icon type="picture" /></div>
											</div>
										</Col>
									</Row>
								</div>
							</div>
							<div className="pgsr-ctrl">
								<div className="pg-img-upload">
									<Row type="flex" align="middle" style={{ width: '100%' }}>
										<Col span={9}>
											<div className="add_img" onClick={this.addVideo.bind(this)}>
												<div className="add_text"><Icon type="video-camera" /></div>
											</div>
										</Col>
									</Row>
								</div>
							</div>
						</div>
					</Panel>
				</Collapse>
			</div>
		)
	}
}

export default SwiperImage