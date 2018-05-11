/**
 * @Author:Along
 * @Date:   2018-05-08
 
 */
 
import React from 'react'
import './index.less'

class Video extends React.Component {
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	render() {
		let { data } = this.props
		// console.log(1, this.props)
		return (
			<div className="e-video">
				<video src={data.data.content.src} controls="controls">
					您的浏览器不支持 video 标签。
				</video>
			</div>    
		) 
	}
} 

export default Video
