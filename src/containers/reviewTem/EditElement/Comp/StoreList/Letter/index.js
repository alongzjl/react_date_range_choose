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

class Letter extends React.Component {

	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.letter == this.props.letter){
			 return false
			}else{
				return true
			}
	}

	selectVal = str => {
		let { ioInput, ioOuter,action } = this.props
		if (ioInput.letter === str) return
		const dataStr = checkToJump('storeFilter','storeList',str,201);
		JumpRouter(dataStr,'','',action)
		ioInput.letter = str 
		ioInput.changePage = false
		ioOuter(ioInput)
	}
	render() {
		let { type, ioInput } = this.props
		let dom
		switch(type){
			// 字母
			case "Style1" : let letter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); 
			    dom = (<RenderLetter props={this.props} arr={letter} nowVal={ioInput.letter} selectVal={this.selectVal} />); break
			// 数字
			case "Style2" : let num    = Array.from(new Array(10), (_, i) => `${i}`); 
				dom = (<RenderLetter props={this.props} arr={num} nowVal={ioInput.letter} selectVal={this.selectVal} />); break
			// 字母+数字
			case "Style3" : let num_2    = Array.from(new Array(10), (_, i) => `${i}`);
							let letter_2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
							let newArr = [...letter_2, ...num_2]; 
				dom = (<RenderLetter props={this.props} arr={newArr} nowVal={ioInput.letter} selectVal={this.selectVal} />); break
			default: let letter_default = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); 
				dom = (<RenderLetter props={this.props} arr={letter_default} nowVal={ioInput.letter} selectVal={this.selectVal} />); break
		}
		return ( 
			<section className={`e-letter ${type}`}>
				{ dom }
			</section>
		)
	}
}

//渲染页面
function RenderLetter({ props, arr, nowVal,selectVal }) {
	let css = cssColorFormat(props, 'filter')
	return ( 
		<div style={cssColorFormat(props, 'filterBox')}>
			{ arr.map((_, i) => {
				let nCss = css
				if (_ === nowVal) nCss = { ...css, ...cssColorFormat(props, 'filterActive') }
				return (
					<div
						key={i}
						className={`el-item${_ === nowVal? ' s-active': ''}`}
						style={nCss}
						onClick={()=>{selectVal(_)}}
					>
						{_}
					</div>
				)}
			) }
		</div>
	)
}

export default Letter
