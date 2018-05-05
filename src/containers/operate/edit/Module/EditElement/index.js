/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

import Rnd from 'react-rnd'

import Picture     from 'compEdit/EditElement/Picture'
import Web         from 'compEdit/EditElement/Web'
import Text        from 'compEdit/EditElement/Text'
import SwiperImage from 'compEdit/EditElement/SwiperImage'
import DateShow    from 'compEdit/EditElement/Date'
import StoreList   from 'compEdit/EditElement/StoreList'
import Navigation  from 'compEdit/EditElement/Navigation'
// import Letter       from 'compEdit/EditElement/Letter'

import * as actions from 'actions'

import { Icon } from 'antd'

import './index.less'

class EditElement extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	selectComp(e, data, idx) {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let { curData } = editConfig
		if (curData.compIdx === idx && curData.cusCompIdx < 0) return
		curData.compIdx    = idx
		curData.parentComp = null
		actions.updateCur(curData)	// 更新 当前数据
		actions.selectComp(data)
	}

	resizeFn(e, ref, delta, pos, item, idx) {
		e.stopPropagation()
		let { actions } = this.props
		let lay = item.style.layout
		lay.left   = pos.x
		lay.top    = pos.y
		lay.width  = ref.offsetWidth
		lay.height = ref.offsetHeight
		actions.updateComp(idx, item)
		//针对轮播图的单独处理，每次更改大小时都要重新初始化swiper
	}
	
	dragStop(e, d, item, idx) {
		e.stopPropagation()
		let { actions } = this.props
		let lay  = item.style.layout
		if (lay.left === d.x && lay.top  === d.y) return
		lay.left = d.x
		lay.top  = d.y
		actions.updateComp(idx, item)
	}

	removeComp(e, idx) {
		e.stopPropagation()
		let { actions } = this.props
		actions.deleteComp(idx)
	}

	render() {
		let { data, actions, editConfig } = this.props
		let eles   = data.elements || [],
			theme  = editConfig.globalData.theme,
			colors = theme.list[theme.idx].colors,
			color  = data.feature.backgroundColor,
			type   = color.type
		if (!colors[type] && type !== 'custom') {
			let curData = editConfig.curData
			color.type = 'custom'
			return actions.updatePage(curData.pageGroupIdx, curData.pageIdx, data)
		}
		let bgStyle   = data.feature? { backgroundColor: type === 'custom'? color.color: colors[type].color }: {}
		let childNode = eles.map((_, i) => {
			var compName  = _.name,
				styleIdx  = _.styleList.idx,
				csn       = `handle-drag-${Math.floor(Math.random()*1e9)}`,
				isEdit    = true,
				compCon
			if (compName === 'picture')          compCon = (<Picture     data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'web')         compCon = (<Web         data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'text')        compCon = (<Text        data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'swiperImage') compCon = (<SwiperImage data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'letter')      compCon = (<Letter      data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'date')        compCon = (<DateShow    data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
 			else if (compName === 'navigation')  compCon = (<Navigation  data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'storeList')   compCon = (<StoreList   data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			return (
				<Rnd
					key={i}
					bounds={'.pg-center'}
					className={i === editConfig.curData.compIdx? 's-active': ''}
					dragHandleClassName={'.handle-drag'}
					size={{
						width:  _.style.layout.width || '100%',
						height: _.style.layout.height
					}}
					position={{
						x: _.style.layout.left,
						y: _.style.layout.top
					}}
					onDragStart={e => this.selectComp(e, _, i)}
					onDragStop={(e, d) => this.dragStop(e, d, _, i)}
					onResizeStart={e => this.selectComp(e, _, i)}
					onResizeStop={(e, dir, ref, delta, pos) => this.resizeFn(e, ref, delta, pos, _, i)}
				>
					<div className="pge-layout" onClick={e => this.selectComp(e, _, i)} style={!isEdit? _.style.layout: {}}>{ compCon }</div>
					<a className="pge-remove" onClick={e => this.removeComp(e, i)}><Icon type="cross-circle" /></a>
					<div className="handle-drag" onClick={e => e.stopPropagation()}></div>
				</Rnd>
			)
		})
		return (
			<section className="pg-element" style={bgStyle}>
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
