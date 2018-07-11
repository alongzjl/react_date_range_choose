/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import { Row, Col, Icon } from 'antd'

class HtmlUpload extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	fileChange = e => {
		let { onChange } = this.props
		let files = e.target.files,
			file  = files[0],
			// reader = new FileReader()
			// reader.readAsDataURL(f)
			url = URL.createObjectURL(file)
		onChange(url)
		e.target.value = ''
	}
	fileRemove = e => {
		let { onChange } = this.props
		onChange('')
	}

	render() {
		let { data } = this.props
		let btnNode, selectNode
		if (data) {
			btnNode = (
				<Col span={9}>
					<div className="add_img">
						<div className="shadow">
							<div className="add_text_remove" onClick={this.fileRemove}><Icon type="close" /></div>
						</div>
					</div>
				</Col>
			)
		} else {
			btnNode = (
				<Col span={9}>
					<div className="add_img">
						<div className="add_text"><Icon type="plus" /></div>
						<input
							className={'f-upload'}
							type="file"
							accept={'text/html'}
							onChange={this.fileChange}
						/>
					</div>
				</Col>
			)
		}
		return (
			<div>
				<Row type="flex" align="middle" style={{ width: '100%' }}>
					{ btnNode }
					{ selectNode }
				</Row>
			</div>
		)
	}
}

export default HtmlUpload