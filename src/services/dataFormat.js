import * as variable from 'var'
const comp  = require('state/comp')
let compMap = variable.compMap.name
let typeMap  = {
	base: 1,
	advanced: 1
}

const dataFormat = {
	get: {
		dataPlus: function(da, org, idx1, idx2) {
			if (!org) return da
			let me = this
			Object.keys(org).map(_ => {
				if (_ === 'name' && compMap[da[_]]) return
				let p1 = da[_]
				let p2 = org[_]
				let t1 = getAttr(p1)
				let t2 = getAttr(p2)
				if (org.styleList) {
					idx1 = da.styleList.idx || 0
					idx2 = org.styleList.idx
				}
				if (idx1 !== undefined && idx2 !== undefined) {
					if (idx1 !== idx2 && (_ === 'content' || _ === 'style')) return
				}
				if (p1 === undefined && p2 !== undefined) {
					da[_] = p2
					// console.log(_)
					return
				} else if (t1 === 'Object' && t2 === 'Object') {
					da[_] = me.dataPlus(p1, p2, idx1, idx2)
				} else if (t1 === 'Array' && t2 === 'Array') {
					p2.map((p, i) => {
						let t = p.type
						if (typeMap[t]) {
							p1[i] = me.dataPlus(p1[i], comp[p.name], idx1, idx2)
						} else {
							try {
								p1[i] = me.dataPlus(p1[i], p2[i], idx1, idx2)
							} catch(e) {
								console.log(e)
							}
						}
					})
				}
			})
			return da
		},
		pageEach: function(da) {
			let me = this
			let st = JSON.stringify(da).length
			Object.keys(da).map(_ => {
				let pa  = da[_]
				let pae = pa.elements
				pae.map((p, i) => {
					if (p.type === 'advanced') return
					pae[i] = me.dataPlus(p, comp[p.name])
				})
			})
			let ed = JSON.stringify(da).length
			// console.clear()
			console.log(st, ed, ed/st)
			// console.log(da)
			// console.log(JSON.stringify(da))
			return da
		}
	},
	save: {
		dataSlim: function(da, org, idx1, idx2) {
			if (!org) return da
			let me = this
			Object.keys(da).map(_ => {
				if (_ === 'name' && compMap[da[_]]) return
				let p1 = da[_]
				let p2 = org[_]
				let t1 = getAttr(p1)
				let t2 = getAttr(p2)
				if (org.styleList) {
					idx1 = da.styleList.idx
					idx2 = org.styleList.idx
				}
				if (idx1 !== undefined && idx2 !== undefined) {
					if (idx1 !== idx2 && (_ === 'content' || _ === 'style')) return
				}
				if (getAttr(p1) !== getAttr(p2)) {
					// debugger
					return
				} else if (getAttr(p1) === 'Object') {
					if (isEmptyObject(p1) && isEmptyObject(p2)) {
						delete da[_]
					} else {
						var o = me.dataSlim(p1, p2, idx1, idx2)
						if (!o) {
							delete da[_]
						} else {
							da[_] = o
						}
					}
				} else if (getAttr(p1) === 'Array') {
					if (!p1.length) {
						delete da[_]
					} else {
						p1.map((p, i) => {
							let t = p.type
							if (typeMap[t]) {
								p1[i] = me.dataSlim(p, comp[p.name], idx1, idx2)
							} else {
								try {
									p1[i] = me.dataSlim(p, p2[i], idx1, idx2)
								} catch(e) {
									console.log(e)
								}
							}
						})
					}
				} else if (p1 === p2) {
					delete da[_]
				}
			})
			return isEmptyObject(da)? false: da
		},
		pageEach: function(da) {
			let me = this
			let st = JSON.stringify(da).length
			Object.keys(da).map(_ => {
				let pe = da[_].elements
				pe.map((p, i) => {
					if (p.type === 'advanced') return
					pe[i] = me.dataSlim(p, comp[p.name], p.styleList.idx, 0)
				})
			})
			let ed = JSON.stringify(da).length
			console.clear()
			console.log(st, ed, ed/st)
			console.log(da)
			console.log(JSON.stringify(da))
			return da
		}
	}
}

module.exports = dataFormat