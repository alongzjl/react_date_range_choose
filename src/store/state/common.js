function handleObj(obj) {
	for (var p in obj) {
		obj[p] = false
	}
}
const Fn = {
	authInit: function(da) {
		let { data, feature } = da
		let style     = Fn.deepCopy(data.style),
			content   = Fn.deepCopy(data.content),
			animation = Fn.deepCopy(data.animation),
			fture     = Fn.deepCopy(feature)

		for (var p in style) {
			handleObj(style[p])
		}
		if (content.length) content = content[0]
		handleObj(content)
		handleObj(fture)
		handleObj(animation)
		da.auth = {
			style:     style,
			content:   content,
			animation: animation,
			feature:   fture
		}
		return da
	},
	deepCopy: (obj) => {
		try {
			return JSON.parse(JSON.stringify(obj))
		} catch(e) {
			return obj
		}
	}
}
module.exports = Fn