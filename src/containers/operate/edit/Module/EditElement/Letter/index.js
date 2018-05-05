/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

class Letter extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	selectLetter(str) {
		let { parent, actions } = this.props
		if (!parent) return
		let data = parent.feature.api.data
		data.letter = str
		console.log(str)
		debugger
	}

	// 字母+数字
	renderStyle1(letter, num) {
		let arr = [...letter, ...num]
		return (
			<div className="el-6">
				{ arr.map((_, i) => (<div className="el-item" key={i} onClick={this.selectLetter.bind(this, _)}>{_}</div>)) }
			</div>
		)
	}
	// 字母
	renderStyle2(letter, num) {
		let { data } = this.props
		let arr = [...letter]
		return (
			<div>
				{ arr.map((_, i) => (<div className="el-item" key={i}>{_}</div>)) }
			</div>
		)
	}
	// 数字
	renderStyle3(letter, num) {
		let { data } = this.props
		let arr = [...num]
		return (
			<div>
				{ arr.map((_, i) => (<div className="el-item" key={i}>{_}</div>)) }
			</div>
		)
	}
	
	render() {
		let { type } = this.props
		let letter   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
		let num      = Array.from(new Array(10), (_, i) => `${i}`)
		let dom      = this[`render${type}`].bind(this, letter, num)()
		return (
			<section className={`e-letter ${type}`}>
				{ dom }
			</section>
		)
	}
}

export default Letter
