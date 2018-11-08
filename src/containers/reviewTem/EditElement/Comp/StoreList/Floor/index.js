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

class Floor extends React.Component {
	state = {
		realIndex:0
	}

	componentDidMount() {
		let { data } = this.props
		const size = data.data.content.size || 5;
		data.data.content.switch ? this.initSwiper(size) : null
	} 
	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.floor !== this.props.floor || nextState.realIndex !== this.state.realIndex){
			 return true
			}else{
				return false
			}
	}
	initSwiper = size => {
		let that = this,
			realIndex = this.state.realIndex;
		const swiperOptions = {
			direction : 'vertical',
			 slidesPerView: size,
      		spaceBetween: 0,
      		on:{
				slideNextTransitionStart:function(){
					realIndex = realIndex+1
					that.setState({realIndex:realIndex})
					// clearInterval(RYTimer);
					// funcIn()
				},
				slidePrevTransitionStart:function(){
					realIndex = realIndex-1
					that.setState({realIndex:realIndex})
					// clearInterval(RYTimer);
					// funcIn()
				}
			},
      		observer : true,//修改swiper自己或子元素时，自动初始化swiper 
			observeParents : true//修改swiper的父元素时，自动初始化swiper 
		}
		this.myFloorSwiper && this.myFloorSwiper.destroy(false)
		this.myFloorSwiper = new Swiper(`.swiper-container_floor`, swiperOptions)
	}
	selectVal = (str,index) => {
		let { ioInput, ioOuter,action } = this.props
		if (ioInput.floor === str) return
		const dataStr = checkToJump('storeFilter','storeList',str,202);
		JumpRouter(dataStr,'','',action)
		ioInput.floor = str 
		ioInput.changePage = false
		ioInput.haveFloorMap ? ioOuter(ioInput,{type:'floor',value:index}) : ioOuter(ioInput)
	}
	toPageFloor = page => {
		this.setState({realIndex:page})
		this.myFloorSwiper.slideTo(page,500,false);
	}
	render() {
		let { type, ioInput,floors } = this.props
		let dom
		switch(type){
			case "Style1" : dom = (<RenderFloor realIndex={this.state.realIndex} props={this.props} arr={floors} nowVal={ioInput.floor} toPageFloor={this.toPageFloor} selectVal={this.selectVal} />); break
			default : dom = (<RenderFloor realIndex={this.state.realIndex} props={this.props} arr={floors} nowVal={ioInput.floor} toPageFloor={this.toPageFloor} selectVal={this.selectVal} />); break
		}
		return (
			<section className={`e-floor ${type}`}>
				{ dom }
			</section>
		)
	}
}
//渲染页面
function RenderFloor({ props, arr, nowVal,realIndex,selectVal,toPageFloor }) { 
	const content = props.data.data.content;
	let css = cssColorFormat(props, 'filter');
		return (
			<div className="floorBox">
				{
					content.switch ? <ShowDirection page={realIndex} css={css} props={props} arr={arr} nowVal={nowVal} toPageFloor={toPageFloor} selectVal={selectVal} /> :
					<NoShow arr={arr} css={css} nowVal={nowVal} props={props} selectVal={selectVal} />
				}
			</div>
		)
}
//无翻页时的渲染
function NoShow({arr,css,nowVal,props,selectVal}) {
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
								onClick={()=>{selectVal(recordId,i)}}
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
function ShowDirection({page,css,props,arr,nowVal,toPageFloor,selectVal}) {
	const { data } = props;
	const size = data.data.content.size || 5,
		  pageSwitch = data.data.content.pageSwitch || false,
		  cssp = cssColorFormat(props, 'filterPage'),
		  cssn = cssColorFormat(props, 'filterPage');
	const allPages = arr.length-size;
	return (
		<div className="ShowDirection" style={cssColorFormat(props, 'filterBox')}>
			{
				pageSwitch ? <div className={page < 1? 's-disabled': ''} style={{ ...cssp, ...cssColorFormat(props, 'PagePrev') }} onClick={()=>{toPageFloor(page-1)}}></div> : null
			}
			<div style={{width:'100%',height:`${pageSwitch?'75%':'100%'}`}}>
				<div className={`swiper-container swiper-container_floor`}>
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
										onClick={()=>{selectVal(recordId,i)}}
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
export default Floor
