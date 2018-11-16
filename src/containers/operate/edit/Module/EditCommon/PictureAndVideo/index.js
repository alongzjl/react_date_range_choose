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
		display:'none' 
	}
}


export default class PictureAndVideo extends React.Component {
	show() {
		this.addImgVideoModal.show()
	} 
	hide() {
		this.addImgVideoModal.hide()
	}  
	state = {
		type:1,
		list:[],
		groupIdImg:'',
		groupIdVideo:'',
		types:[],
		currentPageImg:1,
		currentPageVideo:1,
		have:true
	}
	componentDidMount(){
		this.getTypes(1,id=>{
			this.setState({groupIdImg:id})
		})
	} 
	componentWillReceiveProps(props){
		if(!props.init){
			 this.timer = setTimeout(()=>{
			 	this.state.have ? this.setState({
					type:1,
					list:[],
					groupIdImg:'',
					groupIdVideo:'',
					types:[],
					currentPageImg:1,
					currentPageVideo:1
				},()=>{
					this.getTypes(1,id=>{
						this.setState({groupIdImg:id})
					})
				}) : null
			},500)  
		} 
	} 
	componentWillUnmount(){
		this.state.have = false
		clearTimeout(this.timer)
	}  
	 shouldComponentUpdate(newProps, newState) {
	 	  return newProps.init ? newProps.init : false;
	  }   
	getTypes = (type,fn) => {
		var getData = {
			type: type
		}
		var ty = 'ySourceGroupManage'
		if (getEnv() === 'business') {
			getData.mallId = uif.userInfo.mallMid
			ty = 'sourceGroupManage'
		}
		Ajax.postJSON(`/easy-smart/${ty}/query`, getData).then(res => {
			this.setState({ 
				types: res.data
			},()=>{fn&&fn(res.data[0].id)})
		})
	}  
	close = () => {
		this.props.initFn()
		this.addImgVideoModal.hide()
	}
	onOverlayClicked = () => {
		this.props.initFn()
	}  
	saveGroupId = (str,id) => {
		if(this.state.type == 1){
			if (str == 'page') {
				this.setState({ currentPageImg: id })
			} else if (str == 'groupId') {
				this.setState({ groupIdImg: id})
			}else if(str == 'name'){
				this.setState({ currentPageImg: 1 })
			}
		}else{
			if (str == 'page') {
				this.setState({ currentPageVideo: id })
			} else if (str == 'groupId') {
				this.setState({ groupIdVideo: id})
			}else if(str == 'name'){
				this.setState({ currentPageVideo: 1 })
			}
		}
	}
	changeType = type => {
		this.setState({type:type})
		this.getTypes(type,id=>{
			if(type == 1){
				!this.state.groupIdImg ? this.setState({groupIdImg:id}) : null
			}else{
				!this.state.groupIdVideo ? this.setState({groupIdVideo:id}) : null
			}
		})
	} 
	choosedMap = (list,id,type) => {
		if(this.props.index){
			this.setState({list:list,groupIdVideo:id})
			return
		}
		let oList = this.state.list
		if(type == 1){
			if(list[0].isClicked){
				oList.push(list[0])
			}else{
				oList = oList.filter(_=>_.id != list[0].id)
			}
			this.setState({list:oList,groupIdImg:id})
		}else{
			if(list[0].isClicked){
				oList.push(list[0])
			}else{
				oList = oList.filter(_=>_.id != list[0].id)
			}
			this.setState({list:oList,groupIdVideo:id})
		}
	}
	enter = () => { 
		this.props.initFn()
		if(this.state.list.length == 0) return
		this.props.enter(this.state.list,this.props.index)
	} 
	render() {
		return (
			<div>
				<SkyLight
					dialogStyles={{ ...commonCss.dialogStyles, paddingBottom: '40px' }}
					titleStyle={commonCss.titleStyle}
					closeButtonStyle={commonCss.closeButtonStyle}
					hideOnOverlayClicked
					onOverlayClicked={this.onOverlayClicked}
					ref={com => { this.addImgVideoModal = com }}
					title={''} 
				>
				<div className="outer">
					{
						this.state.type == 1 ? <ImgAndModule 
												changeType={this.changeType} 
												close={this.close} 
												type={this.state.type}
												choosedMap={this.choosedMap}
												groupId={this.state.groupIdImg}
												types={this.state.types}
												saveGroupId={this.saveGroupId}
												currentPage={this.state.currentPageImg}
												list={this.state.list}
												enter={this.enter}
												init={this.props.init}
												index={this.props.index}
											/> : 
											<VideoAndModule 
												changeType={this.changeType} 
												close={this.close} 
												type={this.state.type}
												choosedMap={this.choosedMap}
												groupId={this.state.groupIdVideo}
												types={this.state.types}
												saveGroupId={this.saveGroupId}
												currentPage={this.state.currentPageVideo}
												list={this.state.list}
												enter={this.enter}
												init={this.props.init}
												index={this.props.index}   
											/>
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
		imgList:  [],
		page_img: {},
		attribute:'',
		currentPage:this.props.currentPage,
		page:1,
		page_size:14,
		pageSize:14,
		name:'', 
		groupId: this.props.groupId,
		have:true
	} 
	componentWillMount(){
		this.getImgList('groupId', this.props.groupId,'init')
	}  
	componentWillReceiveProps(props){
		if(!props.init){
			this.timer = setTimeout(()=>{
				let imgList = this.state.imgList
				imgList = imgList.map(_=>{
					_.isClicked = false
					return _
				}) 
				this.state.have ? this.setState({
					imgList:imgList,
					groupId:props.groupId,
					currentPage:props.currentPage
				},()=>{
					this.getImgList('groupId', props.groupId,'init')
				}) : null 
			},500)
		} 
	} 
	componentWillUnmount(){
		this.state.have = false
		clearTimeout(this.timer)
	}  
	getImgList = (str, id,init) => {
		let currentPage = this.props.currentPage
		if (str == 'page') {
			currentPage = id
			this.setState({ currentPage: id })
		} else if (str == 'groupId') {
			init ? this.setState({ groupId: id,currentPage:currentPage}) : (currentPage = 1,this.setState({ groupId: id,currentPage: 1}))
		}else if(str == 'name'){
			currentPage = 1 
			this.setState({ name: id, currentPage: 1 })
		}
		!init ? this.props.saveGroupId(str, id) : null
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
		this.props.enter()	
	}
	save_img = choosed_img => {
		this.props.choosedMap(choosed_img,this.state.groupId,this.props.type)
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
				<ImgModule 
					save={this.save_img} 
					groupId={this.state.groupId} 
					page_img={this.state.page_img} 
					getImgList={this.getImgList} 
					imgTypes={this.props.types} 
					imgList={this.state.imgList}
					currentPage={this.state.currentPage}
					list={this.props.list}
					index={this.props.index} 
				/>
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
		videoList:[],
		page_video:{},
		currentPage:this.props.currentPage,
		page:1,
		page_size:14,
		pageSize:14, 
		name:'', 
		groupId:this.props.groupId,
		attribute:''
	} 
	componentWillMount(){
		this.getVideoList('groupId',this.props.groupId,'init')
	}
	/*componentWillReceiveProps(props){
		this.getVideoList('groupId', props.groupId,'init')
	}*/ 
	getVideoList = (str, id,init) => {
		let currentPage = this.props.currentPage
		if (str == 'page') {
			currentPage = id
			this.setState({ currentPage: id })
		} else if (str == 'groupId') {
			init ? this.setState({ groupId: id,currentPage:currentPage}) : (currentPage = 1,this.setState({ groupId: id,currentPage: 1}))
		}else if(str == 'name'){
			currentPage = 1
			this.setState({ name: id, currentPage: 1 })
		}
		 !init ? this.props.saveGroupId(str, id) : null
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
		this.props.enter()	
	} 
	changeType = type => {
		if(type == 2) return
		this.props.changeType(type)
	}
	save_img = choosed_img => {
		this.props.choosedMap(choosed_img,this.state.groupId,this.props.type)
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
					<VideoModule 
						page_video={this.state.page_video} 
						save={this.save_img} 
						groupId={this.state.groupId} 
						getVideoList={this.getVideoList} 
						videoTypes={this.props.types} 
						videoList={this.state.videoList} 
						type={type}
						currentPage={this.state.currentPage}
						list={this.props.list}
						index={this.props.index} 
					/>
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
		groupId:  this.props.groupId,
		current:this.props.currentPage
	}

	componentWillReceiveProps(props){
		let list = props.list;
		list = list.filter(_=>_.type == 1)
		let img_list = props.imgList;
		let imgTypes = props.imgTypes;
		img_list = img_list.map(_=>{
			for(let i=0;i<list.length;i++){
				if(list[i].id == _.id){
					_.isClicked = true
					break;
				}
			}
			return _
		})
		this.setState({
			imgList:img_list,
			imgTypes:imgTypes,
			current:props.currentPage,
			groupId:props.groupId
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
	chooseImg(img) {
		let index = this.props.index
		let img_list = this.state.imgList
		img_list = img_list.map(item=>{
			if(index){
				item.id === img ? item.isClicked = !item.isClicked : item.isClicked = false
			}else{
				item.id === img ? item.isClicked = !item.isClicked : null
			}
			return item
		}) 
		this.setState({
			imgList:img_list
		})
		let choosed_img = index ? img_list.filter(item => item.isClicked) : img_list.filter(item => item.id === img);
		this.props.save(choosed_img)
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
	beforeUpload = file => {
		let imgType = false;
		if(file.type.indexOf('image/png') > -1 || file.type.indexOf('image/jpg')>-1 || file.type.indexOf('image/svg')>-1 || file.type.indexOf('image/jpeg')>-1){
			imgType = true
		}
	  if (!imgType) {
	   message.info('请上传png、jpg、svg格式图片!')
	  }
	  return imgType;
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
							beforeUpload={this.beforeUpload}
							accept="image/*"
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
		current:    this.props.currentPage,
		groupId:    this.props.groupId
	}
	
	componentWillReceiveProps(props){
		let list = props.list;
		list = list.filter(_=>_.type == 2)
		let videoList = props.videoList;
		let videoTypes = props.videoTypes;
		videoList = videoList.map(_=>{
			for(let i=0;i<list.length;i++){
				if(list[i].id == _.id){
					_.isClicked = true
					break;
				}
			} 
			!_.preview ? _.preview = 'http://rongyi.b0.upaiyun.com/commodity/text/201811081000076071.png' : null
			return _
		}) 
		this.setState({
			videoList:videoList,
			videoTypes:videoTypes,
			currentPage:props.currentPage
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
	chooseVideo = id => { 
		let index = this.props.index
		let videoList = this.state.videoList
		videoList = videoList.map(item=>{
			if(index){
				item.id == id ? item.isClicked = !item.isClicked : item.isClicked = false;
			}else{
				item.id == id ? item.isClicked = !item.isClicked : null;
			}
			return item
		});  
		this.setState({
				videoList:videoList
			}) 
		let choosed_video = index ? videoList.filter(item => item.isClicked) : videoList.filter(item => item.id == id); 
		this.props.save(choosed_video) 
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
			<div onClick={()=>{choose_one(item.id)}} className={item.isClicked?'choosed':''}>
				<div className={item.isClicked?'icon_img':''}>
					<div className="right-symbol"></div>
				</div>
				<img src={item.preview || item.url} />
				<div className="showName">{item.name}</div>
				<div className="showSize">{item.attribute}</div>
			</div>
		)
}
