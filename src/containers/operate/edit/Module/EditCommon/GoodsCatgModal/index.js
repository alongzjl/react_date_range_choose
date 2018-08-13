import React from 'react'
import './index.less'
import { Col, Row, Collapse, Button, Icon, Input, message, Modal, Table } from 'antd'
const { TextArea } = Input
const { Panel } = Collapse

import ImageUpload from 'compEdit/EditCommon/ImageUpload'

const columns = [
	{
		title: '商品分类名称',
		dataIndex: 'name'
	}
]
const listMax = 20

export default class GoodsCatgModal extends React.Component {
	constructor(props) {
		super(props)
		var { rel } = props.content
		this.rowSelection = {
			type: 'radio',
			selectedRowKeys: [],
			onChange: this.onSelect
		}
		this.state = {
			visible: false,
			name: '',
			id:   rel,
			list: [],
			pagination: {
				showQuickJumper: true,
				total:    0,
				current:  1,
				pageSize: 10
			}
		}
	}

	componentWillReceiveProps(props) {}
	componentWillMount() {}
	componentDidMount() {}
	componentWillUnmount() {}

	onSelect = idxs => {
		let { list } = this.state,
			rows = list[idxs[0]]
		this.setState({ id: rows.id })
		this.rowSelection.selectedRowKeys = idxs
	}
	showModal = e => {
		this.getList()
		this.setState({ visible: true })
	}
	handleSearch = () => {
		let { name } = this.state
		this.getList({ name, pageNo: 1 })
	}
	handleCancel = () => {
		var { rel } = this.props.content
		this.setState({
			visible: false,
			id:   rel,
			name: ''
		})
		this.rowSelection.selectedRowKeys = []
	}
	handleOk = () => {
		let { content, updateComp } = this.props,
			state  = this.state,
			{ id, idx } = state
		content.rel = id
		this.handleCancel()
		updateComp()
	}
	getList = cfg => {
		let { mallMid }  = window.uif.userInfo
		let { name, pagination, id } = this.state
		let { current, pageSize } = pagination
		let postData = {
			mallId: mallMid,
			name,
			pageNo: current,
			pageSize,
			...cfg
		}
		let li = mock.list.goodsCatg(10)
		this.rowSelection.selectedRowKeys = []
		this.setState({
			list: li,
			pagination: {
				showQuickJumper: true,
				total:    10,
				current:  1,
				pageSize: 10
			}
		})
		li.map((_, i) => {
			if (id === _.id) this.rowSelection.selectedRowKeys.push(i)
		})

		// Ajax.post(`/mcp-gateway/mall/getShopList`, postData).then(res => {
		// 	let { data, page } = res,
		// 		{ list } = data,
		// 		{ totalCount, currentPage } = page
		// 	list.map((_, i) => {
		// 		if (_.id === id) this.rowSelection.selectedRowKeys = [i]
		// 	})
		// 	this.setState({
		// 		list: list,
		// 		pagination: {
		// 			showQuickJumper: true,
		// 			total:    totalCount,
		// 			current:  currentPage,
		// 			pageSize: 10
		// 		}
		// 	})
		// })
	}
	itemRemove = idx => {
		var { list, updateComp } = this.props
		list.splice(idx, 1)
		updateComp()
	}
	imgUpload = (imgs, obj) => {
		obj.pics = imgs.join(',')
		this.props.updateComp()
	}
	modal = e => {
		let { visible, list, pagination, name } = this.state
		return (
			<Modal
				visible={visible}
				title="请选择关联商品分类"
				width={`60%`}
				onOk={this.handleOk}
				onCancel={this.handleCancel}
				footer={[
					<Button key="back" onClick={this.handleCancel}>取消</Button>,
					<Button key="submit" type="primary" onClick={this.handleOk}>确定</Button>
				]}
			>
				<Row>
					<Col span={4} style={{ lineHeight: '32px' }}>
						店铺名
					</Col>
					<Col span={15}>
						<Input value={name} onChange={e => this.setState({ name: e.target.value })} />
					</Col>
					<Col span={4} offset={1}>
						<Button key="search" type="primary" onClick={this.handleSearch}>查询</Button>
					</Col>
				</Row>
				<Table
					style={{ marginTop: 10 }}
					rowKey={(_, i) => i}
					size={'small'}
					rowSelection={this.rowSelection}
					pagination={pagination}
					columns={columns}
					dataSource={list}
				/>
			</Modal>
		)
	}

	render() {
		return (
			<div className="goods-list-modal">
				<Collapse defaultActiveKey={['0']}>
					<Panel header={`关联分类`} key={0}>
						<a className="btn-edit-layout" onClick={this.showModal}>关联</a>
					</Panel>
				</Collapse>
				{ this.modal() }
			</div>
		)
	}
}
