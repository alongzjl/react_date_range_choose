import React from 'react'
import Swiper from 'react-id-swiper'
import './index.less'

export default class SwiperElement extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			random: parseInt(Math.random() * 1e9)
		}
		this.swiper = null
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
		// opts.rebuildOnUpdate = true
		opts.shouldSwiperUpdate = true
		opts.containerClass  = `swiper-element swiper-container customized-container-${random}`
		opts.on = {
			slideChange: e => {
				if (!this.swiper) return
				this.setState({ current: this.swiper.realIndex })
			}
		}
		delete opts.pagination
		delete opts.delay
		return opts
	}

	render() {

		let opts  = this.optsFormat(),
			{ children, props, options = {} } = this.props,
			{ pagination = false } = options
		return children
		?
		(
			<div className="swiper-element">
				<Swiper {...opts} ref={node => { if (node) this.swiper = node.swiper }}>
					{ children }
				</Swiper>
				{
					options.pagination
					?
					<PageElement
						current={this.state.current}
						total={children.length}
						props={props}
					/>
					: null
				}
			</div>
		): null
	}
}

class PageElement extends React.Component {
	renderDom(props, total, current = 0) {
		let css  = cssColorFormat(props, 'pagination')
		let node = Array.from(new Array(total)).map((_, i) => {
			let isCur = i === current,
				nCss  = { ...css }
			if (isCur) nCss = { ...nCss, ...cssColorFormat(props, 'paginationActive') }
			return (
				<div
					key={i}
					style={nCss}
					className={`ep-item${isCur? ' s-active': ''}`}
				>
				</div>
			)
		})
		return <div className="ep-page" style={cssColorFormat(props, 'paginationBox')}>{node}</div>
	}

	render() {
		let { total, current, props } = this.props
		return (
			<section className="e-page">
				{ this.renderDom(props, total, current) }
			</section>
		)
	}
}