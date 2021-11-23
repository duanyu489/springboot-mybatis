$(function() {

    var dom = document.getElementById("container4");
    var myChart = echarts.init(dom);
    var tlen = 7;
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '20',
            containLabel: true
        },
        calculable: true,
        legend: {
            x: '60px',
            y: '5px',
            data: ['用电量', '出水量'],
            textStyle: {
                color: '#ccc'
            }
        },
        xAxis: [
            {
                type: 'category',
                axisLabel: {
//                    interval:0,//横轴信息全部显示
                    rotate: -15,//-15度角倾斜显示
                    textStyle: {
                        color: '#DC143C'
                    }
                },
                data: ['2020-07-28','2020-07-29','2020-07-30','2020-07-31','2020-08-01','2020-08-02','2020-08-03']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '用电量',
                axisLabel: {
                    formatter: '{value} °'
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                }
            },
            {
                type: 'value',
                name: '出水量',
                axisLabel: {
                    formatter: '{value} m³'
                },
                axisLine: {
                    lineStyle: {
                        color: '#ccc'
                    }
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '用电量',
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#00ff00',
                        lineStyle: {
                            color: '#00ff00'
                        },
                        label: {
                            show: true,
                            position: 'top',
                            textStyle: {
                                fontSize: 12,
                                color: "#0000FF"
                            }
                        }
                    }
                },
                data: ['21','122','341','441','652','222','333']
            },
            {
                name: '出水量',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: '#00FFFF',
                        lineStyle: {
                            color: '#00FFFF'
                        },
                        label: {
                            show: true,
                            position: 'inside',
                            formatter: function (param) {
                                if (tlen <= 7) {
                                    if (param.dataIndex % 4 == 0) {
                                        return param.value;
                                    } else if (param.dataIndex % 4 == 1) {
                                        return '\n\n\n\n' + param.value;
                                    } else if (param.dataIndex % 4 == 2) {
                                        return '\n\n' + param.value;
                                    } else if (param.dataIndex % 4 == 3) {
                                        return '\n\n\n\n' + param.value;
                                    }

                                } else {
                                    return '';
                                }
                            },
                            textStyle: {fontSize: 12}
                        }
                    }
                },
                yAxisIndex: 1,
                data: ['222','1211','3421','4422','6215','1212','2344']
            }
        ]
    };

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

});