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

	selectVal(str) {
		let { parent, actions, ioInput, ioOuter } = this.props
		if (ioInput.body.letter === str || !parent) return
		ioInput.body.letter = str
		ioOuter(ioInput)
	}
	renderDom(props, arr, nowVal) {
		let img = props.data.data.content.filterBGImg,
			css = cssColorFormat(props, 'filter')
		return (
			<div style={cssColorFormat(props, 'filterBox')}>
				{ arr.map((_, i) => {
					let nCss = css
					if (_ === nowVal) nCss = { ...css, ...cssColorFormat(props, 'filterActive') }
					return (
						<div
							key={i}
							className={`el-item${_ === nowVal? ' s-active': ''}`}
							style={nCss}
							onClick={this.selectVal.bind(this, _)}
						>
							{_}
						</div>
					)}
				) }
			</div>
		)
	}

	// 字母
	renderStyle1(props, letter, num, nowVal) {
		return this.renderDom.bind(this, props, letter, nowVal)()
	}
	// 数字
	renderStyle2(props, letter, num, nowVal) {
		return this.renderDom.bind(this, props, num, nowVal)()
	}
	// 字母+数字
	renderStyle3(props, letter, num, nowVal) {
		return this.renderDom.bind(this, props, [...letter, ...num], nowVal)()
	}
	
	render() {
		let { type, ioInput } = this.props
		let letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
		let num    = Array.from(new Array(10), (_, i) => `${i}`)
		let render = this[`render${type}`]? this[`render${type}`]: this.renderStyle1
		let dom    = render.bind(this, this.props, letter, num, ioInput.body.letter)()
		return (
			<section className={`e-letter ${type}`}>
				{ dom }
			</section>
		)
	}
}

export default Letter
