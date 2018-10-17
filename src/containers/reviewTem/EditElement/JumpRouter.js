

const JumpRouter = (data,animate,animateParams,action) => {
    let globalData = action&&action.globalData
     //如果是back则返回上一级
    if (data == 'back') {  
        //history.go(-1);  
        //如果是toRYMapPage则跳转到有地图组件的第一个路由页面
    }else if (data&&data.indexOf('toRYPage') != -1) {
        const routerParams = JSON.parse(data);
        //如果跳转到本页则返回
        if(!routerParams.to || RY_page_router == routerParams.to) return
         if(animate&&animateParams.out.className) {
            animate();
            const time = (animateParams.out.delay+animateParams.out.duration)*1000;
             setTimeout(()=>{
                globalData.feature.reviewRouter = routerParams.to
                action.updateGlobal(globalData)
             },time)
        }else{
            globalData.feature.reviewRouter = routerParams.to
            action.updateGlobal(globalData)
            /* hashHistory.push({
                pathname: `/${routerParams.to}`,
                query: { 
                    detail: JSON.stringify(routerParams.detail), 
                }   
            }); */ 
        }
        //店铺列表的数据埋点
     }else if(data&&data.indexOf('storeFilter') != -1){
         const routerParams = JSON.parse(data);
        //正常跳转 
     }else if (data&&data.indexOf('RYRouterSet') != -1) {
        const routerParams = JSON.parse(data);
         //如果跳转到本页则返回
        if(!routerParams.to || RY_page_router == routerParams.to) return
        if(animate&&animateParams.out.className) {
            animate();
            const time = (animateParams.out.delay+animateParams.out.duration)*1000;
             setTimeout(()=>{
                globalData.feature.reviewRouter = routerParams.to
                action.updateGlobal(globalData)
             },time)
        }else{
            globalData.feature.reviewRouter = routerParams.to
            action.updateGlobal(globalData)
             /*hashHistory.push({
                pathname: `/${routerParams.to}`,
                query: { 
                    params: JSON.stringify(routerParams.detail), 
                }   
            });  */
        }
     }else{
        // alert('未配置跳转!')
          return
     }
}
export default JumpRouter