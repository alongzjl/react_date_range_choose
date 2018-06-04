/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

class Catg extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	selectVal(str) {
		let { parent, actions, ioInput, ioOuter } = this.props
		if (ioInput.body.catg === str || !parent) return
		ioInput.body.catg = str
		ioOuter(ioInput)
	}

	renderDom(props, arr, nowVal) {
		let css = cssColorFormat(props, 'filter')
		return (
			<div style={cssColorFormat(props, 'filterBox')}>
				{ arr.map((_, i) => {
					let nCss = css,
						name = _.name
					if (name === nowVal) nCss = { ...css, ...cssColorFormat(props, 'filterActive') }
					return (
						<div
							key={i}
							className={`el-item${name === nowVal? ' s-active': ''}`}
							style={nCss}
							onClick={this.selectVal.bind(this, name)}
						>
							{name}
						</div>
					)}
				) }
			</div>
		)
	}

	// 字母+数字
	// renderStyle1(catgs, nowVal) {
	// 	let arr = [...catgs]
	// 	return (
	// 		<div className="el-6">
	// 			{
	// 				arr.map((_, i) => {
	// 					return _.checked? (
	// 						<div
	// 							key={i}
	// 							className={`el-item${_.name === nowVal? ' s-active': ''}`}
	// 							onClick={this.selectVal.bind(this, _.name)}
	// 						>
	// 							{_.name}
	// 						</div>
	// 					): false
	// 				})
	// 			}
	// 		</div>
	// 	)
	// }

	renderStyle1(props, catgs, nowVal) {
		return this.renderDom.bind(this, props, catgs, nowVal)()
	}

	
	render() {
		let { type, editConfig, ioInput } = this.props
		let { catgs } = ioInput
		let render    = this[`render${type}`]? this[`render${type}`]: this.renderStyle1
		let dom       = render.bind(this, this.props, catgs, ioInput.body.catg)()
		return (
			<section className={`e-floor ${type}`}>
				{ dom }
			</section>
		)
	}
}

export default Catg
