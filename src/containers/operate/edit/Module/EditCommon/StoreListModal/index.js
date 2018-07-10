import React from 'react'
import './index.less'
import { Col, Row, Button, Modal, Input, Table } from 'antd'

const columns = [
	{
		title: '店铺名称',
		dataIndex: 'name',
	}
]

class StoreListModal extends React.Component {
	constructor(props) {
		super(props)
		this.rowSelection = {
			type: 'radio',
			selectedRowKeys: [],
			onChange: this.onSelect
		}
		this.state = {
			visible: false,
			shopName: '',
			row: null,
			list: [],
			pagination: {
				showQuickJumper: true,
				total: 0,
				current: 1,
				pageSize: 10
			}
		}
	}
	componentDidMount() {}
	componentWillReceiveProps() {
		this.rowSelection.selectedRowKeys = []
		this.setState({
			visible: false,
			shopName: '',
			row: null,
			list: [],
			pagination: {
				showQuickJumper: true,
				total: 0,
				current: 1,
				pageSize: 10
			}
		})
	}

	onChange = p => {
		let { current } = p
		this.getList({ pageNo: current })
	}
	onSelect = p => {
		let { list } = this.state
		this.setState({ row: list[p[0]] })
		this.rowSelection.selectedRowKeys = p
	}
	getList = (cfg) => {
		let { mallMid }  = window.uif.userInfo
		let { id, name } = this.props
		let { shopName, pagination } = this.state
		let { current, pageSize } = pagination
		let postData = {
			mallId: mallMid,
			shopName,
			pageNo: current,
			pageSize,
			...cfg
		}
		this.rowSelection.selectedRowKeys = []
		Ajax.post(`/mcp-gateway/mall/getShopList`, postData).then(res => {
			let { data, page } = res,
				{ list } = data,
				{ totalCount, currentPage } = page
			list.map((_, i) => {
				if (_.id === id) this.rowSelection.selectedRowKeys = [i]
			})
			this.setState({
				list: list,
				pagination: {
					showQuickJumper: true,
					total:    totalCount,
					current:  currentPage,
					pageSize: 10
				}
			})
		})
	}
	showModal = () => {
		this.getList()
		this.setState({ visible: true })
	}
	handleSearch = () => {
		let { shopName } = this.state
		this.getList({ shopName, pageNo: 1 })
	}
	handleCancel = () => {
		this.setState({
			visible: false,
			row:  null,
			shopName: ''
		})
		this.rowSelection.selectedRowKeys = []
	}
	handleOk = () => {
		let { param, onOk } = this.props
		let { row } = this.state
		onOk(row, param)
		this.handleCancel()
	}
	render() {
		let { id, name } = this.props
		let { visible, list, pagination, shopName } = this.state
		return (
			<div className="store-list-modal">
				<Row>
					<Col span={6}>
						<a onClick={this.showModal}>选择</a>
					</Col>
					<Col span={18}>
						{ id && name? name: null }
					</Col>
				</Row>
				<Modal
					visible={visible}
					title="请选择关联店铺"
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
							<Input value={shopName} onChange={e => this.setState({ shopName: e.target.value })} />
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
						onChange={this.onChange}
						columns={columns}
						dataSource={list}
					/>
				</Modal>
			</div>
		)
	}
}

export default StoreListModal