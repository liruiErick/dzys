$(function () {
    var wurl = LoadUrl() + "axis2/services/MyService/getHomePageIndexDatas";
    $.ajax({
        type: "POST",
        url: wurl,
        data: {},
        dataType: "text",
        contentType: "text/xml",
        success: function (result) {
            result = loadXML(result);
            result = jQuery.parseJSON(result);
            // console.log(result);
            var html = "";
            var html1 = "";
            $.each(result, function (a, b) {
                html += '<li class="' + ((a === 0) ? 'current' : '') + ' ' + ((b.name.length > 9) ? '' : 'line42') + '">' + b.name + '</li>';
                html1 += '<div class="clearfloat tab_box_con ' + ((a === 0) ? '' : 'hide') + '" style="width:1150px;">' + InitTemplate(b.FirstClass, b.SecondClass) + '</div>';
            });
            $("#indexLevelMenu").html(html);
            $("#tab_listid").html(html1);

            // index-指数资讯
            levelTabMenu('#indexLevelMenu', 0, 6, 0, 165, 150);

            $.each(result, function (a, b) {
                switch (b.FirstClass) {
                    case "1":
                        switch (b.SecondClass) {
                            case "1":
                                GuoNei();
                                break;
                            case "2":
                                CaiGou();
                                break;
                            case "3":
                                QiYe();
                                break;
                        }
                        break;
                    case "2":
                        switch (b.SecondClass) {
                            case "1":
                                GongYe1();
                                break;
                            case "2":
                                GongYe2();
                                break;
                            case "3":
                                GongYe3();
                                break;
                            case "4":
                                GongYe4();
                                break;
                            case "5":
                                GongYe5();
                                break;
                            case "6":
                                GongYe6();
                                break;
                            case "7":
                                GongYe7();
                                break;
                            case "8":
                                GongYe8();
                                break;
                            case "9":
                                GongYe9();
                                break;
                            case "10":
                                GongYe10();
                                break;
                        }
                        break;
                    case "3":
                        InitScience();
                        break;
                    case "4":
                        LoadInternet();
                        break;
                    case "5":
                        switch (b.SecondClass) {
                            case "1":
                                InitData("1", "gp_one_id", 1);
                                InitData("1", "gp_one_fid", 2);
                                InitData("1", "gp_one_sid", 3);
                                break;
                            case "2":
                                InitData("2", "gp_two_id", 1);
                                InitData("2", "gp_two_fid", 2);
                                InitData("2", "gp_two_sid", 3);
                                break;
                            case "3":
                                InitData("3", "gp_three_id", 1);
                                InitData("3", "gp_three_fid", 2);
                                InitData("3", "gp_three_sid", 3);
                                break;
                            case "4":
                                InitData("4", "gp_four_id", 1);
                                InitData("4", "gp_four_fid", 2);
                                InitData("4", "gp_four_sid", 3);
                                break;
                            case "5":
                                InitData("5", "gp_five_id", 1);
                                InitData("5", "gp_five_fid", 2);
                                InitData("5", "gp_five_sid", 3);
                                break;
                        }
                        break;
                }
            });
        }
    })
});

function InitTemplate(index, second) {
    ///<summary>加载总模块</summary>
    ///<param name="index" type="string">总模块下第几个大模块</param>
    ///<param name="second" type="string">大模块下第几个小模块</param>
    var html = "";
    switch (index) {
        case "1":
            return html = FirstTemplate(second);
            break;
        case "2":
            return html = SecondTemplate(second);
            break;
        case "3":
            return html = ThirdTemplate(second);
            break;
        case "4":
            return html = FourthTemplate(second);
            break;
        case "5":
            return html = FifthTemplate(second);
            break;
        default:
            return html;
    }
}

function FirstTemplate(index) {
    ///<summary>加载综合模块</summary>
    ///<param name="index" type="string">综合模块下第几个小模块</param>
    var html = "";
    switch (index) {
        case "1":
            return html = First_One();
            break;
        case "2":
            return html = First_Two();
            break;
        case "3":
            return html = First_Three();
            break;
        default:
            return html
    }
}

function First_One() {
    ///<summary>加载综合模块下第一个小模块html</summary>
    var html = '<div class="qy_left_870 resizable resizable1" style="height: 355px; width:612px;">'
        + '<div id="pid" style="width: 100%; height: 100%;">'
        + '</div>'
        + '</div>'
        + '<div class="qy_r_260 resizable resizable2" style="width:475px;">'
        + '<div style="width: 100%; height: 415px; overflow:auto;">'
        + '<table class="table" style="width: 800px;">'
        + '<thead class="fixedThead">'
        + '<tr>'
        + '<th rowspan="2" style="width: 165px;">季度</th>'
        + '<th colspan="2" style="width: 140px;">国内生产总值</th>'
        + '<th colspan="2" style="width: 140px;">第一产业</th>'
        + '<th colspan="2" style="width: 140px;">第二产业</th>'
        + '<th colspan="2" style="width: 140px;">第三产业</th>'
        + '</tr>'
        + '<tr>'
        + '<th style="width: 100px;">绝对值（亿元）</th>'
        + '<th style="width: 70px;">同比增长</th>'
        + '<th style="width: 100px;">绝对值（亿元）</th>'
        + '<th style="width: 70px;">同比增长</th>'
        + '<th style="width: 100px;">绝对值（亿元）</th>'
        + '<th style="width: 70px;">同比增长</th>'
        + '<th style="width: 100px;">绝对值（亿元）</th>'
        + '<th style="width: 70px;">同比增长</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody class="scrollTbody" id="tbodyid">'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '</div>';
    return html;
}

function GuoNei() {
    ///<summary>加载综合模块下第一个小模块数据</summary>
    ///<param name="index" type="string">综合模块下第几个小模块</param>
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

function First_Two() {
    ///<summary>加载综合模块下第一个小模块html</summary>
    var html = '<div class="clearfloat " style="width:1145px;">'
        + '<div class="qy_left_870 resizable resizable1" style="height: 355px; width:672px;">'
        + '<div id="cgid" style="width: 600px; height: 355px;">'
        + '</div>'
        + '</div>'
        + '<div class="qy_r_260 resizable resizable2" style="width:410px;height:415px;overflow-y:auto;">'
        + '<div style="width: 100%; height: 410px;">'
        + '<table class="table" style="width: 410px;">'
        + '<thead class="fixedThead">'
        + '<tr>'
        + '<th rowspan="2" style="width: 150px;">月份</th>'
        + '<th colspan="2" style="width: 140px;">制造业</th>'
        + '<th colspan="2" style="width: 140px;">非制造业</th>'
        + '<th style="width: 10px;"></th>'
        + '</tr>'
        + '<tr>'
        + '<th style="width: 70px;">指数</th>'
        + '<th style="width: 70px;">同比增长</th>'
        + '<th style="width: 70px;">指数</th>'
        + '<th style="width: 70px;">同比增长</th>'
        + '<th style="width: 10px;"></th>'
        + '</tr>'
        + '</thead>'
        + '<tbody class="scrollTbody" id="cgtbodyid">'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '</div>'
        + '</div>';
    return html;
}

function CaiGou() {
    ///<summary>加载综合模块下第二个小模块数据</summary>
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

function First_Three() {
    ///<summary>加载综合模块下第一个小模块html</summary>
    var html = '<div class="clearfloat ">'
        + '<div class="qy_left_870 resizable resizable1" style="height: 355px; width:597px;">'
        + '<div id="qyid" style="width: 600px; height: 355px;">'
        + '</div>'
        + '</div>'
        + '<div class="qy_r_260 resizable resizable2" style="width:490px;height:415px;overflow-y:auto;">'
        + '<div style="width: 650px; height: 410px;">'
        + '<table class="table" style="width: 490px;">'
        + '<thead class="fixedThead">'
        + '<tr>'
        + '<th rowspan="2" style="width: 110px;">季度</th>'
        + '<th colspan="3" style="width: 140px;">企业景气指数</th>'
        + '<th colspan="3" style="width: 140px;">企业家信心指数</th>'
        + '<th style="width: 10px;"></th>'
        + '</tr>'
        + '<tr>'
        + '<th style="width: 70px;">指数</th>'
        + '<th style="width: 70px;">同比</th>'
        + '<th style="width: 70px;">环比</th>'
        + '<th style="width: 70px;">指数</th>'
        + '<th style="width: 70px;">同比</th>'
        + '<th style="width: 70px;">环比</th>'
        + '<th style="width: 10px;"></th>'
        + '</tr>'
        + '</thead>'
        + '<tbody class="scrollTbody" id="qytbodyid">'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '</div>'
        + '</div>';
    return html;
}

function QiYe() {
    ///<summary>加载综合模块下第三个小模块数据</summary>
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
            var xdata = [];
            var xfirsty1 = [];
            var xbai1 = [];
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

function SecondTemplate(index) {
    ///<summary>加载工业模块</summary>
    ///<param name="index" type="string">工业模块下第几个小模块</param>
    var html = "";
    switch (index) {
        case "1":
            html = Second_One();
            break;
        case "2":
            html = Second_Two();
            break;
        case "3":
            html = Second_Three();
            break;
        case "4":
            html = Second_Four();
            break;
        case "5":
            html = Second_Five();
            break;
        case "6":
            html = Second_Six();
            break;
        case "7":
            html = Second_Seven();
            break;
        case "8":
            html = Second_Eight();
            break;
        case "9":
            html = Second_Nine();
            break;
        case "10":
            html = Second_Ten();
            break;
    }
    return html;
}

function Second_One() {
    ///<summary>加载工业模块下第一个小模块html</summary>
    var html = '<div class="clearfloat gongye_box_con" style="background:#fff;">'
        + '<div class="gongye_box_img_left" id="gid" style="height: 353px; width:800px;">'
        + '</div>'
        + '<div class="gongye_box_date">'
        + '<h2>工业增加值</h2>'
        + '<p>'
        + '指工业企业在报告期内以货币表现'
        + '的工业生产活动的最终成果。工业'
        + '增加值有两种计算方法：一是生产'
        + '法，即工业总产出减去工业中间投'
        + '入加上应交增值税；二是收入法，'
        + '即从收入的角度出发，根据生产要'
        + '素在生产过程中应得到的收入份额'
        + '计算，具体构成项目有固定资产折'
        + '旧、劳动者报酬、生产税净额、营'
        + '业盈余，这种方法也称要素分配法。'
        + '</p>'
        + '</div>'
        + '</div>';
    return html;
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
            var xxdata = [];
            var yydata = [];
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

function Second_Two() {
    ///<summary>加载工业模块下第二个小模块html</summary>
    var html = '<div class="clearfloat gongye_box_con" style="background:#fff;">'
        + '<div class="gongye_box_img_left" style="height: 353px; width:830px;" id="gyid">'
        + '</div>'
        + '<div class="gongye_box_date">'
        + '<h2>工业增加值22</h2>'
        + '<p>'
        + '指工业企业在报告期内以货币表现'
        + '的工业生产活动的最终成果。工业'
        + '增加值有两种计算方法：一是生产'
        + '法，即工业总产出减去工业中间投'
        + '入加上应交增值税；二是收入法，'
        + '即从收入的角度出发，根据生产要'
        + '素在生产过程中应得到的收入份额'
        + '计算，具体构成项目有固定资产折'
        + '旧、劳动者报酬、生产税净额、营'
        + '业盈余，这种方法也称要素分配法。'
        + '</p>'
        + '</div>'
        + '</div>';
    return html;
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
            var xxdata = [];
            var yydata = [];
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

function Second_Three() {
    ///<summary>加载工业模块下第三个小模块html</summary>
    var html = '<div class="clearfloat gongye_box_con">'
        + '<div class="gongye_box_img_left">'
        + '<table border="1" class="table" style="width: 100%; height: 350px; background: none; border-collapse: collapse;">'
        + '<thead style="height: 40px;">'
        + '<tr style="background-color: #efefef;">'
        + '<th colspan="3" style="text-align: right;">'
        + '时间：'
        + '<select id="control_time_gongye3" style="width: 120px;" required placeholder="2016年12月">'
        + '<option value="1">2016年12月</option>'
        + '<option value="2">2016年11月</option>'
        + '<option value="3">2016年10月</option>'
        + '<option value="4">2016年9月</option>'
        + '<option value="5">2016年8月</option>'
        + '</select>'
        + '</th>'
        + '</tr>'
        + '<tr>'
        + '<th colspan="3" style="text-align: center;">各地区工业增加值增长速度</th>'
        + '</tr>'
        + '<tr>'
        + '<th rowspan="2" style="width:62%;">地区</th>'
        + '<th colspan="2">比去年同期增长(%)</th>'
        + '</tr>'
        + '<tr>'
        + '<th style="width:18%;">本月</th>'
        + '<th>累计</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody style="height: 280px; text-align:center;">'
        + '<tr>'
        + '<td colspan="3">'
        + '<div style="height:220px;overflow-x:auto;">'
        + '<table id="areaid" width="100%" style="border-collapse:collapse;">'

        + '</table>'
        + '</div>'
        + '</td>'
        + '</tr>'
        + '</tbody>'
        + '<tfoot style="height: 20px;">'
        + '<tr>'
        + '<td colspan="3">注：按可比价格计算</td>'
        + '</tr>'
        + '</tfoot>'
        + '</table>'
        + '</div>'
        + '<div class="gongye_box_date">'
        + '<h2>工业增加值33</h2>'
        + '<p>'
        + '指工业企业在报告期内以货币表现'
        + '的工业生产活动的最终成果。工业'
        + '增加值有两种计算方法：一是生产'
        + '法，即工业总产出减去工业中间投'
        + '入加上应交增值税；二是收入法，'
        + '即从收入的角度出发，根据生产要'
        + '素在生产过程中应得到的收入份额'
        + '计算，具体构成项目有固定资产折'
        + '旧、劳动者报酬、生产税净额、营'
        + '业盈余，这种方法也称要素分配法。'
        + '</p>'
        + '</div>'
        + '</div>';
    return html;
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
            $.each(result, function (a, b) {
                html += '<option>' + b.time + '</option>';
            });
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

function Second_Four() {
    ///<summary>加载工业模块下第四个小模块html</summary>
    var html = '<div class="clearfloat gongye_box_con">'
        + '<div class="gongye_box_img_left" style="height: 353px;">'
        + '<table class="table" style="width: 100%; height: 350px; background: none; border-collapse: collapse;">'
        + '<thead>'
        + '<tr>'
        + '<th colspan="8" style="background-color:#f0f0f0; text-align:right;">'
        + '地区：'
        + '<select style=" margin:2px auto; width:100px;">'
        + '<option value="1">全国</option>'
        + '</select>'
        + '</th>'
        + '</tr>'
        + '<tr>'
        + '<th colspan="8">'
        + '<span>规模以上工业企业工业增加值增长速度</span>'
        + '</th>'
        + '</tr>'
        + '<tr id="headid">'
        + '</tr>'
        + '</thead>'
        + '<tbody style="height:300px; text-align:center;">'
        + '<tr>'
        + '<td colspan="8">'
        + '<div style="height:300px;overflow-y:auto;">'
        + '<table id="gmid" width="100%" style="border-collapse:collapse;">'
        + '</table>'
        + '</div>'
        + '</td>'
        + '</tr>'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '<div class="gongye_box_date">'
        + '<h2>工业增加值44</h2>'
        + '<p>'
        + '指工业企业在报告期内以货币表现'
        + '的工业生产活动的最终成果。工业'
        + '增加值有两种计算方法：一是生产'
        + '法，即工业总产出减去工业中间投'
        + '入加上应交增值税；二是收入法，'
        + '即从收入的角度出发，根据生产要'
        + '素在生产过程中应得到的收入份额'
        + '计算，具体构成项目有固定资产折'
        + '旧、劳动者报酬、生产税净额、营'
        + '业盈余，这种方法也称要素分配法。'
        + '</p>'
        + '</div>'
        + '</div>';
    return html;
}

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
                if (a == 0) {
                    $.each(b, function (c, d) {
                        if (c == 0) {
                            head += '<th style="width:47%;">' + d + '</th>';
                        } else if (c == parseInt(b.length - 1)) {
                            head += '<th style="width:8%;">' + d + '</th>';
                        }
                        else {
                            head += '<th>' + d + '</th>';
                        }
                    });
                    $("#headid").html(head);
                }
                else {
                    html += "<tr>";
                    $.each(b, function (c, d) {
                        html += '<td>' + d + '</td>';
                    });
                    html += "</tr>";
                }
            });
            $("#gmid").html(html);
        }
    })
}

function Second_Five() {
    ///<summary>加载工业模块下第五个小模块html</summary>
    var html = '<div class="clearfloat gongye_box_con">'
        + '<div class="gongye_box_img_left" id="qyzzid" style="height: 353px;">'
        + '</div>'
        + '<div class="gongye_box_date">'
        + '<h2>工业增加值55</h2>'
        + '<p>'
        + '指工业企业在报告期内以货币表现'
        + '的工业生产活动的最终成果。工业'
        + '增加值有两种计算方法：一是生产'
        + '法，即工业总产出减去工业中间投'
        + '入加上应交增值税；二是收入法，'
        + '即从收入的角度出发，根据生产要'
        + '素在生产过程中应得到的收入份额'
        + '计算，具体构成项目有固定资产折'
        + '旧、劳动者报酬、生产税净额、营'
        + '业盈余，这种方法也称要素分配法。'
        + '</p>'
        + '</div>'
        + '</div>';
    return html;
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
            var xxdata = [];
            var yydata = [];
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

function Second_Six() {
    ///<summary>加载工业模块下第六个小模块html</summary>
    var html = '<div class="clearfloat gongye_box_con">'
        + '<div class="gongye_box_img_left">'
        + '<table border="1" class="table" style="width: 100%; height: 350px; background: none; border-collapse: collapse;">'
        + '<thead style="height: 40px;">'
        + '<tr style="background-color: #efefef;">'
        + '<th colspan="5" style="text-align: right;">'
        + '时间：'
        + '<select id="six_timeid" style="width: 120px;" required placeholder="2016年12月">'
        + '<option value="1">2016年12月</option>'
        + '<option value="2">2016年11月</option>'
        + '<option value="3">2016年10月</option>'
        + '<option value="4">2016年9月</option>'
        + '<option value="5">2016年8月</option>'
        + '</select>'
        + '</th>'
        + '</tr>'
        + '<tr>'
        + '<th colspan="5" style="text-align: center;">工业主要产品产量及增长速度</th>'
        + '</tr>'
        + '<tr>'
        + '<th rowspan="2" style="width:62%;">指标</th>'
        + '<th rowspan="2">本月</th>'
        + '<th rowspan="2">累计</th>'
        + '<th colspan="2">比去年同期增长（%）</th>'
        + '</tr>'
        + '<tr>'
        + '<th>本月</th>'
        + '<th>累计</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody style="height: 280px; text-align:center;">'
        + '<tr>'
        + '<td colspan="5">'
        + '<div style="height:220px;overflow-x:auto;">'
        + '<table id="six_tableid" width="100%" style="border-collapse:collapse;">'
        + '</table>'
        + '</div>'
        + '</td>'
        + '</tr>'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '<div class="gongye_box_date">'
        + '<h2>工业增加值66</h2>'
        + '<p>'
        + '指工业企业在报告期内以货币表现'
        + '的工业生产活动的最终成果。工业'
        + '增加值有两种计算方法：一是生产'
        + '法，即工业总产出减去工业中间投'
        + '入加上应交增值税；二是收入法，'
        + '即从收入的角度出发，根据生产要'
        + '素在生产过程中应得到的收入份额'
        + '计算，具体构成项目有固定资产折'
        + '旧、劳动者报酬、生产税净额、营'
        + '业盈余，这种方法也称要素分配法。'
        + '</p>'
        + '</div>'
        + '</div>';
    return html;
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
            console.log(result[0].values);
            result = jQuery.parseJSON(result[0].values);
            var html = "";
            // var head = "";
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

function Second_Seven() {
    ///<summary>加载工业模块下第七个小模块html</summary>
    var html = '<div class="clearfloat gongye_box_con">'
        + '<div class="gongye_box_img_left">'
        + '<table border="1" class="table" style="width: 100%; height: 350px; background: none; border-collapse: collapse;">'
        + '<thead style="height: 40px;">'
        + '<tr style="background-color: #efefef;">'
        + ' <th colspan="3" style="text-align: right;">'
        + '  时间：'
        + '<select id="seven_timeid" style="width: 120px;" required placeholder="2016年12月">'
        + '<option value="1">2016年12月</option>'
        + '<option value="2">2016年11月</option>'
        + '<option value="3">2016年10月</option>'
        + '<option value="4">2016年9月</option>'
        + '<option value="5">2016年8月</option>'
        + '</select>'
        + '</th>'
        + '</tr>'
        + '<tr>'
        + '<th colspan="3" style="text-align: center;">工业分大类行业增加值增长速度</th>'
        + '</tr>'
        + '<tr>'
        + '<th rowspan="2" style="width:62%;">指标</th>'
        + '<th colspan="2">比去年同期增长(%)</th>'
        + '</tr>'
        + '<tr>'
        + '<th style="width:18%;">本月</th>'
        + '<th>累计</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody style="height: 280px; text-align:center;">'
        + '<tr>'
        + '<td colspan="3">'
        + '<div style="height:220px;overflow-x:auto;">'
        + '<table id="seven_tableid" width="100%" style="border-collapse:collapse;">'
        + '</table>'
        + ' </div>'
        + '</td>'
        + ' </tr>'
        + ' </tbody>'
        + ' <tfoot style="height: 20px;">'
        + ' <tr>'
        + '<td colspan="3">注：按可比价格计算</td>'
        + ' </tr>'
        + ' </tfoot>'
        + '</table>'
        + '</div>'
        + '<div class="gongye_box_date">'
        + '<h2>工业增加值77</h2>'
        + '<p>'
        + '指工业企业在报告期内以货币表现'
        + '的工业生产活动的最终成果。工业'
        + '增加值有两种计算方法：一是生产'
        + '法，即工业总产出减去工业中间投'
        + '入加上应交增值税；二是收入法，'
        + '即从收入的角度出发，根据生产要'
        + '素在生产过程中应得到的收入份额'
        + '计算，具体构成项目有固定资产折'
        + '旧、劳动者报酬、生产税净额、营'
        + '业盈余，这种方法也称要素分配法。'
        + '</p>'
        + '</div>'
        + '</div>';
    return html;
}

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

function Second_Eight() {
    ///<summary>加载工业模块下第八个小模块html</summary>
    var html = '<div class="clearfloat gongye_box_con">'
        + '<div class="gongye_box_img_left">'
        + '<table class="table" style="width: 100%; height: 350px; background: none; border-collapse: collapse;">'
        + '<thead>'
        + '<tr>'
        + '<th colspan="3" style="background-color:#f0f0f0; text-align:right;">'
        + '时间：'
        + '<select id="eight_timeid" style="width: 120px;" required placeholder="2016年12月">'
        + '<option value="1">2016年12月</option>'
        + '<option value="2">2016年11月</option>'
        + '<option value="3">2016年10月</option>'
        + '<option value="4">2016年9月</option>'
        + '<option value="5">2016年8月</option>'
        + '</select>'
        + '</th>'
        + '</tr>'
        + '<tr>'
        + '<th colspan="3">'
        + '<span>各地区工业生产者价格指数</span>'
        + '</th>'
        + '</tr>'
        + '<tr id="eight_headid">'
        + '</tr>'
        + '</thead>'
        + '<tbody style="height:300px; text-align:center;">'
        + '<tr>'
        + '<td colspan="3">'
        + '<div style="height:300px;overflow-y:auto;">'
        + '<table id="eight_tableid" width="100%" style="border-collapse:collapse;">'
        + '</table>'
        + '</div>'
        + '</td>'
        + '</tr>'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '<div class="gongye_box_date">'
        + '<h2>工业增加值88</h2>'
        + '<p>'
        + '指工业企业在报告期内以货币表现'
        + '的工业生产活动的最终成果。工业'
        + '增加值有两种计算方法：一是生产'
        + '法，即工业总产出减去工业中间投'
        + '入加上应交增值税；二是收入法，'
        + '即从收入的角度出发，根据生产要'
        + '素在生产过程中应得到的收入份额'
        + '计算，具体构成项目有固定资产折'
        + '旧、劳动者报酬、生产税净额、营'
        + '业盈余，这种方法也称要素分配法。'
        + '</p>'
        + '</div>'
        + '</div>';
    return html;
}

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
                            head += '<th>' + d + '</th>';
                        } else if (c == parseInt(b.length - 1)) {
                            head += '<th style="width:30%;">' + d + '</th>';
                        }
                        else {
                            head += '<th style="width:30%;">' + d + '</th>';
                        }
                    });
                    $("#eight_headid").html(head);
                }
                else {
                    html += "<tr>";
                    $.each(b, function (c, d) {
                        if (c != 0) {
                            html += '<td style="width:30%;">' + d + '</td>';
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

function Second_Nine() {
    ///<summary>加载工业模块下第九个小模块html</summary>
    var html = '<div class="clearfloat gongye_box_con">'
        + '<div class="gongye_box_img_left">'
        + '<table class="table" style="width: 100%; height: 350px; background: none; border-collapse: collapse;">'
        + '<thead>'
        + '<tr>'
        + '<th colspan="3" style="background-color:#f0f0f0; text-align:right;">'
        + '时间：'
        + '<select id="nine_timeid" style="width: 120px;" required placeholder="2016年12月">'
        + '<option value="1">2016年12月</option>'
        + '<option value="2">2016年11月</option>'
        + '<option value="3">2016年10月</option>'
        + '<option value="4">2016年9月</option>'
        + '<option value="5">2016年8月</option>'
        + '</select>'
        + '</th>'
        + '</tr>'
        + '<tr>'
        + '<th colspan="3">'
        + '<span>工业生产者出厂价格分类指数</span>'
        + '</th>'
        + '</tr>'
        + '<tr id="nine_headid">'
        + '</tr>'
        + '</thead>'
        + '<tbody style="height:300px; text-align:center;">'
        + '<tr>'
        + '<td colspan="3">'
        + '<div style="height:300px;overflow-y:auto;">'
        + '<table id="nine_tableid" width="100%" style="border-collapse:collapse;">'
        + '</table>'
        + '</div>'
        + '</td>'
        + '</tr>'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '<div class="gongye_box_date">'
        + '<h2>工业增加值99</h2>'
        + '<p>'
        + '指工业企业在报告期内以货币表现'
        + '的工业生产活动的最终成果。工业'
        + '增加值有两种计算方法：一是生产'
        + '法，即工业总产出减去工业中间投'
        + '入加上应交增值税；二是收入法，'
        + '即从收入的角度出发，根据生产要'
        + '素在生产过程中应得到的收入份额'
        + '计算，具体构成项目有固定资产折'
        + '旧、劳动者报酬、生产税净额、营'
        + '业盈余，这种方法也称要素分配法。'
        + '</p>'
        + '</div>'
        + '</div>';
    return html;
}

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

function Second_Ten() {
    ///<summary>加载工业模块下第十个小模块html</summary>
    var html = '<div class="clearfloat gongye_box_con">'
        + '<div class="gongye_box_img_left">'
        + '<table class="table" style="width: 100%; height: 350px; background: none; border-collapse: collapse;">'
        + '<thead>'
        + '<tr>'
        + '<th colspan="3" style="background-color:#f0f0f0; text-align:right;">'
        + '时间：'
        + '<select id="ten_timeid" style="width: 120px;" required placeholder="2016年12月">'
        + '<option value="1">2016年12月</option>'
        + '<option value="2">2016年11月</option>'
        + '<option value="3">2016年10月</option>'
        + '<option value="4">2016年9月</option>'
        + '<option value="5">2016年8月</option>'
        + '</select>'
        + '</th>'
        + '</tr>'
        + '<tr>'
        + '<th colspan="3">'
        + '<span>工业生产者购进价格指数</span>'
        + '</th>'
        + '</tr>'
        + '<tr id="ten_headid">'
        + '</tr>'
        + '</thead>'
        + '<tbody style="height:300px; text-align:center;">'
        + '<tr>'
        + '<td colspan="3">'
        + '<div style="height:300px;overflow-y:auto;">'
        + '<table id="ten_tableid" width="100%" style="border-collapse:collapse;">'
        + '</table>'
        + '</div>'
        + '</td>'
        + '</tr>'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '<div class="gongye_box_date">'
        + '<h2>工业增加值1010</h2>'
        + '<p>'
        + '指工业企业在报告期内以货币表现'
        + '的工业生产活动的最终成果。工业'
        + '增加值有两种计算方法：一是生产'
        + '法，即工业总产出减去工业中间投'
        + '入加上应交增值税；二是收入法，'
        + '即从收入的角度出发，根据生产要'
        + '素在生产过程中应得到的收入份额'
        + '计算，具体构成项目有固定资产折'
        + '旧、劳动者报酬、生产税净额、营'
        + '业盈余，这种方法也称要素分配法。'
        + '</p>'
        + '</div>'
        + '</div>';
    return html;
}

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

function ThirdTemplate(index) {
    var html = '<div style="height:415px; width:1150px; overflow-y:auto;">'
        + '<table class="table" style="border-collapse:collapse; width:100%;">'
        + '<thead style="background-color:#efefef;">'
        + '<tr>'
        + '<th colspan="6" style="height:30px;">科技事业发展状况</th>'
        + '</tr>'
        + '</thead>'
        + '<tbody id="kjzsid" style="background-color:#fff;">'
        + '</tbody>'
        + '</table>'
        + '</div>';
    return html;
}

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

function FourthTemplate(index) {
    var html = '<div class="hlwzhs_con" style="height:415px;width:1145px;margin-top:0; background:#fff;border-top:none;">'
        + '<div style="width: 500px; height: 415px; float:left;background:#fff;" id="kid"></div>'
        + '<div style="width: 620px;  float:right; overflow: auto;">'
        + '<table class="table" style="width: 900px; height: 398px; text-align: center; background-color: white;">'
        + '<thead style="border: 1px solid red;" id="theadid">'
        + '<tr style="height: 40px;">'
        + '<td style="width:15%;">指标</td>'
        + '<td></td>'
        + '<td>2015年</td>'
        + '<td>2014年</td>'
        + '<td>2013年</td>'
        + '<td>2012年</td>'
        + '<td>2011年</td>'
        + '</tr>'
        + '<tr>'
        + '<td></td>'
        + '<td></td>'
        + '<td>'
        + '<input type="checkbox" name="CheckBox_Internet"/></td>'
        + '<td>'
        + '<input type="checkbox" name="CheckBox_Internet"/></td>'
        + '<td>'
        + '<input type="checkbox" name="CheckBox_Internet"/></td>'
        + '<td>'
        + '<input type="checkbox" name="CheckBox_Internet"/></td>'
        + '<td>'
        + '<input type="checkbox" name="CheckBox_Internet"/></td>'
        + '</tr>'
        + '</thead>'
        + '<tbody style="border: 1px solid red;" id="ttid">'
        + '<tr>'
        + '<td>互联网上网人数（万人）</td>'
        + '<td>'
        + '<input type="checkbox" name="CheckBox_Internet"/></td>'
        + '<td>68826</td>'
        + '<td>64875</td>'
        + '<td>61758</td>'
        + '<td>56400</td>'
        + '<td>51310</td>'
        + '</tr>'
        + '<tr>'
        + '<td>互联网上网人数（万人）</td>'
        + '<td>'
        + '<input type="checkbox" name="CheckBox_Internet"/></td>'
        + '<td>68826</td>'
        + '<td>64875</td>'
        + '<td>61758</td>'
        + '<td>56400</td>'
        + '<td>51310</td>'
        + '</tr>'
        + '<tr>'
        + '<td>互联网上网人数（万人）</td>'
        + '<td>'
        + '<input type="checkbox" name="CheckBox_Internet"/></td>'
        + '<td>68826</td>'
        + '<td>64875</td>'
        + '<td>61758</td>'
        + '<td>56400</td>'
        + '<td>51310</td>'
        + '</tr>'
        + '<tr>'
        + '<td>互联网上网人数（万人）</td>'
        + '<td>'
        + '<input type="checkbox" name="CheckBox_Internet"/></td>'
        + '<td>68826</td>'
        + '<td>64875</td>'
        + '<td>61758</td>'
        + '<td>56400</td>'
        + '<td>51310</td>'
        + '</tr>'
        + '<tr>'
        + '<td>互联网上网人数（万人）</td>'
        + '<td>'
        + '<input type="checkbox" name="CheckBox_Internet"/></td>'
        + '<td>68826</td>'
        + '<td>64875</td>'
        + '<td>61758</td>'
        + '<td>56400</td>'
        + '<td>51310</td>'
        + '</tr>'
        + '</tbody>'
        + '</table>'
        + '</div>'
        + '</div>';
    return html;
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
    Kmycharts.setOption(koption);
}

function LoadInternet() {
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
    })
}

function Gupiao_One(obj) {
    $(obj).parent().children().each(function (a, b) {
        if ($.trim(b.text) == $.trim($(obj).text())) {
            b.style.color = "#c23531";
            $(obj).parent().prev().children().each(function (c, d) {
                if (d.style.display == "block") {
                    if (a != c) {
                        d.style.display = "none";
                    }
                }
                else {
                    if (a == c) {
                        d.style.display = "block";
                    }
                }
            })
        }
        else {
            b.style.color = "#00abff";
        }
    })
}

function FifthTemplate(index) {
    var html = "";
    switch (index) {
        case "1":
            html = '<div class="clearfloat gupiao_box_con" style="background:#fff;">'
                + '<div style="width:100%;">'
                + '<div style="width:97%;float:left;">'
                + '<div id="gp_one_id" style="width:1050px;height:360px; display:block;"></div>'
                + '<div id="gp_one_fid" style="width:1050px;height:360px; display:none;"></div>'
                + '<div id="gp_one_sid" style="width:1050px;height:360px; display:none;"></div>'
                + '</div>'
                + '<div style="width:3%; float:right; margin:150px auto;">'
                + '<a onclick="Gupiao_One(this)" style="color:#c23531; cursor:pointer;">日K</a>'
                + '<a onclick="Gupiao_One(this)" style="color:#00abff; cursor:pointer;">周K</a>'
                + '<a onclick="Gupiao_One(this)" style="color:#00abff; cursor:pointer;">月K</a>'
                + '</div>'
                + '</div>'
                + '</div>';
            break;
        case "2":
            html = '<div class="clearfloat gupiao_box_con" style="background:#fff;">'
                + '<div style="width:100%;">'
                + '<div style="width:97%;float:left;">'
                + '<div id="gp_two_id" style="width:1050px;height:360px; display:block;"></div>'
                + '<div id="gp_two_fid" style="width:1050px;height:360px; display:none;"></div>'
                + '<div id="gp_two_sid" style="width:1050px;height:360px; display:none;"></div>'
                + '</div>'
                + '<div style="width:3%; float:right; margin:150px auto;">'
                + '<a onclick="Gupiao_One(this)" style="color:#c23531; cursor:pointer;">日K</a>'
                + '<a onclick="Gupiao_One(this)" style="color:#00abff; cursor:pointer;">周K</a>'
                + '<a onclick="Gupiao_One(this)" style="color:#00abff; cursor:pointer;">月K</a>'
                + '</div>'
                + '</div>'
                + '</div>';
            break;
        case "3":
            html = '<div class="clearfloat gupiao_box_con" style="background:#fff;">'
                + '<div style="width:100%;">'
                + '<div style="width:97%;float:left;">'
                + '<div id="gp_three_id" style="width:1050px;height:360px; display:block;"></div>'
                + '<div id="gp_three_fid" style="width:1050px;height:360px; display:none;"></div>'
                + '<div id="gp_three_sid" style="width:1050px;height:360px; display:none;"></div>'
                + '</div>'
                + '<div style="width:3%; float:right; margin:150px auto;">'
                + '<a onclick="Gupiao_One(this)" style="color:#c23531; cursor:pointer;">日K</a>'
                + '<a onclick="Gupiao_One(this)" style="color:#00abff; cursor:pointer;">周K</a>'
                + '<a onclick="Gupiao_One(this)" style="color:#00abff; cursor:pointer;">月K</a>'
                + '</div>'
                + '</div>'
                + '</div>';
            break;
        case "4":
            html = '<div class="clearfloat gupiao_box_con" style="background:#fff;">'
                + '<div style="width:100%;">'
                + '<div style="width:97%;float:left;">'
                + '<div id="gp_four_id" style="width:1050px;height:360px; display:block;"></div>'
                + '<div id="gp_four_fid" style="width:1050px;height:360px; display:none;"></div>'
                + '<div id="gp_four_sid" style="width:1050px;height:360px; display:none;"></div>'
                + '</div>'
                + '<div style="width:3%; float:right; margin:150px auto;">'
                + '<a onclick="Gupiao_One(this)" style="color:#c23531; cursor:pointer;">日K</a>'
                + '<a onclick="Gupiao_One(this)" style="color:#00abff; cursor:pointer;">周K</a>'
                + '<a onclick="Gupiao_One(this)" style="color:#00abff; cursor:pointer;">月K</a>'
                + '</div>'
                + '</div>'
                + '</div>';
            break;
        case "5":
            html = '<div class="clearfloat gupiao_box_con" style="background:#fff;">'
                + '<div style="width:100%;">'
                + '<div style="width:97%;float:left;">'
                + '<div id="gp_five_id" style="width:1050px;height:360px; display:block;"></div>'
                + '<div id="gp_five_fid" style="width:1050px;height:360px; display:none;"></div>'
                + '<div id="gp_five_sid" style="width:1050px;height:360px; display:none;"></div>'
                + '</div>'
                + '<div style="width:3%; float:right; margin:150px auto;">'
                + '<a onclick="Gupiao_One(this)" style="color:#c23531; cursor:pointer;">日K</a>'
                + '<a onclick="Gupiao_One(this)" style="color:#00abff; cursor:pointer;">周K</a>'
                + '<a onclick="Gupiao_One(this)" style="color:#00abff; cursor:pointer;">月K</a>'
                + '</div>'
                + '</div>'
                + '</div>';
            break;
    }
    return html;
}

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
                        //text: '上证指数',
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