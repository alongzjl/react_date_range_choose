

const windowHeight = $(window).height(),
　　$body = $("body");
　　$body.css("height", windowHeight); //重要代码

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
	$body.off("touchend").on("touchend", function(e) {
		clearInterval(RYTimer); 
		funcIn() 
	});   
}  