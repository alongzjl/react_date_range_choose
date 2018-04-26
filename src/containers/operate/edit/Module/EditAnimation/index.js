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
import * as actions from 'actions'

import Picture from 'components/EditAnimation/Picture'
import Web     from 'components/EditAnimation/Web'


import './index.less'

class EditAnimation extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentWillReceiveProps(nv) {
		this.props.comp.curData.comp
		nv.comp.curData.comp
		// debugger
		if (this.props.comp.curData.comp) {}
	}

	render() {
		let { comp, data } = this.props

		var compName = data.name,
			compCon
		if (compName === 'picture')  compCon = (<Picture data={data}></Picture>)
		else if (compName === 'web') compCon = (<Web data={data}></Web>)
		return (
			<section className="ry-roll-screen-config">
				{ compCon }
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
