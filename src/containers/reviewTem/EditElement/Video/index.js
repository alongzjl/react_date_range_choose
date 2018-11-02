/**
 * @Author:Along
 * @Date:   2018-05-08
 
 */
 
import React from 'react'
import './index.less'

class VideoShow extends React.Component {
	state = {
		random:`RYVideo_${Math.random()*1e5}`,
		show:false,
		first:0
	} 
	pausePlay = () => {
		let dom = document.getElementById(this.state.random);
		const num = this.state.first + 1
		!this.state.show ? (dom.pause(),this.setState({show:true,first:num})) : (dom.play(),this.setState({show:false,first:num}))
	} 
	canPlay = () => {
		const num = this.state.first + 1
		this.setState({first:num})
	}
	end = e => {
		e.target.style.opacity = 0
	}
	render() {
		let { data } = this.props;
		const content = data.data.content; 
		return (
			<div className="e-video">
				<div className="shadow" onClick={this.pausePlay} >
					{
						this.state.show ? <img src="./image/play_video.png" /> : null
					}
				</div>
				 <div 
				 	className="loading fadeOutCenter" 
				 	style={{"animationDuration":"3s","animationDelay":"0s","animationIterationCount":1}}
				 	onAnimationEnd={e=>{this.end(e)}}
				 	></div>
				<VideoContent content={content} random={this.state.random} canPlay={this.canPlay} first={this.state.first} />
			</div>      
		)   
	} 
} 
//视频内容组件 
class VideoContent extends React.Component {
	shouldComponentUpdate(nextProps,nextState){
		if(nextProps.first <= 1){
			return true
		}else{
			return false
		}
	}
	render(){
		const { random,content,canPlay,first } = this.props
		return(
				<video id={random} 
				src={content.video.video } 
				controls={false} 
				autoPlay 
				loop
				onCanPlayThrough={first == 0 ? canPlay : null}
				poster={content.video.preview}>  
					您的浏览器不支持 video 标签。   
				</video> 
			)
	}
}
export default VideoShow