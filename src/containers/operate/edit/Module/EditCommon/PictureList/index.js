/**
 * @Author: Along
 * @Date:   2018-05-02

 */


import React from 'react';
import SkyLight from 'react-skylight';
import './index.less'
import { Button, Upload, message,Modal } from 'antd'
const commonCss = {
	dialogStyles: {
		height: 'auto',
		minHeight: '635px',
		width: '750px',
		left: 0,
		right: 0,
		top: '50%',
		margin: '-317.5px auto 0',
		background: '#F9F9F9',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,0.20)',
		borderRadius: '6px'
	},
	titleStyle: {
		height: '45px',
		lineHeight: '45px',
		paddingLeft: '24px'
	},
	closeButtonStyle: {
		cursor: 'pointer',
		position: 'absolute',
		fontSize: '40px',
		color: '#92969C',
		right: '20px',
		top: '20px' 
	}
}


export default class PictureList extends React.Component {
	show() {
		this.addImgModal.show()
	}
	state = {
		choosed_img:[],
		imgTypes:[],
		videoTypes:[],
		imgList:[],
		videoList:[]
	}
	componentDidMount(){ 
		const {type} = this.props;
		if(type == 'video'){
			Ajax.get('/store/videoListType').then(res => {
				this.setState({
					videoTypes:res.data
				})
			})
			this.getVideoList();
		}else{
			Ajax.get('/store/imgListType').then(res => {
				this.setState({
					imgTypes:res.data
				})
			})
			this.getImgList();
		}
	}
	getImgList = () => {
		Ajax.get('/store/imgList').then(res => {
				this.setState({
					imgList:res.data
				})
			})
	};
	getVideoList = () => {
		Ajax.get('/store/videoList').then(res => {
				this.setState({
					videoList:res.data
				}) 
			})  
	}
	cancelClick = () => {
		this.addImgModal.hide()
	}
	save = () => {
		if (this.state.choosed_img) {
			this.props.enter(this.state.choosed_img,this.props.index)
			this.addImgModal.hide()
		} else {
			message.info(`你还未选择图片!`)
		}
	}
	close = () => {
		this.addImgModal.hide()
	}
	save_img = url => {
		this.setState({choosed_img:url});
	}
	render() {
		let { firstAdd,type } = this.props
		return (
			<div>
				<SkyLight
					dialogStyles={{ ...commonCss.dialogStyles, paddingBottom: '40px' }}
					titleStyle={commonCss.titleStyle}
					closeButtonStyle={commonCss.closeButtonStyle}
					hideOnOverlayClicked
					ref={com => { this.addImgModal = com }}
					title={'选择素材'}
				>
				<div className="outer">
					<div className="add_title">
						<ul>
							{
								type == 'video' ? <li className='active'>视频</li> :
								<li className='active'>图片</li>
							}
						</ul>
						<div className="input_search"><input placeholder="搜索" /></div>
						<div className="search">搜索</div>
					</div>
					{
						type == 'video' ? <VideoModule save={this.save_img} getVideoList={this.getVideoList} videoTypes={this.state.videoTypes} videoList={this.state.videoList} type={type} /> :
						<ImgModule save={this.save_img} getImgList={this.getImgList} firstAdd={firstAdd} imgTypes={this.state.imgTypes} imgList={this.state.imgList} type={type} />
					} 
					<div className="bottom">
						<Button type="primary" onClick={this.save}>确定</Button>
						<Button onClick={this.close}>取消</Button>
					</div>
				</div>
				</SkyLight>
			</div>
		) 
	}
}

class ImgModule extends React.Component {
	state = {
		imgTypes:[],
		imgList:[]
	}

	componentWillReceiveProps(props){
		let img_list = props.imgList;
		let imgTypes = props.imgTypes;
		this.setState({
				imgList:img_list,
				imgTypes:imgTypes
			}) 
	}
	chooseType(id) {
		this.props.getImgList();
	}
	chooseImg(img) {
		let firstAdd = this.props.firstAdd
		let img_list = this.state.imgList
		if(firstAdd){
			img_list = img_list.map(item=>{
				item.id === img ? item.isClicked = !item.isClicked : null;
				return item
			}); 
		}else{
			img_list = img_list.map(item=>{
				item.id === img ? item.isClicked = !item.isClicked : item.isClicked = false;
				return item  
			});
		}
		this.setState({
				imgList:img_list
			})
		let choosed_img = img_list.filter(item => item.isClicked == true);
		this.props.save(choosed_img)
	}
	upload_img() {
	   // alert('上传本地图片')
	} 
	
	render() {
		const Upload_props = {
			name: 'file',
			action: '/chaoyue/uploadImage',
			data: {
			},
			headers: {
				authorization: 'authorization-text',
			},
			onChange(info) {
				if (info.file.status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if (info.file.status === 'done') {
					message.success(`${info.file.name} file uploaded successfully`);
				} else if (info.file.status === 'error') {
					message.error(`${info.file.name} file upload failed.`);
				}
			},
			 beforeUpload(file) {
				  const isJPG = file.type === 'image/jpeg'||file.type === 'image/png'; 
				  if (!isJPG) {
				    message.error('You can only upload JPG file!');
				  } 
				  const isLt2M = file.size / 1024 / 1024 < 2;
				  if (!isLt2M) {
				    message.error('Image must smaller than 2MB!');
				  }
				  return isJPG && isLt2M;
				}
		}
		return (
			<div className="content">
				<div className="left">
					{
						this.state.imgTypes.map((item,index) => <Type key={index} item={item} choose_one={this.chooseType.bind(this)}></Type>)
					}
				</div>
				<div className="right">
					<Upload {...Upload_props}>
						<div className="add_img"><div className="add_text">+</div><div>上传图片</div></div>
					</Upload> 
					{
						this.state.imgList.map((item,index) => <List key={index} item={item} type={this.props.type} choose_one={this.chooseImg.bind(this)}></List> )
					}
				</div>
			</div>
		)
	}
}

class VideoModule extends React.Component {
	state = {
		videoTypes:[
			
		],
		videoList:[
			
		]
	}
	
	componentWillReceiveProps(props){
		let videoList = props.videoList;
		let videoTypes = props.videoTypes;
		 this.setState({
				videoList:videoList,
				videoTypes:videoTypes
			})
	}
	chooseType(id) {
		this.props.getVideoList();  
	}
	chooseVideo = id => { 
		let videoList = this.state.videoList
		videoList = videoList.map(item=>{
			item.id == id ? item.isClicked = !item.isClicked : item.isClicked = false;
			return item
		});
		this.setState({
				videoList:videoList
			})
		let choosed_video = videoList.filter(item => item.isClicked == true);
		this.props.save(choosed_video)
	}
	upload_img = () => {
	   // alert('上传本地图片')
	} 
	render() {
		/*const Upload_props = {
			name: 'file',
			action: '/chaoyue/uploadImage',
			data: {
			},
			headers: {
				authorization: 'authorization-text',
			},
			onChange(info) {
				if (info.file.status !== 'uploading') {
					console.log(info.file, info.fileList);
				}
				if (info.file.status === 'done') {
					message.success(`${info.file.name} file uploaded successfully`);
				} else if (info.file.status === 'error') {
					message.error(`${info.file.name} file upload failed.`);
				}
			},
			 beforeUpload(file) {
			  const isVIDEO = file.type === 'video/mp4'; 
			  if (!isJPG) { 
			    message.error('You can only upload MP4 file!');
			  }  
			  const isLt2M = file.size / 1024 / 1024 < 20;
			  if (!isLt2M) {
			    message.error('Image must smaller than 20MB!'); 
			  }
			  return isVIDEO && isLt20M;
			} 
		} */
		/*<Upload {...Upload_props}>
						<div className="add_img"><div className="add_text">+</div><div>上传视频</div></div>
					</Upload>*/ 
		return (
			<div className="content">
				<div className="left">
					{
						this.state.videoTypes.map((item,index) => <Type key={index} item={item} choose_one={this.chooseType}></Type>)
					}
				</div> 
				<div className="right">
					
					{ 
						this.state.videoList.map((item,index) => <List key={index} item={item} type={this.props.type} choose_one={this.chooseVideo}></List> )
					}
				</div>
			</div>
		)
	}
}

function Type({item,choose_one}){
	return (
		<div onClick={()=>{choose_one(item.id)}}>{item.name}</div> 
	)
}

function List({item,choose_one,type}){
	return (
		<div onClick={()=>{choose_one(item.id)}} className={item.isClicked?'choosed':''}>
			<div className={item.isClicked?'icon':''}>
				<div className="right-symbol"></div>
			</div>
			{
				type == 'video' ? <video src={item.url} controls="controls">
						您的浏览器不支持 video 标签。
					</video> :
					<img src={item.url} />
			}  
		</div> 
	)
}