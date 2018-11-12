/**
 * @Author: Along
 * @Date:   2018-11-12

 */


export default function getClientScale(height,scale){
	  var clientHeight=0;
	  if(document.body.clientHeight&&document.documentElement.clientHeight)
	  {
	  var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
	  }
	  else
	  {
	  var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight;
	  }
	  clientHeight = parseInt(clientHeight/height*scale)/100
	  return clientHeight;
}
