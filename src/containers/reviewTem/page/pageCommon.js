
/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */
  
import React from 'react'
import PictureShow           from 'reviewTem/EditElement/Picture'
import AreaShow              from 'reviewTem/EditElement/Area'
import WebShow               from 'reviewTem/EditElement/Web'
import TextShow              from 'reviewTem/EditElement/Text'
import QrcodeRYShow          from 'reviewTem/EditElement/QrcodeRY'
import ButtonShow            from 'reviewTem/EditElement/Button'
import VideoShow             from 'reviewTem/EditElement/Video'
import SwiperImageShow       from 'reviewTem/EditElement/SwiperImage'
import SwiperImgAndVideoShow from 'reviewTem/EditElement/SwiperImgAndVideo'
import WonderfulActivityShow from 'reviewTem/EditElement/WonderfulActivity' 
import TimeShow              from 'reviewTem/EditElement/Comp/Common/Time' 
import WeatherShow           from 'reviewTem/EditElement/Comp/Common/Weather'
import SplitLineShow         from 'reviewTem/EditElement/SplitLine'
import Map2DShow             from 'reviewTem/EditElement/Map2D'
import NavigationShow        from 'reviewTem/EditElement/Navigation'
import NavigationFloatShow   from 'reviewTem/EditElement/NavigationFloat'
import DateWeatherShow       from 'reviewTem/EditElement/Comp/DateWeather'
import StoreListShow         from 'reviewTem/EditElement/Comp/StoreList' 
import StoreListNewShow      from 'reviewTem/EditElement/Comp/StoreListNew'
import StoreDetailsShow      from 'reviewTem/EditElement/Comp/StoreDetails'
import StoreDetailsNewShow   from 'reviewTem/EditElement/Comp/StoreDetailsNew'
import StoreInstroShow       from 'reviewTem/EditElement/Comp/StoreInstro'
import GoodsListShow         from 'reviewTem/EditElement/Comp/GoodsList'
import GoodsDetailsShow      from 'reviewTem/EditElement/Comp/GoodsDetails'

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
	  	//homepage != pageContent.router ? funcIn() : null
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
							 	case "picture" : compCon = (<PictureShow data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "area" : compCon = (<AreaShow data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "qrcode" : compCon = (<QrcodeRYShow data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "web" : compCon = (<WebShow data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "text" : compCon = (<TextShow data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "button" : compCon = (<ButtonShow data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "video" : compCon = (<VideoShow data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "swiperImage" : compCon = (<SwiperImageShow data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "swiperImgAndVideo" : compCon = (<SwiperImgAndVideoShow data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "wonderfulActivity" : compCon = (<WonderfulActivityShow activities={element.data.content} data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "time" : compCon = (<TimeShow data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "weather" : compCon = (<WeatherShow data={element} type={`Style${styleIdx + 1}`} />); break
							 	case "splitLine" : compCon = (<SplitLineShow data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} />); break
							 	case "map2D" : compCon = (<Map2DShow data={element} type={`Style${styleIdx + 1}`} />); break 
							 	case "navigation" : compCon = (<NavigationShow data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "navigationFloat" : compCon = (<NavigationFloatShow data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "dateWeather" : compCon = (<DateWeatherShow data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} />); break
							 	case "storeList" : compCon = (<StoreListShow data={element} categories={categories} floors={floors} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "storeDetails" : compCon = (<StoreDetailsShow data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "storeList2" : compCon = (<StoreListNewShow data={element} categories={categories} floors={floors} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "storeDetails2" : compCon = (<StoreDetailsNewShow data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
							 	case "storeInstro" : compCon = (<StoreInstroShow data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} />); break
						 	 	case "goodsList" : compCon = (<GoodsListShow data={element} type={`Style${styleIdx + 1}`} animateParams={animateParams} animate={this.leaveAnimate} action={action} query={this.props.query}/>); break
						 	 	case "goodsDetails" : compCon = (<GoodsDetailsShow data={element} type={`Style${styleIdx + 1}`} top={layout.top} animateParams={animateParams} animate={this.leaveAnimate} action={action} />); break
						 	 default: ; break
						 } 
						 return (
							<div className={`pge-layout ${aniCls? aniCls: ''}`} style={{...layout,...aniSty}} key={i}>{ compCon }</div>
						 )
					  })
 		return ( 
			<div className={`pg-element-parent-show ${this.state.name}`} style={pageOutAnimate.style}> 
				<section className={`pg-element ${pageInAnimate.name}`} style={{...bgStyle,...pageInAnimate.style}}>{ childNode }</section>
			</div>
		)
	}
}
 

export default EditElementCommon
