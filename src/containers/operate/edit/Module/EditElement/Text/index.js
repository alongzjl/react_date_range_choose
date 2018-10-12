/**
 * @Author: Along
 * @Date:   2018-04-27
 
 */

import React from 'react'
import './index.less'

class Text extends React.Component {
	componentDidMount(){
		this.handleFocus(this.props)	
	}
	componentWillReceiveProps(props){
		this.handleFocus(props)
	} 
	handleFocus = props => {
		let { contentEditable } = props
		if(contentEditable){
			let dom = this.refs['textDiv']
			dom.onfocus = ()=>{
				selectText(dom)
			} 
			dom.focus()
		}
	}
	handleBlur = e => {
		let { data, actions } = this.props
		let { content } = data.data
		data['feature'].editStatus = false
		content['text'] = e.target.innerHTML
		actions.updateComp(null, data)
	}
	render() {
		let { data, type,contentEditable } = this.props
		let styleD = contentEditable ? {cursor:'auto'} : {cursor:'move'}
		return (
			<div className={`e-text`} id="e-text">
				<div 
				ref="textDiv"
				style={{...cssColorFormat(this.props, 'text'),...styleD}}  
				contentEditable={contentEditable} 
				onBlur={this.handleBlur}
				dangerouslySetInnerHTML={{__html: textBreak(data.data.content.text || '双击编辑内容')}}
				></div>
			</div>
		)
	}
}

export default Text

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