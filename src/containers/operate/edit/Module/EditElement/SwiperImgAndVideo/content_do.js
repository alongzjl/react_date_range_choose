//时间段的处理
export function content_do(content){
	content = JSON.parse(content)  
	content = content.map((_,i)=>{ _.index = i+1;return _ }) 
	let no_date_content = content.filter(_=>_.date === '' || _.date == undefined)
	let date_content = content.filter(_=>_.date&&_.date != '')
	let dateArr = [],dataLast={}

	if(date_content.length == 0){ 
		return {date:dateArr,content:no_date_content}
	}   
	let newArr = date_content.map(_=>{
		let date = JSON.parse(_.date),
			start = new Date(date[0]).getTime(),
			end = new Date(date[1]).getTime()
		!no_have(dateArr,start) ? dateArr.push(start) : null
		!no_have(dateArr,end) ? dateArr.push(end) : null
		_.date = [start,end]
		return _
	}) 
	dateArr.sort((a,b)=>a-b>0)
	dateArr.map(_=>{
		let every = JSON.parse(JSON.stringify(no_date_content))
		newArr.map(v=>{
			let s = v.date[0],e = v.date[1]
			if(s > e){
				s = v.date[1];e = v.date[0]
			} 
			if(_ >= s && _ < e) {
				every.push(v)
			}   
			every.sort((a,b)=>a.index-b.index>0)
			dataLast[_] = every 
		}) 
	})  
	return {date:dateArr,content:dataLast}
}
export function sameCheck(obj1,obj2){
	if(JSON.stringify(obj1) == JSON.stringify(obj2)){
		return false
	}
	return true
}
export function everySame(content){
	let delayOnly = content[0].delayOnly,str = true
	for(let i=0;i<content.length;i++){
		if((content[i].delayOnly&&content[i].delayOnly != delayOnly) || content[i].type != 'image'){
			str = false
			break
		}  
	} 
	return str 
}
//销毁swiper
export function destroySwiper(swiper){
	if(getAttr(swiper) == 'Array'){
		swiper.map(_=>{
			_.destroy()
		}) 
	}else{
		swiper&&swiper.destroy()
	}
}
//轮播参数解析
export function formatObj(obj,fn,fn1) {
	let new_obj = {};
	for(var key in obj){ 
		if(key == 'autoplay'&& obj[key]){
			new_obj.autoplay = obj['autoplayOptions']
		}else if(key == 'slideOptions'){
			for(var i in obj['slideOptions']){
				new_obj[i] = obj['slideOptions'][i]
			}  
		}else{
			if(key != 'autoplayOptions'){
				new_obj[key] = obj[key];
			}  
		} 
	}
	new_obj.on = {
		slideChange:()=>{ fn&&fn() },
		transitionEnd:()=>{ fn1&&fn1() }
	}
	new_obj.watchSlidesProgress = true;
	new_obj.observer = true;//修改swiper自己或子元素时，自动初始化swiper 
	new_obj.observeParents = true;//修改swiper的父元素时，自动初始化swiper 
	return new_obj  
};
//判断是有已经存在
function no_have(arr,num){
	let is_have = false;
	for(let i=0;i<arr.length;i++){
		if(num == arr[i]){
			is_have = true
			break
		}
	}
	return is_have
}