//数据映射
export default function RYdataMap(item){
	let obj = JSON.parse(JSON.stringify(item));
	Object.keys(item).map(val=>{
		switch(val){ 
			case 'LOCAL_LOGO' : obj['logo'] = item[val] ? item[val] : './image/no_store.png';break
			case 'NAME' :  obj['name'] = item[val];break
			case 'BERTH_NUMBER' : obj['berthNumber'] = item[val] ? item[val] : '暂无地址';break
			case 'CONTACT' : obj['contact'] = item[val] ? item[val] : '暂无电话';break
			case 'DESCRIPTION' : obj['description'] = item[val];break
			case 'recordId' : obj['id'] = item[val];break  
			case 'LOCAL_URL' : obj['pictures'] = item[val].map(_ => { 
				if(_[val].indexOf('201709271444420135') > -1){
					return './image/201709271444420135.jpg'
				}else{   
					return _[val]
				}
			}); 
			break
			case 'categories' : obj['categories'] = getAttr(item[val]) == 'Array' ? item.categories[0].name : '特别推荐';
				!obj['categories'] ? obj['categories'] = '特别推荐' : null;
			break
 			case 'praiseAmount' : !obj['praiseAmount'] ? obj['praiseAmount'] = '0' : null;
 			break   
		}  
	})       
	return obj 
}