/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import checkToJump from '../../../checkToJump'
import JumpRouter from '../../../JumpRouter'
import Layout from '../../Layout'
import './index.less'

const initMap = {
	floor:  '',
	letter: '',
	catg:   '',
	currentPage:   1,
	loading:false,
	changePage : false
} 

class ResetNew extends React.Component {
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
		let { data, ioInput } = this.props,
			{ catg,floor,letter } = ioInput,
			{ componentLayout } = data.data,
			filterBox = cssColorFormat(this.props, 'filterBox'),
			cl = []
		componentLayout.map(_ => {
			var { active } = _.feature
			if ((catg == ''&&floor==''&&letter==''&& active) || ((catg||floor||letter) && !active)) {
				cl.push(_)
			}
		})
		let dataNew = JSON.parse(JSON.stringify(data))
		dataNew.data.componentLayout = cl
		return (
			<section
				className={`e-reset-by-store2`}
				style={filterBox}
				onClick={() => {this.selectVal()}}
			>
				<Layout data={dataNew} refresh={true} />
			</section>
		)
	}
}
export default ResetNew
