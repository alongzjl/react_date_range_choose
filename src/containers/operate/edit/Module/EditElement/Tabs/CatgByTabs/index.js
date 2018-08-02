/**
 * @Author: Liao Hui
 * @Date:   2018-04-21T17:21:39+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2018-04-24T13:47:49+08:00
 */

import React from 'react'
import './index.less'


export default class CatgByTabs extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	componentWillReceiveProps() {}

	renderDom = () => {
		let { data } = this.props,
			{ content, componentLayout } = data.data
		debugger
		return null
	}

	render() {

		return (
			<section className={`e-catg-by-tabs`}>
				CatgByTabs
				{ this.renderDom() }
			</section>
		)
	}
}
