import React from 'react'
import Swiper from 'react-id-swiper'
import './index.less'

export default class SwiperElement extends React.Component {
	
	state = {
		currentPage:0,
	}
	getCurrentPage = page => {
		this.setState({
			currentPage:page
		})
	}
	render() {
		let { children,options,data,random,isClick,toPage } = this.props
		return children
		?
		(
			<div className="swiper-element">
				<SwiperGoods 
					children={children} 
					options={options} 
					random={random} 
					getCurrentPage={this.getCurrentPage}
					isClick={isClick}
					toPage={toPage}
				/>
				{
					options.pagination
					?
					<PageElement
						currentPage={this.state.currentPage}
						totalPage={children.length}
						props={data}
					/>
					: null
				}
			</div>
		): null
	}
}
//轮播
class SwiperGoods extends React.Component {
	state = {
		slidePage:false
	}
	
	shouldComponentUpdate(nextProps,nextState){
		return !nextState.slidePage
	}
	optsFormat = () => {
		let { options = {
			direction: 'horizontal',
			effect:  'slide',
			autoplay: true,
			loop:  true,
			speed: 500,
			delay: 3000
		},random,isClick,children } = this.props,
			opts = JSON.parse(JSON.stringify(options)),
			{ autoplay, delay } = opts
		if (autoplay) opts.autoplay = { delay, disableOnInteraction: false }
		opts.rebuildOnUpdate = true
		opts.containerClass  = `swiper-element swiper-container customized-container-${random}`
		let pagination = this.props.options.pagination
		opts.on = {
			slideChange: e => {
				if(!this.swiper) return
				this.setState({slidePage:true})
				if(pagination){
					this.props.getCurrentPage(this.swiper.realIndex)
				}
			},
			tap: () => {
				let item = children[this.swiper.realIndex].props.children.props.itemList
				this.props.toPage(item)
			}
		}
		delete opts.delay
		return opts
	}
	render(){
		let opts  = this.optsFormat(),
			{ children } = this.props
		return(
			<Swiper {...opts} ref={node => { if (node) this.swiper = node.swiper }}>
				{ children }
			</Swiper>
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
