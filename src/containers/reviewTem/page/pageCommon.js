
/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */
 
import React from 'react'
import Picture           from 'reviewTem/EditElement/Picture'
import Area              from 'reviewTem/EditElement/Area'
import Web               from 'reviewTem/EditElement/Web'
import Text              from 'reviewTem/EditElement/Text'
import QrcodeRY          from 'reviewTem/EditElement/QrcodeRY'
import Button            from 'reviewTem/EditElement/Button'
import Video             from 'reviewTem/EditElement/Video'
import SwiperImage       from 'reviewTem/EditElement/SwiperImage'
import WonderfulActivity from 'reviewTem/EditElement/WonderfulActivity'
import Time              from 'reviewTem/EditElement/Comp/Common/Time'
import Weather           from 'reviewTem/EditElement/Comp/Common/Weather'
import SplitLine         from 'reviewTem/EditElement/SplitLine'
import Map2D             from 'reviewTem/EditElement/Map2D'
import Navigation        from 'reviewTem/EditElement/Navigation'
import NavigationFloat   from 'reviewTem/EditElement/NavigationFloat'
import DateWeather       from 'reviewTem/EditElement/Comp/DateWeather'
import StoreList         from 'reviewTem/EditElement/Comp/StoreList'
import StoreListNew      from 'reviewTem/EditElement/Comp/StoreListNew'
import StoreDetails      from 'reviewTem/EditElement/Comp/StoreDetails'
import StoreDetailsNew   from 'reviewTem/EditElement/Comp/StoreDetailsNew'
import StoreInstro       from 'reviewTem/EditElement/Comp/StoreInstro'
import GoodsList         from 'reviewTem/EditElement/Comp/GoodsList'
import GoodsDetails      from 'reviewTem/EditElement/Comp/GoodsDetails'

import addAnimate from 'reviewTem/page/animateAdd'
import 'reviewTem/page/index.less'

class EditElementCommon extends React.Component {
  state = {
  	name:'',
  	page:''
  }
  componentWillMount() {
  		let pageEle = this.props.pageContent
  		this.setState({page:pageEle})
	  	window.RY_page_router = pageEle.router
  	}
  	leaveAnimate = () => {
  		const objAn = this.state.page.animation;
		const animateOut = objAn.out
		const pageAnimateOut = addAnimate(animateOut);
     	this.setState({name:pageAnimateOut.name})
	}
	componentDidMount(){
		let { globalData,pageContent } = this.props
		const { homepage } = globalData.data;
		pageContent.feature.homeTime ? backHomeTime = pageContent.feature.homeTime : null;
	  	window.RYTimer ? clearInterval(window.RYTimer) : null;
	  	homepage != pageContent.router ? funcIn() : null
	}
	render() { 
		let { globalData,categories,floors } = this.props,
			page  =this.state.page,     
			eles   = page.elements.length > 0 ? page.elements : [],
			theme  = globalData.theme, 
			colors = theme.list[theme.idx].colors, 
			feature = page.feature,     
			color  = feature.backgroundColor, 
			type   = color.type, 
			animateParams   =   page.animation 
		window.curThemeColor = colors; 
 		let bgStyle   = page.feature? { backgroundColor: type === 'custom'? color.color: colors[type].color }: {}
 		const pageInAnimate = addAnimate(animateParams.in);
 		const pageOutAnimate = addAnimate(animateParams.out);
 		const pageInAnimateDelay = animateParams.in.className ? (animateParams.in.delay + animateParams.in.duration) : 0;
 		const action = {updateGlobal:this.props.actions.updateGlobal,globalData:this.props.globalData};
 		let childNode = eles.map((element, i) => { 
 							const noFormatAni = element.data.animation;
							const animateInfo = addAnimate(noFormatAni);
							let layout    = element.data.layout, 
								  styleIdx  = element.styleList.idx,
								  aniCls    = animateInfo.name,
				                  aniSty    = animateInfo.style,
				                  compCon;
				                 aniSty.animationDelay = `${noFormatAni.delay + pageInAnimateDelay}s`;
				              switch (element.name) {
							 	case "picture" : compCon = (<Picture data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "area" : compCon = (<Area data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "qrcode" : compCon = (<QrcodeRY data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "web" : compCon = (<Web data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "text" : compCon = (<Text data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "button" : compCon = (<Button data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "video" : compCon = (<Video data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "swiperImage" : compCon = (<SwiperImage data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "wonderfulActivity" : compCon = (<WonderfulActivity activities={element.data.content} data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "time" : compCon = (<Time data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "weather" : compCon = (<Weather data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "splitLine" : compCon = (<SplitLine data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} />); break
							 	case "map2D" : compCon = (<Map2D data={element} type={`Style${styleIdx + 1}`} />); break 
							 	case "navigation" : compCon = (<Navigation data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "navigationFloat" : compCon = (<NavigationFloat data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "dateWeather" : compCon = (<DateWeather data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} />); break
							 	case "storeList" : compCon = (<StoreList data={element} categories={categories} floors={floors} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "storeDetails" : compCon = (<StoreDetails data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "storeList2" : compCon = (<StoreListNew data={element} categories={categories} floors={floors} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "storeDetails2" : compCon = (<StoreDetailsNew data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "storeInstro" : compCon = (<StoreInstro data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} />); break
						 	 	case "goodsList" : compCon = (<GoodsList data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} query={this.props.query}/>); break
						 	 	case "goodsDetails" : compCon = (<GoodsDetails data={element} type={`Style${styleIdx + 1}`} top={layout.top} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
						 	 default: ; break
						 } 
						 return (
							<div className={`pge-layout ${aniCls? aniCls: ''}`} style={{...layout,...aniSty}} key={i}>{ compCon }</div>
						 )
					  })
 		return ( 
			<div className={`pg-element-parent ${this.state.name}`} style={pageOutAnimate.style}> 
				<section className={`pg-element ${pageInAnimate.name}`} style={{...bgStyle,...pageInAnimate.style}}>{ childNode }</section>
			</div>
		)
	}
}
 

export default EditElementCommon
