var area = '',
    area_txt = '',
    typeId = '';
    // submenu = '';
if (getUrl()[0].slice(0, 4) === 'area') {
    area = getUrl()[0].substring(5);
    area_txt = CustomDecode(area)
}
// if (getUrl()[1].slice(0, 7) === 'submenu') {
//     submenu = getUrl()[1].substring(8);
// }

// 八大类转数字
function txtToNum(area_txt) {
    var hash = [];
    hash['物联网'] = 1;
    hash['云计算'] = 2;
    hash['大数据'] = 3;
    hash['人工智能'] = 4;
    hash['未来计算'] = 5;
    hash['信息安全'] = 6;
    hash['智能制造'] = 7;
    hash['集成电路'] = 8;
    return hash[area_txt];
}

if (area_txt) {
    typeId = txtToNum(area_txt);
}

$(function () {
    var af = $('.auto-href');
    for (var i = 0; i < af.length; i++) {
        var val = CustomEnCode($(af[i]).attr("value"));
        var id = $(af[i]).attr('data-id');
        af[i].href = 'InternetThings/ThingsList.html?area=' + area + '&submenu=' + af[i].rel + '&id=' + id + '&top=' + val;
    }
});

/**
 *
 * @param url
 * @param type
 * @param sub_srv
 * @param _type
 * @param size
 * @param num_id
 * @param elementId
 * @param page
 * @param top
 * @constructor
 */
function SubIndexComLoad(url, type, sub_srv, _type, size, num_id, elementId, page, top) {
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "area_type": type,
            "sub_srv": sub_srv,
            "doc_Type": "",
            "interpret_type": _type,
            "fromIndex": 0,
            "Size": size
        },
        dataType: "text",
        success: function (reslut) {
            if (reslut != "") {
                var html = "";
                reslut = loadXML(reslut);
                reslut = jQuery.parseJSON(reslut);
                // console.log(reslut);
                $(elementId).empty();
                $.each(reslut, function (a, b) {
                    html += "<li>"
                        + '<a href="InternetThings/' + page + '?area=' + area + '&submenu=' + sub_srv + '&id=' + num_id + '&top=' + CustomEnCode(top) + '&pid=' + b.id + '">' + b.title
                        + '</a>'
                        + '<span>' + b.fromTime.substring(5, 10) + '</span>'
                        + "</li>";
                });
                $(elementId).html(html);
            }
        }
    })
}

$(function () {
    var url = LoadUrl() + "axis2/services/MyService/getNormalNewsList";
    var top = "产业新闻";
    var type = CustomDecode(getUrl()[0].substring(5));
    //产业动态
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "area_type": type,
            "sub_srv": "10",
            "doc_Type": "",
            "interpret_type": "",
            "fromIndex": 0,
            "Size": 4
        },
        dataType: "text",
        success: function (result) {
            var html = "";
            if (result != "") {
                result = loadXML(result);
                var r = jQuery.parseJSON(result);
                $(".textnews2").empty();
                $.each(r, function (a, b) {
                    html += "<li>"
                        + '<h3><a href="InternetThings/NewsShow.html?area=' + area + '&submenu=10&id=0&top=' + CustomEnCode(top) + '&pid=' + b.id + '">' + b.title + '</a></h3>'
                        + '<p>' + b.stick_abstract.substring(0, 100) + "..." + '</p>'
                        + "</li>"
                });
                $(".textnews2").html(html);
            }
        }
    });
    // 热点分析
    $.ajax({
        type: "GET",
        url: 'http://172.16.155.201:8080/HotTopicServer/getWordHotTrend',
        data: {
            "class_num": typeId,
            "topic_id": 0
        },
        dataType: "json",
        success: function (HotWordsTrendData) {
            var sub_hot = echarts.init(document.getElementById('sub_hot'));
            var sub_hot_option = {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: HotWordsTrendData[0]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: HotWordsTrendData[1]
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: HotWordsTrendData[0][0],
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        // stack: '总量',
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(137, 189, 27, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(137, 189, 27, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(137,189,27)',
                                borderColor: 'rgba(137,189,2,0.27)',
                                borderWidth: 12

                            }
                        },
                        data: HotWordsTrendData[2][0]
                    },
                    {
                        name: HotWordsTrendData[0][1],
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        // stack: '总量',
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(0, 136, 212, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(0, 136, 212, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(0,136,212)',
                                borderColor: 'rgba(0,136,212,0.2)',
                                borderWidth: 12

                            }
                        },
                        data: HotWordsTrendData[2][1]
                    },
                    {
                        name: HotWordsTrendData[0][2],
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        // stack: '总量',
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(204,120,50, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(204,120,50, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {

                                color: 'rgb(204,120,50)',
                                borderColor: 'rgba(204,120,50,0.2)',
                                borderWidth: 12
                            }
                        },
                        data: HotWordsTrendData[2][2]
                    },
                    {
                        name: HotWordsTrendData[0][3],
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        // stack: '总量',
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(150,135,190, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(150,135,190, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {

                                color: 'rgb(150,135,190)',
                                borderColor: 'rgba(150,135,190,0.2)',
                                borderWidth: 12
                            }
                        },
                        data: HotWordsTrendData[2][3]
                    },
                    {
                        name: HotWordsTrendData[0][4],
                        type: 'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        // stack: '总量',
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(219, 50, 51, 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(219, 50, 51, 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {

                                color: 'rgb(219,50,51)',
                                borderColor: 'rgba(219,50,51,0.2)',
                                borderWidth: 12
                            }
                        },
                        data: HotWordsTrendData[2][3]
                    }
                ]
            };
            sub_hot.setOption(sub_hot_option)
        },
        error: function () {
            console.log('热点分析数据请求失败！');
        }
    });
    // 技术预警
    $.ajax({
        type: "GET",
        url: 'http://172.16.155.203:8080/TechObservationWeb/GetTerritoryTrendByFieldName',
        data: {
            "parameters": typeId
        },
        dataType: "json",
        success: function (TecAreaData) {
            var ser = [];
            for (var i = 2, j = {}, len = TecAreaData.length; i < len; i++) {
                j = {
                    visualMap: {
                        max: (TecAreaData[i].length === 0) ? 200 : TecAreaData[i][0].value
                    },
                    series: [
                        {
                            name: '机构地区分布',
                            data: TecAreaData[i]
                        }
                    ]
                };
                ser.push(j)
            }
            // console.log(ser);
            var sub_tec = echarts.init(document.getElementById('sub_tec'));
            var sub_tec_option = {
                baseOption: {
                    backgroundColor: '#efefef',
                    timeline: {
                        // y: 0,
                        axisType: 'category',
                        // realtime: false,
                        // loop: false,
                        autoPlay: true,
                        // currentIndex: 2,
                        playInterval: 3000,
                        // controlStyle: {
                        //     position: 'left'
                        // },
                        data: TecAreaData[1]
                    },
                    title: {
                        text: area_txt + '-研究机构数量地域分布图',
                        subtext: '',
                        sublink: '',
                        left: 'center',
                        top: 10
                    },
                    grid: {
                        right: '3%'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    visualMap: {
                        left: 30,
                        text: ['High', 'Low'],
                        realtime: false,
                        calculable: true,
                        inRange: {
                            color: ['lightskyblue', 'yellow', 'orangered']
                        }
                    },
                    series: [{
                        name: '机构地区分布',
                        type: 'map',
                        mapType: 'world',
                        // roam: true,
                        itemStyle: {
                            emphasis: {label: {show: true}}
                        }
                    }]
                },
                options: ser
            };
            sub_tec.setOption(sub_tec_option)
        },
        error: function () {
            console.log('技术预警数据请求失败！');
        }
    });

    //法律浏览
    SubIndexComLoad(url, type, '13', "", 9, 3, '#lawshowid', 'DetailShow.html',"法规浏览");
    //政策解读-专家解读
    SubIndexComLoad(url, type, '14', '专家', 7, 4, '#ContentBox11', 'NewsShow.html', "专家解读");
    //政策解读-媒体解读
    SubIndexComLoad(url, type, '14', '媒体', 7, 4, '#ContentBox12', 'NewsShow.html', "媒体解读");

    // 品牌监测
    $.ajax({
        type: 'POST',
        url: 'http://172.16.155.202:8080/axis2/services/BrandMonitor/getBrandOverview',
        data: {
            "class_num": typeId,
            "time_start": '2017-04-30',
            "time_end": '2017-06-30'
        },
        dataType: 'text',
        success: function (RawData) {
            var data = loadXML(RawData);
            data = jQuery.parseJSON(data);
            // console.log(data);
            var len = data.length;
            // 寻找x轴数据最小值
            var x_min = data[0][2] * 1;
            for (var m = 1; m < len; m++) {
                if ((data[m][2] * 1) < x_min) {
                    x_min = data[m][2] * 1
                }
            }
            x_min = (x_min - 0.02).toFixed(1) * 1; // 修正
            // console.log(x_min);
            var _data = [];
            for (var i = 0; i < len; i++) {
                var j = new Array(5);
                j[0] = data[i][2];
                j[1] = data[i][3];
                j[2] = data[i][0];
                j[3] = data[i][1];
                j[4] = data[i][4];
                _data.push(j);
            }
            var chart_sub_brand = echarts.init(document.getElementById('sub_brand'));
            var schema = [
                {name: 'color', index: 0, text: '负面敏感度'},
                {name: 'size', index: 1, text: '价值认可度'},
                {name: 'x', index: 2, text: '品牌喜好度'},
                {name: 'y', index: 3, text: '品牌关注度'},
                {name: 'name', index: 4, text: ''}
            ];
            var itemStyle = {
                normal: {
                    opacity: 0.8,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            };
            var sub_brand_option = {
                backgroundColor: '#404a59',
                title: {
                    text: area_txt + '-品牌四维值总览',
                    textStyle: {
                        color: '#fff',
                        fontSize: 16
                    },
                    left: 'center'
                },
                color: [
                    '#dd4444', '#fec42c', '#80F1BE'
                ],
                grid: {
                    x: 40,
                    x2: 130,
                    y: 50,
                    y2: 30
                },
                tooltip: {
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    formatter: function (obj) {
                        var value = obj.value;
                        return '<div style="color: #fff;border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                            + value[4]
                            + '</div>'
                            + schema[0].text + '：' + value[0] + '<br>'
                            + schema[1].text + '：' + value[1] + '<br>'
                            + schema[2].text + '：' + value[2] + '<br>'
                            + schema[3].text + '：' + value[3] + '<br>';
                    }
                },
                xAxis: {
                    type: 'value',
                    name: '负面敏感度',
                    // nameGap: 16,
                    min: x_min,
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 14
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '价值认可度',
                    nameLocation: 'end',
                    nameGap: 20,
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 14
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                visualMap: [
                    {
                        left: 'right',
                        top: '1%',
                        dimension: 2,
                        min: 0,
                        max: 1,
                        itemWidth: 10,
                        itemHeight: 50,
                        calculable: true,
                        precision: 0.01,
                        text: ['圆形大小：品牌关注度'],
                        textGap: 30,
                        textStyle: {
                            color: '#fff'
                        },
                        inRange: {
                            symbolSize: [10, 70]
                        },
                        outOfRange: {
                            symbolSize: [10, 70],
                            color: ['rgba(255,255,255,.2)']
                        },
                        controller: {
                            inRange: {
                                color: ['#c23531']
                            },
                            outOfRange: {
                                color: ['#444']
                            }
                        }
                    },
                    {
                        left: 'right',
                        bottom: '7%',
                        dimension: 3,
                        min: 0,
                        max: 1,
                        itemWidth: 10,
                        itemHeight: 50,
                        calculable: true,
                        precision: 0.01,
                        text: ['颜色深度：品牌喜好度'],
                        textGap: 30,
                        textStyle: {
                            color: '#fff'
                        },
                        inRange: {
                            colorLightness: [1, 0.4]
                        },
                        outOfRange: {
                            color: ['rgba(255,255,255,.2)']
                        },
                        controller: {
                            inRange: {
                                color: ['#c23531']
                            },
                            outOfRange: {
                                color: ['#444']
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: area_txt + '品牌四维值总览',
                        type: 'scatter',
                        itemStyle: itemStyle,
                        data: _data
                    }
                ]
            };
            chart_sub_brand.setOption(sub_brand_option);
        },
        error: function () {
            console.log('品牌监测数据请求失败！');
        }
    })
});
