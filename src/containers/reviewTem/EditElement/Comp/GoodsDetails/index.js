/**
 * @Author: Along
 * @Date:   2018-07-25

 **/
import React from 'react'
import './index.less'
import * as Server from 'server'
import Custom from '../Custom'

export default class GoodsDetailsShow extends React.Component {
	state = {
		paramsData:{itemDetails:[],mapParams:{},scrollTop:0,refresh:true}
	}
	componentWillMount(){
		let ipt = this.state.paramsData
		Server.goods.getGoodsDetails(o => {
			ipt.itemDetails = o
			this.setState({paramsData:ipt})
		})
		 
	}
	componentDidMount(){
		let dom = document.getElementById('goodsScroll')
		dom.addEventListener('scroll',this.clickFunc)
	}
	componentWillUnmount() {
		let dom = document.getElementById('goodsScroll')
		dom.removeEventListener('scroll',this.clickFunc)
	} 
	clickFunc = e => {
		let { data } = this.props,
			comp = data.data.components;
		comp = comp.filter(item=>item.name == 'goodsBar')
		let showTop = comp.length > 0 ? comp[0].data.content.showTop : 0
		let top = e.target.scrollTop,
			paramsData = this.state.paramsData
		paramsData.scrollTop = top
		paramsData.refresh = false
		if(Math.abs(top - showTop) <= 200){
			this.setState({
				paramsData:paramsData
			})
		}
	}
	render() {
		let { data,animate,animateParams,page,top } = this.props
		return (
			<div style={{height:"100%"}} className='goodsDetailsScoll' id="goodsScroll" >
				<Custom 
					data={data}
					animate={animate}
					animateParams={animateParams}
					ioInput={this.state.paramsData}
					page={page}
					top={top}
				/> 
			</div>
		)
	}
}
