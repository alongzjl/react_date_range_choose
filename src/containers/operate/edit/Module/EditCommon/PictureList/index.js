/**
 * @Author: Along
 * @Date:   2018-05-02

 */


import React from 'react';
import SkyLight from 'react-skylight';
import './index.less'
import { Button, Upload, message,Modal,Pagination } from 'antd'
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
		Ajax.postJSON('/easy-smart/ySourceGroupManage/query',{type:1}).then(res => {
			this.setState({ 
				imgTypes:res.data
			})
		})
		this.getImgList()
	}
	state = {
		choosed_img:[],
		imgTypes:[],
		imgList:[],
		page_img:{},
		currentPage:1,
		page:1,
		page_size:10,
		pageSize:10,
		name:'',
		groupId:39
	} 
	componentDidMount(){}
	 
	getImgList = (str,id) => {
		if(str == 'page'){
			this.setState({
				page:id
			}) 
		}else if(str == 'groupId'){
			this.setState({
				groupId:id
			}) 
		}     
		setTimeout(()=>{
			let postData = { 
				page:this.state.page,
				name:this.state.name,
				currentPage:this.state.currentPage,
				pageSize:this.state.pageSize,
				page_size:this.state.page_size,
				groupId:this.state.groupId,
				type:1
			};
			Ajax.postJSON('/easy-smart/ySourceManage/query',postData).then(res => {
				this.setState({ 
					imgList:res.data,
					page_img:res.page 
				})  
			})   
		},10) 
	};   
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
							<li className='active'>图片</li>
						</ul>
						<div className="input_search"><input placeholder="搜索" /></div>
						<div className="search" onClick={this.getList}>搜索</div>
					</div>
					<ImgModule save={this.save_img} page_img={this.state.page_img} getImgList={this.getImgList} firstAdd={firstAdd} imgTypes={this.state.imgTypes} imgList={this.state.imgList} />
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
	chooseType(str,id) {
		this.props.getImgList(str,id);
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
			action: '/mcp-gateway/utility/uploadImage ',
			data: {
				mallId:123,
				name:'along' 
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
			 	debugger; 
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
		const { page_img } = this.props;
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
					<Pagination className="Pagination" onChange={page=>{this.chooseType('page',page)}} defaultCurrent={page_img.currentPage} total={page_img.totalPage} pageSize={page_img.pageSize} />
				</div>
			</div> 
		)
	}
}

function Type({item,choose_one}){
	return (
		<div onClick={()=>{choose_one('groupId',item.id)}}>{item.name}</div> 
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