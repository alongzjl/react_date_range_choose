import React from 'react'
import { hashHistory } from 'react-router'

class NoMatchComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			operate:  '/operate/edit',
			business: '/business/edit',
			view:     '/view'
		}
	}

	componentDidMount() {
		let { params } = this.props
		let { splat } = params
		let type  = splat.split('/')[0]
		let route = this.state[type]
		if (route) hashHistory.push(route)
	}

	componentWillUnmount() {
	}

	render() {
		return (
			<div className="">
				您输入的URL地址有误~
			</div>
		)
	}
}

export default NoMatchComponent
