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
	time:   1,
	active: 1
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
							case 'router':
								break
							case 'feature':
								Object.keys(org).map(_ => {
									if (!featureMap[_]) {
										this.plus(da[_], org[_], _, da)
									}
								})
								break
							case 'styleList':
								let { idx } = da
								if (idx === undefined || !org.list[idx]) da.idx = org.idx || 0
								if (da.list) delete da.list
								break
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
							case 'componentLayout':
								da.map((_, i) => {
									var dn = _.name,
										cd = deepCopy(comp[dn]),
										s1 = _.styleList
									s1.idx = s1.idx || 0 
									var i1 = s1.idx,
										l1 = s1.list,
										s2 = cd.styleList,
										i2 = s2.idx,
										l2 = s2.list
									s2.idx  = i1 || 0
									cd.data = l2[i1].data
									this.plus(_, cd, i, da)
								})
								break
							case 'content' : break
							default:
								//if(org.length == 0) return //如果默认数据没有的话返回
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
							case 'router':
								break
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
							case 'componentLayout':
								da.map((_, i) => {
									var dn = _.name,
										cd = deepCopy(comp[dn]),
										s1 = _.styleList
									s1.idx = s1.idx || 0
									var i1 = s1.idx,
										l1 = s1.list,
										s2 = cd.styleList,
										i2 = s2.idx,
										l2 = s2.list
									s2.idx  = i1 || 0
									cd.data = l2[i1].data
									this.slim(_, cd, i, da)
								})
								break
							case 'content' : break
							default:
								//if(org.length == 0) return  //如果默认数据没有的话返回
								da.map((_, i) => {
									this.slim(_, org[i] || org[0], i, da)
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
				// if (_ !== 'p_1002') return
				let pa  = da[_]
				let pae = pa.elements
				this.pageComp(pa, deepCopy(page))
				pae.map((p, i) => {
					var psi = p.styleList.idx || 0,
						c   = deepCopy(comp[p.name]),
						cs  = c.styleList,
						csl = cs.list,
						csi = cs.idx
					if (psi) {
						if (csl[psi]) {
							c.data = csl[psi].data
							cs.idx = psi
						} else {
							c.data = csl[0].data
							cs.idx = 0
						}
					}
					this.compComp(p, c)
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
	}
}
module.exports = dataFormat