var scn_data={
		alarm:{alarm:8,fault:12},
		dtu:{ on:150,off:150},
		plc:{on:5,off:8},
		industy:{v1:10,v2:11,v3:12},
		online:{v1:20000,v2:23001,v3:40030,v3:50043,v4:31234,v5:52640},
		almMsg:[{msg:"双峰县污水处理厂B氧化沟一号曝气机过载故障告警,请管理员检查设备运行情况"},
				{msg:"天心区一体化设备断电告警，请管理员检查该站点是否断电"},
				{msg:"古丈县断电告警，请管理员检查该站点是否断电"},
				{msg:"平江A断网告警，请管理员检查该站点是否断网"},
				{msg:"平江B断网告警，请管理员检查该站点是否断网"},
				{msg:"羊楼司断电告警，请管理员检查该站点是否断电"},
				{msg:"花垣断电告警，请管理员检查该站点是否断电"}
				],
		msgCnt:[{msg:100,alm:20},
			{msg:200,alm:40},
			{msg:300,alm:50},
			{msg:400,alm:35},
			{msg:400,alm:40},
			{msg:400,alm:11},
			{msg:400,alm:66},
			{msg:100,alm:77},
			{msg:200,alm:88},
			{msg:300,alm:22},
			{msg:400,alm:99},
			{msg:400,alm:100},
			{msg:400,alm:111},
			{msg:400,alm:222},
			{msg:100,alm:333},
			{msg:200,alm:11},
			{msg:300,alm:33},
			{msg:400,alm:55},
			{msg:400,alm:77},
			{msg:400,alm:90}
			],
		map:[{area:"山东",cnt:20},
			{area:"浙江",cnt:40},
			{area:"江苏",cnt:50},
			{area:"湖南",cnt:50},
            {area:"青海",cnt:50}
		],
		factoryHeader:[
	        {"categories":"单位名"},
	        {"categories":"网关数"},
	        {"categories":"设备数"},
	        {"categories":"数据点"},
	        {"categories":"报警"},
	        {"categories":"操作"}
    	],
		factory:[
			{"company":"双峰污水处理厂","dtuCnt": 3, "plcCnt": 1,"dataCnt": 12,"alarm": "0"},
	        {"company":"高速羊楼司","dtuCnt": 4,"plcCnt": 1,"dataCnt": 21,"alarm": "0"},
	        {"company":"平江A","dtuCnt": 3,"plcCnt": 2,"dataCnt": 22,"alarm": "0"},
	        {"company":"平江B","dtuCnt": 7,"plcCnt": 3,"dataCnt": 45,"alarm": "1"},
	        {"company":"天心区一体化设备","dtuCnt": 1,"plcCnt": 23,"dataCnt": 200,"alarm": "3"},
	        {"company":"花垣","dtuCnt": 8,"plcCnt": 3,"dataCnt": 10,"alarm": "0"},
	        {"company":"XXX","dtuCnt": 9,"plcCnt": 1,"dataCnt": 20,"alarm": "0"}]
	};
var vm = new Vue({
	el: '#content',
	data: scn_data,
	methods: {
		details: function() {
		}
	},
	filters: { //过滤器
		ellipsis(value) {
			if (!value) return '';
			if (value.length > 23) {
				return value.slice(0,20) + '...'
			}
			return value
		}
	},
});