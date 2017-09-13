$(function () {
    var data0 = splitData([
        ['2013/1/24', 2320.26, 2320.26, 2287.3, 2362.94],
        ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38]
    ]);

    function splitData(rawData) {
        var categoryData = [];
        var values = [];
        for (var i = 0; i < rawData.length; i++) {
            categoryData.push(rawData[i].splice(0, 1)[0]);
            values.push(rawData[i])
        }
        return {
            categoryData: categoryData,
            values: values
        };
    }

    function GuoNei() {
        var url = LoadUrl() + "axis2/services/MyService/getIndexData";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "id": "1",
                "subId": "1"
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                var dataval = jQuery.parseJSON(result[0].values);
                var firstx = dataval[0];
                var firsty1 = dataval[1];
                var firsty2 = dataval[3];
                var firsty3 = dataval[5];
                var firsty4 = dataval[7];
                var bai1 = dataval[2];
                var bai2 = dataval[4];
                var bai3 = dataval[6];
                var bai4 = dataval[8];
                var html = "";
                var xdata = [];
                var xbai1 = [];
                var xbai2 = [];
                var xbai3 = [];
                var xbai4 = [];
                for (var i = firstx.length - 1; i >= 0; i--) {
                    xdata.push(firstx[i]);
                    xbai1.push(bai1[i]);
                    xbai2.push(bai2[i]);
                    xbai3.push(bai3[i]);
                    xbai4.push(bai4[i]);
                }
                for (var i = 0; i < firstx.length; i++) {
                    for (var j = 0; j < firsty1.length; j++) {
                        if (j == i) {
                            for (var n = 0; n < bai1.length; n++) {
                                //if (n >= 10)
                                //{
                                //    break;
                                //}
                                if (n == j) {
                                    html += '<tr style="height:30px;">'
                                        + '<td style="width:200px;">' + firstx[i] + '</td>'
                                        + '<td style="width:100px;">' + firsty1[j] + '</td>'
                                        + '<td style="width:70px;color:red;">' + bai1[n] + '%</td>'
                                        + '<td style="width:100px;">' + firsty2[j] + '</td>'
                                        + '<td style="width:70px;color:red;">' + bai2[n] + '%</td>'
                                        + '<td style="width:100px;">' + firsty3[j] + '</td>'
                                        + '<td style="width:70px;color:red;">' + bai3[n] + '%</td>'
                                        + '<td style="width:100px;">' + firsty4[j] + '</td>'
                                        + '<td style="width:70px;color:red;">' + bai4[n] + '%</td>'
                                        + '</tr>';
                                }
                            }
                        }
                    }
                }
                $("#tbodyid").html(html);
                var legend = ['国内生产总值（%）', '第一产业（%）', '第二产业（%）', '第三产业（%）'];
                var mychart = echarts.init(document.getElementById("pid"));
                mychart.setOption({
                    //title: {
                    //    text: '国内生产总值',
                    //    left: 0
                    //},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: legend
                    },
                    grid: {
                        left: '10%',
                        right: '4%',
                        bottom: '10%'
                    },
                    //toolbox: {
                    //    show: true,
                    //    feature: {
                    //        saveAsImage: { show: true }
                    //    }
                    //},
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: xdata
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitArea: {show: true}
                        }
                    ],
                    series: [
                        {
                            name: '国内生产总值（%）',
                            type: 'line',
                            //stack: '总量',
                            itemStyle: {
                                normal: {
                                    color: '#d13ca2',
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid'
                                    }
                                },
                                emphasis: {
                                    color: 'blue'
                                }
                            },
                            data: xbai1
                        },
                        {
                            name: '第一产业（%）',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: '#3f0194',
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid'
                                    }
                                },
                                emphasis: {
                                    color: 'blue'
                                }
                            },
                            data: xbai2
                        },
                        {
                            name: '第二产业（%）',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: '#63ed01',
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid'
                                    }
                                },
                                emphasis: {
                                    color: 'blue'
                                }
                            },
                            data: xbai3
                        },
                        {
                            name: '第三产业（%）',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: '#fbd501',
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid'
                                    }
                                },
                                emphasis: {
                                    color: 'blue'
                                }
                            },
                            data: xbai4
                        }
                    ]
                });
            }
        })
    }

    function CaiGou() {
        var url = LoadUrl() + "axis2/services/MyService/getIndexData";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "id": "1",
                "subId": "2"
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                var dataval = jQuery.parseJSON(result[0].values);
                var firstx = dataval[0];
                var firsty1 = dataval[1];
                var firsty2 = dataval[3];
                var bai1 = dataval[2];
                var bai2 = dataval[4];
                var html = "";
                var xdata = [];
                var xfirsty1 = [];
                var xfirsty2 = [];
                for (var i = firstx.length - 1; i >= 0; i--) {
                    xdata.push(firstx[i]);
                    xfirsty1.push(firsty1[i]);
                    xfirsty2.push(firsty2[i]);
                }
                for (var i = 0; i < firstx.length; i++) {
                    for (var j = 0; j < firsty1.length; j++) {
                        if (j == i) {
                            for (var n = 0; n < bai1.length; n++) {
                                if (n == j) {
                                    html += '<tr style="height:30px;">'
                                        + '<td style="width:200px;">' + firstx[i] + '</td>'
                                        + '<td style="width:70px;">' + firsty1[j] + '</td>'
                                        + '<td style="width:70px;color:red;">' + bai1[n] + '%</td>'
                                        + '<td style="width:70px;">' + firsty2[j] + '</td>'
                                        + '<td style="width:70px;color:red;">' + bai2[n] + '%</td>'
                                        + '</tr>';
                                }
                            }
                        }
                    }
                }
                $("#cgtbodyid").html(html);
                var legend = ['制造业', '非制造业'];
                var mychart = echarts.init(document.getElementById("cgid"));
                mychart.setOption({
                    //title: {
                    //    text: '采购经理人指数PMI',
                    //    left: 0
                    //},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: legend
                    },
                    grid: {
                        left: '10%',
                        right: '4%',
                        bottom: '10%'
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: xdata
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitArea: {show: true}
                        }
                    ],
                    series: [
                        {
                            name: '制造业',
                            type: 'line',
                            //stack: '总量',
                            itemStyle: {
                                normal: {
                                    color: '#3f0194',
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid'
                                    }
                                },
                                emphasis: {
                                    color: 'blue'
                                }
                            },
                            data: xfirsty1
                        },
                        {
                            name: '非制造业',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: '#63ed01',
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid'
                                    }
                                },
                                emphasis: {
                                    color: 'blue'
                                }
                            },
                            data: xfirsty2
                        }
                    ]
                });
            }
        })
    }

    function QiYe() {
        var url = LoadUrl() + "axis2/services/MyService/getIndexData";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "id": "1",
                "subId": "3"
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                var dataval = jQuery.parseJSON(result[0].values);
                var firstx = dataval[0];
                var firsty1 = dataval[1];
                var firsty2 = dataval[2];
                var firsty3 = dataval[3];
                var bai1 = dataval[4];
                var bai2 = dataval[5];
                var bai3 = dataval[6];
                var html = "";
                var xdata = new Array();
                var xfirsty1 = new Array();
                var xbai1 = new Array();
                for (var i = firstx.length - 1; i >= 0; i--) {
                    xdata.push(firstx[i]);
                    xfirsty1.push(firsty1[i]);
                    xbai1.push(bai1[i]);
                }
                for (var i = 0; i < firstx.length; i++) {
                    for (var j = 0; j < firsty1.length; j++) {
                        if (j == i) {
                            for (var n = 0; n < bai1.length; n++) {
                                if (n == j) {
                                    html += '<tr style="height:30px;">'
                                        + '<td style="width:200px;">' + firstx[i] + '</td>'
                                        + '<td style="width:70px;">' + firsty1[j] + '</td>'
                                        + '<td style="width:70px; color:red;">' + firsty2[j] + '%</td>'
                                        + '<td style="width:70px; color:red;">' + firsty3[j] + '%</td>'
                                        + '<td style="width:70px;">' + bai1[n] + '</td>'
                                        + '<td style="width:70px; color:red;">' + bai2[n] + '%</td>'
                                        + '<td style="width:70px; color:red;">' + bai3[n] + '%</td>'
                                        + '</tr>';
                                }
                            }
                        }
                    }
                }
                $("#qytbodyid").html(html);
                var legend = ['企业景气指数', '企业家信心指数'];
                var mychart = echarts.init(document.getElementById("qyid"));
                mychart.setOption({
                    //title: {
                    //    text: '企业景气及企业家信心指数',
                    //    left: 0
                    //},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: legend
                    },
                    grid: {
                        left: '10%',
                        right: '4%',
                        bottom: '10%'
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: xdata
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitArea: {show: true}
                        }
                    ],
                    series: [
                        {
                            name: '企业景气指数',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: '#3f0194',
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid'
                                    }
                                },
                                emphasis: {
                                    color: 'blue'
                                }
                            },
                            //stack: '总量',
                            data: xfirsty1
                        },
                        {
                            name: '企业家信心指数',
                            type: 'line',
                            itemStyle: {
                                normal: {
                                    color: '#63ed01',
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid'
                                    }
                                },
                                emphasis: {
                                    color: 'blue'
                                }
                            },
                            data: xbai1
                        }
                    ]
                });
            }
        })
    }

    function GongYe1() {
        var gnurl = LoadUrl() + "axis2/services/MyService/getIndexData";
        $.ajax({
            type: "POST",
            url: gnurl,
            data: {
                "id": "2",
                "subId": "1"
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                result = jQuery.parseJSON(result[0].values);
                var xdata = result[0];
                var ydata = result[1];
                var xxdata = new Array();
                var yydata = new Array();
                for (var i = xdata.length - 1; i >= 0; i--) {
                    xxdata.push(xdata[i]);
                    yydata.push(ydata[i]);
                }
                var Gmycharts = echarts.init(document.getElementById("gid"));
                var option = {
                    title: {
                        text: '工业增加值',
                        left: 0
                    },
                    legend: {
                        data: ['工业增加值（亿元）']
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '10%',
                        right: '4%',
                        bottom: '20%'
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: xxdata
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitArea: {show: true}
                        }
                    ],
                    series: [
                        {
                            name: '工业增加值（亿元）',
                            type: 'line',
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                    color: 'red',
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid'
                                    }
                                },
                                emphasis: {
                                    color: 'blue'
                                }
                            },
                            data: yydata
                        }
                    ]
                };
                Gmycharts.setOption(option);
            }
        })
    }

    function GongYe2() {
        var gnurl = LoadUrl() + "axis2/services/MyService/getIndexData";
        $.ajax({
            type: "POST",
            url: gnurl,
            data: {
                "id": "2",
                "subId": "2"
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                result = jQuery.parseJSON(result[0].values);
                var xdata = result[0];
                var ydata = result[1];
                var xxdata = new Array();
                var yydata = new Array();
                for (var i = xdata.length - 1; i >= 0; i--) {
                    xxdata.push(xdata[i]);
                    yydata.push(ydata[i]);
                }
                var Gmycharts = echarts.init(document.getElementById("gyid"));
                var option = {
                    title: {
                        text: '工业增加值增长速度',
                        left: 0
                    },
                    legend: {
                        data: ['工业增加值增长速度']
                    },
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '10%',
                        right: '4%',
                        bottom: '20%'
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: xxdata
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitArea: {show: true}
                        }
                    ],
                    series: [
                        {
                            name: '工业增加值增长速度',
                            type: 'line',
                            stack: '总量',
                            itemStyle: {
                                normal: {
                                    color: 'red',
                                    lineStyle: {        // 系列级个性化折线样式
                                        width: 3,
                                        type: 'solid'
                                    }
                                },
                                emphasis: {
                                    color: 'blue'
                                }
                            },
                            data: yydata
                        }
                    ]
                };
                Gmycharts.setOption(option);

            }
        })
    }

    function SetTimeToTable(id, subId, obj) {
        var timeurl = LoadUrl() + "axis2/services/MyService/getIndexDateList";

        $.ajax({
            type: "POST",
            url: timeurl,
            data: {
                "id": id,
                "subId": subId
            },
            dataType: "text",
            success: function (result) {
                var html = "";
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                var html = "";
                $.each(result, function (a, b) {
                    html += '<option>' + b.time + '</option>';
                })
                $(obj).html(html);
            }
        })
    }

    function GongYe3() {
        SetTimeToTable("2", "3", "#control_time_gongye3");
        //if (typeof (html) != "undefined") {

        var date = $("#control_time_gongye3").find("option:selected").text();
        GongYe3Info(date);
        //}
    }

    function GongYe3Info(date) {
        var gnurl = LoadUrl() + "axis2/services/MyService/getIndexDataSpecial";
        $.ajax({
            type: "POST",
            url: gnurl,
            data: {
                "id": "2",
                "subId": "3",
                "date": date
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                result = jQuery.parseJSON(result[0].values);
                var timebox = result[0];
                var year = result[1];
                var count = result[2];
                var html = "";
                var time = "";
                //$.each(timebox, function (a, b) {
                //    time += '<option>' + b + '</option>';
                //})

                for (var i = 0; i < timebox.length; i++) {
                    html += "<tr>"
                        + "<td style='width:63.3%;'>" + timebox[i] + "</td>"
                        + "<td style='width:18.6%;'>" + year[i] + "</td>"
                        + "<td>" + count[i] + "</td>"
                        + "<tr>";
                }
                $("#areaid").html(html);
            }
        })
    }

    $("#control_time_gongye3").change(function () {
        var date = $(this).find("option:selected").text();
        GongYe3Info(date);
    });

    function GongYe4() {
        var gnurl = LoadUrl() + "axis2/services/MyService/getIndexData";
        $.ajax({
            type: "POST",
            url: gnurl,
            data: {
                "id": "2",
                "subId": "4"
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                result = jQuery.parseJSON(result[0].values);
                var html = "";
                var head = "";
                $.each(result, function (a, b) {
                    //if (a == 0)
                    //{
                    //    $.each(b, function (c, d) {
                    //        //if (c == 0) {
                    //        //    head += '<th">' + d + '</th>';
                    //        //} else if (c == parseInt(b.length - 1)) {
                    //        //    head += '<th">' + d + '</th>';
                    //        //}
                    //        //else {
                    //        //    head += '<th>' + d + '</th>';
                    //        //}
                    //        head += '<th>' + d + '</th>';
                    //    })
                    //    $("#headid").html(head);
                    //}
                    //else
                    //{
                    //    html += "<tr>";
                    //    $.each(b, function (c, d) {
                    //        html += '<td>' + d + '</td>';
                    //    })
                    //    html += "</tr>";
                    //}
                    html += "<tr>";
                    $.each(b, function (c, d) {
                        html += '<td>' + d + '</td>';
                    });
                    html += "</tr>";
                });
                $("#gmid").html(html);
            }
        })
    }

    function GongYe5() {
        var gnurl = LoadUrl() + "axis2/services/MyService/getIndexData";
        $.ajax({
            type: "POST",
            url: gnurl,
            data: {
                "id": "2",
                "subId": "5"
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                result = jQuery.parseJSON(result[0].values);
                var xdata = result[0];
                var ydata = result[1];
                var xxdata = new Array();
                var yydata = new Array();
                for (var i = xdata.length - 1; i >= 0; i--) {
                    xxdata.push(xdata[i]);
                    yydata.push(ydata[i]);
                }
                var Gmycharts = echarts.init(document.getElementById("qyzzid"));
                var option = {
                    title: {
                        text: "规模以上工业企业主要效益(亿元)"
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['效益（亿元）']
                    },
                    //grid: {
                    //    left: '8%',
                    //    bottom:'8%'
                    //},
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: xxdata
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitArea: {show: true}
                        }
                    ],
                    series: [
                        {
                            name: '效益（亿元）',
                            type: 'bar',
                            data: yydata
                        }
                    ]
                };
                Gmycharts.setOption(option);
            }
        })
    }

    function SixValue(time) {
        var gnurl = LoadUrl() + "axis2/services/MyService/getIndexDataSpecial";
        $.ajax({
            type: "POST",
            url: gnurl,
            data: {
                "id": "2",
                "subId": "6",
                "date": time
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                result = jQuery.parseJSON(result[0].values);
                var html = "";
                var head = "";
                $.each(result, function (a, b) {
                    html += "<tr>";
                    $.each(b, function (c, d) {
                        if (c == 0) {
                            html += '<td style="width:62%;">' + d + '</td>';
                        }
                        else if (c == 1 || c == 2) {
                            html += '<td style="width:6.5%;">' + d + '</td>';
                        }
                        else if (c == 3) {
                            html += '<td style="width:13%;">' + d + '</td>';
                        }
                        else {
                            html += '<td>' + d + '</td>';
                        }
                    });
                    html += "</tr>";
                });
                $("#six_tableid").html(html);
            }
        })
    }

    function GongYe6() {
        SetTimeToTable("2", "6", "#six_timeid");
        var date = $("#six_timeid").find("option:selected").text();
        SixValue(date);
    }

    $("#six_timeid").change(function () {
        var date = $(this).find("option:selected").text();
        SixValue(date);
    });

    function SevenValue(time) {
        var gnurl = LoadUrl() + "axis2/services/MyService/getIndexDataSpecial";
        $.ajax({
            type: "POST",
            url: gnurl,
            data: {
                "id": "2",
                "subId": "7",
                "date": time
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                result = jQuery.parseJSON(result[0].values);
                var timebox = result[0];
                var year = result[1];
                var count = result[2];
                var html = "";
                var time = "";
                for (var i = 0; i < timebox.length; i++) {
                    html += "<tr>"
                        + "<td style='width:63.3%;'>" + timebox[i] + "</td>"
                        + "<td style='width:18.6%;'>" + year[i] + "</td>"
                        + "<td>" + count[i] + "</td>"
                        + "<tr>";
                }
                $("#seven_tableid").html(html);
            }
        })
    }

    function GongYe7() {
        SetTimeToTable("2", "7", "#seven_timeid");
        var date = $("#seven_timeid").find("option:selected").text();
        SevenValue(date);
    }

    $("#seven_timeid").change(function () {
        var date = $("#seven_timeid").find("option:selected").text();
        SevenValue(date);
    });

    function EightValue(time) {
        var gnurl = LoadUrl() + "axis2/services/MyService/getIndexDataSpecial";
        $.ajax({
            type: "POST",
            url: gnurl,
            data: {
                "id": "2",
                "subId": "8",
                "date": time
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                result = jQuery.parseJSON(result[0].values);
                var html = "";
                var head = "";
                $.each(result, function (a, b) {
                    if (a == 0) {
                        $.each(b, function (c, d) {
                            if (c == 0) {
                                head += '<th style="width:39.4%;">' + d + '</th>';
                            }
                            //} else if (c == parseInt(b.length - 1)) {
                            //    head += '<th>' + d + '</th>';
                            //}
                            else {
                                head += '<th>' + d + '</th>';
                            }
                        });
                        $("#eight_headid").html(head);
                    }
                    else {
                        html += "<tr>";
                        $.each(b, function (c, d) {
                            if (c == 0) {
                                html += '<td style="width:40%;">' + d + '</td>';
                            }
                            else if (c == 1) {
                                html += '<td style="width:31.3%;">' + d + '</td>';
                            }
                            else {
                                html += '<td>' + d + '</td>';
                            }
                        });
                        html += "</tr>";
                    }
                });
                $("#eight_tableid").html(html);
            }
        })
    }

    function GongYe8() {
        SetTimeToTable("2", "8", "#eight_timeid");
        var date = $("#eight_timeid").find("option:selected").text();
        EightValue(date);
    }

    $("#eight_timeid").change(function () {
        var date = $(this).find("option:selected").text();
        EightValue(date);
    });

    function NineValue(time) {
        var gnurl = LoadUrl() + "axis2/services/MyService/getIndexDataSpecial";
        $.ajax({
            type: "POST",
            url: gnurl,
            data: {
                "id": "2",
                "subId": "9",
                "date": time
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                result = jQuery.parseJSON(result[0].values);
                var html = "";
                var head = "";
                $.each(result, function (a, b) {
                    if (a == 0) {
                        $.each(b, function (c, d) {
                            if (c == 0) {
                                head += '<th>' + d + '</th>';
                            } else if (c == parseInt(b.length - 1)) {
                                head += '<th style="width:40%;">' + d + '</th>';
                            }
                            else {
                                head += '<th style="width:40%;">' + d + '</th>';
                            }
                        });
                        $("#nine_headid").html(head);
                    }
                    else {
                        html += "<tr>";
                        $.each(b, function (c, d) {
                            if (c != 0) {
                                html += '<td style="width:40%;">' + d + '</td>';
                            }
                            else {
                                html += '<td>' + d + '</td>';
                            }
                        });
                        html += "</tr>";
                    }
                });
                $("#nine_tableid").html(html);
            }
        })
    }

    function GongYe9() {
        SetTimeToTable("2", "9", "#nine_timeid");
        var date = $("#nine_timeid").find("option:selected").text();
        NineValue(date);
    }

    $("#nine_timeid").change(function () {
        var date = $(this).find("option:selected").text();
        NineValue(date);
    });

    function TenValue(time) {
        var gnurl = LoadUrl() + "axis2/services/MyService/getIndexDataSpecial";
        $.ajax({
            type: "POST",
            url: gnurl,
            data: {
                "id": "2",
                "subId": "10",
                "date": time
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                result = jQuery.parseJSON(result[0].values);
                var html = "";
                var head = "";
                $.each(result, function (a, b) {
                    if (a == 0) {
                        $.each(b, function (c, d) {
                            if (c == 0) {
                                head += '<th>' + d + '</th>';
                            } else if (c == parseInt(b.length - 1)) {
                                head += '<th style="width:40%;">' + d + '</th>';
                            }
                            else {
                                head += '<th style="width:40%;">' + d + '</th>';
                            }
                        });
                        $("#ten_headid").html(head);
                    }
                    else {
                        html += "<tr>";
                        $.each(b, function (c, d) {
                            if (c != 0) {
                                html += '<td style="width:40%;">' + d + '</td>';
                            }
                            else {
                                html += '<td>' + d + '</td>';
                            }
                        });
                        html += "</tr>";
                    }
                });
                $("#ten_tableid").html(html);
            }
        })
    }

    function GongYe10() {
        SetTimeToTable("2", "10", "#ten_timeid");
        var date = $("#ten_timeid").find("option:selected").text();
        TenValue(date);
    }

    $("#ten_timeid").change(function () {
        var date = $(this).find("option:selected").text();
        TenValue(date);
    });

    function InitScience() {
        var url = LoadUrl() + "axis2/services/MyService/getIndexData";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "id": "3",
                "subId": "1"
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                if (result != "") {
                    result = jQuery.parseJSON(result);
                    result = jQuery.parseJSON(result[0].values);
                    var html = "";
                    $.each(result, function (a, b) {
                        html += "<tr>";
                        $.each(b, function (c, d) {
                            html += "<td>" + d + "</td>";
                        });
                        html += "</tr>";
                    });
                    $("#kjzsid").html(html);
                }
            }
        })
    }

    function InitInternet(xdata, serie) {
        var Kmycharts = echarts.init(document.getElementById("kid"));
        Kmycharts.clear();
        var legend = [];
        for (var i = 0; i < serie.length; i++) {
            if ($.inArray(serie[i].name, legend) < 0) {
                legend.push(serie[i].name);
            }
        }
        var koption = {
            title: {
                text: '互联网主要指标',
                left: 0
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                x: 'right',
                y: '8%',
                data: legend
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: xdata
            },
            series: serie
        };
        // console.log(xdata);
        // console.log(serie);
        // console.log(legend);
        Kmycharts.setOption(koption);
    }

    function InitData(subId, tid, num) {
        var url = LoadUrl() + "axis2/services/MyService/getIndexData";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "id": "5",
                "subId": subId
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                if (result != "") {
                    result = jQuery.parseJSON(result);
                    var date = jQuery.parseJSON(result[0].values);
                    var week = jQuery.parseJSON(result[1].values);
                    var month = jQuery.parseJSON(result[2].values);
                    //result = splitData(result[0].values);
                    //date = splitData(date);
                    //week = splitData(week);
                    //month = splitData(month);
                    var flag = [];
                    if (num == 1) {
                        date = splitData(date);
                        flag.push("日K");
                    }
                    else if (num == 2) {
                        date = splitData(week);
                        flag.push("周K");
                    }
                    else if (num == 3) {
                        date = splitData(month);
                        flag.push("月K");
                    }
                    var Gpmycharts = echarts.init(document.getElementById(tid));

                    var gpoption = {
                        title: {
                            //text: '来源：百度资讯',
                            left: 0
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'line'
                            }
                        },
                        legend: {
                            data: flag
                        },
                        grid: {
                            left: '10%',
                            right: '10%',
                            bottom: '20%'
                        },
                        xAxis: {
                            type: 'category',
                            data: date.categoryData,
                            scale: true,
                            boundaryGap: false,
                            axisLine: {onZero: false},
                            splitLine: {show: false},
                            splitNumber: 20,
                            min: 'dataMin',
                            max: 'dataMax'
                        },
                        yAxis: {
                            scale: true,
                            splitArea: {
                                show: true
                            }
                        },
                        dataZoom: [
                            {
                                type: 'inside',
                                start: 50,
                                end: 100
                            },
                            {
                                show: true,
                                type: 'slider',
                                y: '90%',
                                start: 50,
                                end: 100
                            }
                        ],
                        series: [
                            {
                                name: flag,
                                type: 'candlestick',
                                data: date.values,
                                markPoint: {
                                    label: {
                                        normal: {
                                            formatter: function (param) {
                                                return param != null ? Math.round(param.value) : '';
                                            }
                                        }
                                    },
                                    data: [
                                        {
                                            name: 'XX标点',
                                            coord: ['2013/5/31', 2300],
                                            value: 2300,
                                            itemStyle: {
                                                normal: {color: 'rgb(41,60,85)'}
                                            }
                                        },
                                        {
                                            name: '最大值',
                                            type: 'max',
                                            valueDim: 'highest'
                                        },
                                        {
                                            name: '最小值',
                                            type: 'min',
                                            valueDim: 'lowest'
                                        },
                                        {
                                            name: '平均值',
                                            type: 'average',
                                            valueDim: 'close'
                                        }
                                    ],
                                    tooltip: {
                                        formatter: function (param) {
                                            return param.name + '<br>' + (param.data.coord || '');
                                        }
                                    }
                                },
                                markLine: {
                                    symbol: ['none', 'none'],
                                    data: [
                                        [
                                            {
                                                name: 'from lowest to highest',
                                                type: 'min',
                                                valueDim: 'lowest',
                                                symbol: 'circle',
                                                symbolSize: 10,
                                                label: {
                                                    normal: {show: false},
                                                    emphasis: {show: false}
                                                }
                                            },
                                            {
                                                type: 'max',
                                                valueDim: 'highest',
                                                symbol: 'circle',
                                                symbolSize: 10,
                                                label: {
                                                    normal: {show: false},
                                                    emphasis: {show: false}
                                                }
                                            }
                                        ],
                                        {
                                            name: 'min line on close',
                                            type: 'min',
                                            valueDim: 'close'
                                        },
                                        {
                                            name: 'max line on close',
                                            type: 'max',
                                            valueDim: 'close'
                                        }
                                    ]
                                }
                            }
                        ]
                    };
                    Gpmycharts.setOption(gpoption);
                }
            }
        })
    }

    function calculateMA(dayCount) {
        var result = [];
        for (var i = 0, len = data0.values.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += data0.values[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }

    GuoNei();
    CaiGou();
    QiYe();

    GongYe1();
    GongYe2();
    GongYe3();
    GongYe4();
    GongYe5();
    GongYe6();
    GongYe7();
    GongYe8();
    GongYe9();
    GongYe10();
    InitScience();
    InitData("1", "gp_one_id", 1);
    InitData("1", "gp_one_fid", 2);
    InitData("1", "gp_one_sid", 3);
    InitData("2", "gp_two_id", 1);
    InitData("2", "gp_two_fid", 2);
    InitData("2", "gp_two_sid", 3);
    InitData("3", "gp_three_id", 1);
    InitData("3", "gp_three_fid", 2);
    InitData("3", "gp_three_sid", 3);
    InitData("4", "gp_four_id", 1);
    InitData("4", "gp_four_fid", 2);
    InitData("4", "gp_four_sid", 3);
    InitData("5", "gp_five_id", 1);
    InitData("5", "gp_five_fid", 2);
    InitData("5", "gp_five_sid", 3);

    var hlwurl = LoadUrl() + "axis2/services/MyService/getIndexData";
    $.ajax({
        type: "POST",
        url: hlwurl,
        data: {
            "id": "4",
            "subId": "1"
        },
        dataType: "text",
        success: function (result) {
            result = loadXML(result);
            result = jQuery.parseJSON(result);
            result = jQuery.parseJSON(result[0].values);
            var xdata = result[0];
            var row = 0;
            var html1 = '<tr style="height:40px;">';

            var html2 = '<tr>';

            $.each(xdata, function (a, b) {
                if (a == 0) {
                    html1 += '<td>' + b + '</td>'
                        + '<td></td>';
                    html2 += '<td></td>'
                        + '<td></td>';
                }
                else {
                    html1 += '<td>' + b + '</td>';
                    html2 += '<td><input type="checkbox" name="CheckBox_Internet_Time" checked="checked" value="' + b + '"/></td>';
                    row++;
                }
            });
            html1 += "</tr>";
            html2 += "</tr>";
            html1 += html2;
            $("#theadid").html(html1);
            var html3 = "";
            var n = 0;
            for (var j = 1; j < row; j++) {
                if (j < 4) {
                    html3 += '<tr>'
                        + '<td>' + result[j][0] + '</td>'
                        + '<td><input type="checkbox" name="CheckBox_Internet_Type" checked="checked" value="' + result[j][0] + '"/></td>';
                }
                else {
                    html3 += '<tr>'
                        + '<td>' + result[j][0] + '</td>'
                        + '<td><input type="checkbox" name="CheckBox_Internet_Type" value="' + result[j][0] + '"/></td>';

                }
                for (var i = 1; i < result[j].length; i++) {
                    html3 += '<td>' + result[j][i] + '</td>';
                }
                html3 += '</tr>';
                n++;
            }
            $("#ttid").html(html3);

            $.each(xdata, function (a, b) {
                if (a == 0) {
                    xdata.splice(a, 1);
                }
            });

            $("input:checkbox[name='CheckBox_Internet_Type']").change(function () {
                var len = $("input:checkbox[name='CheckBox_Internet_Type']:checked").length;
                if (len >= 4) {
                    layer.msg("只能同时选择三项");
                    $(this).removeAttr("checked");
                    return;
                }
                var xtime = [];
                var serie = [];
                $("input:checkbox[name='CheckBox_Internet_Type']:checked").each(function () {
                    var ynum = [];
                    xtime = [];
                    var checkval = $(this).val();
                    for (var i = 0; i < result.length; i++) {
                        for (var j = 0; j < result[i].length; j++) {
                            if (result[i][j] == checkval) {
                                $("input:checkbox[name='CheckBox_Internet_Time']:checked").each(function () {
                                    var checktime = $(this).val();
                                    var idx = 0;
                                    $.each(xdata, function (a, b) {
                                        if (b == checktime) {
                                            idx = a + 1;
                                            xtime.push(b);
                                        }
                                    });
                                    ynum.push(result[i][idx]);
                                })
                            }
                        }
                    }
                    var wlw = {name: checkval, type: "bar", data: ynum};
                    serie.push(wlw);
                });
                InitInternet(xtime, serie);
            });
            $("input:checkbox[name='CheckBox_Internet_Time']").change(function () {
                $("input:checkbox[name='CheckBox_Internet_Type']").change();
            });
            $("input:checkbox[name='CheckBox_Internet_Type']").change();
        }
    });


    $(".resizable1").resizable(
        {
            autoHide: false,
            handles: 'e',
            resize: function (e, ui) {
                var parent = ui.element.parent();
                var remainingSpace = parent.width() - ui.element.outerWidth(),
                    divTwo = ui.element.next(),
                    divTwoWidth = (remainingSpace - (divTwo.outerWidth() - divTwo.width())) / parent.width() * 100 + "%";
                divTwo.width(divTwoWidth);
            },
            stop: function (e, ui) {
                var parent = ui.element.parent();
                ui.element.css(
                    {
                        width: ui.element.width() / parent.width() * 100 + "%"
                    }
                );
            }
        }
    );
});
// 指数资讯页(IndicesRefer.html)-工业
levelTabMenu('#levelMenu1', 0, 6, 0, 170, 150);
// 指数资讯页(IndicesRefer.html)-股票
levelTabMenu('#levelMenu2', 0, 8, 0, 128, 150);