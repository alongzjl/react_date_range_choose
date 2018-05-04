/**
 * @Author: Along
 * @Date:   2018-05-03

 */
 import React from 'react'
import './index.less'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'
import { Input } from 'antd'

 
class SwiperImage extends React.Component {
	
	state = {
		index:0
	};
	handleFocusBlur = (e,index) => {
		let { data, actions } = this.props;
		data.content[index].routerOption = e.currentTarget.value;
		actions.updateComp(null, data);
	}; 
	handleTextFocusBlur = (e,index) => {
		let { data, actions } = this.props;
		data.content[index].title = e.currentTarget.value;
		actions.updateComp(null, data);  
	}; 
	add_img = index => {
		this.setState({index:index});
		this.addImgModal.show();
		
	};  
	render() {
		let { data } = this.props;
		return ( 
			<div className="c-SwiperImage"> 
				{
					data.content.map((item,index) => <ContentEvery item={item} key={index} index={index} handleFocusBlur={this.handleFocusBlur} handleTextFocusBlur={this.handleTextFocusBlur} add_img={this.add_img}></ContentEvery>)
				}
			</div>   
		)
	}
}
 
function ContentEvery({item,index,handleFocusBlur,handleTextFocusBlur,add_img}) {

	return (
			<div className="itemList">
				<h2>图片名称:</h2>
				<Input 
					type="textarea"
					placeholder="更改图片显示文字"
					defaultValue={item.text}
					onKeyUp={e=>{handleTextFocusBlur(e,index)}} 
				/>    
				<h2>添加素材:</h2>
				<div className="modules">
				{ 
					!item.img ? <div className="add_img" onClick={()=>{add_img(index)}}><div className="shadow"><div className="add_text_change">更换图片</div></div><img src={item.img} /></div> : <div className="add_img" onClick={()=>{add_img(index)}}><div className="add_text">+</div><div>添加图片</div></div>
				} 
				</div>
				<h2>跳转链接:</h2> 
				<Input
					type="textarea"
					placeholder="请输入要跳转的网址"
					defaultValue={item.routerOption}
					onKeyUp={e=>{handleFocusBlur(e,index)}} 
				/>
			</div> 
		)
}
SwiperImage.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SwiperImage)