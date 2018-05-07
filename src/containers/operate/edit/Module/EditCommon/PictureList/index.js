/**
 * @Author: Along
 * @Date:   2018-05-02

 */


import React from 'react';
import SkyLight from 'react-skylight';
import Fetch from "../../../../../../public/Fetch"
import './index.less'
import { Button, Upload, message } from 'antd'
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
		top: '0'
	}
}


export default class PictureList extends React.Component {
	show() {
		this.addImgModal.show()
	}
	state = {
		title_clicked:1,
		choosed_img:[]
	}
	cancelClick = () => {
		this.addImgModal.hide()
	}
	chooseType = type => {
		const number = type == 1 ? 1 : 2;
		this.setState({title_clicked:number});
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
		let { firstAdd } = this.props
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
							<li onClick={()=>this.chooseType(1)} className={this.state.title_clicked==1?'active':''}>图片</li>
							<li onClick={()=>this.chooseType(2)} className={this.state.title_clicked==2?'active':''}>视频</li>
						</ul>
						<div className="input_search"><input placeholder="搜索" /></div>
						<div className="search">搜索</div>
					</div>
					{
						this.state.title_clicked==1 ? <ImgModule save={this.save_img} firstAdd={firstAdd} /> : <AudioModule />
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
		typeList:[
			{id:1,name:'along1',sourceNum:15},
			{id:1,name:'along2',sourceNum:153},
			{id:1,name:'along3',sourceNum:15},
			{id:1,name:'along4',sourceNum:151},
			{id:1,name:'along5',sourceNum:15}
		],
		imgList:[
			{id:1,url:"http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png"},
			{id:2,url:"http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png"},
			{id:12,url:"http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png"},
			{id:109,url:"http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png"},
			{id:154,url:"http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png"},
			{id:122,url:"http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png"},
			{id:145,url:"http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png"},
			{id:178,url:"http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png"},
			{id:111,url:"http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png"},
			{id:124,url:"http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png"}
		]
	}
	componentDidMount(){
		let img_list = this.state.imgList;
		img_list = img_list.map(item=>{
			item.isClicked = false;
			return item
		});
		 this.setState({
				imgList:img_list
			})
	}
	chooseType(id) {

	}
	chooseImg(img) {
		let firstAdd = this.props.firstAdd
		let img_list = this.state.imgList
		if(firstAdd){
			img_list = img_list.map(item=>{
				item.id == img ? item.isClicked = !item.isClicked : null;
				return item
			});
		}else{
			img_list = img_list.map(item=>{
				item.id == img ? item.isClicked = !item.isClicked : item.isClicked = false;
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
	getTypes() {
		const UrlType = 'http://manage.preview.rongyi.com/easy-smart/ySourceGroupManage/query';
		Fetch.postJSON(UrlType,{type:1}).then(data=>{
			this.setState({
				typeList:data.result.data || []
			})
		})
	}
	getList() {
		const UrlList = "/chaoyue/imagesList";
		const params = {currentPage:1,groupId:12,name:'',page:1,page_size:14,type:1};
		Fetch.postJSON(UrlList,params).then(data=>{
			this.setState({
				imgList:data.result.data || []
			})
		})
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
			}
		}
		return (
			<div className="content">
				<div className="left">
					{
						this.state.typeList.map((item,index) => <Type key={index} item={item} choose_one={this.chooseType}></Type>)
					}
				</div>
				<div className="right">
					<Upload {...Upload_props}>
						<div className="add_img"><div className="add_text">+</div><div>上传素材</div></div>
					</Upload>
					{
						this.state.imgList.map((item,index) => <List key={index} item={item} choose_one={this.chooseImg}></List> )
					}
				</div>
			</div>
		)
	}
}

class AudioModule extends React.Component {
	render() {
		return (
			<div>
				暂未开放，敬请期待！
			</div>
		)
	}
}

function Type({item,choose_one}){
	return (
		<div onClick={()=>{choose_one(item.id)}}>{item.name}</div>
	)
}

function List({item,choose_one}){
	return (
		<div onClick={()=>{choose_one(item.id)}} className={item.isClicked?'choosed':''}>
			<div className={item.isClicked?'icon':''}>
				<div className="right-symbol"></div>
			</div>
			<img src={item.url} />
		</div>
	)
}