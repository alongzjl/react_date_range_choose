/**
 * @Author: Along
 * @Date:   2018-05-30
 
 */
 

const filterContent = data => {
	let content = data.data.content;
	const t = data.data.type;
	if( t == "storeInstroInstroduce"||t == "storeInstroTitle"||t == "instroPicture"||t == "instroTitle"){
		content = {}
	}else if(t == "address" || t == "phone"){
		content = {img:content.img}
	}else if(t == "instroButton"){
		content = {text:content.text}
	}
	return content
} 

export default filterContent