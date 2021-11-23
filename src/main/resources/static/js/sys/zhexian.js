$(function () {
    changeActiveDate();
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
        title: {
            text: '折线图堆叠'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '邮件营销',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '联盟广告',
                type: 'line',
                stack: '总量',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '视频广告',
                type: 'line',
                stack: '总量',
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: '直接访问',
                type: 'line',
                stack: '总量',
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: '搜索引擎',
                type: 'line',
                stack: '总量',
                data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
    };
    myChart.setOption(option);


    var myChart1 = echarts.init(document.getElementById('main1'));
    var option1 = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['一', '二', '三', '四', '五', '六', '七']
                },
                toolbox: {
                    feature: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    }
                },
                color:['#1E90FF'],
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar'
                }]
            };
    myChart1.setOption(option1);


    var myChart2 = echarts.init(document.getElementById('main2'));
    var option2 = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            left: 10,
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
            {
                name: '访问来源',
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
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'},
                    {value: 135, name: '视频广告'},
                    {value: 1548, name: '搜索引擎'}
                ]
            }
        ]
    };

    myChart2.setOption(option2);
});
var vm = new Vue({
    el:'#rrapp',
    data:{

    },
    created: function() {

    },
    methods: {
        search:function (event) {
            $.ajax({
                type: "POST",
                url:"../caipiao/yuce",
                data:{},
                dataType: "json",
                success: function(result){
                    if(result.code == 0){
                        layer.alert("下一期中奖号码为："+result.msg);
                    }
                }
            });
        },

    }
});



var startTimeDefault = '';
function changeActiveDate()
{
    //选择年月日
    $('#starttimespan').html('');
    var starttimehtml = '<input id="xjDate" type="text" class=""  style="height:32px;width:150px;"/>';
    $('#starttimespan').html(starttimehtml);

    var maxchoose = 0;
    var datetypeDefault = 'date';
    startTimeDefault = '';
    $('#xjDate').val('');

    laydate.render({
        elem: '#xjDate',
        type: datetypeDefault,
        value:startTimeDefault,
        done: function(value, date, endDate){

        },
        max: maxchoose
    });
    $('#xjDate').val(startTimeDefault);
}
