/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'


class Page extends React.Component {

	render() {
		let { type, ioInput,shopsInfo } = this.props
		return (
			<section className={`e-page ${type}`}>
				{ 
					ioInput.loading ? <RenderDom props={this.props} ioInput={ioInput} shopsInfo={shopsInfo} /> : null
				}
			</section>
		)
	}
}
function RenderDom({ props, ioInput,shopsInfo }) {
	let { currentPage } = ioInput,
		page = shopsInfo.page,
		listShops = shopsInfo.data ? shopsInfo.data[currentPage-1] : [], 
		totalPage = page&&page.totalPage || 1,     
		content = props.data.data.content, 
		swh  = content.pageSwitch,
		ns   = content.numberSwitch,
		css  = cssColorFormat(props, 'filter'),
		node;
	if (swh) {
		node = Array.from(new Array(totalPage)).map((_, i) => {
			let cur = i + 1
			let nCss = css
			if (currentPage == cur) nCss = { ...css, ...cssColorFormat(props, 'filterActive') }
			return (
				<div
					key={i} 
					style={cssColorFormat(props, 'filterBox')}
					className={`ep-item${currentPage === cur? ' s-active': ''}`}
				>
					<i style={nCss}>{ ns? cur: '' }</i>
				</div>
			)
		})
	}
	return (listShops&&listShops.length > 0 ? <div key={1} className="ep-page">{node}</div> : null)
}

export default Page
