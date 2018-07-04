/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import { Icon, Pagination } from 'antd'

import './index.less'


class ListByStore extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	selectVal(str) {
		let { parent, actions, ioInput, ioOuter } = this.props
		if (ioInput.body.page === str || !parent) return
		ioInput.body.page = str
		ioOuter(ioInput)
	}
	end = e =>{
		e.target.style.opacity = 1;
	}
	renderDom(props, list) {
		let type = props.data.data.content.animationType,
			defaultStyle = cssColorFormat(props, 'filter'),
			animationStyle = {"animationDuration":"0.2s","animationDelay":"0s","animationIterationCount":1},
			animationClass;
		defaultStyle = {...defaultStyle,...animationStyle};
		switch(type) {
			case 1  : animationClass = "fadeInCenter";break
			case 2  : animationClass = "bounceInCenter";break
			default : animationClass = "fadeInCenter";break
		}
		let node = list.map((_, i) => {
			return (
				<div
					key={i}
					style={{...defaultStyle,animationDelay:`${0.2*i}s`}}
					className={`ep-item ${animationClass}`}
					onAnimationEnd={e=>{this.end(e)}}
				>
					<p><img  style={cssColorFormat(props, 'image')} src={_.pic} /></p>
					<p><span style={cssColorFormat(props, 'title')}>{_.name}</span></p>
					<p>
						<i    style={cssColorFormat(props, 'posIcon')}></i>
						<span style={cssColorFormat(props, 'text')}>{_.floor}</span>
					</p>
				</div>
			)
		})
		return node
	}

	// 原点
	renderStyle1(props, body) {
		return this.renderDom.bind(this, props, body)()
	}
	
	render() {
		let props = this.props
		let { type, ioInput } = props
		let render = this[`render${type}`]? this[`render${type}`]: this.renderStyle1
		let dom    = render.bind(this, props, ioInput.list)()
		return (
			<section className={`e-list-by-store ${type}`} style={cssColorFormat(props, 'filterBox')}>
				{ dom }
			</section>
		)
	}
}

export default ListByStore
