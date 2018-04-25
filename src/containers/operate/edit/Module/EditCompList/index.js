/**
 * @Author: Liao Hui <liaohui>
 * @Date:   2018-01-25T11:52:09+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T14:11:17+08:00
 */

import React from 'react'
import $ from 'jquery'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
// import RyEditable from '../RyEditable'
// import RyEditableBind from '../RyEditableBind'
import * as actions from 'actions'

import './index.less'

class EditCompList extends React.Component {
	componentWillMount() {
	}

	componentDidMount() {
	}

	componentWillUnmount() {
	}

	addComp(item) {
		this.props.actions.addComp(item.key)
	}

	render() {
		let { comp } = this.props
		let childNodes = comp.compList.map((_, i) => {
			return (
				<div className="cl-item" onClick={this.addComp.bind(this, _)}>{_.name}</div>
			)
		})
			// <RyEditableBind config={{
			// 	sRange: '.ry-roll-screen-preview',
			// 	aData: componmentList,
			// 	bClone: true,
			// 	fnDragEnd: onDragEnd
			// }}>
			// </RyEditableBind>
		return (
			<section className="comp-list">
				{childNodes}
			</section>
		)
	}
}

EditCompList.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditCompList)
