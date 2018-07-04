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
		realIndex:0,
		id: `swiperContainerCatg_${Math.floor(Math.random()*1e9)}`
	}

	componentDidMount() {
		let { data,ioInput } = this.props
		const size = data.data.content.size;
		data.data.content.switch ? this.initSwiper(size) : null
	}
	componentWillReceiveProps(props) {
		let { data,ioInput } = props
		const size = data.data.content.size;
		data.data.content.switch ? setTimeout(()=>{this.initSwiper(size)},10) : null
	}
	componentWillUnmount() {
		let { data } = this.props
		data.data.content.switch ? this.myCatgSwiper.destroy(false) : null
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
		this.myCatgSwiper = new Swiper(`#${this.state.id}`, swiperOptions)
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
		const page = this.state.realIndex,
			  content = props.data.data.content;
		let css = cssColorFormat(props, 'filter');
			return (
				<div className="catgBox">
					{
						content.switch ? <ShowDirection id={this.state.id} page={page} css={css} props={props} arr={arr} nowVal={nowVal} toPageFloor={this.toPageFloor.bind(this)} selectVal={this.selectVal.bind(this)} /> :
						<NoShow arr={arr} css={css} nowVal={nowVal} props={props} selectVal={this.selectVal.bind(this)} />
					}
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

function NoShow({arr,css,nowVal,props,selectVal}) {

	return (
		<div className="ShowDirection" style={cssColorFormat(props, 'filterBox')}>
			{ arr.map((_, i) => { 
					let nCss = css,
						name = _.name
					if (name === nowVal) nCss = { ...css, ...cssColorFormat(props, 'filterActive') }
					return (
						<div className="e-item" key={i}>
							<div
								className={`el-item${name === nowVal? ' s-active': ''}`}
								style={nCss}
								onClick={()=>{selectVal(name)}}
							>
								{name}
							</div>
						</div>
					)
				})
			}
		</div>
	) 
}

function ShowDirection({id, page,css,props,arr,nowVal,toPageFloor,selectVal}) {
	const { data,ioInput } = props;
	const size = data.data.content.size,
		  pageSwitch = data.data.content.pageSwitch,
		  cssp = cssColorFormat(props, 'filterPage'),
		  cssn = cssColorFormat(props, 'filterPage');
	const allPages = arr.length-size;

	return (
		<div className="ShowDirection pageShow" style={cssColorFormat(props, 'filterBox')}>
			{
				pageSwitch ? <div className={page < 1? 's-disabled': ''} style={{ ...cssp, ...cssColorFormat(props, 'PagePrev') }} onClick={()=>{toPageFloor(page-1)}}></div> : null
			}
			<div style={{height:'100%',width:`${pageSwitch ? '70%' : '100%'}`}}>
				<div id={id} className={`swiper-container swiper-container_catg`}>
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
										onClick={()=>{selectVal(name)}}
									>
										{name}
									</div>
								</div>
							)
						}) 
					}
				    </div>    
			    </div> 
			</div>
		    {
				pageSwitch ?  <div className={page >= allPages? 's-disabled': ''} style={{ ...cssn, ...cssColorFormat(props, 'PageNext') }} onClick={()=>{toPageFloor(page+1)}}></div> : null
			}
		</div>
	)
}
export default Catg
