/**
 * @Author: Along
 * @Date:   2018-05-10
 
 */ 

import React from 'react'
import './index.less'

import Custom from '../Custom'

class StoreInstro extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	ioOuter(ipt) {
		
	} 
	
	init() {
		this.state = {
			ioInput: this.props.data.feature
		}
	}

	render() {
		let { data, actions, idx, csn } = this.props;
		this.init.bind(this)();
		let comp  = data.data.components;
		let textDom = comp.filter(item=>item.name == 'text');
		textDom = textDom.map((item,index)=>{
			let text = '';
			if(index == 0){
				text = '店铺简介'
			}else if(index == 1){
				text = '70年代，Clarks开发了多项重要的技术，将聚亚安酯引进于鞋底的制作中，给Clarks的顾客带来难以置信的舒适享受。PU的材质超轻。'
			} 
			item.data.content.text = text;
			return item 
		})
		let imagesDom =  comp.filter(item=>item.name == 'wonderfulActivity');
		data.data.components = 	textDom.concat(imagesDom);  
		 
		return (
			<Custom
				data={data}
				actions={actions}
				idx={idx}
				csn={csn}
				ioInput={this.state.ioInput}
				ioOuter={this.ioOuter.bind(this)}
			/> 
		)
	}
} 
 
export default StoreInstro
