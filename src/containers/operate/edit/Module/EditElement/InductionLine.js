let InductionLine = (param,eles,layout,i,bodySty) => {
	let lineObj,nearMax=99999,index=-1,eleObj = eles.filter((_,index)=>index != i)
	let boxLine = boxObj(param,layout,bodySty)
	if(eleObj.length == 0){
		lineObj = boxLine
	}else {
		for(let i=0;i<eleObj.length;i++){
			let pos = eleObj[i].data.layout
			if(detectKnock(pos,layout)){
				let nearPos = calcDistance(pos,layout)
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
		lineObj = boxObj(param,layout,eleObj[index].data.layout)
	} 
	return lineObj
}

let boxObj = (param,layout,bodySty) => {
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
	return {v:showLine_v,h:showLine_h}
}

function calcDistance(pos1, pos2){
	// 计算两个块中心点的位置
	var c1Left = pos1.left + pos1.width / 2;
	var c1Top = pos1.top + pos1.height / 2;
	
	var c2Left = pos2.left + pos2.width / 2;
	var c2Top = pos2.top + pos2.height / 2;
	
	// 利用勾股定理计算两个中心点的距离
	var a = c2Left - c1Left;
	var b = c2Top - c1Top;
	
	return Math.sqrt(a*a + b*b);
}

// 碰撞检测函数
function detectKnock(pos1, pos2){
	// dom1的四条边
	var l1 = pos1.left;
	var t1 = pos1.top;
	var r1 = l1 + pos1.width;
	var b1 = t1 + pos1.height;
	
	// dom2的四条边
	var l2 = pos2.left;
	var t2 = pos2.top;
	var r2 = l2 + pos2.width;
	var b2 = t2 + pos2.height;
	
	// 排除所有没碰上的情况
	if(l1 > r2 || t1 > b2 || r1 < l2 || b1 < t2){
		return false;
	}
	
	return true
}

function abs(num){
	if(Math.abs(num) <= 5) return true
	return false
}
export default InductionLine