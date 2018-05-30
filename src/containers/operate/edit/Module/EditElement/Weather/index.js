/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import './index.less'

const wMap = {
	'晴':   1,
	'阴':   1,
	'小雨': 1,
	'中雨': 1,
	'阵雨': 1,
	'大雨': 1,
	'暴雨': 1,
	'小雪': 1,
	'雷雨': 1,
	'雷阵雨': 1,
	'冰雹': 1,
	'中雪': 1,
	'大雪': 1,
	'暴雪': 1
}
const wMap2 = [
	'晴_多云_阴',
	'晴_雨_雷',
	'晴_雨',
	'阴_多云_雨',
	'阴_多云_雪',
	'阴_多云',
	'雨_雪'
]

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
	// 实体图标
	renderStyle7(props, con, type) {
		let wt  = weather.type
		let wn  = ''
		let len = wMap2.length
		if (wMap[wt]) wn = wt
		else {
			for (var i = 0; i < len; i++) {
				var name = wMap2[i],
					arr  = name.split('_'),
					isOK = true
				arr.map((_) => {
					if (isOK && wt.indexOf(_) === -1) isOK = false
				})
				if (isOK) {
					wn = name
					console.log(isOK, name)
					break
				}
			}
		}
		return (
			<div style={cssColorFormat(props, 'image')}>
				<img src={getImg(con.weatherIcon[wn])} />
			</div>
		)
	}
	// 纯色图标
	renderStyle8(props, con, type) {
		if (con.template !== undefined) return false
		let wt  = weather.type
		let wn  = ''
		let len = wMap2.length
		let css = cssColorFormat(props, 'image')
		if (wMap[wt]) wn = wt
		else {
			for (var i = 0; i < len; i++) {
				var name = wMap2[i],
					arr  = name.split('_'),
					isOK = true
				arr.map((_) => {
					if (isOK && wt.indexOf(_) === -1) isOK = false
				})
				if (isOK) {
					wn = name
					console.log(isOK, name)
					break
				}
			}
		}
		css['WebkitMaskImage'] = `url('${getImg(con.weatherIcon[wn])}')`
		return (
			<div style={css}></div>
		)
	}
	// 自定义
	renderStyle9(props, con, type) {
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
			<div className={`e-weather ${type}`}>
				{ dom }
			</div>
		)
	}
}

export default Weather
