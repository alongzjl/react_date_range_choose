import React from 'react'
import checkToJump from '../../../checkToJump'
import JumpRouter from '../../../JumpRouter'
import OneNewActive from '../OneNewActive'
import './index.less'


export default class CatgNew extends React.Component {
	constructor(props) {
		super(props)
	}
	state = {
		categories:[],
		update:false
	}
	
	//筛选店铺
	selectVal = str => {
		let { ioInput, ioOuter,action } = this.props
		if (ioInput.catg === str) return
		const dataStr = checkToJump('storeFilter','storeList',str,200);
		JumpRouter(dataStr,'','',action)
		ioInput.catg = str
		ioInput.changePage = false
		ioOuter(ioInput)
	}
	
	render() {
		let { data,ioInput,categories,dataSource } = this.props,
			styleObj = cssColorFormat(this.props, 'filter'),
			filterBox = cssColorFormat(this.props, 'filterBox'),
			filterFlex = cssColorFormat(this.props, 'filterFlex');
		let useCatgs = categories 
		return (
			<section className={`e-catg-by-store2 scrollbar`} style={filterBox}>
				<div className="e-catg-by-store2-box" style={filterFlex}>
					{ 
						useCatgs.map((_, i) => {
							return <div key={i} onClick={() => this.selectVal(_.id)}><OneNewActive styleObj={styleObj} ioInput={ioInput} data={data} item={_} type={'CatgNew'} /></div>
						})
					 }
				</div>
			</section>
		)
	}
}
