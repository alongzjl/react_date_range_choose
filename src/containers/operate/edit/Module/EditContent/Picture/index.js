/**
 * @Author: Along
 * @Date:   2018-05-02
 
 */

import React from 'react'
import './index.less'

import { bindActionCreators } from 'redux'
import { connect }  from 'react-redux'
import * as actions from 'actions'
import { Input } from 'antd'

 
class Picture extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	handleFocusBlur(e) {
		let { data, actions } = this.props
		data.content.routerOption = e.currentTarget.value
		actions.updateComp(null, data)
	};
	add_img = () => {
		this.addImgModal.show();
	}; 
	render() {
		let { data } = this.props
		return ( 
			<div className="c-picture"> 
				<h2>添加素材:</h2>
				<div className="modules">
				{
					data.content.img ? <div className="add_img" onClick={this.add_img}><div className="shadow"><div className="add_text_change">更换图片</div></div><img src={data.content.img} /></div> : <div className="add_img" onClick={this.add_img}><div className="add_text">+</div><div>添加图片</div></div>
				} 
				</div>
				<h2>跳转链接:</h2> 
				<Input
					type="textarea"
					placeholder="请输入要跳转的网址"
					defaultValue={data.content.routerOption}
					onBlur={this.handleFocusBlur.bind(this)} 
				/>
			</div>   
		)
	}
}

Picture.defaultProps = {
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators(actions, dispatch)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Picture)