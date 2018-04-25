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

import Picture from 'components/EditContent/Picture'
import Web     from 'components/EditContent/Web'

import * as actions from 'actions'

import './index.less'

class EditContent extends React.Component {
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
		let { comp } = this.props

		var compName = 'web',
			compCon
		if (compName === 'picture')  compCon = (<Picture></Picture>)
		else if (compName === 'web') compCon = (<Web></Web>)
		return (
			<section className="ry-roll-screen-config">
				{ compCon }
				{ comp.curData.comp.name }
			</section>
		)
	}
}

EditContent.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditContent)
