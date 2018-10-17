/**
 * @Author: Along
 * @Date:   2018-07-25

 **/
import React from 'react'
import './index.less'

import Custom from '../Custom'

export default class GoodsDetails extends React.Component {
	state = {
		paramsData:{itemDetails:[],mapParams:{},scrollTop:0,refresh:true}
	}
	componentWillMount(){
		let { query } = this.props,
			{detail} = query,
			ipt = this.state.paramsData
		let detailItem = detail ? JSON.parse(detail) : []
		ipt.itemDetails = detailItem
		this.setState({paramsData:ipt})
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
	getItem = () => {
		let item = {
			commodityId:        1,
			currentPrice:    `122.99`,
			originalPrice: `100.99`,
			commodityName:     'TELEFLORA 11朵粉紫玫瑰七夕花束预定当天自提',
			commodityPicList:['http://rongyi.b0.upaiyun.com/commodity/text/201807191807420161.jpg','http://rongyi.b0.upaiyun.com/commodity/text/201807181419502662.png'],
			landingPageUrl:    'https://www.baidu.com/'
		}
		return item
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
