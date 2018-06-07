/**
 * @Author: Along
 * @Date:   2018-05-07

 */
 

import React from 'react'

import './index.less' 

class NavigationFloat extends React.Component {
	
	componentWillReceiveProps(props) {}

	componentDidMount() {}

	to = event => {
		event.preventDefault()
	}
	
	render() {
		let { data } = this.props
		const layout_style = data.layout.type
		const layout_position = data.layout.position
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
	let css = cssColorFormat(props, 'filter')
	if (data.highSwitch) css = { ...css, ...cssColorFormat(props, 'filterActive') }
	return (
		<div className="only" style={css}> 
			<img src={getImg(data.img)} />
			<p style={cssColorFormat(props, 'text')}>{data.title}</p>
		</div> 
	)
}
export default NavigationFloat