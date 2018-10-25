/**
 * 日期时间选择器组件
 * 引用参考
 * <DatePicker min={min} start={start} isTime={isTime} confirm={this.dateChange.bind(this)} cancel={this.closeDate.bind(this)} />
 */
import React,{
    Component
} from "react";
import {  message } from 'antd';
import "./style.less";

import DatePickerCore from "./core";

const datepicker_left = new DatePickerCore();
const datepicker_right = new DatePickerCore();

import DateSelectItem from "./select";
import DateItem from "./date-item";
import TimeSelect from "./time";

//日期组件
class DatePicker extends Component {
    constructor(state) {
        super(state)
        this.state = {
            min: this.props.min || '1900/01/01',
            max: this.props.max,
            isTime: this.props.isTime,
            chooseL:'',
            chooseR:''
        }
    }
    componentWillMount() {
        this.init(this.props)
        let { defaultValue } = this.props;
        if(defaultValue){
            let start = defaultValue[0].split(' ')[0].split('-').join('/'),
                end = defaultValue[1].split(' ')[0].split('-').join('/');
            this.setState({chooseL:defaultValue[0],chooseR:defaultValue[1],d_time_start:start,d_time_end:end}) 
        } 
    }  
    componentWillReceiveProps(props){
        this.init(props)
    }    
    init(props) {
        var data_left = {},data_right = {}, _this = this,now = new Date();
        datepicker_left.init({
            min: this.state.min,
            max:  this.state.max,
            isTime: this.state.isTime,
            now:props.now,
            type:'left'
        }).createMonthDate(function(info) {
            data_left = Object.assign({},data_left,{
                month: info
            });
        }).createHours(function(info) {
            data_left = Object.assign({},data_left,{
                hours: info
            });
        }).createMinutes(function(info) {
            data_left = Object.assign({},data_left,{
                minutes: info
            }); 
        });
         datepicker_right.init({
            min: this.state.min,
            max:  this.state.max,
            isTime: this.state.isTime,
            now:props.now,
            type:'right'
        }).createMonthDate(function(info) {
            data_right = Object.assign({},data_right,{
                month: info
            });
        }).createHours(function(info) {
            data_right = Object.assign({},data_right,{
                hours: info
            });
        }).createMinutes(function(info) {
            data_right = Object.assign({},data_right,{
                minutes: info
            });
        });
        this.setState({
            left:{
                data: data_left,
                year: datepicker_left.data.year,
                month: datepicker_left.data.month,
                date: datepicker_left.data.date,
                hours: datepicker_left.data.hours,
                minutes: datepicker_left.data.minutes,
                datetime: now.getFullYear()+''+(now.getMonth()+1)+''+now.getDate(),
                weeks_list: datepicker_left.lang[datepicker_left.data.lang].weeks
            },
            right:{
                data: data_right,
                year: datepicker_right.data.year,
                month: datepicker_right.data.month,
                date: datepicker_right.data.date,
                hours: datepicker_right.data.hours,
                minutes: datepicker_right.data.minutes,
                datetime: now.getFullYear()+''+(now.getMonth()+1)+''+now.getDate(),
                weeks_list: datepicker_right.lang[datepicker_right.data.lang].weeks
            } 
        });
    }
    selectDate(item,type,which) {
         if(type == 'not-allowed') return false
         let status = false;
        if(which == 'left'){
            let left = this.state.left;
            if (item.year != this.state.left.year) {
                datepicker_left.data.year = item.year;
                status = true; 
            }
            if (item.month != this.state.left.month) {
                datepicker_left.data.month = item.month;
                status = true;
            }
            if (status) {
                var data = this.state.left.data;
                datepicker_left.createMonthDate(function(info) {
                    data = Object.assign({},data,{
                        month: info
                    });
                });
               left.data = data;
                this.setState({left:left})
            }
            this.setState({left:{...left,...{
                date: item.date,
                month: item.month,
                year: item.year,
                choosedDate: item.year+''+item.month+''+item.date
            }}},()=>{this.dateFormat(which)});
        }else{
            let right = this.state.right;
            if (item.year != this.state.right.year) {
                datepicker_right.data.year = item.year;
                status = true;
            }
            if (item.month != this.state.right.month) {
                datepicker_right.data.month = item.month;
                status = true;
            }
            if (status) {
                var data = this.state.right.data;
                datepicker_right.createMonthDate(function(info) {
                    data = Object.assign({},data,{
                        month: info
                    });
                });
               right.data = data;
                this.setState({right:right})
            }
            this.setState({right:{...right,...{
                date: item.date,
                month: item.month,
                year: item.year,
                choosedDate: item.year+''+item.month+''+item.date
            }}},()=>{this.dateFormat(which)}); 
        }
    }
    selectMonth(y,m,which) { 
        if(which == 'left'){ 
            let data = this.state.left.data;
            datepicker_left.data.year = y;
            datepicker_left.data.month = m;
            datepicker_left.createMonthDate(function(info) {
                data = Object.assign({},data,{
                    month: info
                });
            });
            this.setState({left:{...this.state.left,...{
                data: data,
                month: m,
                year:y
            }}});
        }else{
            let data = this.state.right.data;
            datepicker_right.data.year = y;
            datepicker_right.data.month = m;
            datepicker_right.createMonthDate(function(info) {
                data = Object.assign({},data,{
                    month: info
                });
            });
            this.setState({right:{...this.state.right,...{
                data: data,
                month: m,
                year:y
            }}});
        }
    }    

    selectTimeLeft(val,type) {
        let obj = {},chooseL = this.state.chooseL; 
        obj[type] = val;
        if(chooseL){
         let date = chooseL.split(' '),
            time = type == 'hours' ? `${val}:${date[1].split(':')[1]}` : `${date[1].split(':')[0]}:${val}`;
            this.setState({left:{...this.state.left,...obj},chooseL:`${date[0]} ${time}`})
        }else{ 
            this.setState({left:{...this.state.left,...obj}});
        }
    }
    selectTimeRight(val,type) {
         let chooseR = this.state.chooseR,
           obj = {}; 
        obj[type] = val;
        if(chooseR){ 
            let date = chooseR.split(' '),
            time = type == 'hours' ? `${val}:${date[1].split(':')[1]}` : `${date[1].split(':')[0]}:${val}`;
            this.setState({right:{...this.state.right,...obj},chooseR:`${date[0]} ${time}`})
        }else{  
            this.setState({right:{...this.state.right,...obj}});
        } 
    }  
    // 确定按钮
    // 传出 日期、时间、毫秒数
    confirm() {
        let date = [this.state.chooseL,this.state.chooseR];
        this.state.chooseL&&this.state.chooseR ? this.props.confirm(date) :  this.props.confirm() 
    } 
    dateFormat(str){
        let date = [],time = [],chooseL = this.state.chooseL,chooseR = this.state.chooseR;
        date.push(datepicker_left.digit(this.state[str].year));
        date.push(datepicker_left.digit(this.state[str].month));
        date.push(datepicker_left.digit(this.state[str].date));
        time.push(datepicker_left.digit(this.state[str].hours));
        time.push(datepicker_left.digit(this.state[str].minutes));
        let d = date.join('-')+' '+time.join(':');
        let d_time = date.join('/');
        if(chooseL&&chooseR){
            this.setState({chooseL:d,chooseR:'',d_time_start:d_time,d_time_end:''})
        }else if(chooseL&&!chooseR){ 
            if(new Date(d) < new Date(chooseL)){
                let end = chooseL.split(' ')[0].split('-').join('/')
                this.setState({chooseL:d,chooseR:chooseL,d_time_end:end,d_time_start:d_time}) 
            }else{  
                this.setState({chooseR:d,d_time_end:d_time})
            }    
        }else{    
            this.setState({chooseL:d,d_time_start:d_time})
        }  
    }
    // 取消按钮
    cancel() {
        this.props.cancel();
    }

    render() {
        if (this.props.hidden) return null;
        let _this = this;
        let date_left = '',date_right = '';
        let date_table_left = this.state.left.data.month.table;
        let date_table_right = this.state.right.data.month.table;
        // 左边日历表格
        if (date_table_left && date_table_left.length) {
            let week_num = date_table_left.length/7;
            let week_list = [];
            for (var i = 0; i < week_num; i++) {
                week_list.push(date_table_left.slice(i*7,i*7+7));
            }
            let status = false;
            let status2 = false;
            date_left = ( 
                <tbody> 
                    {week_list.map(function(item,index) {
                        return (<tr key={index}>
                            {item.map(function(item,index) { 
                                if (item.date == 1 && !status2) {
                                    status = true;
                                    status2 = true;
                                }  
                                let className = '',style={cursor:'pointer'};
                                if (!status) {className = 'not-now-month';style={cursor:'not-allowed'}};
                                let datetime = item.year+''+item.month+''+item.date;
                                if (datetime == _this.state.left.datetime) {className = 'now-date';};
                                let dateNum = new Date(`${item.year}/${item.month}/${item.date}`)
                                if(dateNum < new Date(_this.state.min) || dateNum > new Date(_this.state.max)){
                                    style={cursor:'not-allowed'}
                                }   
                                if(_this.state.d_time_start&&_this.state.d_time_end && new Date(_this.state.d_time_start) <= dateNum&&dateNum <= new Date(_this.state.d_time_end)){
                                    className ? className += ' choosedDate' : className += 'choosedDate'
                                }else if(_this.state.d_time_start == item.year+'/'+item.month+'/'+datepicker_left.digit(item.date)){
                                     className ? className += ' choosedDate' : className += 'choosedDate'
                                } 
                                if (item.date == _this.state.left.data.month.days) {
                                    status = false;
                                } 
                                return (<DateItem key={index} style={style} className={className} which="left" selectDate={_this.selectDate.bind(_this)} item={item} index={index} />)
                            })}
                        </tr>)
                    })}
                </tbody>
            )
        }
        // 右边日历表格
        if (date_table_right && date_table_right.length) {
            let week_num = date_table_right.length/7;
            let week_list = [];
            for (var i = 0; i < week_num; i++) {
                week_list.push(date_table_right.slice(i*7,i*7+7));
            }
            let status = false;
            let status2 = false;
            date_right = ( 
                <tbody>
                    {week_list.map(function(item,index) {
                        return (<tr key={index}>
                            {item.map(function(item,index) { 
                                if (item.date == 1 && !status2) {
                                    status = true;
                                    status2 = true;
                                }
                                let className = '',style={cursor:'pointer'};
                                if (!status) {className = 'not-now-month';style={cursor:'not-allowed'}};
                                let datetime = item.year+''+item.month+''+item.date;
                                if (datetime == _this.state.right.datetime) className = 'now-date';
                                let dateNum = new Date(`${item.year}/${item.month}/${item.date}`)
                                if(dateNum < new Date(_this.state.min) || dateNum > new Date(_this.state.max)){
                                    style={cursor:'not-allowed'}
                                }
                                if(_this.state.d_time_start&&_this.state.d_time_end && new Date(_this.state.d_time_start) <= dateNum&&dateNum <= new Date(_this.state.d_time_end)){
                                    className ? className += ' choosedDate' : className += 'choosedDate'
                                }else if(_this.state.d_time_start == item.year+'/'+item.month+'/'+datepicker_left.digit(item.date)){
                                     className ? className += ' choosedDate' : className += 'choosedDate'
                                } 
                                if (item.date == _this.state.right.data.month.days) {
                                    status = false;
                                } 
                                return (<DateItem key={index} style={style} which="right" className={className} selectDate={_this.selectDate.bind(_this)} item={item} index={index} />)
                            })}
                        </tr>)
                    })}
                </tbody>
            )
        }
        // 时间选择器
        let timeSelect_left = null,timeSelect_right = null;
        if (this.props.isTime) {
            timeSelect_left = (<TimeSelect hours={this.state.left.hours} minutes={this.state.left.minutes} selectHanlder={this.selectTimeLeft.bind(this)} />)
            timeSelect_right = (<TimeSelect hours={this.state.right.hours} minutes={this.state.right.minutes} selectHanlder={this.selectTimeRight.bind(this)} />)
        }
        let showStr = '请选择一个日期范围: ...',chooseL = this.state.chooseL,chooseR = this.state.chooseR;
        if(chooseL&&!chooseR){showStr = `开始: ${chooseL} ~ 结束: ...`}else if(chooseL&&chooseR){showStr=`开始: ${chooseL} ~ 结束: ${chooseR}`}
        return ( 
            <div className="date-picker-group">
               <div className="options-group">
                    <div className="showDateAll">{showStr}</div>
                    <span className="option-btn confirm-btn" onClick={this.confirm.bind(this)}>{datepicker_left.lang[datepicker_left.data.lang].confirm}</span>
                    <span className="option-btn cancel-btn" onClick={this.cancel.bind(this)}>{datepicker_left.lang[datepicker_left.data.lang].cancel}</span>
                </div>
               <div className="left">
                     <div className="date-picker-year-month">
                        <DateSelectItem which='left' anther={this.state.right} month={this.state.left.month} year={this.state.left.year} selectHanlder={this.selectMonth.bind(this)} />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                {this.state.left.weeks_list.map(function(item,index) {
                                    return (<th key={index}>{item}</th>)
                                })}
                            </tr>
                        </thead>
                        {date_left}
                    </table>
                    {timeSelect_left}
               </div>
                <div className="right">
                     <div className="date-picker-year-month">
                        <DateSelectItem which='right' anther={this.state.left} month={this.state.right.month} year={this.state.right.year} selectHanlder={this.selectMonth.bind(this)} />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                {this.state.right.weeks_list.map(function(item,index) {
                                    return (<th key={index}>{item}</th>)
                                })}
                            </tr>
                        </thead>
                        {date_right} 
                    </table>
                    {timeSelect_right}
               </div>
            </div>
        )
    }
}

export default DatePicker;
