/**
 * @Author: Along
 * @Date:   2018-05-02

 */


import React from 'react';
import SkyLight from 'react-skylight';
import './index.less'
const commonCss = {
	dialogStyles: {
		height: 'auto',
		minHeight: '535px',
		width: '750px',
		left: 0,
		right: 0,
		top: '50%',
		margin: '-317.5px auto 0',
		background: '#F9F9F9',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,0.20)',
		borderRadius: '6px'
	},
	titleStyle: {
		height: '45px',
		lineHeight: '45px',
		paddingLeft: '24px'
	},
	closeButtonStyle: {
		cursor: 'pointer',
		position: 'absolute',
		fontSize: '40px',
		color: '#92969C',
		right: '20px',
		top: 0 
	} 
}
 

export default class CommonQuestion extends React.Component {
	show() {
		this.questionModal.show()
	}
	state = {
		
	} 
	componentDidMount(){
		
	}
	
	cancelClick = () => {
		this.questionModal.hide()
	}
	
	close = () => {
		this.questionModal.hide()
	}
	
	render() {
		return (
			<div>
				<SkyLight
					dialogStyles={{ ...commonCss.dialogStyles, paddingBottom: '40px' }}
					titleStyle={commonCss.titleStyle}
					closeButtonStyle={commonCss.closeButtonStyle}
					hideOnOverlayClicked
					ref={com => { this.questionModal = com }}
					title={'常见问题'}
				>
				<div className="outer">
					<div className="content">
						<div className="left">
							 
						</div> 
						<div className="right">
						
						</div>  
					</div>
				</div>
				</SkyLight>
			</div>
		) 
	}
}
