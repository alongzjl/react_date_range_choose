
let boxObj = (param,layout,bodySty,eleKnock) => {
	let showLine_v = false,showLine_h = false
	//中边左对齐
	if(abs(param.x-bodySty.left-bodySty.width/2)){
		showLine_v = {left:bodySty.left+bodySty.width/2,p_left:bodySty.left+bodySty.width/2}
	//中边右对齐
	}else if(abs(param.x-bodySty.left-bodySty.width/2+layout.width)){
		showLine_v = {left:bodySty.left+bodySty.width/2,p_left:bodySty.left+bodySty.width/2-layout.width}
	//中边中对齐
	}else if(abs(param.x-bodySty.left-bodySty.width/2+layout.width/2)){
		showLine_v = {left:bodySty.left+bodySty.width/2,p_left:bodySty.left+bodySty.width/2-layout.width/2}
	//左边左对齐 
	}else if(abs(param.x-bodySty.left)){
		showLine_v = {left:bodySty.left,p_left:bodySty.left}
	//左边右对齐
	}else if(abs(param.x-bodySty.left+layout.width)){
		showLine_v = {left:bodySty.left,p_left:bodySty.left-layout.width}
	//左边中对齐
	}else if(abs(param.x-bodySty.left+layout.width/2)){
		showLine_v = {left:bodySty.left,p_left:bodySty.left-layout.width/2}
	//右边左对齐
	}else if(abs(param.x-bodySty.left-bodySty.width)){
		showLine_v = {left:bodySty.left+bodySty.width,p_left:bodySty.left+bodySty.width}
	//右边中对齐
	}else if(abs(param.x-bodySty.left-bodySty.width+layout.width/2)){
		showLine_v = {left:bodySty.left+bodySty.width,p_left:bodySty.left+bodySty.width-layout.width/2}
	//右边右对齐 
	}else if(abs(param.x-bodySty.left-bodySty.width+layout.width)){
		showLine_v = {left:bodySty.left+bodySty.width,p_left:bodySty.left+bodySty.width-layout.width}
	//没有匹配到 
	}else{    
		showLine_v = false
	}
 
	//中边上对齐
	if(abs(param.y-bodySty.top-bodySty.height/2)){
		showLine_h = {top:bodySty.top+bodySty.height/2,p_top:bodySty.top+bodySty.height/2}
	//中边中对齐
	}else if(abs(param.y-bodySty.top-bodySty.height/2+layout.height/2)){
		showLine_h = {top:bodySty.top+bodySty.height/2,p_top:bodySty.top+bodySty.height/2-layout.height/2}
	//中边下对齐
	}else if(abs(param.y-bodySty.top-bodySty.height/2+layout.height)){
		showLine_h = {top:bodySty.top+bodySty.height/2,p_top:bodySty.top+bodySty.height/2-layout.height}
	//上边上对齐
	}else if(abs(param.y-bodySty.top)){
		showLine_h = {top:bodySty.top,p_top:bodySty.top}
	//上边下对齐
	}else if(abs(param.y-bodySty.top+layout.height)){
		showLine_h = {top:bodySty.top,p_top:bodySty.top-layout.height}
	//上边中对齐
	}else if(abs(param.y-bodySty.top+layout.height/2)){
		showLine_h = {top:bodySty.top,p_top:bodySty.top-layout.height/2}
	//下边上对齐
	}else if(abs(param.y-bodySty.top-bodySty.height)){
		showLine_h = {top:bodySty.top+bodySty.height,p_top:bodySty.top+bodySty.height}
	//下边中对齐
	}else if(abs(param.y-bodySty.top-bodySty.height+layout.height/2)){
		showLine_h = {top:bodySty.top+bodySty.height,p_top:bodySty.top+bodySty.height-layout.height/2}
	//下边下对齐
	}else if(abs(param.y-bodySty.top-bodySty.height+layout.height)){
		showLine_h = {top:bodySty.top+bodySty.height,p_top:bodySty.top+bodySty.height-layout.height}
	//没有匹配到
	}else{  
		showLine_h = false
	} 
	let eleKnockPos = eleKnock ? bodySty : false
	return {v:showLine_v,h:showLine_h,eleKnock:eleKnockPos}
}

// 计算两个块中心点的位置
function calcDistance(pos1, pos2){
	const c1Left = pos1.left + pos1.width / 2;
	const c1Top = pos1.top + pos1.height / 2;
	
	const c2Left = pos2.left + pos2.width / 2;
	const c2Top = pos2.top + pos2.height / 2;
	
	// 利用勾股定理计算两个中心点的距离
	const a = c2Left - c1Left;
	const b = c2Top - c1Top;
	
	return Math.sqrt(a*a + b*b);
}

// 碰撞检测函数
function detectKnock(pos1, pos2){
	// dom1的四条边
	const l1 = pos1.left;
	const t1 = pos1.top;
	const r1 = l1 + pos1.width;
	const b1 = t1 + pos1.height;
	
	// dom2的四条边
	const l2 = pos2.left;
	const t2 = pos2.top;
	const r2 = l2 + pos2.width;
	const b2 = t2 + pos2.height;
	
	// 排除所有没碰上的情况
	if(l1-r2>5 || t1-b2>5 || l2-r1>5 || t2-b1>5){
		return false;
	} 
	return true
}

function abs(num){
	if(Math.abs(num) <= 5) return true
	return false
}

export function nearPosSty(layout){
	let arr = new Array(4);
	for(let i = 0;i<4;i++){
		let objSty = {}
		if(i == 0){
			objSty.height = layout.height;
			objSty.left = layout.left;
			objSty.top = layout.top;
		}else if(i == 1){
			objSty.height = layout.height;
			objSty.left = layout.left + layout.width;
			objSty.top = layout.top;
		}else if(i == 2){
			objSty.width = layout.width;
			objSty.left = layout.left;
			objSty.top = layout.top;
		}else {
			objSty.width = layout.width;
			objSty.left = layout.left;
			objSty.top = layout.top + layout.height;
		}
		arr[i] = objSty
	}
	return arr 
}
   
export function InductionLine(param,eles,layout,i,bodySty) {
	let lineObj,nearMax=99999,index=-1,eleObj = eles.filter((_,index)=>index != i)
	let boxLine = boxObj(param,layout,bodySty,false)
	if(eleObj.length == 0){
		lineObj = boxLine 
	}else {
		let thisLayout = {left:param.x,top:param.y,width:layout.width,height:layout.height}
		for(let i=0;i<eleObj.length;i++){
			let pos = eleObj[i].data.layout
			if(detectKnock(pos,thisLayout)){
				let nearPos = calcDistance(pos,thisLayout)
				if(nearPos < nearMax){
					nearMax = nearPos
					index = i
				}
			} 
		} 
	} 
	if(nearMax == 99999){ 
		lineObj = boxLine
	}else{
		lineObj = boxObj(param,layout,eleObj[index].data.layout,true)
	}    
	return lineObj
}