/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import Rnd from 'react-rnd'
import { Icon } from 'antd'

import Picture      from 'compEdit/EditElement/Picture'
import Web          from 'compEdit/EditElement/Web'
import Text         from 'compEdit/EditElement/Text'
import SwiperImage  from 'compEdit/EditElement/SwiperImage'
import Letter       from 'compEdit/EditElement/Letter'
import StoreList    from 'compEdit/EditElement/StoreList'

import './index.less'

class Custom extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	selectComp(e, data, idx, parentIdx, parent) {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let { curData } = editConfig
		if (curData.compIdx === parentIdx && curData.cusCompIdx === idx) return
		curData.compIdx    = parentIdx
		curData.cusCompIdx = idx
		curData.parentComp = parent
		actions.updateCur(curData)		// 更新 当前数据
		actions.selectComp(data)
	}

	resizeFn(e, ref, delta, pos, item, idx, parent) {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let lay = item.style.layout
		lay.left   = pos.x
		lay.top    = pos.y
		lay.width  = ref.offsetWidth
		lay.height = ref.offsetHeight
		actions.updateComp(editConfig.curData.compIdx, parent)
	}

	dragStop(e, d, item, idx, parent) {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let lay = item.style.layout
		if (lay.left === d.x && lay.top  === d.y) return
		lay.left = d.x
		lay.top  = d.y
		actions.updateComp(editConfig.curData.compIdx, parent)
	}

	removeComp(e, idx, parent) {
		e.stopPropagation()
		let { actions, comp, editConfig } = this.props
		comp.splice(idx, 1)
		actions.updateComp(editConfig.curData.compIdx, parent)
	}

	render() {
		let { data, comp, actions, idx, csn, editConfig } = this.props
		// console.log(1, this.props)
		let childNode = comp.map((_, i) => {
			var compName = _.name,
				styleIdx = _.styleList.idx,
				isEdit   = true,
				compCon
			if (compName === 'picture')          compCon = (<Picture     data={_} parent={data} actions={actions} type={`Style${styleIdx + 1}`} />)
			else if (compName === 'web')         compCon = (<Web         data={_} parent={data} actions={actions} type={`Style${styleIdx + 1}`} />)
			else if (compName === 'text')        compCon = (<Text        data={_} parent={data} actions={actions} type={`Style${styleIdx + 1}`} />)
			else if (compName === 'swiperImage') compCon = (<SwiperImage data={_} parent={data} actions={actions} type={`Style${styleIdx + 1}`} />)
			else if (compName === 'letter')      compCon = (<Letter      data={_} parent={data} actions={actions} type={`Style${styleIdx + 1}`} />)
			else if (compName === 'storeList')   compCon = (<StoreList   data={_} parent={data} actions={actions} type={`Style${styleIdx + 1}`} />)
			return (
				<Rnd
					key={i}
					bounds={`.${csn}`}
					className={i === editConfig.curData.compIdx? 's-active': ''}
					dragHandleClassName={'.handle-drag-custom'}
					size={{
						width:  _.style.layout.width || '100%',
						height: _.style.layout.height
					}}
					position={{
						x: _.style.layout.left,
						y: _.style.layout.top
					}}
					onDragStart={e => this.selectComp(e, _, i, idx, data)}
					onDragStop={(e, d) => this.dragStop(e, d, _, i, data)}
					onResizeStart={e => this.selectComp(e, _, i, idx, data)}
					onResizeStop={(e, dir, ref, delta, pos) => this.resizeFn(e, ref, delta, pos, _, i, data)}
				>
					<div className="pge-layout" onClick={e => this.selectComp(e, _, i, idx, data)} style={!isEdit? _.style.layout: {}}>{ compCon }</div>
					<a className="pge-remove" onClick={e => this.removeComp(e, i, data)}><Icon type="cross-circle" /></a>
					<div className="handle-drag-custom" onClick={e => e.stopPropagation()}></div>
				</Rnd>
			)
		})
		return (
			<section className={`pg-custom ${csn}`}>
				{ childNode }
			</section>
		)
	}
}

Custom.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Custom)
