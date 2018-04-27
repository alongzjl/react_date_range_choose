/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import classnames from 'classnames'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import Picture from 'components/EditStyle/Picture'
import Web     from 'components/EditStyle/Web'
import Text    from 'components/EditStyle/Text' 

import './index.less'

class EditStyle extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let { comp, data } = this.props

		var compName = data.name,
			compCon
		if (compName === 'picture')   compCon = (<Picture data={data}></Picture>)
		else if (compName === 'web')  compCon = (<Web     data={data}></Web>)
		else if (compName === 'text') compCon = (<Text    data={data}></Text>)
		return (
			<section className="ry-roll-screen-config">
				{ compCon }
			</section>
		)
	}
}

EditStyle.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditStyle)
