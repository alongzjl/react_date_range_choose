

const addAnimate = data => {
	let ani       = data&&data.className ? data : {className: '',direction: '',delay: 0,duration: 1,iterationCount: 1},
	    aniCls    = '',
        aniSty    = {};
      if (ani.className) {
		let { direction, delay, iterationCount } = ani
		aniCls = `animate ${ani.className}${ani.direction}`
		aniSty = {
			animationDuration: `${ani.duration}s`,
			animationDelay:    `${delay}s`,
			animationIterationCount: iterationCount
		}
	}
	return {name:aniCls,style:aniSty}
}


export default addAnimate