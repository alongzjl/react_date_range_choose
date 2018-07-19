/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'

import Picture           from 'compEdit/EditElement/Picture'
import Web               from 'compEdit/EditElement/Web'
import Text              from 'compEdit/EditElement/Text'
import Button            from 'compEdit/EditElement/Button'
import Video             from 'compEdit/EditElement/Video'
import SwiperImage       from 'compEdit/EditElement/SwiperImage'
import WonderfulActivity from 'compEdit/EditElement/WonderfulActivity'
import Time              from 'compEdit/EditElement/Time'
import Weather           from 'compEdit/EditElement/Weather'
import StoreList         from 'compEdit/EditElement/StoreList'
import StoreDetails      from 'compEdit/EditElement/StoreDetails'
import StoreInstro       from 'compEdit/EditElement/StoreInstro'
import DateWeather       from 'compEdit/EditElement/DateWeather'
import Navigation        from 'compEdit/EditElement/Navigation'
import NavigationFloat   from 'compEdit/EditElement/NavigationFloat'
import SplitLine         from 'compEdit/EditElement/SplitLine'
import Map2D             from 'compEdit/EditElement/Map2D'
import Html              from 'compEdit/EditElement/Html'

import * as actions from 'actions'

import { Icon } from 'antd'

import './index.less'

import * as variable from 'var'

const ctMap = variable.composeTypeMap

const compContent = (name, data, actions, type, idx, csn) => {
	var props  = { data, actions, type, idx, csn }
	var render = {
		picture:           <Picture           {...props} />,
		web:               <Web               {...props} />,
		video:             <Video             {...props} />,
		text:              <Text              {...props} />,
		button:            <Button            {...props} />,
		swiperImage:       <SwiperImage       {...props} />,
		wonderfulActivity: <WonderfulActivity {...props} />,
		time:              <Time              {...props} />,
		weather:           <Weather           {...props} />,
		navigation:        <Navigation        {...props} />,
		navigationFloat:   <NavigationFloat   {...props} />,
		storeList:         <StoreList         {...props} />,
		storeDetails:      <StoreDetails      {...props} />,
		storeInstro:       <StoreInstro       {...props} />,
		splitLine:         <SplitLine         {...props} />,
		dateWeather:       <DateWeather       {...props} />,
		map2D:             <Map2D             {...props} />,
		html:              <Html              {...props} />
	}
	return render[name]
}

class Element extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let { data, actions, editConfig, time, location } = this.props
		let ct     = tempCfg.composeType || 'PORTRAIT',
			ads    = tempCfg.adsFlag? 'ads': '',
			eles   = data.elements || [],
			theme  = editConfig.globalData.theme,
			colors = theme.list[theme.idx].colors,
			color  = data.feature.backgroundColor,
			type   = color.type
		ct = ctMap[ct]? ct: 'PORTRAIT'
		window.curThemeColor = colors
		if (!colors[type] && type !== 'custom') {
			let curData = editConfig.curData
			color.type = 'custom'
			return actions.updatePage(curData.pageGroupIdx, curData.pageIdx, data)
		}
		let bgStyle   = data.feature? { backgroundColor: type === 'custom'? color.color: colors[type].color }: {}
		let childNode = eles.map((_, i) => {
			var compName  = _.name,
				layout    = _.data.layout,
				styleIdx  = _.styleList.idx,
				csn       = `handle-drag-${Math.floor(Math.random()*1e9)}`,
				isEdit    = true,
				compCon   = compContent(compName, _, actions, `Style${styleIdx + 1}`, i, csn)
			
			if (!compCon) return false
			return (
				<div key={i} className="pge-layout" style={cssColorFormat({ data: _ }, 'layout')}>{ compCon }</div>
			)
		})
		return (
			<div className={`pg-element-view e-flex-box pg-element-${ct}`}>
				<div className="pg-element-box">
					{ /*ads
						? <div className="ads-placeholder"></div>
						: null*/
					}
					<section className="pg-element" style={bgStyle}>
						{ childNode }
					</section>
				</div>
			</div>
		)
	}
}

Element.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Element)
