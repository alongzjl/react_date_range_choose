/**
 * @Author: Along
 * @Date:   2018-05-30
 
 */
 

const filterContent = (data,con) => {
	let content = data.data.content;
	const t = data.data.type;
	if( t == "storeInstroInstroduce"||t == "storeInstroTitle"||t == "instroPicture"||t == "instroTitle"){
		content = {}
	}else if(t == "address" || t == "phone"){
		content = {img:content.img}
	}else if(t == "instroButton"){
		content = {text:content.text}
	}else{
		content = con
	}
	const name = data.name;
	 if(name == 'floor' || name == 'catg'){
	 	content.isShowDom = !content.switch ? 'none' : 'flex'; 
	 }
	return content
} 

export default filterContent