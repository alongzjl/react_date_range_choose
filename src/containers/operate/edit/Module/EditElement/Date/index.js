/**
 * @Author: Along
 * @Date:   2018-05-05
 
 */

import React from 'react'
import classnames from 'classnames'
import './index.less'

const weatherInfo = {
      temp: 24,
      type: '阴转多云转雨',
      iconName: 'w01',
      direct: '西南风',
      power: '3到4级',
      aqiInfo: '177.0中度污染',
      humidity: '41'
    }
const formatNum = num => {
	num = num<10 ? '0'+num : num;
	return num
}; 
class DateShow extends React.Component {
	state = {
		time:'',
		date:'',
		week:'',
		format_time:':',
		format_date:'.', 
		weatherInfo:{
		      temp: 24,
		      type: '阴转多云转雨',
		      iconName: 'w01',
		      direct: '西南风',
		      power: '3到4级',
		      aqiInfo: '177.0中度污染',
		      humidity: '41'
		    }
	} 
	componentWillMount() {
		
	}
	componentDidMount() {
		this.getTime(); 
	} 
	componentWiiReceiveProps(props) { 
		 
	}  
	
	getTime = () => {
		const format_time =  this.props.data.content.format_time;
		const format_date =  this.props.data.content.format_date;
		const days=new  Array ("日", "一", "二", "三", "四", "五", "六"); 
	  	const currentDT = new Date();    
		  let y,m,date,day,hs,ms,ss,timeStr,dateStr,weekStr; 
		   y = currentDT.getFullYear(); //四位整数表示的年份  
		  m = currentDT.getMonth(); //月   
		  date = currentDT.getDate(); //日  
		  day = currentDT.getDay(); //星期   
		  hs = currentDT.getHours(); //时  
		  ms = currentDT.getMinutes(); //分  
		  ss = currentDT.getSeconds(); //秒 
		   timeStr =formatNum(hs)+format_time+formatNum(ms)+format_time+formatNum(ss);
		  dateStr = y+format_date+  formatNum(m) +format_date+formatNum(date);
		  weekStr = '星期'+ days[day];
		  if(format_time == 'rongyi'){
		  		timeStr =formatNum(hs)+":"+formatNum(ms);
		  }  
		  if(format_date == 'rongyi'){ 
		  		dateStr = y+'年'+  formatNum(m) +'月'+formatNum(date) + '日';
		  }  
		  this.setState({ 
		  	time:timeStr,
		  	date:dateStr,
		  	week:weekStr
		  });
		  window.setTimeout(this.getTime,1000);  
	}; 
	render() {   
		let { data, type } = this.props;
		return ( 
			<div className={`e-date ${type}`}>
				<DateAndTimeShow time={this.state.time} date={this.state.date} week={this.state.week} type={data.content.type}></DateAndTimeShow>
				{
					data.content.type == 1 ? <TemShowFirst weatherInfo={this.state.weatherInfo}></TemShowFirst> : null
				} 
			</div>       
		)   
	}
}   

//时间日期显示 
function DateAndTimeShow({time,date,week,type}) {
	return (
		<div className="dateLeft" style={{width:type!=1?'100%':'50%'}}>   
			{
				type == 3 ? <DateAndTimeShowSecond time={time} date={date} week={week} type={type}></DateAndTimeShowSecond> : <DateAndTimeShowFirst time={time} date={date} week={week} type={type}></DateAndTimeShowFirst>
			}     
		</div> 
	)
}

//方式一
function DateAndTimeShowFirst({time,date,week,type}) {
	return (
		<div>  
			<div className="time">{ time } </div>
			<div className="date_week">
				<div className="date">{ date } </div>
				<div className="week">{ week } </div>
			</div>  
		</div>
	)
}
//方式二
function DateAndTimeShowSecond({time,date,week,type}) {
	return (
		<div className="second">  
			<div className="time">{ time } </div>
			<div className="date_week">
				<div className="week">{ week } </div>
				<div className="date">{ date } </div>
			</div>  
		</div>
	)
}

//温度天气显示 
function TemShowFirst({weatherInfo}) {
	return (
		<div className="dateCenter"> 
			<div className="left">
				<div className="tem">{ `${weatherInfo.temp}℃` } </div>
				<div className="type_direct">
					<div className="type">{ weatherInfo.type } </div>
					<div className="direct">{ weatherInfo.direct } </div>
				</div>    
			</div> 
			<div className="left right"> 
				<div className="tem">{ weatherInfo.humidity }</div>
				<div className="type_direct">{ weatherInfo.aqiInfo }</div>
			</div>
		</div>
	)
}
export default DateShow 
