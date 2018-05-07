/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

class Floor extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	selectVal(str) {
		let { parent, actions, ioInput, ioOuter } = this.props
		if (ioInput.api.body.floor === str || !parent) return
		ioInput.api.body.floor = str
		ioOuter(ioInput)
	}

	// 字母+数字
	renderStyle1(floors, nowVal) {
		let arr = [...floors]
		return (
			<div className="el-6">
				{
					arr.map((_, i) => {
						return _.checked? (
							<div
								key={i}
								className={`el-item${_.name === nowVal? ' s-active': ''}`}
								onClick={this.selectVal.bind(this, _.name)}
							>
								{_.name}
							</div>
						): false
					})
				}
			</div>
		)
	}
	
	render() {
		let { type, editConfig, ioInput } = this.props
		let { floors } = ioInput
		let dom = this[`render${type}`].bind(this, floors, ioInput.api.body.floor)()
		return (
			<section className={`e-letter ${type}`}>
				{ dom }
			</section>
		)
	}
}

export default Floor
