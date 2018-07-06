/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

const initMap = {
	floor:  '',
	letter: '',
	catg:   '',
	page:   1
}

class Reset extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	selectVal(body) {
		let { parent, actions, ioInput, ioOuter } = this.props
		for (let p in body) {
			let im = initMap[p]
			if (im !== undefined) body[p] = im
		}
		ioOuter(ioInput)
	}

	renderStyle1(props, body) {
		let con = props.data.data.content
		let { floor, letter, catg } = body
		let { filterBGImg, text } = con
		let css = cssColorFormat(props, 'filter')
		if (floor === '' && letter === '' && catg === '') css = { ...css, ...cssColorFormat(props, 'filterActive') }
		return (
			<div style={css} onClick={this.selectVal.bind(this, body)}>{ text }</div>
		)
	}

	
	render() {
		let { type, editConfig, ioInput } = this.props
		let render = this[`render${type}`]? this[`render${type}`]: this.renderStyle1
		let dom    = render.bind(this, this.props, ioInput.body)()
		return (
			<section className={`e-reset ${type}`}>
				{ dom }
			</section>
		)
	}
}

export default Reset
