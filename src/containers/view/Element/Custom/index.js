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
import Floor        from 'compEdit/EditElement/Floor'
import Catg         from 'compEdit/EditElement/Catg'
import Page         from 'compEdit/EditElement/Page'
import Reset        from 'compEdit/EditElement/Reset'
import ListByStore  from 'compEdit/EditElement/ListByStore'
import WonderfulActivity from 'compEdit/EditElement/WonderfulActivity'

import './index.less'

class Custom extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	// state = {
	// 	storeDetails:{}
	// }
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
		let lay = item.data.layout
		lay.left   = pos.x
		lay.top    = pos.y
		lay.width  = ref.offsetWidth
		lay.height = ref.offsetHeight
		actions.updateComp(editConfig.curData.compIdx, parent)
	}

	dragStop(e, d, item, idx, parent) {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let lay = item.data.layout
		if (lay.left === d.x && lay.top  === d.y) return
		lay.left = d.x
		lay.top  = d.y
		actions.updateComp(editConfig.curData.compIdx, parent)
	}

	removeComp(e, idx, parent) {
		e.stopPropagation()
		let { data, actions, editConfig } = this.props
		let comp = data.data.components
		comp.splice(idx, 1)
		actions.updateComp(editConfig.curData.compIdx, parent)
	}

	render() {
		let { data, actions, idx, csn, editConfig, ioInput, ioOuter,name } = this.props
		let icomp = ioInput.comp
		let comp  = data.data.components
		let childNode = comp.map((_, i) => {
			let compName = _.name,
				layout   = _.data.layout,
				styleIdx = _.styleList.idx,
				isEdit   = true,
				compCon

			if (icomp && icomp[compName]) {
				let v   = icomp[compName],
					k   = v.key.split('.'),
					len = k.length,
					ob  = _

				k.map((__, l) => {
					if (l !== len - 1) ob = ob[__]
					else ob[__] = v.value
				})
			}


			if (compName === 'picture')          compCon = (<Picture     data={_} parent={data} editConfig={editConfig} actions={actions} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} />)
			else if (compName === 'web')         compCon = (<Web         data={_} parent={data} editConfig={editConfig} actions={actions} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} />)
			else if (compName === 'text')        compCon = (<Text        data={_} parent={data} editConfig={editConfig} actions={actions} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} />)
			else if (compName === 'swiperImage') compCon = (<SwiperImage data={_} parent={data} editConfig={editConfig} actions={actions} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} />)
			else if (compName === 'letter')      compCon = (<Letter      data={_} parent={data} editConfig={editConfig} actions={actions} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} />)
			else if (compName === 'floor')       compCon = (<Floor       data={_} parent={data} editConfig={editConfig} actions={actions} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} />)
			else if (compName === 'wonderfulActivity')       compCon = (<WonderfulActivity  data={_} parent={data} editConfig={editConfig} actions={actions} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} />)
			else if (compName === 'catg')        compCon = (<Catg        data={_} parent={data} editConfig={editConfig} actions={actions} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} />)
			else if (compName === 'page')        compCon = (<Page        data={_} parent={data} editConfig={editConfig} actions={actions} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} />)
			else if (compName === 'reset')       compCon = (<Reset       data={_} parent={data} editConfig={editConfig} actions={actions} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} />)
			else if (compName === 'listByStore') compCon = (<ListByStore data={_} parent={data} editConfig={editConfig} actions={actions} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} />)
			return (
				<Rnd
					key={i}
					bounds={`.${csn}`}
					className={i === editConfig.curData.cusCompIdx? 's-active': ''}
					dragHandleClassName={'.handle-drag-custom'}
					size={{
						width:  layout.width || '100%',
						height: layout.height
					}}
					position={{
						x: layout.left,
						y: layout.top
					}}
					onDragStart={e => this.selectComp(e, _, i, idx, data)}
					onDragStop={(e, d) => this.dragStop(e, d, _, i, data)}
					onResizeStart={e => this.selectComp(e, _, i, idx, data)}
					onResizeStop={(e, dir, ref, delta, pos) => this.resizeFn(e, ref, delta, pos, _, i, data)}
				>
					<div className="pge-layout" onClick={e => this.selectComp(e, _, i, idx, data)} style={!isEdit? _.layout: {}}>{ compCon }</div>
					{
						name != 'storeDetails' ? <a className="pge-remove" onClick={e => this.removeComp(e, i, data)}><Icon type="cross-circle" /></a> : null
					} 
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
