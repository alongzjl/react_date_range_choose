//在线数据处理
const Fetch     = require('public/Fetch')


export default function RYAjax(url,paramsData){
	return new Promise((resolve, reject) => {
		Fetch.default.postFile(url,paramsData).then(res=>{
			if (res.meta.errno == 0) {
				const list = res.result ? res.result.data : [];
				resolve({msg:'success',data:list})
			}else{
				resolve({msg:'fail',data:''})  
			}
		}).catch(error=>{ 
			resolve({msg:'error',data:''})
		});
	})
}

export function postJSON(url,paramsData){
	return new Promise((resolve, reject) => {
		Fetch.default.postJSON(url,paramsData).then(res=>{
			if (res.meta.errno == 0) {
				const list = res.result ? res.result : {data:[],page:{currentPage:1,totalPage:1}};
				resolve({msg:'success',data:list})    
			}else{ 
				resolve({msg:'fail',data:''})  
			}
		}).catch(error=>{ 
			resolve({msg:'error',data:''})
		});
	})
}