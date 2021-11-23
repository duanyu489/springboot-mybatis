$(function () {
	initMap();//创建和初始化地图

});
//创建和初始化地图函数：
function initMap(){
	createMap();//创建地图
	setMapEvent();//设置地图事件
	addMapControl();//向地图添加控件
}

//创建地图函数：
var map = null;
function createMap(){
	map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
	var point = new BMap.Point(112.94547,28.23489);//定义一个中心点坐标
	map.centerAndZoom(point,11);//设定地图的中心点和坐标并将地图显示在地图容器中
	window.map = map;//将map变量存储在全局
	//changeMapStyle('light');
	getSites();

}
//改变主题
function changeMapStyle(style){
	var mapStyle ={
		//features: ["road","building","water","land"],//隐藏地图上的"poi",
		style : style,
	};
	map.setMapStyle(mapStyle);
}
//地图事件设置函数：
function setMapEvent(){
	map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
	map.enableScrollWheelZoom();//启用地图滚轮放大缩小
	map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
	map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl(){
	//向地图中添加缩放控件
	var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	map.addControl(ctrl_nav);
	//向地图中添加缩略图控件
	var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
	map.addControl(ctrl_ove);
	//向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	map.addControl(ctrl_sca);
}

function getSites() {
	var alarmIcon = new BMap.Icon("../img/mapRed.png", new BMap.Size(30,30));
	var okIcon = new BMap.Icon("../img/mapGreen.png", new BMap.Size(30,30));

	var sites = [
		{id:1,name:"我家",onoff:"1",lat:'112.902476',log:'28.085352'},
		{id:2,name:"站点1号",onoff:"1",lat:'113.023909',log:'28.100057'},
		{id:3,name:"站点2号",onoff:"0",lat:'113.019956',log:'28.116721'},
		{id:4,name:"站点3号",onoff:"1",lat:'113.03706',log:'28.128206'},
		{id:5,name:"站点4号",onoff:"1",lat:'113.027969',log:'28.203169'},
		{id:6,name:"站点5号",onoff:"1",lat:'112.948631',log:'28.188397'},
		{id:7,name:"站点6号",onoff:"1",lat:'113.188371',log:'28.157318'},
		{id:8,name:"站点7号",onoff:"0",lat:'113.042917',log:'28.307532'},
		{id:10,name:"站点9号",onoff:"1",lat:'113.093797',log:'28.330682'},
		{id:12,name:"站点11号",onoff:"1",lat:'112.962429',log:'27.995664'}
	];

	for (var i = 0; i < sites.length; i++) {
		var site = sites[i];
		var id = site.id;
		var name = site.name;
		var onoff = site.onoff;
		var lat = site.lat;
		var log = site.log;

		var point =new BMap.Point(lat,log); //设置标注的经纬度
		var useIcon = alarmIcon;
		var alarmmsg = '在线';
		if(onoff == '0'){
			useIcon = okIcon;
			alarmmsg = '离线';
		}

		var marker = new BMap.Marker(point,{icon:useIcon});
		marker.id = id;
		marker.name = name;
		marker.alarmmsg = alarmmsg;

		map.addOverlay(marker);  // 把标注添加到地图上

		marker.addEventListener("click", function(){
			var _thatm = this;
			var sid = _thatm.id;
			var content = "<table>";
			content += "<tr><td>名称：<font color='#00FF00'>"+this.name+"</font></td></tr>";
			content += "<tr><td>状态：<font color='#00FF00'>"+this.alarmmsg+"</font></td></tr>" +
				"<tr><td><a href='../svg/yitihua.html'><font color='#0000FF'>跳转到查看</font></a></td></tr>";
			content += "</table>";
			var infowindow = new BMap.InfoWindow(content);
			console.log(infowindow);
			this.openInfoWindow(infowindow);
		});
	}
}