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
	'冰雹': 1,
	'中雪': 1,
	'大雪': 1,
	'暴雪': 1,
	'雷阵雨':1
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

	state = {
		weather:{
			temp: '33℃',
			type: '晴',
			iconName: '07.png',
			humidity: null,
			direct: '西南风',
			power: '<3级',
			aqi: '108',
			aqiInfo: '轻度污染'
		}, 
		show:false
	} 
	componentDidMount() {  
		
	}
	render() {
		let { data, type } = this.props
		let dom
		switch (type){
				case "Style1" : dom = (<RenderStyle1 props={this.props} con={data.data.content} weather={this.state.weather} />); break
				case "Style2" : dom = (<RenderStyle2 props={this.props} con={data.data.content} weather={this.state.weather} />); break
				case "Style3" : dom = (<RenderStyle3 props={this.props} con={data.data.content} weather={this.state.weather} />); break
				case "Style4" : dom = (<RenderStyle4 props={this.props} con={data.data.content} weather={this.state.weather} />); break
				case "Style5" : dom = (<RenderStyle5 props={this.props} con={data.data.content} weather={this.state.weather} />); break
				case "Style6" : dom = (<RenderStyle6 props={this.props} con={data.data.content} weather={this.state.weather} />); break
				case "Style7" : dom = (<RenderStyle7 props={this.props} con={data.data.content} weather={this.state.weather} />); break
				case "Style8" : dom = (<RenderStyle8 props={this.props} con={data.data.content} weather={this.state.weather} />); break
				case "Style9" : dom = (<RenderStyle9 props={this.props} con={data.data.content} weather={this.state.weather} />); break
			}
		return (
			<div className={`e-weather ${type}`}>
				{ dom }
			</div> 
		)
	}
}

// 温度
function RenderStyle1({ props, con, weather }) {
	return (
		<div style={cssColorFormat(props, 'text')}>{weather.temp}</div>
	)
}
// 空气质量
function RenderStyle2({ props, con, weather }) {
	return (
		<div style={cssColorFormat(props, 'text')}>{weather.aqi}</div>
	)
}
// 空气质量信息
function RenderStyle3({ props, con, weather }) {
	return (
		<div style={cssColorFormat(props, 'text')}>{weather.aqiInfo}</div>
	)
}
// 天气
function RenderStyle4({ props, con, weather }) {
	return (
		<div style={cssColorFormat(props, 'text')}>{weather.type}</div>
	)
}
// 风向
function RenderStyle5({ props, con, weather }) {
	return (
		<div style={cssColorFormat(props, 'text')}>{weather.direct}</div>
	)
}
// 强度
function RenderStyle6({ props, con, weather }) {
	return (
		<div style={cssColorFormat(props, 'text')}>{weather.power}</div>
	)
}
// 图标
function RenderStyle7({ props, con, weather }) {
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
				break
			}
		}
	}
	//如果没有天气图标就返回空
	if(!con.weatherIcon[wn]){
		con.weatherIcon[wn] = {type:'custom',img:''}
	}
	return (
		<div style={cssColorFormat(props, 'image')}>
			<img src={getImg(con.weatherIcon[wn])} />
		</div>
	)
}
// 纯色图标
function RenderStyle8({ props, con, weather }) {
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
				break
			}
		}
	}
	//设置默认天气图标
	wn = wn ? wn : '晴_多云_阴'
	css['WebkitMaskImage'] = `url('${getImg(con.weatherIcon[wn])}')`
	return (
		<div style={css}></div>
	)
}
//自定义
function RenderStyle9({ props, con,weather }) {
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
		<div style={cssColorFormat(props, 'text')}>{ node }</div>
	)
}
export default Weather
