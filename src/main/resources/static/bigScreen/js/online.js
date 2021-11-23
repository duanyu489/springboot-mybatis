$(function() {
    var dom = document.getElementById("container2");
    var myChart = echarts.init(dom);
    var app = {};
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['雨花区一体化设备', '双峰污水处理厂', '高速羊楼司', '平江A', '平江B']
        },
        color : [ 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple' ],
        series: [
            {
                name: '出水量',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: vm.online.v1, name: '雨花区一体化设备'},
                    {value: vm.online.v2, name: '双峰污水处理厂'},
                    {value: vm.online.v3, name: '高速羊楼司'},
                    {value: vm.online.v4, name: '平江A'},
                    {value: vm.online.v5, name: '平江B'}
                ]
            }
        ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
});