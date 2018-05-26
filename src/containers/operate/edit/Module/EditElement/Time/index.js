/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import './index.less'

class Time extends React.Component {


	// 时间1 HH:MM:SS
	renderStyle1(props, con, type, time) {
		let { hour, minutes, seconds } = time
		return (
			<div style={cssColorFormat(props, type)}>{hour}<span style={cssColorFormat(props, 'split')}>{con.split || ':'}</span>{minutes}<span style={cssColorFormat(props, 'split')}>{con.split || ':'}</span>{seconds}</div>
		)
	}
	// 时间2 HH:MM
	renderStyle2(props, con, type, time) {
		let { hour, minutes } = time
		return (
			<div style={cssColorFormat(props, type)}>{hour}<span style={cssColorFormat(props, 'split')}>{con.split || ':'}</span>{minutes}</div>
		)
	}
	// 日期1 YYYY-MM-DD
	renderStyle3(props, con, type, time) {
		let { year, month, date } = time
		return (
			<div style={cssColorFormat(props, type)}>{year}<span style={cssColorFormat(props, 'split')}>{con.split || '-'}</span>{month}<span style={cssColorFormat(props, 'split')}>{con.split || '-'}</span>{date}</div>
		)
	}
	// 日期2 YYYY年MM月DD日
	renderStyle4(props, con, type, time) {
		let { year, month, date } = time
		return (
			<div style={cssColorFormat(props, type)}>{year}<span style={cssColorFormat(props, 'split')}>年</span>{month}<span style={cssColorFormat(props, 'split')}>月</span>{date}<span style={cssColorFormat(props, 'split')}>日</span></div>
		)
	}
	// 周
	renderStyle5(props, con, type, time) {
		let { week } = time
		return (
			<div style={cssColorFormat(props, type)}>{con.prefix || '星期'}{week}</div>
		)
	}
	// 自定义
	renderStyle6(props, con, type, time) {
		let sp = timeFormat(con.template)
		let node = sp.map((_, i) => {
			if (_[0] === '{') {
				let m = _.match(/[^{}]+/)
				m = m? m[0]: ''
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
		let { data, type } = this.props
		let time = getTime()
		// let { apm, date, hour, minutes, month, ms, q, seconds, week, year } = time
		let render = this[`render${type}`]? this[`render${type}`]: this.renderStyle1
		let dom    = render(this.props, data.data.content, 'text', time)
		return (
			<div className={`e-text ${type}`}>
				{ dom }
			</div>
		)
	}
}

export default Text
