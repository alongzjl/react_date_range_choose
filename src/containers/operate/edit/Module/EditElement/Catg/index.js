/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import './index.less'

class Catg extends React.Component {
	state = {
		realIndex:0
	}

	componentDidMount() {
		let { data,ioInput } = this.props
		const size = data.data.content.size;
		this.initSwiper(size)
	}
	componentWillReceiveProps(props) {
		let { data,ioInput } = props
		const size = data.data.content.size;
		this.initSwiper(size)
	}
	componentWillUnmount() {
		this.myCatgSwiper.destroy(false)
	}
	initSwiper = size => {
		let that = this,
			realIndex = this.state.realIndex;
		const swiperOptions = {
			direction : 'horizontal',
			 slidesPerView: size,
      		spaceBetween: 0,
      		on:{
				slideNextTransitionStart:function(){
					realIndex = realIndex+1
					that.setState({realIndex:realIndex})
				},
				slidePrevTransitionStart:function(){
					realIndex = realIndex-1
					that.setState({realIndex:realIndex})
				}
			},
      		observer : true,//修改swiper自己或子元素时，自动初始化swiper 
			observeParents : true//修改swiper的父元素时，自动初始化swiper 
		}
		this.myCatgSwiper && this.myCatgSwiper.destroy(false)
		this.myCatgSwiper = new Swiper(`.swiper-container_catg`, swiperOptions)
	}
	selectVal(str) {
		let { parent, actions, ioInput, ioOuter } = this.props
		if (ioInput.body.catg === str || !parent) return
		ioInput.body.catg = str
		ioOuter(ioInput)
	}
	toPageFloor(page) {
		this.setState({realIndex:page})
		this.myCatgSwiper.slideTo(page,500,false);
	}
	renderSwiper(props, arr, nowVal) { 
		const { data,ioInput } = props;
		const size = data.data.content.size,
			  allPages = arr.length-size;
			 /* cssp = cssColorFormat(props, 'filterPage'),
			  cssn = cssColorFormat(props, 'filterPage');*/
		const page = this.state.realIndex;
		let css = cssColorFormat(props, 'filter');
			return (
				<div className="catgBox">
					{/* style={{pointerEvents:`${ioInput.floors.length >= size ? "auto" : "none"}`}}
						ioInput.floors.length >= size ? <div className={page < 1? 's-disabled': ''} style={{ ...cssp, ...cssColorFormat(props, 'PagePrev') }} onClick={this.toPageFloor.bind(this, page-1)}></div> : null
					*/}
					<div className={`swiper-container swiper-container_catg`}>
						<div className="swiper-wrapper"> 
							{ arr.map((_, i) => { 
								let nCss = css,
									name = _.name
								if (name === nowVal) nCss = { ...css, ...cssColorFormat(props, 'filterActive') }
								return (
									<div className="swiper-slide" key={i}>
										<div
											className={`el-item${name === nowVal? ' s-active': ''}`}
											style={nCss}
											onClick={this.selectVal.bind(this, name)}
										>
											{name}
										</div>
									</div>
								)
							})
						}
					    </div>    
				    </div> 
				    {/*
						ioInput.floors.length >= size ?  <div className={page >= allPages? 's-disabled': ''} style={{ ...cssn, ...cssColorFormat(props, 'PageNext') }} onClick={this.toPageFloor.bind(this, page+1)}></div> : null
					*/}
				</div>
			)
	}

	renderStyle1(props, catgs, nowVal) {
		return this.renderSwiper.bind(this, props, catgs, nowVal)()
	}

	
	render() {
		let { type, editConfig, ioInput } = this.props
		let { catgs } = ioInput
		let render    = this[`render${type}`]? this[`render${type}`]: this.renderStyle1
		let dom       = render.bind(this, this.props, catgs, ioInput.body.catg)()
		return (
			<section className={`e-Catg ${type}`}>
				{ dom }
			</section>
		)
	}
}

export default Catg
