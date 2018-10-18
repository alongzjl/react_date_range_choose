/**
 * @Author: Along
 * @Date:   2018-07-25

 **/

import React from 'react'
import Layout from '../../Layout' 
import Swiper from 'swiper' 
import JumpRouter from '../../../JumpRouter'
import checkToJump from '../../../checkToJump'
import * as Server from 'server'
import 'swiper/dist/css/swiper.css'
import './index.less'

export default class SwiperByGoods extends React.Component {
	state = {
		recommendGoods:[],
		random: parseInt(Math.random()*10000),
		realIndex:0
	}
	
	componentDidMount() {
		Server.goods.getRecGoodsList(o => {
			this.setState({ recommendGoods: o })
		})
	}  
	 
	render() { 
		let props = this.props;
		let { data } = props;
		let swiperOptions = data.data.content.swiperOptions;
		return (
			<section className={`e-swiper-by-goods`}>
				{
					<div>
							<SlideOne 
								props={props} 
								random={this.state.random} 
								recommendGoods={this.state.recommendGoods}
								realIndex={this.state.realIndex}
							/>							
							{
								swiperOptions.pagination
								?
								<PageElement
									currentPage={this.state.realIndex}
									totalPage={this.state.recommendGoods.length}
									props={props}
								/>
								: null
							}
					</div>
				}
			</section>
		)
	}
} 

//推荐商品轮播
class SlideOne extends React.Component {
 
	render(){  
		let { props,random,recommendGoods,realIndex } = this.props,
			{ data } = props,
			{ content,componentLayout } = data.data,
			swiperBind = componentLayout.filter(item=>item.name == 'swiperBind'),
			contentBind = swiperBind.length>0 ? swiperBind[0].data.content.bind : 'no',
			styleObj = cssColorFormat(props, 'filterBox');
		return (  
			<div className={`swiper-container swiper-container_recom_${random}`}>
				<div className="swiper-wrapper">
					{
						recommendGoods.map((_, i) => {
							return (
								<div className="swiper-slide" key={i}>
									<Layout
										data={data}
										styleObj={styleObj}
										itemList={_}
										refresh={true} 
										type="recom"
										realIndex={realIndex==i?true:false}
									/>
								</div>  
							)
						})
					} 
				</div>    
			</div>
		)
	}
}
//渲染分页显示组件
function PageElement({ totalPage,currentPage,props }){
	let paginationBox = cssColorFormat(props, 'paginationBox'),
		pagination = cssColorFormat(props, 'pagination'),
		paginationActive = cssColorFormat(props, 'paginationActive')
	return (
		<section className="e-page">
			<div className="ep-page" style={paginationBox}>
				{
					Array.from(new Array(totalPage)).map((_, i) => {
						let cur = i
						let nCss = pagination
						if (currentPage === cur) nCss = { ...nCss, ...paginationActive }
						return (
							<div
								key={i}
								style={nCss}
								className={`ep-item${currentPage === cur? ' s-active': ''}`}
							>
							</div>
						)
					})
				}
			</div>
		</section>
	)
}

