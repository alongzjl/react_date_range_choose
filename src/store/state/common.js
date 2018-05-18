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
	},
	extend: (org, obj) => {
		for (var v in obj) {
			if (!org[v]) {
				org[v] = obj[v]
			} else {
				var typeO = Fn.getClass(org[v]),
					typeN = Fn.getClass(obj[v])
				if (typeO === typeN && typeO === 'Object') {
					Fn.extend(org[v], obj[v])
				} else {
					org[v] = obj[v]
				}
			}
		}
		return org
	},
	getClass: (obj) => {
		return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1]
	},
	styleIdxChange: (idx, obj) => {
		let sl = obj.styleList
		sl.idx = idx
		obj.data = sl.list[idx].data
		return obj
	}
}
module.exports = Fn