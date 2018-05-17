/**
 * @Author: Along
 * @Date:   2018-05-05

 */
 

import React from 'react'

import './index.less' 

class Navigation extends React.Component {
	
	componentWillReceiveProps(props) {
		
	}; 
	componentDidMount() {
		
	};
 
	to = event => {
		event.preventDefault()
	}
	
	
	render() { 
		let { data } = this.props
		
		return (
			<div className="e-navigation">
				<div className="navigation_box" style={cssColorFormat(this.props, 'filterBox')}>
					{
						data.data.content.map((item,index) => <OnlyNavigation props={this.props} data={item} key={index}></OnlyNavigation>)
					}  
				</div>
					
			</div>  
		) 
	}
}
 
function OnlyNavigation({data,props}) {

	return ( 
			<div className="only" style={cssColorFormat(props, 'filter')} > 
				<img src={data.img.img} />    
				<p style={cssColorFormat(props, 'text')}>{data.title}</p>
			</div>
		)
}
export default Navigation