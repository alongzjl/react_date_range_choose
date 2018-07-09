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
	state = {

	}
	render() {
		let props = this.props
		let { type, ioInput } = props
		let type_ani = props.data.data.content.animationType,
			dom;
		switch(type_ani){
			case 1 : dom = <RenderDom props={props} list={ioInput.list} />;break
			case 2 : dom = <RenderDomTwo props={props} list={ioInput.list} />;break
			default:dom = <RenderDom props={props} list={ioInput.list} />;break
		}
		return (
			<section className={`e-list-by-store ${type}`} style={cssColorFormat(props, 'filterBox')}>
				{ dom }
			</section>
		)
	}
}

function RenderDom({ props, list }) {
	let end = e =>{
		e.target.style.opacity = 1;
	}
	let defaultStyle = cssColorFormat(props, 'filter'),
		animationStyle = {"animationDuration":"0.2s","animationDelay":"0s","animationIterationCount":1};
	defaultStyle = {...defaultStyle,...animationStyle};
	let node = list.map((_, i) => {
		return (
			<div
				key={i}
				style={{...defaultStyle,animationDelay:`${0.2*i}s`}}
				className={`ep-item fadeInCenter`}
				onAnimationEnd={e=>{end(e)}}
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
	return (<div>{ node }</div>)
}
function RenderDomTwo({props, list}) {
	let end = e =>{
		e.target.style.opacity = 1;
	}
	let defaultStyle = cssColorFormat(props, 'filter'),
		animationStyle = {"animationDuration":"0.2s","animationDelay":"0s","animationIterationCount":1};
	defaultStyle = {...defaultStyle,...animationStyle};
	let node = list.map((_, i) => {
		return (
			<div
				key={i}
				style={{...defaultStyle,animationDelay:`${0.2*i}s`}}
				className={`ep-item-two bounceInCenter`}
				onAnimationEnd={e=>{end(e)}}
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
	return (<div>{ node }</div>)
}
export default ListByStore
