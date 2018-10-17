//动画计算
export default function aniTime(props,list){
	let filterBox = cssColorFormat(props, 'layout'),
		  filter = cssColorFormat(props, 'filter'),
	 	  widthBox = filterBox.width,
		  widthSelf = filter.width,
		  l = filter.margin.split(' '),
		  all = list.length,
		  w = Math.floor(parseInt(widthBox)/(parseInt(widthSelf)+parseInt(l[1])+parseInt(l[3]))),
		  number = Math.ceil(all/w) > w ? Math.ceil(all/w) : w,
		  arr = [],
		  postArr = [];
	for(let i = 0;i<number*number;i++){
		if(i<number){
			arr[i] = i;
		}else{
			for(let j = 0;j<number;j++){
				let nowData = 0;
				if(i < number*(number-j) && i > number*(number-j)-(number-j)){
					const num = number*number-1-i;
					for(let k = 0;k<number;k++){
						if((num-k)%(number-1) == 0){
							nowData = (number-1)*2-k
							break
						}
					}
					arr[i] = nowData;
					break
				}else{
					if((i-j)%(number-1) == 0){
						arr[i] = j
					}
				}
			}
		}
	}
	if(Math.ceil(all/w) > w){
		arr.map((item,index)=>{
			const num = number - w;
			for(let j = 0;j<number;j++){
				if(index>=j*number && index<j*number+w){
					if((index-num*j) > (all-1)){
						postArr[index] = {show:'none'}
					}else{
						postArr[index] = {...list[index-num*j],show:item};
					}
					break
				}else{
					postArr[index] = {show:'none'}
				}
			}
		})
	}else{
		arr.map((item,index)=>{
			if(index>=all){
				postArr[index] = {show:'none'}
			}else{
				postArr[index] = {...list[index],show:item}
			}
		})
	}
	return postArr
}