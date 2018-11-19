/**
 * 日期单格
 */
import React,{
    Component
} from "react";

// 日期单格
class DateItem extends Component {

    selectDate = () => {
    	let {item,style,which} = this.props
    	this.props.selectDate(item,style.cursor,which);
    }
    render() {
        return (
            <td className={this.props.className} style={this.props.style} onClick={this.selectDate}>{this.props.item.date}</td>
        ) 
    }
}

export default DateItem;
