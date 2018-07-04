
/**
 * @Author: Along
 * @Date:   2018-06-06

 */

const StyleFilter = {
	//文字行高自适应
	lineHightAdaptation:(data,val,key) => {
		if((data.name == "text" || data.name == "button") && key == "fontSize"){
			data.data.style.text.lineHeight = val*1.5;
		}
		return data
	},
	//自适应图片大小的1/2
	imageAdaptation:(data,attribute) => {
		if(attribute && attribute.indexOf("*")>-1){
			if((data.name == "picture"&&data.data.type != "weatherLogo") || data.name == "video" || data.name == "button"){
				const width = parseInt(attribute.split("*")[0]);
				const height = parseInt(attribute.split("*")[1]) 
				data.data.layout.width = parseInt(width/2);
				data.data.layout.height = parseInt(height/2);
			}
		}
		return data 
	}
}
 
export default StyleFilter