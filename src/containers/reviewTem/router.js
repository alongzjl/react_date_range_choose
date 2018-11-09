


import React        from 'react'
import EditElementCommon from 'reviewTem/page/pageCommon'
import backHome from 'reviewTem/backHome.js'
window.backHomeTime = 30

let defaultData = {
	categories:[
			{
				id:      '5a532b82130b38000b1884a1',
				name:    '餐 饮',
				picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
				sort:    1
			},
			{
				id:      '5a532b82130b38000b1884a2',
				name:    '服 饰',
				picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
				sort:    1
			},
			{
				id:      '5a532b82130b38000b1884a3',
				name:    '亲 子',
				picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
				sort:    1
			},
			{
				id:      '5a532b82130b38000b1884a4',
				name:    '娱 乐',
				picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
				sort:    1
			},
			{
				id:      '5a532b82130b38000b1884a5',
				name:    '其他',
				picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
				sort:    1
			}
		],
	floors:[
			{
				id:      '5a532b82130b38000b1884a1',
				name:    'B1',
				picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
				sort:    1
			},
			{
				id:      '5a532b82130b38000b1884a2',
				name:    'L1',
				picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
				sort:    1
			},
			{
				id:      '5a532b82130b38000b1884a3',
				name:    'L2',
				picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
				sort:    1
			},
			{
				id:      '5a532b82130b38000b1884a4',
				name:    'L3',
				picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
				sort:    1
			},
			{ 
				id:      '5a532b82130b38000b1884a5',
				name:    'L4',
				picture: 'http://rongyi.b0.upaiyun.com/system/mall_area/picture/5a532b82130b38000b1884a7/201801181835551443.jpg',
				sort:    1
			}
		]
} 
export default class RouterRY extends React.Component {
	state = {
		homePage:'p_1000'
	} 
	 componentWillMount() {
	 	let {pageContent,globalData} = this.props.editConfig,
	 	homePage = globalData.data.homepage,
	 	action = {updateGlobal:this.props.actions.updateGlobal,globalData:globalData}
	 	//backHome(homePage,action)
	 	this.setState({homePage:homePage})
	}
	componentDidMount(){
		let {globalData} = this.props.editConfig,
			{ music } = globalData.data
		if(music){
			let dom = document.getElementById('RYAudioShow')
			dom.volume = music.volume/100
		} 
	}
	componentWillReceiveProps(props) {
		let {pageContent,globalData} = props.editConfig,
	 	homePage = globalData.feature.reviewRouter
	 	this.setState({homePage:homePage})
	}  
	render() { 
		let {pageContent,globalData} = this.props.editConfig,
			{ music } = globalData.data
		let dom = Object.keys(pageContent).map(_=>{
			 return pageContent[_].router == this.state.homePage ? <EditElementCommon 
				pageContent={pageContent[_]} 
				globalData={globalData}
				actions={this.props.actions}
				categories={defaultData.categories}
				floors={defaultData.floors}
				key={_}  
				></EditElementCommon> : null
		}) 
		return (  
			<div>{dom}
				{
					music&&music.url ? <audio src={music.url} autoPlay loop id="RYAudioShow"></audio> : null
				}   
			</div> 
		)
	}
}
 
