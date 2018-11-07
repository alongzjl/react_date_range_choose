/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'

class Web extends React.Component {
	state={
		url:'',
		first:1
	}
	componentDidMount(){
		this.handleFocus(this.props)	
	}
	componentWillReceiveProps(props){
		let { contentEditable } = this.props
		if(props.contentEditable){
			let num = this.state.first + 1
			this.setState({first:num})
		}else{ 
			this.setState({first:1})
		}  
	}   
	handleFocus = props => {
		let { contentEditable } = props
		if(contentEditable){
			let dom = this.refs['webDiv']
			dom.onfocus = ()=>{
				selectText(dom)
			} 
			dom.focus()
		}  
	} 
	handleBlur = e => {
		let { data, actions } = this.props
		let { content } = data.data
		data['feature'].editStatus = true
		content['url'] = e.target.innerHTML
		actions.updateComp(null, data)
	} 
	urlCheck = val => {
		let RP = /https?\:\/\/[-\w+&@#/%?=~_|!:,.;]+[-\w+&@#/%=~_|]/
		return RP.test(val)
	} 
	shouldComponentUpdate(props,state){
		return state.first ==1 || state.first == 2
	}
	render() { 
		let { data,contentEditable } = this.props,
			urlContent = this.urlCheck(data.data.content.url),
			styleD = contentEditable ? {cursor:'auto'} : {cursor:'move'}
		return (  
			<div className="e-web" id="e-web">
				{
					urlContent ? <iframe className="ew-iframe" src={data.data.content.url} scrolling={'no'} /> :
					<div 
						className="title"
						style={styleD}
						ref="webDiv"
						contentEditable={ contentEditable } 
						onKeyUp={this.handleBlur}
						dangerouslySetInnerHTML={{__html: textBreak('请输入url')}}
						></div>
				}
			</div>
		)
	}
}

export default Web

function selectText(text) {
    if (document.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}