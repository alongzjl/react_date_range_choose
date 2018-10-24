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
            isTime: this.props.isTime
        }
    }

    componentWillMount() {
        var data = {}, _this = this;
        datepicker_left.init({
            min: this.state.min,
            max:  this.state.max,
            isTime: this.state.isTime
        }).createMonthDate(function(info) {
            data = Object.assign({},data,{
                month: info
            });
        }).createHours(function(info) {
            data = Object.assign({},data,{
                hours: info
            });
        }).createMinutes(function(info) {
            data = Object.assign({},data,{
                minutes: info
            });
        });
         datepicker_right.init({
            min: this.state.min,
            max:  this.state.max,
            isTime: this.state.isTime
        }).createMonthDate(function(info) {
            data = Object.assign({},data,{
                month: info
            });
        }).createHours(function(info) {
            data = Object.assign({},data,{
                hours: info
            });
        }).createMinutes(function(info) {
            data = Object.assign({},data,{
                minutes: info
            });
        });
        this.setState({
            left:{
                data: data,
                year: datepicker_left.data.year,
                month: datepicker_left.data.month,
                date: datepicker_left.data.date,
                hours: datepicker_left.data.hours,
                minutes: datepicker_left.data.minutes,
                datetime: datepicker_left.data.year+''+datepicker_left.data.month+''+datepicker_left.data.date,
                weeks_list: datepicker_left.lang[datepicker_left.data.lang].weeks
            },
            right:{
                data: data,
                year: datepicker_right.data.year,
                month: datepicker_right.data.month,
                date: datepicker_right.data.date,
                hours: datepicker_right.data.hours,
                minutes: datepicker_right.data.minutes,
                datetime: datepicker_right.data.year+''+datepicker_right.data.month+''+datepicker_right.data.date,
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
                datetime: item.year+''+item.month+''+item.date
            }}});
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
                datetime: item.year+''+item.month+''+item.date
            }}}); 
        }
    }

    selectYear(val,which) {
        if(which == 'left'){
            let data = this.state.left.data;
            datepicker_left.data.year = val;
            datepicker_left.createMonthDate(function(info) {
                data = Object.assign({},data,{
                    month: info
                });
            });
            this.setState({left:{...this.state.left,...{
                data: data,
                year: val
            }}});
        }else{
            let data = this.state.right.data;
            datepicker_right.data.year = val;
            datepicker_right.createMonthDate(function(info) {
                data = Object.assign({},data,{
                    month: info
                });
            });
            this.setState({right:{...this.state.right,...{
                data: data,
                year: val
            }}});
        }
    }

    selectMonth(val,which) {
        if(which == 'left'){
            let data = this.state.left.data;
            datepicker_left.data.month = val;
            datepicker_left.createMonthDate(function(info) {
                data = Object.assign({},data,{
                    month: info
                });
            });
            this.setState({left:{...this.state.left,...{
                data: data,
                month: val
            }}});
        }else{
            let data = this.state.right.data;
            datepicker_right.data.month = val;
            datepicker_right.createMonthDate(function(info) {
                data = Object.assign({},data,{
                    month: info
                });
            });
            this.setState({right:{...this.state.right,...{
                data: data,
                month: val
            }}});
        }
    }

    selectTimeLeft(val,type) {
        let obj = {}; 
        obj[type] = val;
        this.setState({left:{...this.state.left,...obj}});
    }
    selectTimeRight(val,type) {
        let obj = {};
        obj[type] = val;
        this.setState({right:{...this.state.right,...obj}});
    }
    // 确定按钮
    // 传出 日期、时间、毫秒数
    confirm() {
        let date = [];
        date.push(datepicker_left.digit(this.state.left.year));
        date.push(datepicker_left.digit(this.state.left.month));
        date.push(datepicker_left.digit(this.state.left.date));

        let time = [];
        time.push(datepicker_left.digit(this.state.left.hours));
        time.push(datepicker_left.digit(this.state.left.minutes));

        let d = new Date(date.join('/')+' '+time.join(':'));
        this.props.confirm(date,time,d.getTime());
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
                                if (!status) className = 'not-now-month';
                                let datetime = item.year+''+item.month+''+item.date;
                                if (datetime == _this.state.left.datetime) className = 'now-date';
                                let dateNum = new Date(`${item.year}/${item.month}/${item.date}`)
                                if(dateNum < new Date(_this.state.min) || dateNum > new Date(_this.state.max)){
                                    style={cursor:'not-allowed'}
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
                                if (!status) className = 'not-now-month';
                                let datetime = item.year+''+item.month+''+item.date;
                                if (datetime == _this.state.right.datetime) className = 'now-date';
                                let dateNum = new Date(`${item.year}/${item.month}/${item.date}`)
                                if(dateNum < new Date(_this.state.min) || dateNum > new Date(_this.state.max)){
                                    style={cursor:'not-allowed'}
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

        return (
            <div className="date-picker-group">
               {/* <div className="showDateAll">{`${this.state.year}/${this.state.month}/${this.state.date} ${this.state.hours}:${this.state.minutes}`}</div>*/}
               <div className="options-group">
                    <span className="option-btn confirm-btn" onClick={this.confirm.bind(this)}>{datepicker_left.lang[datepicker_left.data.lang].confirm}</span>
                    <span className="option-btn cancel-btn" onClick={this.cancel.bind(this)}>{datepicker_left.lang[datepicker_left.data.lang].cancel}</span>
                </div>
               <div className="left">
                     <div className="date-picker-year-month">
                        <DateSelectItem type="year" which='left' min={this.state.min} value={this.state.left.year} selectHanlder={this.selectYear.bind(this)} />
                        <DateSelectItem type="month" which='left' value={this.state.left.month} selectHanlder={this.selectMonth.bind(this)} />
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
                        <DateSelectItem type="year" which='right' min={this.state.min} value={this.state.right.year} selectHanlder={this.selectYear.bind(this)} />
                        <DateSelectItem type="month" which='right' value={this.state.right.month} selectHanlder={this.selectMonth.bind(this)} />
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
