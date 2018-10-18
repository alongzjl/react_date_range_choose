/**
 * @Author: Along
 * @Date:   2018-05-03
 */


import React from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import './index.less'

export default class SwiperBind extends React.Component {
	state = {
		random: parseInt(Math.random() * 1e9),
		realIndex:0
	}	
	componentDidMount() {
		this.props.realIndex ? this.init(this.props,this.state.random) : null;
	}  
	componentWillReceiveProps(props) {
		props.realIndex ? setTimeout(()=> this.init(props,this.state.random),10) : null
	}     
	init = (props,random) => {
		let { data } = props;
		let swiperOptions = deepCopy(data.data.content.swiperOptions);
		swiperOptions = this.formatObj(swiperOptions); 
		this.destorySwiper();
		this.initSwiper(swiperOptions,random);   
	};       
	 initSwiper = (swiperOptions,random) => {
	 	this.mySwiperBindImage = new Swiper(`.swiper-container_bind_${random}`, swiperOptions) 
	};  
	formatObj = obj => {  
		let new_obj = deepCopy(obj);
		let autoplay = obj['autoplay'];
		let delay = obj['delay'];
		if(autoplay){
			let autoplayDisableOnInteraction = obj['autoplayDisableOnInteraction'];
			new_obj.autoplay = {disableOnInteraction:false,delay:delay}
		}
		new_obj.on = {
			slideChange:()=>{
				this.mySwiperBindImage&&obj.pagination ? this.setState({realIndex:this.mySwiperBindImage.realIndex}) : null
			}
		}
		return new_obj 
	}; 
	destorySwiper = () => {
		let newS = this.mySwiperBindImage;
		if(getAttr(newS) == 'String'){
			newS.destroy();
		}else if(getAttr(newS) == 'Array'){
			newS.forEach(item=>{
				item.destroy();
			}) 
		}
	}  
	componentWillUnmount() {
		this.destorySwiper()
	}
	render() {
		let { data,item,bind,realIndex,type } = this.props,
		swiperOptions = data.data.content.swiperOptions,
		imgs = bind&&item[bind]&&getAttr(item[bind])=='Array' ? item[bind]: [],
		pointer = type=="recom" ? {} : {pointerEvents:'auto'}, 
		swiperImage = cssColorFormat(this.props, 'swiperImage') 
		return ( 
			<section className="e-swiper-bind" style={{...swiperImage,...pointer}} id="swiperBind">
				{
					imgs.length == 1 ? <img src={imgs[0]}  style={swiperImage} /> :
					(realIndex ? <div><div className={`swiper-container swiper-container_bind_${this.state.random}`}>
						<div className="swiper-wrapper">
							{
								imgs.map((_, i) => {
									return <div className="swiper-slide" key={i}>{
										_ ? <img src={_}  style={swiperImage} /> : null
									}</div>
								})
							}
						</div>   
					</div>
					{
						swiperOptions.pagination
						?
						<PageElementBind
							currentPage={this.state.realIndex}
							totalPage={imgs.length}
							props={this.props}
						/>
						: null
					}
					</div> : <img src={imgs[0]}  style={swiperImage} />)
				}
			</section>
		)
	}
}

//渲染分页显示组件
function PageElementBind({ totalPage,currentPage,props }){
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

