/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import checkToJump from '../../../checkToJump'
import JumpRouter from '../../../JumpRouter'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
import './index.less'

class Catg extends React.Component {
	state = {
		realIndex:0
	}

	componentDidMount() {
		let { data } = this.props
		const size = data.data.content.size || 4;
		data.data.content.switch ? this.initSwiper(size) : null
	}
	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.catg !== this.props.catg || nextState.realIndex !== this.state.realIndex){
			 return true
			}else{
				return false
			}
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
					//clearInterval(RYTimer);
					//funcIn()
				},
				slidePrevTransitionStart:function(){
					realIndex = realIndex-1
					that.setState({realIndex:realIndex})
					//clearInterval(RYTimer);
					//funcIn()
				}
			},
      		observer : true,//修改swiper自己或子元素时，自动初始化swiper 
			observeParents : true//修改swiper的父元素时，自动初始化swiper 
		}
		this.myCatgSwiper && this.myCatgSwiper.destroy(false)
		this.myCatgSwiper = new Swiper(`.swiper-container_catg`, swiperOptions)
	}
	selectVal = str => {
		let { ioInput, ioOuter,action } = this.props
		if (ioInput.catg === str) return
		const dataStr = checkToJump('storeFilter','storeList',str,200);
		JumpRouter(dataStr,'','',action)
		ioInput.catg = str
		ioInput.changePage = false
		ioOuter(ioInput)
	}
	toPageFloor = page => {
		this.setState({realIndex:page})
		this.myCatgSwiper.slideTo(page,500,false);
	}
	render() {
		let { type, ioInput,categories } = this.props
		let dom
		switch(type){
			case "Style1" : dom = (<RenderCatg realIndex={this.state.realIndex} props={this.props} arr={ categories} nowVal={ioInput.catg} toPageFloor={this.toPageFloor} selectVal={this.selectVal} />); break
			default : dom = (<RenderCatg realIndex={this.state.realIndex} props={this.props} arr={ categories} nowVal={ioInput.catg} toPageFloor={this.toPageFloor} selectVal={this.selectVal} />); break
		}
		return (
			<section className={`e-Catg ${type}`}>
				{ dom }
			</section> 
		)
	}
}
//渲染页面
function RenderCatg({realIndex ,props, arr, nowVal,toPageFloor,selectVal}){
	const content = props.data.data.content;
	let css = cssColorFormat(props, 'filter');
		return (
			<div className="catgBox">
				{
					content.switch ? <ShowDirectionCatg page={realIndex} css={css} props={props} arr={arr} nowVal={nowVal} toPageFloor={toPageFloor} selectVal={selectVal} /> :
					<NoShowCatg arr={arr} css={css} nowVal={nowVal} props={props} selectVal={selectVal} />
				}
			</div>
		)
}
//无翻页时的渲染
function NoShowCatg({arr,css,nowVal,props,selectVal}) {
	return (
		<div className="ShowDirection" style={cssColorFormat(props, 'filterBox')}>
			{ arr.map((_, i) => { 
					let nCss = css,
						recordId = _.id
					if (recordId === nowVal) nCss = { ...css, ...cssColorFormat(props, 'filterActive') }
					return (
						<div className="e-item" key={i}>
							<div
								className={`el-item${recordId === nowVal? ' s-active': ''}`}
								style={nCss}
								onClick={()=>{selectVal(recordId)}}
							>
								{_.name}
							</div>
						</div>
					)
				})
			}
		</div>
	)
}
//有翻页时的渲染
function ShowDirectionCatg({page,css,props,arr,nowVal,toPageFloor,selectVal}) {
	const { data,ioInput } = props;
	const size = data.data.content.size || 4,
		  pageSwitch = data.data.content.pageSwitch || false,
		  cssp = cssColorFormat(props, 'filterPage'),
		  cssn = cssColorFormat(props, 'filterPage');
	const allPages = arr.length-size;
	return (
		<div className="ShowDirection" style={cssColorFormat(props, 'filterBox')}>
			{
				pageSwitch ? <div className={page < 1? 's-disabled': ''} style={{ ...cssp, ...cssColorFormat(props, 'PagePrev') }} onClick={()=>{toPageFloor(page-1)}}></div> : null
			}
			<div style={{height:'100%',width:`${pageSwitch ? '70%' : '100%'}`}}>
				<div className={`swiper-container swiper-container_catg`}>
					<div className="swiper-wrapper"> 
						{ arr.map((_, i) => { 
							let nCss = css,
								recordId = _.id
							if (recordId === nowVal) nCss = { ...css, ...cssColorFormat(props, 'filterActive') }
							return (
								<div className="swiper-slide" key={i}>
									<div
										className={`el-item${recordId === nowVal? ' s-active': ''}`}
										style={nCss}
										onClick={()=>{selectVal(recordId)}}
									>
										{_.name}
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
