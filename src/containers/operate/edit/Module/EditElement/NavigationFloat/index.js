/**
 * @Author: Along
 * @Date:   2018-05-07

 */
 

import React from 'react'

import './index.less' 

class NavigationFloat extends React.Component {
	
	componentWillReceiveProps(props) {
		
	}; 
	componentDidMount() {

	};
 
	to = event => {
		event.preventDefault()
	}
	 
	
	render() { 
		let { data } = this.props;
		const layout_style = data.layout.type;
		const layout_position = data.layout.position;
		return ( 
			<div className="e-navigationFloat">
				<div className='navigation_box'>
					{
						data.data.content.map((item,index) => <OnlyNavigation props={this.props} data={item} key={index} index={index}></OnlyNavigation>)
					} 
				</div>  
					 
			</div>   
		)   
	}
}  
 
function OnlyNavigation({data,props,index}) {
	const layout_style = props.data.layout.type;
	const layout_position = props.data.layout.position;
	let length = props.data.data.content.length; 
	length = length%2 == 0 ? length : length+1; 
	let style_show = {};
	index = index+1;
	if(layout_style == 2){
		layout_position == 'left' ?
				style_show ={ 
					'transform':`rotate(${parseInt(180/length)*index}deg)`,
					'msTransform':`rotate(${parseInt(180/length)*index}deg)`, 	/* IE 9 */
					'MozTransform':`rotate(${parseInt(180/length)*index}deg)`, 	/* Firefox */
					'WebkitTransform':`rotate(${parseInt(180/length)*index}deg)`, /* Safari 和 Chrome */
					'OTransform':`rotate(${parseInt(180/length)*index}deg)`,
					marginLeft:`${(length/2-Math.abs(length/2-index))*50-80}px` 
				} : style_show ={ 
					'transform':`rotate(${-parseInt(180/length)*index}deg)`,
					'msTransform':`rotate(${-parseInt(180/length)*index}deg)`, 	/* IE 9 */
					'MozTransform':`rotate(${-parseInt(180/length)*index}deg)`, 	/* Firefox */
					'WebkitTransform':`rotate(${-parseInt(180/length)*index}deg)`, /* Safari 和 Chrome */
					'OTransform':`rotate(${-parseInt(180/length)*index}deg)`,
					marginLeft:`${Math.abs(length/2-index)*50-80}px`  
				}           
	}  
	return ( 
			<div className="only" style={{...cssColorFormat(props, 'filter'),style_show}}> 
				<img src={data.img.img} />   
				<p style={cssColorFormat(props, 'text')}>{data.title}</p>
			</div> 
		)
}
export default NavigationFloat