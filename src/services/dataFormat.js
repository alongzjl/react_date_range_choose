import * as variable from 'var'
const comp  = require('state/comp')
const page  = require('state/page')
let compMap = variable.compMap.name
let typeMap  = {
	base:     1,
	advanced: 1
}
let pageMap = {
	feature:   1,
	animation: 1
}
let eleMap = {
	type:       1,
	data:       1,
	styleList:  1,
	feature:    1,
	layout:     1,
	auth:       1
}
let featureMap = {
	floors: 1,
	catgs:  1,
	list:   1,
	comp:   1,
	time:   1
}

const dataFormat = {
	get: {
		// comp数据处理
		comp: {
			// 更新
			plus: function(da, org, key, daParent) {
				let dType = getAttr(da),
					oType = getAttr(org)
				if (da === undefined || dType !== oType) {
					daParent[key] = org; return
				}
				switch(oType) {
					case 'Object':
						switch(key) {
							case 'feature':
								Object.keys(org).map(_ => {
									if (!featureMap[_]) {
										this.plus(da[_], org[_], _, da)
									}
								})
								break
							case 'styleList':
								let { idx, list } = da,
									oli  = org.list,
									dlen = list.length,
									olen = oli.length
								if (idx === undefined || !org[idx]) da.idx = org.idx
								if (dlen !== olen) {
									// 老 > 新: 删老
									if (dlen > olen) {
										list.splice(olen, dlen - olen)
									} else {
										da.list = list.concat(oli.slice(dlen, olen - dlen))
									}
								}
								// break
							default:
								Object.keys(org).map(_ => {
									this.plus(da[_], org[_], _, da)
								})
						}
						
						break
					case 'Array':
						switch(key) {
							case 'components':
								da.map((_, i) => {
									this.plus(da[_], comp[_.name], i, da)
								})
								break
							default:
								da.map((_, i) => {
									this.plus(_, org[i] || org[0], i, da)
								})
						}
						break
					default:
				}
			},
			// 去旧
			slim: function(da, org, key, daParent) {
				let dType = getAttr(da),
					oType = getAttr(org),
					kType = getAttr(key)
				if (org === undefined) {
					delete daParent[key]; return
				}
				switch(dType) {
					case 'Object':
						switch(key) {
							case 'feature':
								Object.keys(da).map(_ => {
									if (!featureMap[_]) {
										this.slim(da[_], org[_], _, da)
									}
								})
								break
							default:
								Object.keys(da).map(_ => {
									this.slim(da[_], org[_], _, da)
								})
						}
						break
					case 'Array':
						switch(key) {
							case 'components':
								da.map((_, i) => {
									this.slim(da[_], comp[_.name], i, da)
								})
								break
							default:
								da.map((_, i) => {
									this.slim(_, org[i], i, da)
								})
						}
						break
					default:
				}
			}
		},
		// page数据处理
		page: {
			// 更新
			plus: function(da, org, key, daParent) {
				let dType = getAttr(da),
					oType = getAttr(org)
				if (da === undefined || dType !== oType) {
					daParent[key] = org; return
				}
				switch(oType) {
					case 'Object':
						Object.keys(org).map(_ => {
							this.plus(da[_], org[_], _, da)
						})
						break
					default:
				}
			},
			// 去旧
			slim: function(da, org, key, daParent) {
				let dType = getAttr(da),
					oType = getAttr(org)
				if (org === undefined) {
					delete daParent[key]; return
				}
				switch(dType) {
					case 'Object':
						Object.keys(org).map(_ => {
							this.slim(da[_], org[_], _, da)
						})
						break
					default:
				}
			}
		},
		// 组件数据对比
		compComp: function(da, org) {
			Object.keys(org).map(_ => {
				if (!eleMap[_]) return
				this.comp.plus(da[_], org[_], _, da)
			})
			Object.keys(da).map(_ => {
				if (!eleMap[_]) return
				this.comp.slim(da[_], org[_], _, da)
			})
		},
		// page数据比对
		pageComp: function(da, org) {
			Object.keys(org).map(_ => {
				if (!pageMap[_]) return
				this.page.plus(da[_], org[_], _, da)
			})
			Object.keys(da).map(_ => {
				if (!pageMap[_]) return
				this.page.slim(da[_], org[_], _, da)
			})
		},
		pageEach: function(da) {
			let st = JSON.stringify(da).length
			Object.keys(da).map(_ => {
				let pa  = da[_]
				let pae = pa.elements
				this.pageComp(pa, deepCopy(page))
				pae.map((p, i) => {
					this.compComp(p, comp[p.name])
				})
			})
			// let ed = JSON.stringify(da).length
			// console.clear()
			// console.log(st, ed, ed/st)
			// console.log(da)
			// console.log(JSON.stringify(da))
			// return da
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