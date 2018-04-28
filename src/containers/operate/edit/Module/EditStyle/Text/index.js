/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import './index.less'

import { SketchPicker } from 'react-color'
import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'

import { InputNumber, Card, Button, Select } from 'antd'

 
var styleMap = {
	layout: '组件样式',
	image:  '图片样式',
	text:'文本样式' 
}
var cssMap = {
	top:               { name: '上',   type: 'number' },
	left:              { name: '左',   type: 'number' },
	width:             { name: '宽',   type: 'number' },
	height:            { name: '高',   type: 'number' },
	borderRadius:      { name: '圆角', type: 'number' },
	borderWidth:       { name: '边宽', type: 'number' },
	lineHeight:        { name: '行高', type: 'number' },
	fontSize:{ name: '字号',   type: 'select' },
	textAlign:{ name: '对齐方式',   type: 'string' },
	color:{ name: '字体颜色',   type: 'color' },
	fontWeight:{ name: '粗细',   type: 'two' },
} 
class Text extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	onChange = (val, style, css) => {
		let { data, actions } = this.props
		data.style[style][css] = val
		actions.updateComp(null, data)
	}
	changeFontColor = color => {
		let { data, actions } = this.props
		data.style.text.color = color.hex
		actions.updateComp(null, data) 
	}
	changeFontSize = value => {
	   let { data, actions } = this.props
		data.style.text.fontSize = value 
		actions.updateComp(null, data) 
	} 
 

	render() {
		let { data, actions } = this.props;
		const fontSizeList = [
			{ value: '12px', label: '12px' },
			{ value: '13px', label: '13px' },
			{ value: '14px', label: '14px' },
			{ value: '15px', label: '15px' },
			{ value: '16px', label: '16px' },
			{ value: '17px', label: '17px' },
			{ value: '18px', label: '18px' },
			{ value: '20px', label: '20px' },
			{ value: '22px', label: '22px' },
			{ value: '26px', label: '26px' },
			{ value: '30px', label: '30px' },
			{ value: '34px', label: '34px' },
			{ value: '38px', label: '38px' },
			{ value: '42px', label: '42px' },
			{ value: '46px', label: '46px' },
			{ value: '50px', label: '50px' },
			{ value: '54px', label: '54px' },
			{ value: '58px', label: '58px' },
			{ value: '62px', label: '62px' },
			{ value: '66px', label: '66px' },
			{ value: '70px', label: '70px' },
			{ value: '80px', label: '80px' },
			{ value: '90px', label: '90px' },
		]
		let childNode = Object.keys(data.style).map(p => {
			if (!styleMap[p]) return
			let cnode = Object.keys(data.style[p]).map(q => {
				if (!cssMap[q]) return
				var cm  = cssMap[q],
					val = data.style[p][q]
				if (cm.type === 'number') {
					return (
						<div key={q}>
							{cm.name}
							<InputNumber
								defaultValue={val}
								value={val}
								onChange={v => this.onChange(v, p, q)}
							/>
						</div>
					)
				}else if(cm.type === 'select'){
					return (
							<div>
								 <Select defaultValue="16px" style={{ width: 120 }} onChange={this.changeFontSize}>
									{  
										fontSizeList.map(item => <Option value={item.value}>{item.value}</Option>)
									}
								</Select>
							</div> 
						)
				}else if(cm.type === 'string'){
					return (
						<div>
							<Button type={val=='left'?'primary':''} onClick={() => this.onChange('left', p, q)}>居左</Button>
							<Button type={val=='center'?'primary':''} onClick={() => this.onChange('center', p, q)}>居中</Button>
							<Button type={val=='right'?'primary':''} onClick={() => this.onChange('right', p, q)}>居右</Button>
						</div> 
					) 
				}else if(cm.type === 'color'){
					return (
						<SketchPicker onChangeComplete={this.changeFontColor} color={val} />
					) 
				}	
			}) 
			return ( 
				<Card key={p} title={styleMap[p]} style={{ width: 280 }}>
					{ cnode }
				</Card>
			)
		})
		return (
			<div className="s-web">
				{ childNode }
			</div>
		)
	} 
}












Text.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Text)
