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
import Map2D         from 'compEdit/EditElement/Map2D'

import * as actions from 'actions'

import './index.less'

import * as variable from 'var'

const ctMap = variable.composeTypeMap

class EditElement extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	selectComp(e, data, idx) {
		e.stopPropagation()
		let { actions, editConfig } = this.props
		let { curData } = editConfig
		let { compIdx, cusCompIdx, contentType } = curData
		if (compIdx === idx && cusCompIdx < 0 && contentType === 'comp') return
		curData.compIdx    = idx
		curData.parentComp = null
		actions.updateCur(curData)	// 更新 当前数据
		actions.selectComp(data)
	}

	render() {
		let { data, actions, editConfig, location } = this.props
		let ct     = tempCfg.composeType || 'PORTRAIT',
			eles   = data.elements || [],
			theme  = editConfig.globalData.theme,
			colors = theme.list[theme.idx].colors,
			color  = data.feature.backgroundColor,
			type   = color.type
		ct = ctMap[ct]? ct: 'PORTRAIT'
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
				csn       = `ry-jimmy`,
				compCon
			if (compName === 'picture')                compCon = (<Picture           data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'web')               compCon = (<Web               data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'video')             compCon = (<Video             data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'text')              compCon = (<Text              data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'button')            compCon = (<Button            data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'swiperImage')       compCon = (<SwiperImage       data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'wonderfulActivity') compCon = (<WonderfulActivity data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'time')              compCon = (<Time              data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
 			else if (compName === 'weather')           compCon = (<Weather           data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
 			else if (compName === 'navigation')        compCon = (<Navigation        data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
 			else if (compName === 'navigationFloat')   compCon = (<NavigationFloat   data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'storeList')         compCon = (<StoreList         data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'storeDetails')      compCon = (<StoreDetails      data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'storeInstro')       compCon = (<StoreInstro       data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'splitLine')         compCon = (<SplitLine         data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'dateWeather')       compCon = (<DateWeather       data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'map2D')             compCon = (<Map2D             data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			if (!compCon) return false
			return (
				<div
					key={i}
					className={`pge-layout${i === editConfig.curData.compIdx? ' s-active': ''}`}
					style={layout}
					onClick={e => this.selectComp(e, _, i)}
				>
					{ compCon }
				</div>
			)
		})
		return (
			<div className={`pg-element-business e-flex-box pg-element-${ct}`}>
				<section className="pg-element" style={bgStyle}>
					{ childNode }
				</section>
			</div>
		)
	}
}

EditElement.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditElement)
