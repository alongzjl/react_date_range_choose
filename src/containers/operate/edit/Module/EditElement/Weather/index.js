/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import './index.less'

class Weather extends React.Component {


	// 温度
	renderStyle1(props, con, type) {
		return (
			<div style={cssColorFormat(props, type)}>{weather.temp}</div>
		)
	}
	// 空气质量
	renderStyle2(props, con, type) {
		return (
			<div style={cssColorFormat(props, type)}>{weather.aqi}</div>
		)
	}
	// 空气质量信息
	renderStyle3(props, con, type) {
		return (
			<div style={cssColorFormat(props, type)}>{weather.aqiInfo}</div>
		)
	}
	// 天气
	renderStyle4(props, con, type) {
		return (
			<div style={cssColorFormat(props, type)}>{weather.type}</div>
		)
	}
	// 风向
	renderStyle5(props, con, type) {
		return (
			<div style={cssColorFormat(props, type)}>{weather.direct}</div>
		)
	}
	// 强度
	renderStyle6(props, con, type) {
		return (
			<div style={cssColorFormat(props, type)}>{weather.power}</div>
		)
	}
	// 自定义
	renderStyle7(props, con, type) {
		let { template } = con
		// let { aqi, aqiInfo, direct, iconName, power } = weather
		if (!template) return false
		let temp = []
		template.replace(/(\{[^{}]+\})|([^{}]+)/g, (m, i) => { temp.push(m) })
		let node = temp.map((_, i) => {
			if (_[0] === '{') {
				let m = _.match(/[^{}]+/)
				m = m? m[0]: ''
				m = weather[m] || ''
				return (<span key={i}>{m}</span>)
			} else {
				return (<span key={i} style={cssColorFormat(props, 'split')} dangerouslySetInnerHTML={{__html: textBreak(_)}}></span>)
			}
		})
		return (
			<div style={cssColorFormat(props, type)}>{ node }</div>
		)
	}
	
	
	render() {
		let { data, type, time } = this.props
		let render = this[`render${type}`]? this[`render${type}`]: this.renderStyle1
		let dom    = render(this.props, data.data.content, 'text')
		return (
			<div className={`e-text ${type}`}>
				{ dom }
			</div>
		)
	}
}

export default Weather
