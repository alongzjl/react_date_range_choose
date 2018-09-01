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
import './index.less'

import Rnd from 'react-rnd'
import { Icon, message } from 'antd'

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
import ListByGoods  from 'compEdit/EditElement/GoodsList/ListByGoods'
import SplitLine         from 'compEdit/EditElement/SplitLine'
import WonderfulActivity from 'compEdit/EditElement/WonderfulActivity'
import PictureBind       from 'compEdit/EditElement/PictureBind'
import TextBind          from 'compEdit/EditElement/TextBind'
import SwiperBind        from 'compEdit/EditElement/SwiperBind'
import Area              from 'compEdit/EditElement/Area'
import PictureListBind   from 'compEdit/EditElement/PictureListBind'
import GoodsBar       from 'compEdit/EditElement/GoodsDetails/GoodsBar'
import GoodsBlock     from 'compEdit/EditElement/GoodsDetails/GoodsBlock'
import CatgByTabs     from 'compEdit/EditElement/Tabs/CatgByTabs'
import ChildElement   from 'compEdit/EditElement/ChildElement'
import SwiperByGoods  from 'compEdit/EditElement/GoodsList/SwiperByGoods'
import CatgByGoods    from 'compEdit/EditElement/GoodsList/CatgByGoods'
import ResetByGoods   from 'compEdit/EditElement/GoodsList/ResetByGoods'
import ListByStore2   from 'compEdit/EditElement/StoreList2/List'
import CatgByStore2   from 'compEdit/EditElement/StoreList2/Catg'
import ResetByStore2  from 'compEdit/EditElement/StoreList2/Reset'
import FloorByStore2  from 'compEdit/EditElement/StoreList2/Floor'
import LetterByStore2 from 'compEdit/EditElement/StoreList2/Letter'
import PageByStore2   from 'compEdit/EditElement/StoreList2/Page'
import MapByStore2    from 'compEdit/EditElement/StoreList2/Map'
import StoreBlock     from 'compEdit/EditElement/StoreDetails2/Block'

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
		splitLine:         <SplitLine         {...props} />,
		reset:             <Reset             {...props} />,
		listByStore:       <ListByStore       {...props} />,
		listByGoods:       <ListByGoods       {...props} />,
		pictureBind:       <PictureBind       {...props} />,
		textBind:          <TextBind          {...props} />,
		swiperBind:        <SwiperBind        {...props} />,
		area:              <Area              {...props} />,
		pictureListBind:   <PictureListBind   {...props} />,
		goodsBar:          <GoodsBar          {...props} />,
		goodsBlock:        <GoodsBlock        {...props} />,
		catgByTabs:        <CatgByTabs        {...props} />,
		childElement:      <ChildElement      {...props} />,
		swiperByGoods:     <SwiperByGoods     {...props} />,
		catgByGoods:       <CatgByGoods       {...props} />,
		resetByGoods:      <ResetByGoods      {...props} />,
		listByStore2:      <ListByStore2      {...props} />,
		catgByStore2:      <CatgByStore2      {...props} />,
		resetByStore2:     <ResetByStore2     {...props} />,
		floorByStore2:     <FloorByStore2     {...props} />,
		letterByStore2:    <LetterByStore2    {...props} />,
		pageByStore2:      <PageByStore2      {...props} />,
		mapByStore2:       <MapByStore2       {...props} />,
		storeBlock:        <StoreBlock        {...props} />,
	}
	return render[name]
}

class Custom extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentWillMount() {}

	componentDidMount() {}
	componentWillReceiveProps() {
		let { data, editConfig } = this.props
		let { cusCompIdx } = editConfig.curData
		let state = {}
		let comp  = data.data.components || []
		if (cusCompIdx < 0 || !comp[cusCompIdx]) return
		state[cusCompIdx] = comp[cusCompIdx].data.layout
		this.setState(state)
		console.log('更新ChildProps')
	}

	selectComp(e, data, idx, parentIdx, parent) {
		e.stopPropagation()
		e.preventDefault()
		this.state[idx] = deepCopy(data.data.layout)
		let { actions, editConfig, keyCtrl } = this.props
		let { globalData, curData } = editConfig
		let { compIdx, cusCompIdx } = curData
		let { type } = globalData.multiComp
		if (keyCtrl && (type === 'parent' || (type === 'child' && parentIdx !== compIdx))) return
		if (compIdx === parentIdx && cusCompIdx === idx) return
		curData.compIdx    = parentIdx
		curData.cusCompIdx = idx
		curData.parentComp = parent
		actions.updateCur(curData)		// 更新 当前数据
		actions.selectComp(data)
	}

	selectMulti(e, idx, parentIdx) {
		e.stopPropagation()
		let { actions, editConfig, keyCtrl } = this.props
		let { globalData, curData } = editConfig
		let { compIdx, cusCompIdx } = curData
		let { multiComp }   = globalData
		let { index, list, type } = multiComp
		if (keyCtrl) {
			if (type === 'parent' || (type === 'child' && parentIdx !== compIdx)) return message.success('不能跨级选组件!')
			if (index[idx]) {
				// delete index[idx]
				list.remove(idx)
			}
			index[idx] = true
			list.unshift(idx)
		} else {
			var s = {}
			s[idx] = true
			multiComp.index = s
			multiComp.list  = [idx]
		}
		multiComp.type = 'child'
		multiComp.parentIdx = parentIdx
		actions.updateGlobal(globalData)
		console.log(JSON.stringify(multiComp.list))
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
		let { data, actions, idx, csn, editConfig, ioInput, ioOuter, name } = this.props
		let { globalData, curData } = editConfig
		let { multiComp } = globalData
		let { index, type } = multiComp
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

			let sl  = state[i]
			let lay = compIdx === idx && i === cusCompIdx? sl? sl: layout: layout
			return (
				<Rnd
					key={i}
					bounds={`.${csn}`}
					className={`${compIdx === idx && (type === 'child' && index[i])? 's-select': ''} ${compIdx === idx && i === cusCompIdx? 's-active': ''}`}
					size={{
						width:  lay.width || '100%',
						height: lay.height
					}}
					position={{
						x: lay.left,
						y: lay.top
					}}
					style={{ position: lay.position }}
					onDragStart={e => this.selectComp(e, _, i, idx, data)}
					onDragStop={(e, d) => this.dragStop(e, d, _, i, data)}
					onResizeStart={e => this.selectComp(e, _, i, idx, data)}
					onResize={(e, dir, ref, delta, pos) => this.dragResize(e, ref, delta, pos, _, i)}
					onResizeStop={(e, dir, ref, delta, pos) => this.resizeFn(e, ref, delta, pos, _, i, data)}
				>
					<div
						className={`pge-layout ${aniCls? aniCls: ''}`}
						style={aniSty}
						onClick={e => {this.selectComp(e, _, i, idx, data);this.selectMulti(e, i, idx)}}
						onContextMenu={e => this.selectComp(e, _, i, idx, data)}
					>{ compCon }</div>
				</Rnd>
			)
		})
		return (
			<section className={`pg-custom ele-${data.name} ${csn} scrollbar`}>
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
