/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import { Checkbox, Icon, message, Modal } from 'antd'

import Rnd from 'react-rnd'

import EditStyleChild from 'compEdit/EditStyleChild'

import Picture     from 'compEdit/EditElement/Picture'
import Text        from 'compEdit/EditElement/Text'
import PictureBind from 'compEdit/EditElement/PictureBind'
import TextBind    from 'compEdit/EditElement/TextBind'
import SwiperBind  from 'compEdit/EditElement/SwiperBind'
import Area        from 'compEdit/EditElement/Area'
import QrcodeBind  from 'compEdit/EditElement/QrcodeBind'

const compContent = (name, data, item) => {
	var props  = { data, item }
	var render = {
		picture:     <Picture     {...props} />,
		text:        <Text        {...props} />,
		pictureBind: <PictureBind {...props} />,
		textBind:    <TextBind    {...props} />,
		swiperBind:  <SwiperBind  {...props} />,
		area:        <Area        {...props} />,
		qrcodeBind:  <QrcodeBind  {...props} />
	}
	return render[name]
}

import * as variable from 'var'
var compMap   = variable.compMap.name,
	activeMap = variable.childElementActiveMap,
	mockMap   = variable.mock.item

export default class CompLayout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			id: `lay_${rn(1e9)}`,
			idx: -1,
			active: false
		}
	}

	componentWillMount()   {}
	componentDidMount()    {}
	componentWillUnmount() {}

	updateIdx = idx => {
		this.setState({ idx: idx })
	}
	showModal = () => {
		this.setState({ visible: true, idx: -1 })
	}
	handleCancel = () => {
		this.setState({ visible: false })
	}
	renderDom = (layout, isActive) => {
		let { updateComp, props } = this.props,
			{ name } = props.data
		let da = mockMap[name] || {}
		return layout.map((_, i) => {
			var { name, data } = _,
				lay = data.layout,
				dom = compContent(name, _, da)
			return (
				<RndModule
					key={i}
					layout={lay}
					bounds={`#${this.state.id}`}
					dom={dom}
					item={_}
					idx={i}
					active={i === this.state.idx}
					updateIdx={this.updateIdx}
					updateComp={updateComp}
					isActive={isActive}
					isAV={this.state.active}
				/>
			)
		})
	}
	render() {
		let { map, layout, parentLayout = {}, props = {}, updateComp, styleName } = this.props
		let { name } = props.data
		let { visible, id, idx, active } = this.state
		let { width = 0, height = 0 } = parentLayout
		let pLay = {
			width:  width,
			height: height
		}
		let isActive  = activeMap[name]
		let renderDom = this.renderDom(layout, isActive)
		let data = idx > -1? layout[idx]: false
		let css = styleName? cssColorFormat(props, styleName): {}
		return (
			<div className="comp-layout">
				<a className="btn-edit-layout" onClick={this.showModal}>编辑布局</a>
				<Modal
					width={'90%'}
					visible={visible}
					title="编辑布局"
					onCancel={this.handleCancel}
					footer={null}
				>
					<div className="cl-parent">
						<div className="cl-left scrollbar">
							<div>
								宽度: { width * 2 }
								&nbsp;
								高度: { height * 2 }
								&nbsp;
								{
									isActive
									?
									<span>
										激活状态:
										<Checkbox
											style={{ marginLeft: 5 }}
											title="激活状态开关"
											checked={active || false}
											onChange={v => this.setState({ active: v.target.checked })}
										/>
									</span>
									: null
								}
							</div>
							<div className="cl-element" style={pLay}>
								<div className="cl-element-child" id={id} style={{ ...css, width, height }}>
									{ renderDom }
								</div>
							</div>
						</div>
						<div className="cl-right pg-right">
							<div className="cl-style scrollbar">
								{
									data
									?
									<EditStyleChild data={data} updateComp={updateComp} />
									: null
								}
							</div>
						</div>
					</div>
				</Modal>
			</div>
		)
	}
}

class RndModule extends React.Component {
	constructor(props) {
		super(props)
		let { layout } = this.props
		this.state = {
			layout,
			active: false
		}
	}
	componentWillReceiveProps() {
		let { layout } = this.props
		this.setState({
			layout,
			active: false
		})
	}
	dragStop = (e, d, item) => {
		e.stopPropagation()
		let { updateComp } = this.props
		let lay = item.data.layout
		if (lay.left === d.x && lay.top  === d.y) return
		lay.left = +d.x
		lay.top  = +d.y
		updateComp()
	}
	dragResize = (e, ref, delta, pos) => {
		var o = {
			layout: {
				position: 'absolute',
				left:   +pos.x,
				top:    +pos.y,
				width:  +ref.offsetWidth,
				height: +ref.offsetHeight
			}
		}
		this.setState(o)
	}
	dragResizeStop(e, ref, delta, pos, item) {
		e.stopPropagation()
		let { layout, updateComp } = this.props
		let lay = layout
		lay.left   = +pos.x
		lay.top    = +pos.y
		lay.width  = +ref.offsetWidth
		lay.height = +ref.offsetHeight
		updateComp()
	}
	render() {
		let { bounds, dom, item, idx, active, updateIdx, updateComp, isActive, isAV } = this.props
		let av = item.feature.active
		let { layout } = this.state
		let lay = layout
		return !isActive || (isActive && isAV && av) || (isActive && !isAV && !av)
		?
		<Rnd
			className={`${active? 's-active': ''}`}
			bounds={bounds}
			size={{
				width:  lay.width || '100%',
				height: lay.height
			}}
			position={{
				x: lay.left,
				y: lay.top
			}}
			onDragStart={() => updateIdx(idx)}
			onDragStop={(e, d) => this.dragStop(e, d, item)}
			onResize={(e, dir, ref, delta, pos) => this.dragResize(e, ref, delta, pos, item)}
			onResizeStop={(e, dir, ref, delta, pos) => this.dragResizeStop(e, ref, delta, pos, item)}
		>
			<div className={`pge-layout`}>{ dom }</div>
		</Rnd>
		: null
	}
}
