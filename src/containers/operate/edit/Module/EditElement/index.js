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

import Rnd from 'react-rnd'

import Picture from 'components/EditElement/Picture'
import Web     from 'components/EditElement/Web'
import Text    from 'components/EditElement/Text' 

import * as actions from 'actions'

import './index.less'

class EditElement extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	selectComp(idx) {
		let { actions, editConfig } = this.props
		editConfig.curData.compIdx = idx
		actions.updateCur(editConfig.curData)	// 更新 当前数据
	}

	resizeFn(ref, delta, pos, item, idx) {
		let { actions, curData, curPage, pageContent } = this.props
		let lay = item.style.layout
		console.clear()
		lay.left   = pos.x
		lay.top    = pos.y
		lay.width  = ref.offsetWidth
		lay.height = ref.offsetHeight
		console.log(item.style.layout)

		actions.updateComp(idx, item)
	}

	dragStop(e, item, idx) {
		let { actions, editConfig } = this.props
		let lay  = item.style.layout
		lay.left = e.x
		lay.top  = e.y
		console.clear()
		console.log(item.style.layout)

		actions.updateComp(idx, item)
	}

	render() {
		let { editConfig, data } = this.props
		let childNode = data.elements.map((_, i) => {
			var compName = _.name,
				compCon,
				isEdit = true
			if (compName === 'picture')   compCon = (<Picture data={_}/>)
			else if (compName === 'web')  compCon = (<Web     data={_}/>)
			else if (compName === 'text') compCon = (<Text    data={_}></Text>) 
			return (
				<Rnd
					key={i}
					bounds={'.pg-center'}
					className={i === editConfig.curData.compIdx? 's-active': ''}
					size={{
						width:  _.style.layout.width,
						height: _.style.layout.height
					}}
					position={{
						x: _.style.layout.left,
						y: _.style.layout.top
					}}
					onDragStart={this.selectComp.bind(this, i)}
					onDragStop={(e, d) => this.dragStop(d, _, i)}
					onResizeStart={this.selectComp.bind(this, i)}
					onResizeStop={(e, dir, ref, delta, pos) => this.resizeFn(ref, delta, pos, _, i)}
				>
					<div className="pge-layout" style={!isEdit? _.style.layout: {}}>{ compCon }</div>
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
