import React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import './index.less' 
const { RangePicker } = DatePicker

export default class DatePickerRY extends React.Component {
 
	onChange=(value, dateString) => {
		console.log('Selected Time: ', value);
  		console.log('Formatted Selected Time: ', dateString);
  		this.props.onChange(JSON.stringify(dateString))
	}
	onOk=(value) => {
		//console.log(value)
	}  
	render(){
		let defaultValue = formatData(this.props.defaultValue)
		return (
			<div>
				{
					defaultValue ? <RangePicker
				      disabledDate={disabledDate}
				      showTime={{
				        format:"HH:mm" 
				      }}      
				      defaultValue={[moment(defaultValue[0], 'YYYY-MM-DD HH:mm'), moment(defaultValue[1], 'YYYY-MM-DD HH:mm')]}     
				      format="YYYY-MM-DD HH:mm" 
				      onChange={this.onChange} 
				      placeholder={['开始时间', '结束时间']}
				    />  : <RangePicker
					      disabledDate={disabledDate}
					      showTime={{
					        format:"HH:mm" 
					      }} 
					      format="YYYY-MM-DD HH:mm" 
					      onChange={this.onChange} 
					      placeholder={['开始时间', '结束时间']}
					    />   
				} 
			</div>) 
	} 
} 
//日期格式
function formatData(defaultValue){
	if(!defaultValue) return false
	return defaultValue 
}    
//限制日期
function disabledDate(current) { 
  // Can not select days before today and today
  return current < moment().endOf('day');
} 
//限制区间时间
function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
}

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}