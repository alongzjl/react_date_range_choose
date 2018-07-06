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
import Button       from 'compEdit/EditElement/Button'
import Text         from 'compEdit/EditElement/Text'
import Time         from 'compEdit/EditElement/Time'
import Weather      from 'compEdit/EditElement/Weather'
import SwiperImage  from 'compEdit/EditElement/SwiperImage'
import Letter       from 'compEdit/EditElement/Letter'
import Floor        from 'compEdit/EditElement/Floor'
import Address      from 'compEdit/EditElement/Address'
import Catg         from 'compEdit/EditElement/Catg'
import Page         from 'compEdit/EditElement/Page'
import Reset        from 'compEdit/EditElement/Reset'
import FloorMap     from 'compEdit/EditElement/FloorMap'
import ListByStore  from 'compEdit/EditElement/ListByStore'
import WonderfulActivity from 'compEdit/EditElement/WonderfulActivity'

import * as variable from 'var'
var animeMap = variable.animeCompMap,
	aStyle   = animeMap.style

const compContent = (name, data, parent, editConfig, actions, type, ioInput, ioOuter) => {
	var props  = { data, parent, editConfig, actions, type, ioInput, ioOuter }
	var render = {
		picture:           <Picture           {...props} />,
		web:               <Web               {...props} />,
		button:            <Button            {...props} />,
		text:              <Text              {...props} />,
		time:              <Time              {...props} />,
		weather:           <Weather           {...props} />,
		address:           <Address           {...props} />,
		swiperImage:       <SwiperImage       {...props} />,
		letter:            <Letter            {...props} />,
		floor:             <Floor             {...props} />,
		wonderfulActivity: <WonderfulActivity {...props} />,
		catg:              <Catg              {...props} />,
		page:              <Page              {...props} />,
		floorMap:          <FloorMap          {...props} />,
		reset:             <Reset             {...props} />,
		listByStore:       <ListByStore       {...props} />
	}
	return render[name]
}

import './index.less'

class Custom extends React.Component {
	constructor(props) {
		super(props)
		let state = {}
		let comp = props.data.data.components || []
		comp.map((_, i) => {
			state[i] = _.data.layout
		})
		this.state = state
	}
	componentWillMount() {}

	componentDidMount() {}
	// componentWillReceiveProps() {
	// 	let state = {}
	// 	let comp  = this.props.data.data.components || []
	// 	comp.map((_, i) => {
	// 		state[i] = _.data.layout
	// 	})
	// 	this.setState(state)
	// 	console.log('更新Props')
	// }

	selectComp(e, data, idx, parentIdx, parent) {
		e.stopPropagation()
		e.preventDefault()
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
		lay.left   = +pos.x
		lay.top    = +pos.y
		lay.width  = +ref.offsetWidth
		lay.height = +ref.offsetHeight
		actions.updateComp(editConfig.curData.compIdx, parent)
	}

	dragResize(e, ref, delta, pos, item, idx) {
		var o = {}
		o[idx] = {
			left:   +pos.x,
			top:    +pos.y,
			width:  +ref.offsetWidth,
			height: +ref.offsetHeight
		}
		this.setState(o)
	}

	dragStop(e, d, item, idx, parent) {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let s   = this.state[idx]
		let lay = item.data.layout
		if (lay.left === d.x && lay.top  === d.y) return
		s.left = lay.left = +d.x
		s.top  = lay.top  = +d.y
		actions.updateComp(editConfig.curData.compIdx, parent)
	}

	removeComp(e, idx, parent) {
		e.stopPropagation()
		let { data, actions, editConfig } = this.props
		let { curData } = editConfig
		editConfig.curComp = {}
		curData.cusCompIdx = -1
		let comp = data.data.components
		comp.splice(idx, 1)
		actions.updateComp(editConfig.curData.compIdx, parent)
		actions.updateCur(curData)
		actions.selectComp(parent)
	}

	render() {
		let { data, actions, idx, csn, editConfig, ioInput, ioOuter,name } = this.props
		let { curData } = editConfig
		let state = this.state
		let { compIdx, cusCompIdx } = curData
		let icomp = ioInput.comp
		let comp  = data.data.components
		let childNode = comp.map((_, i) => {
			let compName = _.name,
				layout   = _.data.layout,
				styleIdx = _.styleList.idx,
				ani      = _.data.animation,
				aniCls   = '',
				aniSty   = {},
				compCon  = compContent(compName, _, data, editConfig, actions, `Style${styleIdx + 1}`, ioInput, ioOuter)

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

			if (!compCon) return false
			if (ani.className) {
				let item = aStyle[ani.className]
				let { direction, delay, iterationCount } = ani
				if (!direction || !item.list) ani.direction = item.list? item.list[0] || '': ''
				aniCls = `animate ${ani.className}${ani.direction}`
				aniSty = {
					animationDuration: `${ani.duration}s`,
					animationDelay:    `${delay}s`,
					animationIterationCount: iterationCount
				}
			}

			let lay = compIdx === idx && i === cusCompIdx? state[i]: layout

			return (
				<Rnd
					key={i}
					bounds={`.${csn}`}
					className={compIdx === idx && i === cusCompIdx? 's-active': ''}
					size={{
						width:  lay.width || '100%',
						height: lay.height
					}}
					position={{
						x: lay.left,
						y: lay.top
					}}
					onDragStart={e => this.selectComp(e, _, i, idx, data)}
					onDragStop={(e, d) => this.dragStop(e, d, _, i, data)}
					onResizeStart={e => this.selectComp(e, _, i, idx, data)}
					onResize={(e, dir, ref, delta, pos) => this.dragResize(e, ref, delta, pos, _, i)}
					onResizeStop={(e, dir, ref, delta, pos) => this.resizeFn(e, ref, delta, pos, _, i, data)}
				>
					<div
						className={`pge-layout ${aniCls? aniCls: ''}`}
						style={aniSty}
						onClick={e => this.selectComp(e, _, i, idx, data)}
						onContextMenu={e => this.selectComp(e, _, i, idx, data)}
					>{ compCon }</div>
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
