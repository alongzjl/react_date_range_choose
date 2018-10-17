/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import checkToJump from '../../../checkToJump'
import JumpRouter from '../../../JumpRouter'
import './index.less'

const initMap = {
	floor:  '',
	letter: '',
	catg:   '',
	currentPage:   1,
	loading:false,
	changePage : false
} 

class Reset extends React.Component {
	state = {
		click:false
	}
	shouldComponentUpdate(nextProps,nextState){
		return !nextProps.storeUpdate
	}
	selectVal = () => { 
		let { ioInput, ioOuter,action } = this.props
		for (let p in ioInput) {
			let im = initMap[p]
			if (im !== undefined) ioInput[p] = im
		}
		const dataStr = checkToJump('storeFilter','storeList','all',208);
		JumpRouter(dataStr,'','',action)
		ioOuter(ioInput)  
	}  
	render() {
		let { type } = this.props
		let dom
		switch(type){
			case "Style1" : dom = (<RenderStyle1 props={this.props} selectVal={this.selectVal} />); break
			default: dom = (<RenderStyle1 props={this.props} selectVal={this.selectVal} />); break
		}
		return (
			<section className={`e-reset ${type}`}>
				{ dom }
			</section>
		)
	}
}
//渲染样式一
function RenderStyle1({ props,selectVal }) {
	let con = props.data.data.content
	let { filterBGImg, text } = con
	let ioInput = props.ioInput
	let cssActive = ioInput.catg == ''&&ioInput.floor == ''&&ioInput.letter == '' ? cssColorFormat(props, 'filterActive') : {};
	let css = {...cssColorFormat(props, 'filter'),...cssActive}
	return (
		<div style={css} onClick={()=>{selectVal()}}>{ text }</div>
	)
} 
export default Reset
