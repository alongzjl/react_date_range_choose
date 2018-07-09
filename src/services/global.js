/* window 扩展方法 */
const extend = require('util')._extend

module.exports = extend(window, {
	// 获取真实数据类型
	getAttr(element) {
		return Object.prototype.toString.call(element).match(/[A-Z][a-z]*/)[0]
	},
	// 获取真实数据类型
	isEmptyObject(obj) {
		try {
			return !Object.keys(obj).length
		} catch(e) {
			return false
		}
	},
	// 深拷贝
	deepCopy(obj) {
		try {
			return JSON.parse(JSON.stringify(obj))
		} catch(e) {
			console.error(e)
			return obj
		}
	},
	getCookie(name) {
		let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
		if (arr = document.cookie.match(reg)) {
			return unescape(arr[2])
		} else {
			return ''
		}
	},
	setCookie(name, val, hour = 24) {
		var exp = new Date()
		exp.setTime(exp.getTime() + hour * 60 * 60 * 1000)
		document.cookie = `${name}=${escape(val)};expires=${exp.toGMTString()};path=/`
	},
	getTime() {
		let now = new Date()
		let o = {
			year:    now.getFullYear() + '',		// 年
			month:   now.getMonth() + 1,			// 月
			date:    now.getDate(),					// 日
			hour:    now.getHours(),				// 时
			minutes: now.getMinutes(),				// 分
			seconds: now.getSeconds(),				// 秒
			ms:      now.getMilliseconds() + '',	// 毫秒
			week:    '日一二三四五六'[now.getDay()]	// 周
		}
		o.q   = Math.floor((o.month + 2) / 3) + ''	// 季
		o.apm = o.hour > 11? '下午': '上午'			// AM / PM
		o.month   = (o.month < 10? '0': '') + o.month
		o.date    = (o.date < 10? '0': '') + o.date
		o.minutes = (o.minutes < 10? '0': '') + o.minutes
		o.hour    = (o.hour < 10? '0': '') + o.hour
		o.seconds = (o.seconds < 10? '0': '') + o.seconds
		return o
	},
	// 文本换行
	textBreak(str = '') {
		return str.replace(/\n|\r\n/g, '<br/>').replace(/ /g, '&nbsp;')
	},
	getEnv() {
		var m = window.location.hash.match(/#\/([^\/]+)/)
		return m? m[1]: ''
	},
	timeFormat(format) {
		let now   = new Date()
		let split = []
		let RPN = /(\{[^{}]+\})|([^{}]+)/g
		let RPC = /\{([^{}]+)\}/
		let o = {
			'y+': now.getFullYear() + '',
			'm+': now.getMonth() + 1,					// 月
			'd+': now.getDate(),						// 日
			'h+': now.getHours(),						// 时
			'n+': now.getMinutes(),						// 分
			's+': now.getSeconds(),						// 秒
			'W': '日一二三四五六'[now.getDay()],			// 周
			'q+': Math.floor((now.getMonth() + 3) / 3),	// 季
			'ap': 1
		}
		format.replace(RPN, m => {
			m = m.replace(RPC, (n, $1) => {
				for (let k in o) {
					if (new RegExp('('+ k +')').test($1)) {
						return '{' + $1.replace(RegExp.$1,
							k === 'y+'
							?
							o[k].substr(4 - RegExp.$1.length)
							:
							k === 'ap'
							?
							((o['h+'] >= 12) ? '下午': '上午')
							:
							RegExp.$1.length == 1
							?
							o[k]
							:
							('00' + o[k]).substr(('' + o[k]).length)
						) + '}'
					}
				}
			})
			split.push(m)
		})
		return split
	}
	// Ajax: require('./ajax')
})