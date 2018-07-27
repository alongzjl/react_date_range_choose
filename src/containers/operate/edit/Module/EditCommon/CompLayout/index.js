/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import { Icon, message, Modal } from 'antd'

import Rnd from 'react-rnd'

import EditStyleChild from 'compEdit/EditStyleChild'

import Picture     from 'compEdit/EditElement/Picture'
import Text        from 'compEdit/EditElement/Text'
import PictureBind from 'compEdit/EditElement/PictureBind'
import TextBind    from 'compEdit/EditElement/TextBind'
import SwiperBind  from 'compEdit/EditElement/SwiperBind'

const compContent = (name, data, item) => {
	var props  = { data, item }
	var render = {
		picture:     <Picture     {...props} />,
		text:        <Text        {...props} />,
		pictureBind: <PictureBind {...props} />,
		textBind:    <TextBind    {...props} />,
		swiperBind:  <SwiperBind  {...props} />
	}
	return render[name]
}

import * as variable from 'var'
var compMap = variable.compMap.name

export default class CompLayout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			id: `lay_${Math.floor(Math.random()*1e9)}`,
			idx: -1
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
	renderDom = (layout) => {
		let { updateComp, list, item } = this.props
		if (!list && !item) return null
		let da = list? list[0]: item
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
				/>
			)
		})
	}
	render() {
		let { map, layout, parentLayout, updateComp } = this.props
		let { visible, id, idx } = this.state
		let { width, height } = parentLayout
		let pLay = {
			width:  width * 2,
			height: height * 2
		}
		let renderDom = this.renderDom(layout)
		let data = idx > -1? layout[idx]: false
		return (
			<div className="comp-layout">
				<a onClick={this.showModal}>编辑布局</a>
				<Modal
					width={'90%'}
					visible={visible}
					title="编辑布局"
					onCancel={this.handleCancel}
					footer={null}
				>
					<div className="cl-parent">
						<div className="cl-left scrollbar">
							宽度: { width * 2 }
							&nbsp;
							高度: { height * 2 }
							<div className="cl-element" style={pLay}>
								<div className="cl-element-child" id={id} style={{ width, height }}>
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
		let { bounds, dom, item, idx, active, updateIdx, updateComp } = this.props
		let { layout } = this.state
		let lay = layout
		return (
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
		)
	}
}
