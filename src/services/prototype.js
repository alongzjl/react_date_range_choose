/* 原型链扩展 */
const extend = require('util')._extend

module.exports = (function (window) {

	/* String */
	extend(String.prototype, {
		// 提取RGB
		colorRGB() {
			var sColor = this.toLowerCase(),
				reg   = /^#([0-9a-f]{3}|[0-9a-f]{6})$/,
				reg8  = /^#(\S)(\S)(\S)$/
			// 如果是16进制颜色
			if (sColor && reg.test(sColor)) {
				if (sColor.length === 4) sColor = sColor.replace(reg8, '#$1$1$2$2$3$3')
				// 处理六位的颜色值
				var sColorChange = []
				for (var i = 1; i < 7; i += 2) {
					sColorChange.push(parseInt('0x'+sColor.slice(i, i + 2)))
				}
				return sColorChange
			}
			return sColor
		},
		// 简易模板引擎
		substitute(str) {
			return str && typeof(str) == 'object'? this.replace(/\{\{([^{}]+)\}\}/g, (m, k) => {
				return str[k] || 0
			}): this.toString()
		}
	})

	/* Array */
	extend(Array.prototype, {
		remove(val) {
			return this.filter(_ => _ !== val)
		},
		removeByIdx(idx) {
			var attr = getAttr(idx)
			if (attr === 'Number') {
				return this.filter((_, i) => i !== idx)
			} else if (attr === 'Array') {
				return this.filter((_, i) => idx.indexOf(i) < 0)
			}
		}
	})

}(window))