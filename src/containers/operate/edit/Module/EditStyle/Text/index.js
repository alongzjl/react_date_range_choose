
/**
 * @Author: Along
 * @Date:   2018-06-06

 */

const textFilter = {
	lineHightAdaptation:(data,val,key) => {
		if(data.name == "text"&&key == "fontSize"){
			data.data.style.text.lineHeight = val*1.5;
		}
		return data
	}
}

export default textFilter