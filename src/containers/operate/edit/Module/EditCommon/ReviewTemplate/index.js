/**
 * @Author: Along
 * @Date:   2018-05-02

 */


import React from 'react';
import SkyLight from 'react-skylight';
import RouterRY from 'reviewTem/router.js'
import './index.less' 
const commonCss = {
	dialogStyles: {
		height: '768px',
		width: '432px',
		left: 0,
		right: 0,
		top: '50%',
		margin: '-384px auto 0',
		background: '#F9F9F9',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,0.20)',
		padding:0  
	}, 
	titleStyle: {
		height: '45px',
		lineHeight: '45px',
		paddingLeft: '24px',
		display:'none'
	},
	closeButtonStyle: {
		cursor: 'pointer',
		position: 'absolute',
		fontSize: '40px',
		color: '#92969C',
		right: '20px',
		top: 0,
		display:'none'
	}  
}
 

export default class ReviewTemplate extends React.Component {
	show() {
		this.reviewModal.show()
	}
	state = {
		
	} 
	componentDidMount(){
		
	}
	
	cancelClick = () => {
		this.reviewModal.hide()
	}
	
	close = () => {
		this.reviewModal.hide()
	}
	render() {
		return (
			<div className="ReviewTemplateShadow">
				<SkyLight
					dialogStyles={commonCss.dialogStyles}
					titleStyle={commonCss.titleStyle}
					closeButtonStyle={commonCss.closeButtonStyle}
					hideOnOverlayClicked
					ref={com => { this.reviewModal = com }}
					title={''}
				>  
				<div className="reviewTemplate" id="reviewTemplate"> 
					 <RouterRY editConfig={this.props.editConfig} actions={this.props.actions}></RouterRY>
				</div>     
				</SkyLight>  
			</div> 
		)  
	}
} 
