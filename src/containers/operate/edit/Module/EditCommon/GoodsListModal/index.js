import React from 'react'
import './index.less'
import { Col, Row, Collapse, Button, Icon, Input, message, Modal, Table } from 'antd'
const { TextArea } = Input
const { Panel } = Collapse

const columns = [
	{
		title: '商品名称',
		dataIndex: 'name'
	}
]
const listMax = 20

export default class GoodsListModal extends React.Component {
	constructor(props) {
		super(props)
		this.rowSelection = {
			type: 'checkbox',
			selectedRowKeys: [],
			onChange: this.onSelect
		}
		this.state = {
			visible: false,
			goodsName: '',
			row:  [],
			list: [],
			listMap: this.listMap(props),
			pagination: {
				showQuickJumper: true,
				total:    0,
				current:  1,
				pageSize: 10
			}
		}
	}

	componentWillReceiveProps(props) {
		this.setState({
			listMap: this.listMap(props)
		})
	}

	componentWillMount() {}
	componentDidMount() {}
	componentWillUnmount() {}

	listMap = props => {
		var { list } = props,
			obj = {}
		list.map(_ => obj[_.id] = 1)
		return obj
	}
	onSelect = idxs => {
		let { list } = this.state,
			rows = []
		idxs.map(_ => {
			rows.push(list[_])
		})
		this.setState({ row: rows })
		this.rowSelection.selectedRowKeys = idxs
	}
	showModal = () => {
		this.getList()
		this.setState({ visible: true })
	}
	handleSearch = () => {
		let { goodsName } = this.state
		this.getList({ goodsName, pageNo: 1 })
	}
	handleCancel = () => {
		this.setState({
			visible: false,
			row:     [],
			goodsName: ''
		})
		this.rowSelection.selectedRowKeys = []
	}
	handleOk = () => {
		let { list, onChange } = this.props,
			state  = this.state,
			{ listMap } = state,
			listCa = state.row,
			len    = list.length,
			lenCa  = listCa.length,
			lenSum = len + lenCa,
			desc   = ''
		if (lenSum > listMax) return message.warning('商品数已大于 ${listMax} 的上限!')
		listCa.map(_ => {
			var { id, name, pics } = _
			if (listMap[id]) return
			// list.push({ id, name, pics, desc })
			list.push({ ..._, desc })
		})
		this.handleCancel()
		this.setState({ listMap: this.listMap(this.props) })
		onChange(list)
	}
	getList = cfg => {
		let { mallMid }  = window.uif.userInfo
		let { goodsName, pagination, listMap } = this.state
		let { current, pageSize } = pagination
		let postData = {
			mallId: mallMid,
			goodsName,
			pageNo: current,
			pageSize,
			...cfg
		}
		let li = mock.list.goods(10)
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
			if (listMap[_.id]) this.rowSelection.selectedRowKeys.push(i)
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
		var { list, onChange } = this.props
		onChange(list.removeByIdx(idx))
	}
	renderList = e => {
		var { list, onChange } = this.props
		return list.map((_, i) => {
			var { name, desc } = _
			return (
				<div className="pgs-row" key={i}>
					<div className="pgsr-name">商品{i + 1}</div>
					<div className="pgsr-ctrl">
						<Row>
							<Col span={21}>
								<Row>
									<div title={name} className="txt-overflow">{ name }</div>
								</Row>
								<Row>
									<TextArea
										min={0} max={100}
										placeholder={'商品描述'}
										autosize={false}
										value={desc} onChange={v => {
											_.desc = v.target.value; onChange(list)
										}}
										style={{ width: '100%' }}
									/>
								</Row>
							</Col>
							<Col span={1}></Col>
							<Col span={2}>
								<span onClick={e => this.itemRemove(i)}><Icon type="close" /></span>
							</Col>
						</Row>
					</div>
				</div>
			)
		})
	}
	modal = e => {
		let { visible, list, pagination, goodsName } = this.state
		return (
			<Modal
				visible={visible}
				title="请选择关联店铺"
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
						<Input value={goodsName} onChange={e => this.setState({ goodsName: e.target.value })} />
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
		)
	}

	render() {
		let { list } = this.props
		return (
			<div className="goods-list-modal">
				<Collapse defaultActiveKey={['0', '1']}>
					<Panel header={`添加商品`} key={0}>
						<a className="btn-edit-layout" onClick={this.showModal}>+ 添加</a>
					</Panel>
					{
						list.length
						?
						<Panel header={`推荐商品`} key={1}>
							{ this.renderList() }
						</Panel>
						: null
					}
				</Collapse>
				{ this.modal() }
			</div>
		)
	}
}
