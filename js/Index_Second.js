$(function () {
    //子平台
    $.ajax({
        type: "POST",
        url: LoadUrl() + "axis2/services/MyService/getSubPlatformList",
        data: {},
        dataType: "text",
        contentType: "text/xml",
        success: function (result) {
            var html = "";//内部变量
            if (result) {
                result = loadXML(result);
                var r = jQuery.parseJSON(result);
                var n = 0;
                var chtml = "";
                // console.log(r);
                $.each(r, function (a, b) {
                    chtml += "";
                    if (n === 0) {
                        html += "<div class='clearfloat tab_box_con'>";
                        chtml += "<li class='current'>" + b.abb + "<p>" + b.enname + "</p></li>";
                        n++;
                    }
                    else {
                        html += "<div class='hide clearfloat tab_box_con'>";
                        chtml += "<li>" + b.abb + "<p>" + b.enname + "</p></li>";
                    }


                    html += "<ul class='tab1list fl'>";
                    if (b.news) {
                        var news = JSON.parse(b.news);
                        var m = 0;
                        $.each(news, function (c, d) {
                            if (m < 7) {
                                html += "<li>"
                                    + '<a href="' + d.url + '" title="' + d.title + '">' + d.title + '</a><span>' + d.date.substring(5, 10) + '</span>'
                                    + "</li>"
                            }
                            m++;
                        });
                    }
                    var dlen = b.details;
                    var isShow = false;
                    // var more = "更多";
                    if (dlen.length > 290) {
                        dlen = dlen.substring(0, 290) + "...";
                        isShow = true;
                    }
                    html += "</ul>"
                        + '<div class="subPlatformIntro fl" style="height:auto;width:520px;">'
                        + '<div class="sublogo" style="width:520px;"><div style="float:left;width:auto;"><a href="' + b.homeurl + '"><img style="width:70px;height:50px;" src="images/' + b.pic + '" /></a></div>'
                        + '<div><h2 style="margin-left: 90px;">' + b.name + '</h2></div></div>'
                        //+ '<a href="' + b.homeurl + '" class="btn">访问平台</a>'
                        + "</div>"
                        + '<div class="subPlatformTxt fr" style="width:500px;height:220px;padding:20px 30px;">'
                        + "<p>" + dlen + "</p>";
                    if (isShow) {
                        html += '<a href="' + b.url + '" class="btn">更多</a>'
                    }
                    html += "</div>"
                        + "</div>";
                });
                $("#childmenuid").html(chtml);
                $("#childid").html(html);//写入动态生成内容
                // index-子平台
                levelTabMenu('#childmenuid', 0, 7, 0, 155, 150);
            }
        }
    });
    //招采信息
    var url = LoadUrl() + "axis2/services/MyService/getNormalNewsList";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "area_type": "",
            "sub_srv": "20",
            "doc_Type": "",
            "interpret_type": "",
            "fromIndex": 0,
            "Size": 6
        },
        dataType: "text",//返回类型,如果是其他类型，则需要转化成json格式
        //contentType: "text/xml",
        success: function (result) {
            var html = "";//内部变量
            if (result) {
                result = loadXML(result);
                if (result) {
                    var r = jQuery.parseJSON(result);
                    $.each(r, function (a, b) {
                        var time = b.fromTime.substring(5, 10);
                        html += '<li><a href="' + b.url + '"><em>[' + b.region + ']</em> ' + b.title + '</a><span>' + time + '</span></li>'
                    });
                    $("#buy").html(html);//写入动态生成内容
                }
            }
        }
    });
    var uurl = LoadUrl() + "axis2/services/MyService/getNormalNewsList";
    $.ajax({
        type: "POST",
        url: uurl,
        data: {
            "area_type": "",
            "sub_srv": "20",
            "doc_Type": "",
            "interpret_type": "",
            "fromIndex": 0,
            "Size": 6
        },
        dataType: "text",//返回类型,如果是其他类型，则需要转化成json格式
        //contentType: "text/xml",
        success: function (result) {
            var html = "";//内部变量
            if (result) {
                result = loadXML(result);
                if (result) {
                    var r = jQuery.parseJSON(result);
                    $.each(r, function (a, b) {
                        var time = b.fromTime.substring(5, 10);
                        html += '<li><a href="' + b.url + '"><em>[' + b.region + ']</em> ' + b.title + '</a><span>' + time + '</span></li>'
                    });
                    $("#bid").html(html);//写入动态生成内容
                }
            }
        }
    });
    // 图书
    var burl = LoadUrl() + "axis2/services/MyService/getStickNewsList";
    $.ajax({
        type: "POST",
        url: burl,
        data: {
            "sub_srv": "18",
            "area_type": "",
            "top_flag": 0,
            "fromIndex": 0,
            "Size": 8
        },
        dataType: "text",//返回类型,如果是其他类型，则需要转化成json格式
        //contentType: "text/xml",
        success: function (result) {
            var html = "";
            result = loadXML(result);
            // console.log(result);
            if (result) {
                result = jQuery.parseJSON(result);
                // console.log(result);
                // 滑动
                var length = result.length;
                var com_width = 0;
                if (length <= 4) {
                    com_width = 1200;
                    $('.control-book-button').hide()
                } else {
                    com_width = length * 300;
                }
                // console.log(com_width);
                // 动态设置容器 ul#book_id 的宽度
                $('#book_id').css('width', com_width + 'px');
                $.each(result, function (a, b) {
                    var title = htmldecode(b.title);

                    html += '<div style="width:300px;float:left;height:400px; text-align:center; border:none;">'
                        + '<a href="Technological/LiteratureServiceDetail.html?menu=3&pid=' + b.id + '">'
                        + '<img src="images/' + b.picurl + '" width="240" height="300" style="padding-top:30px;" alt="">'
                        + '<h3 style="width:220px; overflow:visible;line-height:normal;white-space:normal; ">'
                        + title + '</h3>'
                        + '</a>'
                        + '</div>';
                });
                $("#book_id").html(html);
                // 左右切换按钮
                if (length > 4) {
                    var left = 0;
                    $('.prev-book-a img').addClass('gray');
                    // var width = $('ul.item').width();
                    // console.log(width);
                    $('.next-book-a').click(function () {
                        left += 300;
                        $('.prev-book-a img').removeClass('gray');
                        if (left <= com_width - 1200) {
                            $('.book-image-box').animate({left: '-' + left + 'px'}, 'normal');
                            if (left === com_width - 1200) {
                                $('.next-book-a img').addClass('gray');
                            }
                        } else {
                            left = (length - 4) * 300
                        }
                    });
                    $('.prev-book-a').click(function () {
                        if (left > 0) {
                            left -= 300;
                            $('.next-book-a img').removeClass('gray');
                            $('.book-image-box').animate({left: '-' + left + 'px'}, 'normal')
                        } else {
                            left = 0
                        }
                        if (left === 0) {
                            $('.prev-book-a img').addClass('gray');
                        }
                    })
                }
            } else {
                $('.control-book-button').hide();
            }
        },
        error: function () {
            $('.control-book-button').hide();
        }
    });

    // 技术预警
    var startYear = '';
    var endYear = new Date().getFullYear() + 1;
    startYear = endYear - 5;
    var keyWord = '物联网，云计算'; // 默认搜索项
    var msg = '';
    // 初次加载，动态设置起止年份
    $('#startYear').val(startYear);
    $('#endYear').val(endYear);
    $('#keywords').val(keyWord);
    // 绑定事件
    $('.choice-year').on('focus', function () {
        $(this).select()
    });

    $('#keywords').focus(function () {
        $(this).val('')
    });

    $('#startYear').blur(function () {
        if (!$(this).val() || $(this).val().trim().replace(/(^s*)|(s*$)/g, "").length === 0) {
            $(this).val(startYear)
        }
    });
    $('#endYear').blur(function () {
        if (!$(this).val() || $(this).val().trim().replace(/(^s*)|(s*$)/g, "").length === 0) {
            $(this).val(endYear)
        }
    });
    $('#keywords').blur(function () {
        if (!$(this).val() || $(this).val().trim().replace(/(^s*)|(s*$)/g, "").length === 0) {
            $(this).val(keyWord)
        }
    });

    getTecData(startYear, endYear, keyWord, msg, 10);
    // 分析
    $('.submitbtn').click(function () {
        var new_startYear = $('#startYear').val().trim();
        var new_endYear = $('#endYear').val().trim();
        var new_keyWord = $('#keywords').val().trim();
        var timeout = 10;
        msg = '';
        if (new_startYear * 1 !== startYear || new_endYear * 1 !== endYear || new_keyWord !== keyWord) {
            if (new_startYear.replace(/(^s*)|(s*$)/g, "").length === 0 || new_endYear.replace(/(^s*)|(s*$)/g, "").length === 0) {
                msg = '年份不能为空！请重新输入！'
            } else if (isNaN(new_startYear * new_endYear)) {
                msg = '年份输入有误！请重新输入！'
            } else if ((new_startYear * 1) >= (new_endYear * 1)) {
                msg = '起始年应小于终止年！'
            } else {
                startYear = new_startYear;
                endYear = new_endYear;
                keyWord = new_keyWord;
                timeout = (endYear - startYear) * 2;
            }
            getTecData(startYear, endYear, keyWord, msg, timeout)
        }
    });

    function getTecData(startYear, endYear, keyWord, msg, timeout) {
        var chart_indexTec = echarts.init(document.getElementById('indexTec'));
        chart_indexTec.showLoading(
            {
                text: 'Loading'
            }
        );
        // 设置最大超时时间(30s)
        timeout = (timeout > 30) ? 30 : timeout;
        timeout = (timeout < 6) ? 6 : timeout;
        var option_indexTec = {
            backgroundColor: '#fff',
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: []
            },
            grid: {
                top: '8%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
//        toolbox: {
//            feature: {
//                saveAsImage: {}
//            }
//        },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: []
        };
        if (!msg) {
            $.ajax({
                type: 'GET',
                url: 'http://124.193.169.149:8080/axis2/services/trend/get',
                timeout: timeout * 1000,
                data: {
                    "startYear": startYear,
                    "endYear": endYear,
                    "keywords": keyWord
                },
                dataType: 'text',
                success: function (result) {
                    var res = loadXML(result);
                    res = jQuery.parseJSON(res);
                    // console.log(res);
                    var ser = [];
                    for (var i = 0, len = res[2].length, j = {}; i < len; i++) {
                        j = {
                            name: res[0][i],
                            type: 'line',
                            data: res[2][i]
                        };
                        ser.push(j)
                    }
                    // console.log(ser);
                    chart_indexTec.hideLoading();
                    chart_indexTec.setOption({
                        legend: {
                            data: res[0]
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: res[1]
                        },
                        series: ser
                    })
                },
                error: function (XMLHttpRequest) {
                    XMLHttpRequest.abort();
                    chart_indexTec.hideLoading();
                    chart_indexTec.showLoading(
                        {
                            text: '请求失败！',
                            color: 'transparent',
                            textColor: '#c23531'
                        }
                    );
                },
                complete: function (XMLHttpRequest, status) {
                    if (status === 'timeout') {
                        XMLHttpRequest.abort();
                        chart_indexTec.hideLoading();
                        if (timeout === 30) {
                            chart_indexTec.showLoading(
                                {
                                    text: '请求超时！建议起始年-终止年区间不超过15年',
                                    color: 'transparent',
                                    textColor: '#c23531'
                                }
                            );
                        } else {
                            chart_indexTec.showLoading(
                                {
                                    text: '请求超时！请再次尝试！',
                                    color: 'transparent',
                                    textColor: '#c23531'
                                }
                            );
                        }
                    }
                }
            });
            chart_indexTec.setOption(option_indexTec)
        } else {
            $('#indexTec').html('<p style="margin: 0;width: 100%;line-height: 400px;text-align: center;">' + msg + '</p>')
        }
    }

    // 热点分析
    var hot_1 = echarts.init(document.getElementById('hot_1'));
    var hot_2 = echarts.init(document.getElementById('hot_2'));
    var hot_3 = echarts.init(document.getElementById('hot_3'));
    var hot_4 = echarts.init(document.getElementById('hot_4'));
    var hot_5 = echarts.init(document.getElementById('hot_5'));
    var hot_6 = echarts.init(document.getElementById('hot_6'));
    var hot_7 = echarts.init(document.getElementById('hot_7'));
    var hot_8 = echarts.init(document.getElementById('hot_8'));
    getHotWordsData(hot_1, 1, '#range_1');
    getHotWordsData(hot_2, 2, '#range_2');
    getHotWordsData(hot_3, 3, '#range_3');
    getHotWordsData(hot_4, 4, '#range_4');
    getHotWordsData(hot_5, 5, '#range_5');
    getHotWordsData(hot_6, 6, '#range_6');
    getHotWordsData(hot_7, 7, '#range_7');
    getHotWordsData(hot_8, 8, '#range_8');

    function getHotWordsData(chart, class_num, rangeId) {
        $.ajax({
            type: "GET",
            // url: 'json/1.json',
            url: 'http://172.16.155.201:8080/HotTopicServer/getWordTrend',
            data: {
                "class_num": class_num,
                "topic_id": '0'
            },
            dataType: "json",
            success: function (res) {
                if (res.length !== 0) {
                    $(rangeId).css('visibility', 'visible');
                    var range = $(rangeId).find('.range-box');
                    var slider = $(rangeId).find('.range-slider');
                    var msg = $(rangeId).find('.range-mea');
                    var tip = $(rangeId).find('.range-tip');
                    tip.html(res[0][0][0]);
                    var html = '';
                    var num = res[0][0].length; // 选择项数量
                    var item_width = 44; // 每项的宽度
                    var width = num * item_width + num * 4; // 计算总长
                    var slider_width = 12; // 滑块宽度
                    var tip_width = 50; // 提示框宽度
                    var item = 0; // 开始项
                    var begin = item * width / num + width / num / 2 - slider_width / 2;
                    var tip_b = item * width / num + width / num / 2 - tip_width / 2;
                    for (var i = 0; i < num; i++) {
                        html += '<span class="' + ((i === 0) ? 'range-active' : '') + '" rel="' + i + '" time="' + res[0][0][i] + '" style="width:' + item_width + 'px;"></span>'
                    }
                    msg.html(html);
                    range.css('width', width + 'px');
                    slider.animate({left: begin + 'px'}, 200);
                    tip.animate({left: tip_b + 'px'}, 200);
                    renderChartsData(item);
                    $(rangeId).find('.range-mea span').on('click', function () {
                        $(this).addClass('range-active').siblings().removeClass('range-active');
                        var txt = $(this).attr('time');
                        tip.html(txt);
                        var new_item = $(this).attr('rel') * 1;
                        if (new_item !== item) {
                            item = new_item;
                            begin = item * width / num + width / num / 2 - slider_width / 2;
                            tip_b = item * width / num + width / num / 2 - tip_width / 2;
                            slider.animate({left: begin + 'px'}, 200);
                            tip.animate({left: tip_b + 'px'}, 200);
                            renderChartsData(item)
                        }
                    });

                    function renderChartsData(item) {
                        var datalist = res[item + 1][1];
                        var markLineOpt = {};
                        var bg = {
                            name: '相关背景',
                            type: 'pie',
                            avoidLabelOverlap: false,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value: 1
                            }],
                            animation: false
                        };
                        var dot = {
                            name: '强相关',
                            type: 'scatter',
                            xAxisIndex: 0,
                            yAxisIndex: 0,
                            symbol: 'circle',
                            symbolSize: 40,
                            label: {
                                normal: {
                                    show: true,
                                    textStyle: {
                                        color: '#555'
                                    },
                                    position: 'bottom',
                                    formatter: function (param) {
                                        return param.data[2];
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                        color: '#CF000F'
                                    }
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#9bca63'
                                }
                            },
                            data: []
                        };
                        var dataMap = datalist.map(function (item) {
                            return Object.assign({}, dot, {
                                name: '弱相关',
                                symbolSize: item[3],
                                itemStyle: {
                                    normal: {
                                        color: item[4] == 1 ? '#FA7C62' : '#20B78E'
                                    }
                                },
                                data: [
                                    item
                                ]
                            })
                        });

                        function _toConsumableArray(arr) {
                            if (Array.isArray(arr)) {
                                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
                                    arr2[i] = arr[i];
                                }
                                return arr2;
                            } else {
                                return Array.from(arr);
                            }
                        }

                        var option = {
                            backgroundColor: '#f5f5f5',
                            title: {
                                text: '',
                                x: '35%',
                                y: 0
                            },
                            xAxis: [{
                                gridIndex: 0,
                                type: 'value',
                                show: false,
                                min: 0,
                                max: 100,
                                nameLocation: 'middle',
                                nameGap: 30
                            }],
                            yAxis: [{
                                gridIndex: 0,
                                min: 0,
                                show: false,
                                max: 100,
                                nameLocation: 'middle',
                                nameGap: 30
                            }],
                            series: [].concat(_toConsumableArray(dataMap), [{
                                name: '弱相关',
                                type: 'scatter',
                                xAxisIndex: 0,
                                yAxisIndex: 0,
                                symbol: 'circle',
                                symbolSize: 70,
                                label: {
                                    normal: {
                                        show: true,
                                        textStyle: {
                                            fontWeight: 'bold',
                                            fontSize: 10,
                                            color: '#000'
                                        },
                                        formatter: function (param) {
                                            return param.data[2];
                                        }
                                    },
                                    emphasis: {
                                        show: true,
                                        textStyle: {
                                            fontWeight: 'bold',
                                            fontSize: 16,
                                            color: '#CF000F'
                                        }
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#8570b0'
                                    }
                                },
                                data: [res[item + 1][0]],
                                markLine: markLineOpt
                            },
                                Object.assign({}, bg, {
                                    radius: ['0%', '50%'],
                                    itemStyle: {
                                        normal: {
                                            color: '#DAE1F4'
                                        },
                                        emphasis: {
                                            color: '#DAE1F4'
                                        }
                                    }
                                }),
                                Object.assign({}, bg, {
                                    radius: ['50%', '100%'],
                                    itemStyle: {
                                        normal: {
                                            color: '#E2E8F6'
                                        },
                                        emphasis: {
                                            color: '#E2E8F6'
                                        }
                                    }
                                }),
                                Object.assign({}, bg, {
                                    radius: ['100%', '200%'],
                                    itemStyle: {
                                        normal: {
                                            color: '#F0F3FC'
                                        },
                                        emphasis: {
                                            color: '#F0F3FC'
                                        }
                                    }
                                })])
                        };
                        chart.setOption(option)
                    }
                }
            }
        })
    }

    // index-热点分析
    levelTabMenu('#indexVertical2', 1, 4, 1, 112, 150);
});