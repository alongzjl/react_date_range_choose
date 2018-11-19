/**
 * 时间选择组件
 */
import React,{
    Component
} from "react";
import { Slider,Row,Col } from 'antd'
import DatePickerCore from "./core";

const datepicker = new DatePickerCore();

class TimeSelect extends Component {
    constructor(state) {
        super(state)
        this.state = {}
    }
    // 滑块
    renderSlider(max,val) {
        let value = val < 10 ? '0'+val : val
        let str = max == 23 ? '时' : '分' 
        return (
            <Row>
                <Col span={6}>
                    <div style={{width:'100%',fontSize:'14px'}}>{value} {str}</div>
                </Col>
                <Col span={16}> 
                    <Slider
                        min={0} max={max} step={1}
                        value={val} onChange={v => this.selectItem(v,max)}
                    />
                </Col> 
            </Row>
        ) 
    }  
    selectItem = (v,max) => {
        let type = max == 23 ? 'hours' : 'minutes'
        this.props.selectHanlder(v,type);
     } 

    render() {
         return (
            <div className="date-picker-time-group">
                {this.renderSlider.bind(this,23,this.props.hours)()}
                {this.renderSlider.bind(this,59,this.props.minutes)()}
            </div> 
        )
    }
}

export default TimeSelect;
