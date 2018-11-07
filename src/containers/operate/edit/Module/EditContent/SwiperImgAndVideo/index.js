/**
 * @Author: Along
 * @Date:   2018-05-03

 */
import React from 'react'
import './index.less'

import  SwiperSame  from '../SwiperSame'
import PictureAndVideo from 'compEdit/EditCommon/PictureAndVideo'
import { Row, Col, Collapse, Icon,message } from 'antd'
const  { Panel }    = Collapse


class SwiperImage extends React.Component {

	constructor(props) {
		super(props)

	}
	state = {
		init:false
	}
	addImg = () => {
		this.setState({init:true},()=>{this.addImgVideoModal.show()})
	}
	enter = list => { 
		let props = this.props.data
		if (!props.editConfig) props = props.data
		if (!props.editConfig) return
		let { data, actions, editConfig } = props
		let { curData }    = editConfig
		let { content }    = data.data
		let { parentComp } = curData
		let newContent =  this.do_content(list,content)
		if(newContent.length > 40){
			message.warning('最多只能添加40张素材！')
			return false
		} 
		this.addImgVideoModal.hide() 
		data.data.content = newContent
		actions.updateComp(null, parentComp? parentComp: data)
	}  
	do_content = (list,content) => {
		list = list.map(_=>{
			let item = '' 
			if(_.type == 2){ 
				item = getEnv() === 'business' ? {img:{type:'custom',video:_.url,preview:_.preview},attribute:_.attribute,type:'video',date:''} : {img:{type:'custom',video:_.url,preview:_.preview},attribute:_.attribute,type:'video'}
			}else{
				item = getEnv() === 'business' ? {img:{type:'custom',img:_.url},attribute:_.attribute,router:{},type:'image',delayOnly:5,date:''} : {img:{type:'custom',img:_.url},attribute:_.attribute,router:{},type:'image'}
			} 
			return item
		}) 
		let newList = deepCopy(list)
		content.map(_=>{
			list.map(v=>{
				if(v.type == "image" && _.type == "image"){
					if(v.img.img == _.img.img){
						newList = newList.filter(s=>s.img.img != v.img.img)
						return
					}
				}else if(v.type == 'video' && _.type == "video"){
					if(v.img.video == _.img.video){
						newList = newList.filter(s=>s.img.video != v.img.video)
						return
					}
				} 
			})
		})    
		let newContent = content.concat(newList)
		return newContent
	}  
	initFn = () =>{
		this.setState({init:false})
	}
	/*shouldComponentUpdate(nextProps,nextState){
		return nextState.init
	}*/
	render() {
		let props = this.props.data
		if (!props.editConfig) props = props.data
		if (!props.editConfig) return
		let { data, actions, editConfig } = props
		let { curData }    = editConfig
		let { content }    = data.data
		return (
			<div>
				{ content.length > 1? <SwiperSame data={props} />: false }
				<Collapse activeKey={['0']} onChange={this.cb}>
					<Panel header={`添加`} key={0}>
						<div className="pgs-row" key={0}>
							<div className="pgsr-name">添加</div>
							<div className="pgsr-ctrl">
								<div className="pg-img-upload">
									<Row type="flex" align="middle" style={{ width: '100%' }}>
										<Col span={9}>
											<div className="add_img" onClick={this.addImg}>
												<div className="add_text"><Icon type="plus" /></div>
											</div>
										</Col>
									</Row>
								</div>
							</div> 
						</div>
					</Panel>
				</Collapse>
				{
					this.state.init ? <PictureAndVideo
										ref={com => { this.addImgVideoModal = com }}
										enter={this.enter}
										init={this.state.init}
										initFn={this.initFn}
									/> : null
				} 
			</div>
		)
	}
}

export default SwiperImage