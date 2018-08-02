import React from 'react'
import Swiper from 'react-id-swiper'
import './index.less'

export default class SwiperElement extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			random: parseInt(Math.random() * 1e9)
		}
	}

	componentWillReceiveProps(props) {}

	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	optsFormat = e => {
		let { options = {
			direction: 'horizontal',
			effect:  'slide',
			autoplay: true,
			loop:  true,
			speed: 500,
			delay: 3000
		} } = this.props,
			{ random }  = this.state,
			opts = deepCopy(options)
		let { autoplay, delay } = opts
		if (autoplay) opts.autoplay = { delay, disableOnInteraction: false }
		opts.rebuildOnUpdate = true
		opts.containerClass  = `swiper-element swiper-container customized-container-${random}`
		delete opts.delay
		return opts
	}

	render() {

		let opts = this.optsFormat(),
			{ children } = this.props
		return children
		?
		(
			<Swiper {...opts}>
				{ children }
			</Swiper>
		): null
	}
}
