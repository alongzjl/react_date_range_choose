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
//动画一
function RenderDom({ props, list }) {
	let end = e =>{
		e.target.style.opacity = 1;
	}
	let defaultStyle = cssColorFormat(props, 'filter'),
		animationStyle = {"animationDuration":"0.5s","animationDelay":"0s","animationIterationCount":1};
	defaultStyle = {...defaultStyle,...animationStyle};
	let node = list.map((_, i) => {
		return (
			<div
				key={i}
				style={{...defaultStyle,animationDelay:`${0.1*i}s`}}
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
//动画二
function RenderDomTwo({props, list}) {
	let end = e =>{
		e.target.style.opacity = 1;
	}
	let newArr = aniTime(props,list)
	let defaultStyle = cssColorFormat(props, 'filter'),
		animationStyle = {"animationDuration":"0.5s","animationDelay":"0s","animationIterationCount":1};
	let node = newArr.map((_, i) => {
		if(_.show == 'none') return false
		return (
			<div
				key={i}
				style={defaultStyle}>
				<div 
					className="ep-item-two fadeInCenter"
					style={{...animationStyle,animationDelay:`${0.1*(_.show)}s`}}
					onAnimationEnd={e=>{end(e)}}>
						<p><img  style={cssColorFormat(props, 'image')} src={_.pic} /></p>
						<p><span style={cssColorFormat(props, 'title')}>{_.name}</span></p>
						<p>
							<i    style={cssColorFormat(props, 'posIcon')}></i>
							<span style={cssColorFormat(props, 'text')}>{_.floor}</span>
						</p>
				</div>
			</div>
		)
	})
	return (<div>{ node }</div>)
}
//动画计算
function aniTime(props,list){
	let filterBox = cssColorFormat(props, 'layout'),
		  filter = cssColorFormat(props, 'filter'),
	 	  widthBox = filterBox.width,
		  widthSelf = filter.width,
		  l = filter.margin.split(' '),
		  all = list.length,
		  w = Math.floor(widthBox/(widthSelf+parseInt(l[1])+parseInt(l[3]))),
		  number = Math.floor(all/w) > w ? Math.floor(all/w) : w,
		  arr = [],
		  postArr = [];
	for(let i = 0;i<number*number;i++){
		if(i<number){
			arr[i] = i;
		}else{
			for(let j = 0;j<number;j++){
				let nowData = 0;
				if(i < number*(number-j) && i > number*(number-j)-(number-j)){
					const num = number*number-1-i;
					for(let k = 0;k<number;k++){
						if((num-k)%(number-1) == 0){
							nowData = (number-1)*2-k
							break
						}
					}
					arr[i] = nowData;
					break
				}else{
					if((i-j)%(number-1) == 0){
						arr[i] = j
					}
				}
			}
		}
	}
	if(Math.floor(all/w) > w){
		arr.map((item,index)=>{
			const num = number - w;
			for(let j = 0;j<number;j++){
				if(index>=j*number && index<j*number+w){
					postArr[index] = {...list[index-num*j],show:item};
					break
				}else{
					postArr[index] = {show:'none'}
				}
			}
		})
	}else{
		arr.map((item,index)=>{
			if(index>=all){
				postArr[index] = {show:'none'}
			}else{
				postArr[index] = {...list[index],show:item}
			}
		})
	}
	return postArr
}
export default ListByStore
