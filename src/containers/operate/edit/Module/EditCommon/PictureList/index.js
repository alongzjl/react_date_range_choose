/**
 * @Author: Along
 * @Date:   2018-05-02

 */


import React from 'react';
import SkyLight from 'react-skylight';
import './index.less'
import { Button, Upload, message,Modal,Pagination,Icon } from 'antd'
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
		// this.getImgList()
	}
	state = {
		choosed_img:[],
		imgTypes: [],
		imgList:  [],
		page_img: {},
		currentPage: 1,
		page:1,
		page_size:14,
		pageSize:14,
		name:'', 
		groupId: 39
	}
	componentDidMount(){}

	getImgList = (str, id) => {
		let currentPage = this.state.currentPage
		if (str == 'page') {
			this.setState({ currentPage: id })
		} else if (str == 'groupId') {
			currentPage = 1
			this.setState({ groupId: id, currentPage: 1 })
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
			Ajax.postJSON(`/easy-smart/${ty}/query`,postData).then(res => {
				this.setState({
					imgList:res.data,
					page_img:res.page
					// imgList: [
					// 	{
					// 		id: 1,
					// 		url: 'http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041097.png'
					// 	},
					// 	{
					// 		id: 2,
					// 		url: 'http://rongyi.b0.upaiyun.com/system/smartService/null/201801180034041093.png'
					// 	},
					// 	{
					// 		id: 3,
					// 		url: 'http://rongyi.b0.upaiyun.com/commodity/text/201805191205157047.png'
					// 	}
					// ],
					// page_img: {
					// 	currentPage: 1,
					// 	totalPage: 2,
					// 	pageSize: 10
					// }
				})
			})
		}, 10)
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
		return (
			<div>
				<SkyLight
					dialogStyles={{ ...commonCss.dialogStyles, paddingBottom: '40px' }}
					titleStyle={commonCss.titleStyle}
					closeButtonStyle={commonCss.closeButtonStyle}
					hideOnOverlayClicked
					ref={com => { this.addImgModal = com }}
					title={'图片素材'}
				>
				<div className="outer">
					<ImgModule save={this.save_img} groupId={this.state.groupId} page_img={this.state.page_img} getImgList={this.getImgList} imgTypes={this.state.imgTypes} imgList={this.state.imgList} />
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
		imgList:[],
		loading:false,
		current:1,
		groupId: this.props.groupId
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
	chooseImg(img) {
		let img_list = this.state.imgList
		img_list = img_list.map(item=>{
			item.id === img ? item.isClicked = !item.isClicked : item.isClicked = false
			return item
		})
		this.setState({
			imgList:img_list
		})
		let choosed_img = img_list.filter(item => item.isClicked == true);
		this.props.save(choosed_img)
	};
	customRequest = info => {
		const that = this
		this.setState({loading:true})
		let id = window.uif.userInfo.id || '1'
		const paramsData = {
			userId:id,
			mallId:'',
			imageName:'along',
			imageSourceType:'OPERATION'
		}
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

function Type({item, choose_one, groupId}) {
	return (
		<div className={item.id === groupId? 's-active': ''} onClick={()=>{choose_one('groupId', item.id)}}>{item.name}</div>
	)
}

function List({item,choose_one}){
	return (
		<div onClick={()=>{choose_one(item.id)}} className={item.isClicked?'choosed':''}>
			<div className={item.isClicked?'icon_img':''}>
				<div className="right-symbol"></div>
			</div>
			<img src={item.url} />
		</div>
	)
}