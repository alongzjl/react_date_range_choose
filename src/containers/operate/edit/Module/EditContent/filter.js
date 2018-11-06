/**
 * @Author: Along
 * @Date:   2018-05-30
 
 */
 

export function filterContent(data,con) {
	let content = data.data.content;
	const t = data.data.type;
	if( t == "storeInstroInstroduce"||t == "storeInstroTitle"||t == "instroPicture"||t == "instroTitle"){
		content = {}
	}else if(t == "address" || t == "phone"){
		content = {img:content.img}
	}else{
		content = con
	}
	const name = data.name;
	 if(name == 'floor' || name == 'catg'){
	 	content.isShowDom = !content.switch ? 'none' : 'flex'; 
	 }
	return content
} 

//轮播设置的过滤--商家--大运营
export function contentSwiper(compName,content){
	if(compName != 'swiperImgAndVideo') return content
	let contentNew = content.map(_=>{
		if(getEnv() === 'business'){ 
			!_.delayOnly&&_.type=='image' ? _.delayOnly = 5 : null
			!_.date ? _.date = '' : null
		}else{  
			delete _.delayOnly
			delete _.date 
		}  
		return _
	})    
	return contentNew
}
