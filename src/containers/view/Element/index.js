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
import DateShow          from 'compEdit/EditElement/Date'
import StoreList         from 'compEdit/EditElement/StoreList'
import StoreDetails      from 'compEdit/EditElement/StoreDetails'
import Navigation        from 'compEdit/EditElement/Navigation'
import NavigationFloat   from 'compEdit/EditElement/NavigationFloat'

import * as actions from 'actions'

import { Icon } from 'antd'

import './index.less'

class Element extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let { data, actions, editConfig, time, location } = this.props
		let ct     = location.query.ct || 2,
			eles   = data.elements || [],
			theme  = editConfig.globalData.theme,
			colors = theme.list[theme.idx].colors,
			color  = data.feature.backgroundColor,
			type   = color.type
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
				compCon
			if (compName === 'picture')              compCon = (<Picture         data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'web')             compCon = (<Web             data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'video')           compCon = (<Video           data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'text')            compCon = (<Text            data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'button')          compCon = (<Button          data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'swiperImage')     compCon = (<SwiperImage     data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'wonderfulActivity')     compCon = (<WonderfulActivity     data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'date')            compCon = (<DateShow        data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} time={time} />)
 			else if (compName === 'navigation')      compCon = (<Navigation      data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
 			else if (compName === 'navigationFloat') compCon = (<NavigationFloat data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'storeList')       compCon = (<StoreList       data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			else if (compName === 'storeDetails')    compCon = (<StoreDetails    data={_} actions={actions} type={`Style${styleIdx + 1}`} idx={i} csn={csn} />)
			if (!compCon) return false
			return (
				<div key={i} className="pge-layout">{ compCon }</div>
			)
		})
		return (
			<div className={`pg-element-parent e-flex-box pg-element-${ct}`}>
				<section className="pg-element" style={bgStyle}>
					{ childNode }
				</section>
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
