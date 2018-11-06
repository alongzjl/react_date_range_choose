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

import Picture           from 'compEdit/EditElement/Picture'
import Web               from 'compEdit/EditElement/Web'
import Text              from 'compEdit/EditElement/Text'
import Button            from 'compEdit/EditElement/Button'
import Video             from 'compEdit/EditElement/Video'
import SwiperImage       from 'compEdit/EditElement/SwiperImage'
import SwiperImgAndVideo from 'compEdit/EditElement/SwiperImgAndVideo'
import WonderfulActivity from 'compEdit/EditElement/WonderfulActivity'
import Time              from 'compEdit/EditElement/Time'
import Weather           from 'compEdit/EditElement/Weather'
import StoreList         from 'compEdit/EditElement/StoreList'
import StoreDetails      from 'compEdit/EditElement/StoreDetails'
import StoreInstro       from 'compEdit/EditElement/StoreInstro'
import StoreList2        from 'compEdit/EditElement/StoreList2'
import StoreDetails2     from 'compEdit/EditElement/StoreDetails2'
import GoodsList         from 'compEdit/EditElement/GoodsList'
import DateWeather       from 'compEdit/EditElement/DateWeather'
import Navigation        from 'compEdit/EditElement/Navigation'
import NavigationFloat   from 'compEdit/EditElement/NavigationFloat'
import SplitLine         from 'compEdit/EditElement/SplitLine'
import Map2D             from 'compEdit/EditElement/Map2D'
import Html              from 'compEdit/EditElement/Html'
import GoodsDetails      from 'compEdit/EditElement/GoodsDetails'
import Area              from 'compEdit/EditElement/Area'
import Qrcode            from 'compEdit/EditElement/Qrcode'

import ContextMenu       from 'compEdit/EditCommon/ContextMenu'
import ShortcutKey       from 'compEdit/EditCommon/ShortcutKey'
import PostMessage       from 'compEdit/EditCommon/PostMessage'
import RevokeRecovery    from 'compEdit/EditCommon/RevokeRecovery'
import { InductionLine,nearPosSty }     from 'compEdit/EditElement/InductionLine'
 
import * as actions from 'actions'
import { Icon, message } from 'antd'

import * as variable from 'var'

const ctMap  = variable.composeTypeMap
var animeMap = variable.animeCompMap,
	aStyle   = animeMap.style

const compContent = (name, data, actions, type, idx, csn, keyCtrl,contentEditable) => {
	var props  = { data, actions, type, idx, csn, keyCtrl,contentEditable }
	var render = {
		picture:           <Picture           {...props} />,
		web:               <Web               {...props} />,
		video:             <Video             {...props} />,
		text:              <Text              {...props} />,
		button:            <Button            {...props} />,
		swiperImage:       <SwiperImage       {...props} />,
		swiperImgAndVideo: <SwiperImgAndVideo {...props} />,
		wonderfulActivity: <WonderfulActivity {...props} />,
		time:              <Time              {...props} />,
		weather:           <Weather           {...props} />,
		navigation:        <Navigation        {...props} />,
		navigationFloat:   <NavigationFloat   {...props} />,
		storeList:         <StoreList         {...props} />,
		goodsList:         <GoodsList         {...props} />,
		storeDetails:      <StoreDetails      {...props} />,
		storeInstro:       <StoreInstro       {...props} />,
		splitLine:         <SplitLine         {...props} />,
		dateWeather:       <DateWeather       {...props} />,
		map2D:             <Map2D             {...props} />,
		html:              <Html              {...props} />,
		goodsDetails:      <GoodsDetails      {...props} />,
		area:              <Area              {...props} />,
		qrcode:            <Qrcode            {...props} />,
		// tabs:              <Tabs              {...props} />,
		storeList2:        <StoreList2        {...props} />,
		storeDetails2:     <StoreDetails2     {...props} />
	}
	return render[name]
} 
 
import './index.less'

class EditElement extends React.Component {
	constructor(props) {
		super(props)
		this.state = { keyCtrl: false,v:false,h:false,vPosition:{left:0},hPosition:{top:0},nearPos:false }
	}
	componentDidMount() {
		
	}
	componentWillReceiveProps() {
		this.stateLayout()
	}
	stateLayout = () => {
		let { data, editConfig } = this.props
		let { compIdx } = editConfig.curData
		let state = {}
		let eles  = data.elements || []
		if (compIdx < 0 || !eles[compIdx]) return
		state[compIdx] = eles[compIdx].data.layout
		this.setState(state)
	}
	keyDown = (k, e) => {
		if (k === 'meta' || k === 'control') this.setState({ keyCtrl: true })
	}
	keyUp = (k, e) => {
		if (k === 'meta' || k === 'control') this.setState({ keyCtrl: false })
	}
	
	selectComp(e, data, idx) {
		e.stopPropagation()
		this.setState({v:false,h:false,nearPos:false}) 
		let { keyCtrl } = this.state
		let { actions, editConfig } = this.props
		let { curData, globalData } = editConfig
		let { type } = globalData.multiComp
		let { compIdx, cusCompIdx, contentType } = curData
		if (keyCtrl && type === 'child') return
		if (compIdx === idx && cusCompIdx < 0 && contentType === 'comp') return
		this.state[idx] = deepCopy(data.data.layout)
		curData.compIdx    = idx
		curData.parentComp = null
		actions.updateCur(curData)	// 更新 当前数据
		actions.selectComp(data)
	}

	selectMulti(e, idx) {
		e.stopPropagation()
		let { keyCtrl } = this.state
		let { actions, editConfig } = this.props
		let { globalData } = editConfig
		let { multiComp }  = globalData
		let { index, list, type } = multiComp
		if (keyCtrl) {
			if (type === 'child') return message.success('不能跨级选组件!')
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
		multiComp.type = 'parent'
		delete multiComp.parentIdx
		actions.updateGlobal(globalData)
		console.log(JSON.stringify(multiComp.list))
	}
	//scale停止
	resizeFn(e, ref, delta, pos, item, idx) {
		e.stopPropagation()
		let { actions } = this.props
		let lay = item.data.layout
		lay.left   = +pos.x
		lay.top    = +pos.y
		lay.width  = +ref.offsetWidth
		lay.height = +ref.offsetHeight
		this.setState({v:false,h:false,nearPos:false}) 
		actions.updateComp(idx, item)
	} 
	//scale
	dragResize(e, ref, delta, pos, item, idx) {
		var o = {}
		o[idx] = {
			left:   +pos.x,
			top:    +pos.y,
			width:  +ref.offsetWidth,
			height: +ref.offsetHeight
		}
		this.showLine(pos,item,idx,{width:ref.offsetWidth,height:ref.offsetHeight})
		this.setState(o)
	} 
	//拖拽
	dragMove(e,param,_,i) {
		e.stopPropagation()
		this.showLine(param,_,i)
	}
	//拖拽停止
	dragStop(e, d, item, idx) {
		e.stopPropagation()
		// e.preventDefault()
		let { actions } = this.props
		let lay = item.data.layout
		if (lay.left === d.x && lay.top  === d.y) return
		lay.left = this.state.vPosition.p_left
		lay.top  = this.state.hPosition.p_top
		this.setState({v:false,h:false,nearPos:false})   
		actions.updateComp(idx, item)
	} 
	//显示提示线
	showLine = (param,_,i,obj) => {
		let { data, actions } = this.props,
			eles   = data.elements || [],
			bodySty = {width:540,height:960,left:0,top:0},
			layout = obj ? {..._.data.layout,...obj} : _.data.layout,
			InductionLineObj = InductionLine(param,eles,layout,i,bodySty,eleKnock),
			v= InductionLineObj.v,h=InductionLineObj.h,eleKnock = InductionLineObj.eleKnock
		if(v){ 
			this.setState({v:true,vPosition:{left:`${v.left}px`,p_left:v.p_left}})
		}else{
			this.setState({v:false,vPosition:{p_left:param.x}})
		} 
		if(h){
			this.setState({h:true,hPosition:{top:`${h.top}px`,p_top:h.p_top}})
		}else{ 
			this.setState({h:false,hPosition:{p_top:param.y}})
		}
		if(eleKnock){
			this.setState({nearPos:nearPosSty(eleKnock)})
		}else{
			this.setState({nearPos:false})
		}   
	}    
	changeEditable = (item, idx) => {
		let { actions } = this.props
		item['feature'].editStatus != undefined ? item['feature'].editStatus = true : null
		actions.updateComp(idx, item)
	}
	removeComp(e, idx) {
		e.stopPropagation()
		let { actions } = this.props
		actions.deleteComp(idx)
	}

	render() {
		let { data, actions, editConfig, location } = this.props
		let { globalData, curData } = editConfig
		let { pageGroupIdx, pageIdx, compIdx } = curData
		let { multiComp } = globalData
		let { index } = multiComp
		let state  = this.state
		let ct     = tempCfg.composeType || 'PORTRAIT'
		let ads    = tempCfg.adsFlag? 'ads': ''
		if (!data || data.title === undefined) return <div className={`pg-element-parent e-flex-box pg-element-${ct} ${ads}`}><section className="pg-element"></section></div>
		let eles   = data.elements || [],
			theme  = editConfig.globalData.theme,
			colors = theme.list[theme.idx].colors,
			color  = data.feature.backgroundColor,
			type   = color.type,
			disableDragging = false
		ct = ctMap[ct]? ct: 'PORTRAIT'
		if (!colors[type] && type !== 'custom') {
			color.type = 'custom'
			return actions.updatePage(pageGroupIdx, pageIdx, data)
		}
		let bgStyle   = data.feature? { backgroundColor: type === 'custom'? color.color: colors[type].color }: {}
		let childNode = eles.map((_, i) => {
			let compName  = _.name,
				layout    = _.data.layout,
				styleIdx  = _.styleList.idx,
				csn       = `handle-drag-${Math.floor(Math.random()*1e9)}`,
				ani       = _.data.animation,
				aniCls    = '',
				aniSty    = {},
				lockAspectRatio = layout.lockAspectRatio,
				editStatus = _.feature&&_.feature.editStatus;
			disableDragging = i === compIdx ? (compName == 'web' && _.data.content.url ? false : editStatus) : false
			let compCon   = compContent(compName, _, actions, `Style${styleIdx + 1}`, i, csn, state.keyCtrl,disableDragging)
			 
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
			let lay = i === compIdx? sl? sl: layout: layout
			return (
				<Rnd
					key={i}
					className={`${i in index? 's-select': ''} ${i === compIdx? 's-active': ''}`}
					size={{
						width:  lay.width || '100%',
						height: lay.height
					}}
					position={{
						x: lay.left,
						y: lay.top
					}}
					disableDragging={disableDragging} 
					lockAspectRatio={lockAspectRatio}
					onDragStart={e => this.selectComp(e, _, i)}
					onDrag={(e,param) => this.dragMove(e,param,_,i)}
					onDragStop={(e, d) => this.dragStop(e, d, _, i)}
					onResizeStart={e => this.selectComp(e, _, i)}
					onResize={(e, dir, ref, delta, pos) => this.dragResize(e, ref, delta, pos, _, i)}
					onResizeStop={(e, dir, ref, delta, pos) => this.resizeFn(e, ref, delta, pos, _, i)}
				>
					<div
						className={`pge-layout ${aniCls? aniCls: ''}`}
						style={aniSty}
						onClick={e => {this.selectComp(e, _, i);this.selectMulti(e, i)}}
						onContextMenu={e => this.selectComp(e, _, i)}
						onDoubleClick={()=>this.changeEditable(_,i)}
					>{ compCon }</div>
				</Rnd>
			)
		})
		return (
			<div className={`pg-element-parent e-flex-box pg-element-${ct}`}>
				<div className="pg-element-box">
					{ /*ads
						? <div className="ads-placeholder"></div>
						: null*/
					}
					<section id="pgElement" className="pg-element">
						<div id="pgElementChild" className="pg-element-child" style={bgStyle}>
							{ childNode }
						</div>
						{state.h ? <div className="inductionLine-h" style={state.hPosition}></div> : null}
						{state.v ? <div className="inductionLine-v" style={state.vPosition}></div> : null}
						{
							state.nearPos ? <div>
								<div className="lineNear_0" style={state.nearPos[0]}></div>
								<div className="lineNear_1" style={state.nearPos[1]}></div>
								<div className="lineNear_2" style={state.nearPos[2]}></div>
								<div className="lineNear_3" style={state.nearPos[3]}></div>
							</div> : null
						} 
						<div id="pgElementNext" className="pg-element-next"></div>
					</section>
				</div> 
				<ContextMenu />
				<ShortcutKey keyDown={this.keyDown} keyUp={this.keyUp} disableDragging={disableDragging} />
				<PostMessage />
				<RevokeRecovery />
			</div>
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


