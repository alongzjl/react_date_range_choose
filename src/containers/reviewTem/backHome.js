
export default function backHome(homepage,action){

	window.funcIn = () => { 
		let RYBackHome = 0; 
		window.RYTimer = setInterval(()=>{
			RYBackHome+=1;
			if(RYBackHome == backHomeTime){
				clearInterval(RYTimer);
				window.RY_navigation_have = false;
				action.globalData.feature.reviewRouter = homepage
                action.updateGlobal(action.globalData) 
			}  
		},1000)
	}
	funcIn()
	document.addEventListener('click',function(){
		clearInterval(RYTimer);
		funcIn()
	})   
}    