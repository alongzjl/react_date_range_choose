import React from 'react'
import checkToJump from '../../../checkToJump'
import JumpRouter from '../../../JumpRouter'
import OneNewActive from '../OneNewActive'
import './index.less'

export default class LetterNew extends React.Component {
	constructor(props) {
		super(props)
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
	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.letter !== this.props.letter){
		 	return true
		}else{
			return false
		}
	}
	render() {
		let { data,ioInput,type } = this.props,
			styleObj = cssColorFormat(this.props, 'filter'),
			filterBox = cssColorFormat(this.props, 'filterBox'),
			filterFlex = cssColorFormat(this.props, 'filterFlex'),
			letterList = [];
		switch(type){
			// 字母
			case "Style1" : letterList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(name => { return { name:name } }); 
			// 数字
			case "Style2" : letterList    = Array.from(new Array(10), (_, i) => { return {name: `${i}`}}); 
			default: letterList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(name => { return { name:name } }); 
		}
		return (
			<section className={`e-floor-by-store2 scrollbar`} style={filterBox}>
				<div className="e-floor-by-store2-box" style={filterFlex}>
					{ 
						letterList.map((_, i) => {
							return <div key={i} onClick={() => this.selectVal(_.name)}><OneNewActive styleObj={styleObj} ioInput={ioInput} data={data} item={_} type={'LetterNew'} /></div>
						})
					 }
				</div>
			</section>
		)
	}
}
