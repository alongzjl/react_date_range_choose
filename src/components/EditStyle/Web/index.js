/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { InputNumber, Card } from 'antd'


var styleMap = {
	layout: '组件样式',
	image:  '图片样式'
}
var cssMap = {
	top:               { name: '上',   type: 'number' },
	left:              { name: '左',   type: 'number' },
	width:             { name: '宽',   type: 'number' },
	height:            { name: '高',   type: 'number' },
	borderRadius:      { name: '圆角', type: 'number' },
	borderWidth:       { name: '边宽', type: 'number' },
	lineHeight:        { name: '行高', type: 'number' },
}

class Web extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	handleFocusBlur(e) {
		let { data, actions } = this.props
		data.content.url = e.currentTarget.value
		actions.updateComp(data)
	}

	onChange(val, style, css) {
		let { data, actions } = this.props
		data.style[style][css] = val
		actions.updateComp(data)
	}

	render() {
		let { data, actions } = this.props
		let childNode = Object.keys(data.style).map(p => {
			if (!styleMap[p]) return
			let cnode = Object.keys(data.style[p]).map(q => {
				if (!cssMap[q]) return
				var cm  = cssMap[q],
					val = data.style[p][q]
				if (cm.type === 'number') {
					return (
						<div key={q}>
							{cm.name}
							<InputNumber
								defaultValue={val}
								value={val}
								onChange={v => this.onChange(v, p, q)}
							/>
						</div>
					)
				}
			})
			return (
				<Card key={p} title={styleMap[p]} style={{ width: 280 }}>
					{ cnode }
				</Card>
			)
		})
		return (
			<div className="s-web">
				{ childNode }
			</div>
		)
	}
}

Web.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Web)
