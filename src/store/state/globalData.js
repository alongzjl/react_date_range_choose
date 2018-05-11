const tc = require('./themeContent')

const globalData = {
	// 全局数据
	data: {
		homepage: 'p_1000',			// 首页路由
		backgroundColor: '#fff'		// 全局背景色
	},
	theme: {
		idx: 0,
		max: {
			color:   0,
			picture: 0
		},
		list: [JSON.parse(JSON.stringify(tc))]
	},
	floors: [],		// 楼层数据
	catgs: [],	// 分类数据
	storeList:[], //店铺数据  
	// 全局特征 
	feature: {
	},
	//日期显示
	date:{
		//显示格式
		format_date:'-',
		format_time:':',
		//数据存储
		show_week:'',
		show_date:'',
		show_time:'',
	}
}
 
 
const getDateTime = (format_time,format_date) => { 
	const days=new  Array ("日", "一", "二", "三", "四", "五", "六"); 
  	const currentDT = new Date();    
	  let y,m,date,day,hs,ms,ss,timeStr,dateStr,weekStr; 
	  y = currentDT.getFullYear(); //四位整数表示的年份  
	  m = currentDT.getMonth(); //月   
	  date = currentDT.getDate(); //日  
	  day = currentDT.getDay(); //星期   
	  hs = currentDT.getHours(); //时  
	  ms = currentDT.getMinutes(); //分  
	  ss = currentDT.getSeconds(); //秒 
	  timeStr =formatNum(hs)+format_time+formatNum(ms)+format_time+formatNum(ss);
	  dateStr = y+format_date+  formatNum(m) +format_date+formatNum(date);
	  weekStr = '星期'+ days[day];
	  if(format_time == 'rongyi'){
	  		timeStr =formatNum(hs)+":"+formatNum(ms);
	  }  
	  if(format_date == 'rongyi'){ 
	  		dateStr = y+'年'+  formatNum(m) +'月'+formatNum(date) + '日';
	  }  
	 globalData.date.show_date = dateStr;
	 globalData.date.show_time = timeStr;
	 globalData.date.show_week = weekStr;
	setTimeout(()=>{getDateTime(globalData.date.format_time,globalData.date.format_date)},1000);    
};     

const formatNum = num => {
	num = num<10 ? '0'+num : num;
	return num
}; 

getDateTime(globalData.date.format_time,globalData.date.format_date); 

module.exports = globalData;