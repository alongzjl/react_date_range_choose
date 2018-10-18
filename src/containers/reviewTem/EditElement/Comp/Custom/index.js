/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import SplitLine      from '../../SplitLine'
import Picture      from '../../Picture'
import Web          from '../../Web'
import Area        	from '../../Area'
import Button       from '../../Button' 
import Text         from '../../Text' 
import Address      from '../StoreDetails/Address'
import Time         from '../Common/Time' 
import Weather      from '../Common/Weather' 
import Letter       from '../StoreList/Letter'
import Floor        from '../StoreList/Floor'
import FloorMap     from '../StoreList/FloorMap'
import Catg         from '../StoreList/Catg'
import Page         from '../../Page'
import Reset        from '../StoreList/Reset' 
import ListByStore  from '../StoreList/ListByStore'
//新店铺
import LetterNew       	from '../StoreListNew/LetterNew'
import FloorNew        	from '../StoreListNew/FloorNew'
import CatgNew         	from '../StoreListNew/CatgNew'
import PageNew         	from '../StoreListNew/PageNew'
import ResetNew        	from '../StoreListNew/ResetNew' 
import ListByStoreNew  	from '../StoreListNew/ListByStoreNew'
//新店铺详情
import StoreDetailsBlock from '../StoreDetailsNew/StoreDetailsBlock'

import ListByGoods  from '../GoodsList/ListByGoods'
import CatgByGoods from '../GoodsList/CatgByGoods'
import ResetByGoods from '../GoodsList/ResetByGoods'
import SwiperByGoods  from '../GoodsList/SwiperByGoods'
import GoodsBar     from '../GoodsDetails/GoodsBar'
import GoodsBlock   from '../GoodsDetails/GoodsBlock'
import PictureListBind from '../GoodsDetails/PictureListBind'
import WonderfulActivity from '../../WonderfulActivity'
import Swiperbind  from '../Common/Swiperbind'
import addAnimate from '../../../page/animateAdd'
import RYdataMap from '../Common/RYdataMap'

import './index.less'

 

class Custom extends React.Component {
	 
	render() {  
		let { data, ioInput, ioOuter,floors,categories,shopsInfo,animate,animateParams,action,storeUpdate,have_goods,top } = this.props
		let comp  = data.data.components,
			delayTime = data.data.animation.className ? (data.data.animation.delay + data.data.animation.duration) : 0,
			goodsDetails = ioInput&&ioInput.itemDetails;
		goodsDetails ? goodsDetails = RYdataMap(goodsDetails) : null;
		let childNode = comp.map((_, i) => {   
			const noFormatAni = _.data.animation;
			const animateInfo = addAnimate(noFormatAni);
			let compName = _.name,
				layout   = _.data.layout,
				styleIdx = _.styleList.idx,
				aniCls    = animateInfo.name,
				aniSty   = animateInfo.style,
				contentBind = _.data.content&&_.data.content.bind,
				compCon ;  
			aniSty.animationDelay = `${noFormatAni.delay + delayTime}s`;
			switch(compName){
				case 'text' : compCon = (<Text data={_} type={`Style${styleIdx + 1}`} animate={animate} animateParams={animateParams} />);break
				case 'picture'   : compCon = (<Picture data={_} type={`Style${styleIdx + 1}`} name={data.name} animate={animate} animateParams={animateParams} />);break
				case 'splitLine' : compCon = (<SplitLine data={_} type={`Style${styleIdx + 1}`} />);break
				case 'web': compCon = (<Web data={_} type={`Style${styleIdx + 1}`} />);break
				case 'area' : compCon = (<Area data={_} type={`Style${styleIdx + 1}`} />);break
				case 'button' : compCon = (<Button data={_} type={`Style${styleIdx + 1}`} animate={animate} animateParams={animateParams} action={action} />);break
				case 'address' : compCon = (<Address data={_} type={`Style${styleIdx + 1}`} />);break
				case 'time' : compCon = (<Time data={_} type={`Style${styleIdx + 1}`} />);break
				case 'weather' : compCon = (<Weather data={_} type={`Style${styleIdx + 1}`} />);break 
				case 'wonderfulActivity' : compCon = (<WonderfulActivity  activities={_.data.content} data={_} type={`Style${styleIdx + 1}`} name={name} />);break
				case 'letter' : compCon = (<Letter data={_} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} letter={ioInput.letter} action={action} />);break
				case 'floor' : compCon = (<Floor data={_} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} floors={floors} floor={ioInput.floor} action={action} />);break
				case 'catg' :  compCon = (<Catg data={_} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} catg={ioInput.catg} categories={categories} action={action} />);break
				case 'page' : compCon = (<Page data={_} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} shopsInfo={shopsInfo} />);break
				case 'reset' :  compCon = (<Reset data={_} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} action={action} storeUpdate={storeUpdate} />);break
				case 'floorMap' : compCon = (<FloorMap data={_} type={`Style${styleIdx + 1}`} />);break
				case 'listByStore' : compCon = (<ListByStore data={_} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} shops={shopsInfo} animate={animate} animateParams={animateParams} action={action} storeUpdate={storeUpdate} />);break
				{/*//新店铺*/}
				case 'letterByStore2' : compCon = (<LetterNew data={_} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} letter={ioInput.letter} action={action} />);break
				case 'floorByStore2' : compCon = (<FloorNew data={_} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} floors={floors} floor={ioInput.floor} action={action} />);break
				case 'catgByStore2' :  compCon = (<CatgNew data={_} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} catg={ioInput.catg} categories={categories} action={action} />);break
				case 'pageByStore2' : compCon = (<PageNew data={_} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} shopsInfo={shopsInfo} />);break
				case 'resetByStore2' :  compCon = (<ResetNew data={_} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} action={action} storeUpdate={storeUpdate} />);break
				case 'mapByStore2' : compCon = (<FloorMap data={_} type={`Style${styleIdx + 1}`} />);break
				case 'listByStore2' : compCon = (<ListByStoreNew data={_} type={`Style${styleIdx + 1}`} ioInput={ioInput} ioOuter={ioOuter} shops={shopsInfo} animate={animate} animateParams={animateParams} action={action} storeUpdate={storeUpdate} />);break
				case 'storeBlock' : compCon = (<StoreDetailsBlock data={_} type={`Style${styleIdx + 1}`} goodsDetails={goodsDetails} action={action} animate={animate} animateParams={animateParams} />);break

				case 'listByGoods' : compCon = (<ListByGoods data={_} type={`Style${styleIdx + 1}`} animate={animate} animateParams={animateParams} action={action} ioInput={ioInput} />);break
				case 'catgByGoods' : compCon = (<CatgByGoods data={_} type={`Style${styleIdx + 1}`} have_goods={have_goods} action={action} animate={animate} animateParams={animateParams} ioInput={ioInput} ioOuter={ioOuter} />);break
				case 'resetByGoods' : compCon = (<ResetByGoods data={_} type={`Style${styleIdx + 1}`} have_goods={have_goods} action={action} animate={animate} animateParams={animateParams} ioInput={ioInput} ioOuter={ioOuter} />);break
				case 'swiperByGoods' : compCon = (<SwiperByGoods data={_} type={`Style${styleIdx + 1}`} animate={animate} animateParams={animateParams} action={action} />);break
				case 'goodsBar' :  compCon = (<GoodsBar data={_} type={`Style${styleIdx + 1}`} top={top} ioInput={ioInput} refresh={ioInput.refresh} />);break
				case 'goodsBlock' :  compCon = (<GoodsBlock data={_} type={`Style${styleIdx + 1}`} ioInput={ioInput} refresh={ioInput.refresh} />);break
				case 'swiperBind' : 
					compCon = <Swiperbind data={_} bind={contentBind} item={goodsDetails} realIndex={true} />;break
				case 'pictureListBind' : 
					const imgList = contentBind&&getAttr(goodsDetails[contentBind])=="Array" ? goodsDetails[contentBind] : []
					 compCon = <PictureListBind data={_} imgList={imgList} type={`Style${styleIdx + 1}`} refresh={ioInput.refresh} />;break
			}
			return (   
				<div className={`pge-layout ${compName} ${aniCls? aniCls: ''}`} style={{...layout,...aniSty}} key={i}>{ compCon }</div> 
			)   
		})     
		return (
			<section className="pg-custom">
				{ childNode } 
			</section>
		)
	}
}


export default Custom
