// 年和月的选择组件
import React,{
    Component
} from "react";

const yStr = '年', months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
class DateSelectItem extends Component {

    constructor(state) {
        super(state)
        this.state = {}
    }

    componentWillMount() {
        let { year,month,anther } = this.props 
        this.setState({
            yStr: year + yStr,
            mStr: months[month-1],
            m: month,
            y:year,
            anther:anther
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.month) {
             let { year,month,anther } = nextProps 
            this.setState({
                yStr: year + yStr,
                mStr: months[month-1],
                m: month,
                y:year,
                anther:anther
            })
        }
    }
    selectLeft() {
        let year = this.state.y,
            month = this.state.m
        if (month == 1) {
            year = year - 1;
            month = 12
        }else{
            month = month - 1;
        };
        this.setState({
            yStr: year + yStr,
            mStr: months[month-1],
            m: month,
            y:year
        });
        this.props.selectHanlder(year,month,this.props.which);
    }
    selectRight() { 
        let year = this.state.y,
            month = this.state.m
        if(month == 12){
            year = year + 1; 
            month = 1
        }else{
            month = month + 1;
        }
        this.setState({
            yStr: year + yStr,
            mStr: months[month-1],
            m: month,
            y:year
        });
        this.props.selectHanlder(year,month,this.props.which);
    }
     render() {
        let { which } = this.props,anther = this.state.anther,
            { year,month } = anther,left = true,right = true
        if(which == 'left'){ 
            if((year == this.state.y&&month <= this.state.m+1) || (year==this.state.y+1&&month==1&&this.state.m==12)){
                left = false;
            }
        }else{ 
             if((year==this.state.y-1&&month==12&&this.state.m==1) || (year == this.state.y&&month >= this.state.m-1)){
                right = false;
            }  
        }   
        return (
            <div className={`select-group`}>
                { right ? <span className="switch-btn prev-btn" onClick={this.selectLeft.bind(this)}><span className="arrow"></span></span> : null }
                <span className="value">{this.state.yStr}&nbsp;{this.state.mStr}</span>
                { left ? <span className="switch-btn next-btn" onClick={this.selectRight.bind(this)}><span className="arrow"></span></span> : null }
            </div>
        )
    }
}

export default DateSelectItem;
