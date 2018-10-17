
const checkToJump = (item,router,id,dom) => {
		let nowData = '';
		if(item == 'storeFilter'||item == 'shopFilter'){
			 nowData =  JSON.stringify({"router":"storeFilter","detail":item,"to":router,"id":id,"dom":dom});
		}else if(item == 'RYRouterSet'){
			let url = router ? router.url : '',
				param = undefined,
				params = undefined;
			if(router){ 
				param = router.param;
				if(param){
					params = {store:'',floor:'',catg:''} 
					param.map(item=>{
						item.type ? params[item.type] = item.value : null
					})
					nowData = JSON.stringify({"router":"RYRouterSet","detail":params,"to":url})
				}else{
					//老数据
					nowData = JSON.stringify({"router":"RYRouterSet","detail":params,"to":url})
				}
			}
		}else{
			 nowData =  id ? JSON.stringify({"router":"toRYPage","detail":item,"to":router,"id":id,"dom":dom}) : JSON.stringify({"router":"toRYPage","detail":item,"to":router})
		}
		return nowData  
	}     

export default checkToJump