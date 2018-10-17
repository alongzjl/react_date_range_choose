/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import './index.less'


class Time extends React.Component {

	state = {
		time:{}
	}  
	componentDidMount() {
		let { type,data } = this.props
		let time = 0
		this.setState({time:getTime()})
		switch (type){
			case "Style1" : time = 1; break
			case "Style2" : time = 1; break
			case "Style3" : time = 60*60; break
			case "Style4" : time = 60*60; break
			case "Style5" : time = 60*60; break
			case "Style6" : 
				const content = data.data.content,
					  template = content.template;
				if(template.indexOf('秒') > -1){
					time = 1
				}else if(template.indexOf('分') > -1){
					time = 1
				}else if(template.indexOf('点') > -1){
					time = 60
				}else {
					time = 60*60
				}
				break
			default: time = 1;break
		}
		this.showTime(time)
	} 
	showTime = time => {
	 	this.RYTimer = setInterval(() => {
			this.setState({time: getTime()})
		}, time*1000)
	 }   
 	componentWillUnmount(){
		clearInterval(this.RYTimer)
	}   
	
	render() {  
		let { data, type } = this.props
		let dom
		switch (type){
			case "Style1" : dom = (<RenderStyle1 props={this.props} con={data.data.content} time={this.state.time} />); break
			case "Style2" : dom = (<RenderStyle2 props={this.props} con={data.data.content} time={this.state.time} />); break
			case "Style3" : dom = (<RenderStyle3 props={this.props} con={data.data.content} time={this.state.time} />); break
			case "Style4" : dom = (<RenderStyle4 props={this.props} con={data.data.content} time={this.state.time} />); break
			case "Style5" : dom = (<RenderStyle5 props={this.props} con={data.data.content} time={this.state.time} />); break
			case "Style6" : dom = (<RenderStyle6 props={this.props} con={data.data.content} time={this.state.time} />); break
		}
		return (
			<div className={`e-text ${type}`}>
				{ dom }
			</div>
		)
	}
}

// 时间1 HH:MM:SS
function RenderStyle1({ props, con, time }) {
	let { hour, minutes, seconds } = time
	return (
		<div style={cssColorFormat(props, 'text')}>{hour}<span style={cssColorFormat(props, 'split')}>{con.split || ':'}</span>{minutes}<span style={cssColorFormat(props, 'split')}>{con.split || ':'}</span>{seconds}</div>
	)
}
// 时间2 HH:MM
function RenderStyle2({ props, con, time }) {
	let { hour, minutes } = time
	return (
		<div style={cssColorFormat(props, 'text')}>{hour}<span style={cssColorFormat(props, 'split')}>{con.split || ':'}</span>{minutes}</div>
	)
}
// 日期1 YYYY-MM-DD
function RenderStyle3({ props, con, time }) {
	let { year, month, date } = time
	return (
		<div style={cssColorFormat(props, 'text')}>{year}<span style={cssColorFormat(props, 'split')}>{con.split || '-'}</span>{month}<span style={cssColorFormat(props, 'split')}>{con.split || '-'}</span>{date}</div>
	)
}
// 日期2 YYYY年MM月DD日
function RenderStyle4({ props, con, time }) {
	let { year, month, date } = time
	return (
		<div style={cssColorFormat(props, 'text')}>{year}<span style={cssColorFormat(props, 'split')}>年</span>{month}<span style={cssColorFormat(props, 'split')}>月</span>{date}<span style={cssColorFormat(props, 'split')}>日</span></div>
	)
}
// 周
function RenderStyle5({ props, con, time }) {
	let { week } = time
	return (
		<div style={cssColorFormat(props, 'text')}>{con.prefix || '星期'}{week}</div>
	)
}
// 自定义
function RenderStyle6({ props, con, time }) {
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
		<div style={cssColorFormat(props, 'text')}>{ node }</div>
	)
}

export default Time
