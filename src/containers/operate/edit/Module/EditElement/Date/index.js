/**
 * @Author: Along
 * @Date:   2018-05-05
 
 */

import React from 'react'
import classnames from 'classnames'
import './index.less'



class DateShow extends React.Component {
	state = {
		time:'',
		date:'',
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
		 let { date } = this.props;
		 
	}  
	componentWiiReceiveProps(props) { 
		 
	}

	upDate = value => {
		 setInterval(()=>{
		 	this.setState({
		 		time:value.show_time,
		 		date:value.show_date
			})
		 },1000) 
		
	}
	 
	render() {   
		let { data, type,date } = this.props;
		data = data.data; 
		return ( 
			<div className={`e-date ${type}`}> 
				<DateAndTimeShow time={date.show_time} date={date.show_date} week={date.show_week} type={data.content.type}></DateAndTimeShow>
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
