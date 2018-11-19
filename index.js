/*
	日期选择控件
	by--Along  2018-10-30
*/



import React,{
    Component
} from "react";
import {  Input } from 'antd';
import DateSet from './dateSet'
import "./index.less";
 
 
export default class DatePickerRY extends Component {
	state={
		min:'',
		max:'',
		show:'点击选择日期范围',
		now:''
	}
	componentWillMount(){ 
		let now = new Date(),
			str = `${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}`,
			min = new Date(str).getTime(),
			max = min + 90*24*60*60*1000
		this.setState({min:min,max:max}) 
	}  
	showDate = () => {
		let now = new Date().getTime()
		this.setState({now:now},()=>{
			this.datePickerModal.show()
		}) 
	}  
	dateChange = date => {
		if(getAttr(date) === 'Array'){
			this.setState({show:`${date[0]}-${date[1]}`})
			this.props.onChange(JSON.stringify(date))
		}else{
			this.props.onChange(date)
		}
	} 
	render(){
		let { defaultValue } = this.props,
			show = defaultValue ? `${defaultValue[0]}-${defaultValue[1]}` : this.state.show
		return (
				<div> 
					<div onClick={this.showDate} className="dateInput">{show}</div>
					<DateSet 
						ref={com => { this.datePickerModal = com }} 
						min={this.state.min} 
						max={this.state.max} 
						confirm={this.dateChange}
						now={this.state.now}
						defaultValue={defaultValue}
						remove={()=>{this.dateChange('')}} 
					/>
				</div>
			)
	}
}