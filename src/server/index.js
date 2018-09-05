const variable = require('var')
const { list, item } = variable.mock
var hostMap = {
	dev:    '52.internal.rongyi.com',
	qa:     '224.rongyi.com',
	dist:   'api.v4.rongyi.com',
	online: 'api.rongyiguang.com'
}
var host = hostMap[ENV] || hostMap['online']
var fn = {
	host,
	mockList: list,
	mockItem: item,
	getMallId(da = {}) {
		var mallId = window.uif.userInfo.mallMid || ''
		if (mallId) da.mallId = mallId
		return da
	}
}

module.exports = {
	goods: require('./goods.js')(fn),
	store: require('./store.js')(fn)
}
