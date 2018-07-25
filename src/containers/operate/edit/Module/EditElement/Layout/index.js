/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import { Icon, message } from 'antd'

import Picture      from 'compEdit/EditElement/Picture'
import Text         from 'compEdit/EditElement/Text'
import PictureBind  from 'compEdit/EditElement/PictureBind'
import TextBind     from 'compEdit/EditElement/TextBind'
import SwiperBind   from 'compEdit/EditElement/SwiperBind'
import Area         from 'compEdit/EditElement/Area'

import * as variable from 'var'
var animeMap = variable.animeCompMap,
	aStyle   = animeMap.style

const compContent = (name, data, item, editConfig, actions, type, ioInput, ioOuter) => {
	var props  = { data, item, editConfig, actions, type, ioInput, ioOuter }
	var render = {
		picture:     <Picture     {...props} />,
		text:        <Text        {...props} />,
		pictureBind: <PictureBind {...props} />,
		textBind:    <TextBind    {...props} />,
		swiperBind:  <SwiperBind  {...props} />,
		area:        <Area        {...props} />
	}
	return render[name]
}

import './index.less'

export default class Layout extends React.Component {
	constructor(props) {
		super(props)
		// this.state = {}
	}
	componentWillMount() {}

	componentDidMount() {}
	// componentWillReceiveProps() {}

	render() {
		let { data, layout, components, styleObj } = this.props
		let childNode = components.map((_, i) => {
			let compName = _.name,
				layout   = _.data.layout,
				styleIdx = _.styleList.idx,
				compCon  = compContent(compName, _, data, `Style${styleIdx + 1}`)
			// debugger
			if (!compCon) return false
				
			return (
				<div
					key={i}
					className={`pge-layout`}
					style={layout}
				>{ compCon }</div>
			)
		})
		// debugger
		return (
			<section className={`pg-layout-ele`} style={styleObj}>
				{ childNode }
			</section>
		)
	}
}

