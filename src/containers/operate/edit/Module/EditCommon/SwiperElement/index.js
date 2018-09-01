import React from 'react'
import Swiper from 'react-id-swiper'
import './index.less'

export default class SwiperElement extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			random: Math.random() * 1e9 >> 0,
			children: props.children
		}
		this.swiper = null
	}

	componentWillReceiveProps(props) {
		let { rebuild = false } = props
		if (!rebuild) return
		this.setState({ children: [] })
		setTimeout(() => {
			if (!this) return
			this.setState({
				children: props.children
			})
		})
	}

	componentWillMount() {}

	componentDidMount() {}

	componentWillUnmount() {}

	optsFormat = len => {
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
		delete opts.pagination
		if (len < 2) {
			opts.autoplay = false
			opts.loop = false
			return opts
		}
		let { autoplay, delay } = opts
		if (autoplay) opts.autoplay = { delay, disableOnInteraction: false }
		opts.containerClass  = `swiper-element swiper-container customized-container-${random}`
		opts.on = {
			slideChange: e => {
				if (!this.swiper) return
				this.setState({ current: this.swiper.realIndex })
			}
		}
		delete opts.delay
		return opts
	}

	render() {
		let { props, options = {} } = this.props,
			{ children } = this.state,
			len = children.length,
			{ pagination = false } = options,
			opts  = this.optsFormat(len)
		return children && len
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