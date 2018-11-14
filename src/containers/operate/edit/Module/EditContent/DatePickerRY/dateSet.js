import React from 'react';
import SkyLight from 'react-skylight';
import DatePicker from './DatePicker'


const commonCss = {
	dialogStyles: {
		height: '440px',
		width: '740px',
		left: 0,
		right: 0,
		top: '50%',
		margin: '-220px auto 0',
		padding:'10px',
		background: '#fff',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,0.20)',
		borderRadius: '6px'
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
		top: '20px',
		display:'none' 
	}
}

export default class DateSet extends React.Component {
	show() {
		this.datePickerModal.show()
	}
	cancelClick = () => {
		this.datePickerModal.hide()
	}
	dateChange = (date) => {
		date ? this.props.confirm(date) : null
		this.datePickerModal.hide()
	}  
	render() {
		return (
			<div>
				<SkyLight
					dialogStyles={{ ...commonCss.dialogStyles, paddingBottom: '40px' }}
					titleStyle={commonCss.titleStyle}
					closeButtonStyle={commonCss.closeButtonStyle}
					hideOnOverlayClicked
					ref={com => { this.datePickerModal = com }}
					title={''}
				>
					<DatePicker 
						min={this.props.min} 
						max={this.props.max} 
						isTime={true} 
						confirm={this.dateChange} 
						cancel={this.cancelClick}
						now={this.props.now}
						defaultValue={this.props.defaultValue} 
						remove={this.props.remove}
					/>
				</SkyLight>
			</div>
		)
	}
}