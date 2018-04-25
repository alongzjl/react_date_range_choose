/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-19T14:29:30+08:00
 */

import React from 'react'
import $ from 'jquery'
import './index.less'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

import EditCompList   from '../EditCompList'

import * as actions from 'actions'

class Header extends React.Component {
	componentWillMount() {
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	render() {
		let { config } = this.props
		// debugger
		// this.props.actions.addComp('picture')
		return (
			<div className="pe-header e-flex">
				<div className="peh-left"></div>
				<div className="peh-center">
					<EditCompList />
				</div>
				<div className="peh-right"></div>
			</div>
		)
	}
}


Header.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header)
