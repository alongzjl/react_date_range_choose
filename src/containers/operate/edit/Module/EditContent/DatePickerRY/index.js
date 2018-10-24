import React,{
    Component
} from "react";
import {  Input } from 'antd';
import DatePicker from './DatePicker'
import "./index.less";
 
 
export default class DatePickerRY extends Component {
	state={
		min:'',
		max:'',
		show:'点击选择日期范围'
	}
	componentWillMount(){ 
		let now = new Date(),
			str = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}`,
			min = new Date(str).getTime(),
			max = min + 90*24*60*60*1000
		this.setState({min:min,max:max}) 
	} 
	dateChange = (date,time,all) => {
		debugger
	}
	closeDate = () => {
		debugger
	} 
	render(){
		return (
				<div> 
					<Input defaultValue={this.state.show} value={this.state.show} disabled={true} />
					<DatePicker min={this.state.min} max={this.state.max} isTime={true} confirm={this.dateChange} cancel={this.closeDate} />
				</div>
			)
	}
}