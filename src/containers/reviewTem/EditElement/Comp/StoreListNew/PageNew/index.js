import React from 'react'
import OneNewActive from '../OneNewActive'
import './index.less'

export default class PageNew extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		let { data,ioInput,shopsInfo } = this.props,
			page = shopsInfo.page,
			list = shopsInfo.data ? shopsInfo.data[ioInput.currentPage-1] : [],
			totalPage = page&&page.totalPage || 1, 
			numArr = Array.from(new Array(totalPage), (_, i) => { return {name: `${i+1}`}}),
			styleObj = cssColorFormat(this.props, 'filter'),
			filterBox = cssColorFormat(this.props, 'filterBox'),
			filterFlex = cssColorFormat(this.props, 'filterFlex');
		return ( 
			list&&list.length > 0 ?
			<section className={`e-page-by-store2 scrollbar`} style={filterBox}>
				<div className="e-page-by-store2-box" style={filterFlex}>
					{ 
						numArr.map((_, i) => {
							return <div key={i}><OneNewActive styleObj={styleObj} ioInput={ioInput} data={data} item={_} type={'PageNew'} /></div>
						})
					 }
				</div>
			</section> : null
		)
	}
}
