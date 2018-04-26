/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import $ from 'jquery'
import classnames from 'classnames'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

import Rnd from 'react-rnd'

import Picture from 'components/EditElement/Picture'
import Web     from 'components/EditElement/Web'

import * as actions from 'actions'

import './index.less'

class EditElement extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentWillReceiveProps(nv) {
		this.props.comp.curData.comp
		nv.comp.curData.comp
		// debugger
		if (this.props.comp.curData.comp) {}
	}
	resizeStart(idx) {
		actions.updateCompIdx(idx)
	}

	resizeStop(e, item, idx) {
		let { actions } = this.props
		let lay = item.style.layout,
			sty = e.style,
			xy  = sty.transform.match(/(\d+)/g)
		console.clear()
		lay.left   = xy[0] * 1
		lay.top    = xy[1] * 1
		lay.width  = parseInt(sty.width)
		lay.height = parseInt(sty.height)
		console.log(item.style.layout)
		actions.updateCompIdx(idx)
		actions.updateComp(item)
	}

	dragStart(idx) {
		let { actions } = this.props
		actions.updateCompIdx(idx)
	}

	dragStop(e, item, idx) {
		let { actions } = this.props
		let lay  = item.style.layout
		lay.left = e.x
		lay.top  = e.y
		console.clear()
		console.log(item.style.layout)
		actions.updateComp(item)
	}

	render() {
		let { comp, data } = this.props
		let childNode = data.elements.map((_, i) => {
			var compName = _.name,
				compCon
			if (compName === 'picture')  compCon = (<Picture data={_}></Picture>)
			else if (compName === 'web') compCon = (<Web data={_}></Web>)
			return (
				<Rnd
					default={{
						x:      _.style.layout.left,
						y:      _.style.layout.top,
						width:  _.style.layout.width,
						height: _.style.layout.height,
					}}
					onDragStart={this.dragStart.bind(this, i)}
					onDragStop={(e, d) => this.dragStop(d, _, i)}
					onResizeStart={this.resizeStart.bind(this, i)}
					onResizeStop={(e, n, d) => this.resizeStop(d, _, i)}
				>
					<div>{ compCon }</div>
				</Rnd>
			)
		})
		return (
			<section className="pg-element">
				{ childNode }
			</section>
		)
	}
}

EditElement.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditElement)
