/**
 * @Author: Along
 * @Date:   2018-05-02

 */


import React from 'react';
import SkyLight from 'react-skylight';
import './index.less'
import { Button, Upload, message,Modal,Pagination,Icon,Input } from 'antd'
import Url from 'public/Url'
const commonCss = {
	dialogStyles: {
		height: 'auto',
		minHeight: '55px',
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
		paddingLeft: '24px',
		display:'none'
	},
	closeButtonStyle: {
		cursor: 'pointer',
		position: 'absolute',
		fontSize: '40px',
		color: '#92969C',
		right: '20px',
		top: '20px' ,
		zIndex:1000
	}
}


export default class PictureAndVideo extends React.Component {
	show() {
		this.addImgVideoModal.show()
	}
	state = {
		type:1
	}
	cancelClick = () => {
		this.addImgVideoModal.hide()
	}
	
	close = () => {
		this.addImgVideoModal.hide()
	} 
	changeType = type => {
		this.setState({type:type})
	}
	render() {
		return (
			<div>
				<SkyLight
					dialogStyles={{ ...commonCss.dialogStyles, paddingBottom: '40px' }}
					titleStyle={commonCss.titleStyle}
					closeButtonStyle={commonCss.closeButtonStyle}
					hideOnOverlayClicked
					ref={com => { this.addImgVideoModal = com }}
					title={''}
				>
				<div className="outer">
					{
						this.state.type == 1 ? <ImgAndModule changeType={this.changeType} close={this.close} type={this.state.type} /> : <VideoAndModule changeType={this.changeType} close={this.close} type={this.state.type} />
					} 
				</div> 
				</SkyLight> 
			</div>
		)
	}
}

//图片素材
class ImgAndModule extends React.Component {
	state = {
		choosed_img:[],
		imgTypes: [],
		imgList:  [],
		page_img: {},
		attribute:'',
		currentPage: 1,
		page:1,
		page_size:14,
		pageSize:14,
		name:'', 
		groupId: 39
	}
	componentWillMount(){
		var getData = {
			type: 1
		}
		var ty = 'ySourceGroupManage'
		if (getEnv() === 'business') {
			getData.mallId = uif.userInfo.mallMid
			ty = 'sourceGroupManage'
		}
		Ajax.postJSON(`/easy-smart/${ty}/query`, getData).then(res => {
			this.setState({ 
				imgTypes: res.data
			})
			this.setState({ groupId: res.data[0].id })
			this.getImgList('groupId', res.data[0].id)
		})
	}

	getImgList = (str, id) => {
		let currentPage = this.state.currentPage
		if (str == 'page') {
			currentPage = id
			this.setState({ currentPage: id })
		} else if (str == 'groupId') {
			currentPage = 1
			this.setState({ groupId: id, currentPage: 1 })
		}else if(str == 'name'){
			currentPage = 1
			this.setState({ name: id, currentPage: 1 })
		}
		setTimeout(() => {
			let postData = {
				page:        this.state.page,
				name:        this.state.name,
				currentPage: currentPage,
				pageSize:    this.state.pageSize,
				page_size:   this.state.page_size,
				groupId:     this.state.groupId,
				type:        1
			}
			var ty = 'ySourceManage'
			if (getEnv() === 'business') {
				postData.mallId = uif.userInfo.mallMid
				ty = 'sourceManage'
			}
			Ajax.postJSON(`/easy-smart/${ty}/query`, postData).then(res => {
				this.setState({
					imgList:res.data,
					page_img:res.page
				})
			})
		}, 10)
	}
	changeType = type => {
		if(type == 1) return
		this.props.changeType(type)
	}
	save = () => {
		if (this.state.choosed_img) {
			this.props.enter(this.state.choosed_img,this.state.attribute,this.props.index)
			this.addImgVideoModal.hide()
		} else {
			message.info(`你还未选择图片!`)
		}
	}
	save_img = (url,attribute) => {
		this.setState({choosed_img:url,attribute:attribute});
	}
	close = () => {
		this.props.close()
	}
	searchName = e => {
		this.setState({name:e.target.value})
	}
	searchList = () => {
		this.getImgList('name',this.state.name)
	}
	render() {
		let style = {color:'#1890ff'}
		return (
			<div className="outer_v_i">
				<ImgModule save={this.save_img} groupId={this.state.groupId} page_img={this.state.page_img} getImgList={this.getImgList} imgTypes={this.state.imgTypes} imgList={this.state.imgList} />
				<div className="bottom">
					<Button type="primary" onClick={this.save}>确定</Button>
					<Button onClick={this.close}>取消</Button>
				</div> 
				<div className="searchImg">
					<div className="name" style={this.props.type == 1 ? style : {}} onClick={()=>{this.changeType(1)}}>图片素材</div>
					<div className="name" style={this.props.type == 2 ? style : {}} onClick={()=>{this.changeType(2)}}>视频素材</div>
					<Input size="large" placeholder="请输入查询名称" onChange={e=>this.searchName(e)} /><Button type="primary" onClick={this.searchList}>搜索</Button>
				</div>
			</div> 
		)
	}
}
//视频素材
class VideoAndModule extends React.Component {
	state = {
		choosed_img:[],
		videoTypes:[],
		videoList:[],
		page_video:{},
		currentPage:1,
		page:1,
		page_size:14,
		pageSize:14, 
		name:'', 
		groupId:42,
		attribute:''
	} 
	componentDidMount(){
		var getData = {
			type: 2
		} 
		var ty = 'ySourceGroupManage'
		if (getEnv() === 'business') {
			getData.mallId = uif.userInfo.mallMid
			ty = 'sourceGroupManage'
		}
		Ajax.postJSON(`/easy-smart/${ty}/query`, getData).then(res => {
			this.setState({
				videoTypes:res.data
			})
			this.getVideoList('groupId', res.data[0].id)
		})
	}
	
	getVideoList = (str, id) => {
		let currentPage = this.state.currentPage
		if (str == 'page') {
			currentPage = id
			this.setState({ currentPage: id })
		} else if (str == 'groupId') {
			currentPage = 1
			this.setState({ groupId: id, currentPage: 1 })
		}else if(str == 'name'){
			currentPage = 1
			this.setState({ name: id, currentPage: 1 })
		}
		setTimeout(() => {
			let postData = { 
				page:        this.state.page,
				name:        this.state.name,
				currentPage: currentPage,
				pageSize:    this.state.pageSize,
				page_size:   this.state.page_size,
				groupId:     this.state.groupId,
				type:        2
			}
			var ty = 'ySourceManage'
			if (getEnv() === 'business') {
				postData.mallId = uif.userInfo.mallMid
				ty = 'sourceManage'
			}
			Ajax.postJSON(`/easy-smart/${ty}/query`, postData).then(res => {
				this.setState({ 
					videoList:res.data,
					page_video:res.page
				})
			})
		}, 10)
	}
	save = () => {
		if (this.state.choosed_img) {
			this.props.enter(this.state.choosed_img,this.state.attribute,this.props.index)
			this.addImgModal.hide()
		} else {
			message.info(`你还未选择视频!`)
		}
	} 
	changeType = type => {
		if(type == 2) return
		this.props.changeType(type)
	}
	save_img = (url,attribute) => {
		this.setState({choosed_img:url,attribute:attribute});
	}
	close = () => {
		this.props.close()
	}
	searchName = e => {
		this.setState({name:e.target.value})
	}
	searchList = () => {
		this.getVideoList('name',this.state.name)
	}
	render() {
		let { firstAdd,type } = this.props,style = {color:'#1890ff'}
		return (
			
				<div className="outer_v_i">
					<VideoModule page_video={this.state.page_video} save={this.save_img} groupId={this.state.groupId} getVideoList={this.getVideoList} videoTypes={this.state.videoTypes} videoList={this.state.videoList} type={type} />
					<div className="bottom">
						<Button type="primary" onClick={this.save}>确定</Button>
						<Button onClick={this.close}>取消</Button>
					</div>
					<div className="searchImg">
						<div className="name" style={this.props.type == 1 ? style : {}} onClick={()=>{this.changeType(1)}}>图片素材</div>
						<div className="name" style={this.props.type == 2 ? style : {}} onClick={()=>{this.changeType(2)}}>视频素材</div>
						<Input size="large" placeholder="请输入查询名称" onChange={e=>this.searchName(e)} /><Button type="primary" onClick={this.searchList}>搜索</Button>
					</div>
				</div>
		)  
	}
}
//图片列表
class ImgModule extends React.Component {
	state = {
		imgTypes: [],
		imgList:  [],
		loading:  false,
		current:  1,
		groupId:  this.props.groupId
	}

	componentWillReceiveProps(props){
		let img_list = props.imgList;
		let imgTypes = props.imgTypes;
		this.setState({
			imgList:img_list,
			imgTypes:imgTypes
		})
	}
	chooseType(str, id) {
		let current = 1
		if (str === 'groupId') {
			this.setState({ current: 1, groupId: id })
		} else if (str === 'page') {
			this.setState({ current: id })
		}
		this.props.getImgList(str, id)
	}
	chooseImg(img,attribute) {
		let img_list = this.state.imgList
		img_list = img_list.map(item=>{
			item.id === img ? item.isClicked = !item.isClicked : item.isClicked = false
			return item
		})
		this.setState({
			imgList:img_list
		})
		let choosed_img = img_list.filter(item => item.isClicked == true);
		this.props.save(choosed_img,attribute)
	};
	customRequest = info => {
		const that = this
		this.setState({loading:true})
		let id = window.uif.userInfo.id || '1'
		let paramsData = {
			userId:id,
			mallId:'',
			imageSourceType:'OPERATION'
		} 
		paramsData.imageName = info.file.name.split(".")[0];
		if (getEnv() === 'business') {
			paramsData.imageSourceType = 'BUSINESS'
			paramsData.mallId = uif.userInfo.mallMid
		}
		var reader = new FileReader()
			reader.onload = (function (file) {
				return function (e) {
					console.info(this.result) //这个就是base64的数据了
					const img = this.result
					const postData = {...paramsData,imageBase64:img}
					Ajax.postJSONIMG('/mcp-gateway/utility/uploadImage',postData).then(res=>{
						message.info('上传成功!')
						that.setState({loading:false})
						that.props.getImgList()
					})
				}
			})(info.file)
			reader.readAsDataURL(info.file)
	}
	
	render() {
		let id = window.uif.userInfo.id || '1'
		const { page_img } = this.props
		return (
			<div className="content">
				<div className="left">
					{
						this.state.imgTypes.map((item,index) => <Type groupId={this.state.groupId} key={index} item={item} choose_one={this.chooseType.bind(this)}></Type>)
					}
				</div>
				<div className="right">
					<div>
						<Upload
							name= 'avatar'
							className="avatar-uploader"
							listType="picture-card"
							showUploadList={false}
							customRequest={this.customRequest}
						>
						<div>
							<Icon type={this.state.loading ? 'loading' : 'plus'} />
							<div className="ant-upload-text">上传图片</div>
						</div>
						</Upload>
					</div>
					{
						this.state.imgList.map((item,index) => <List key={index} item={item} type={this.props.type} choose_one={this.chooseImg.bind(this)}></List> )
					}
					<Pagination
						className="Pagination"
						defaultCurrent={1}
						current={this.state.current}
						total={page_img.totalCount}
						pageSize={page_img.pageSize}
						onChange={page=>{this.chooseType('page',page)}}
						/>
				</div>
			</div>
		)
	}
}
//视频列表
class VideoModule extends React.Component {
	state = {
		videoTypes: [],
		videoList:  [],
		current:    1,
		groupId:    this.props.groupId
	}
	
	componentWillReceiveProps(props){
		let videoList = props.videoList;
		let videoTypes = props.videoTypes;
		 this.setState({
			videoList:videoList,
			videoTypes:videoTypes
		})
	}
	chooseType(str, id) {
		let current = 1
		if (str === 'groupId') {
			this.setState({ current: 1, groupId: id })
		} else if (str === 'page') {
			this.setState({ current: id })
		}
		this.props.getVideoList(str, id)
	}
	chooseVideo = (id,attribute) => { 
		let videoList = this.state.videoList
		videoList = videoList.map(item=>{
			item.id == id ? item.isClicked = !item.isClicked : item.isClicked = false;
			return item
		});
		this.setState({
				videoList:videoList
			})
		let choosed_video = videoList.filter(item => item.isClicked == true);
		this.props.save(choosed_video,attribute)
	}
	
	render() {
		const { page_video } = this.props;
		return (
			<div className="content">
				<div className="left">
					{
						this.state.videoTypes.map((item,index) => <Type groupId={this.state.groupId} key={index} item={item} choose_one={this.chooseType.bind(this)}></Type>)
					} 
				</div> 
				<div className="right">
					{ 
						this.state.videoList.map((item,index) => <List key={index} item={item} choose_one={this.chooseVideo}></List> )
					}
					<Pagination 
						className="Pagination" 
						defaultCurrent={1}
						current={this.state.current} 
						total={page_video.totalCount} 
						pageSize={page_video.pageSize}
						onChange={page=>{this.chooseType('page',page)}}  
						/> 
				</div>  
			</div>
		)
	}
}

//种类
function Type({item, choose_one, groupId}) {
	return (
		<div className={item.id === groupId? 's-active': ''} onClick={()=>{choose_one('groupId', item.id)}}>{item.name}</div>
	)
}
//图片
function List({ item,choose_one }) {
	return  (
			<div onClick={()=>{choose_one(item.id,item.attribute)}} className={item.isClicked?'choosed':''}>
				<div className={item.isClicked?'icon_img':''}>
					<div className="right-symbol"></div>
				</div>
				<img src={item.preview || item.url} />
				<div className="showName">{item.name}</div>
				<div className="showSize">{item.attribute}</div>
			</div>
		)
}
