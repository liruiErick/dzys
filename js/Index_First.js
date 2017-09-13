// 首页八大块导航
$(function () {
    var url = LoadUrl() + "axis2/services/MyService/getAreaList";
    $.ajax({
        type: "POST",
        url: url,
        data: {},
        dataType: "text",
        contentType: "text/xml",
        success: function (result) {
            var html_up = '';
            var html_down = '';
            // var n = 1;
            if (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                // console.log(result);
                // 滑动
                var length = result.length;
                var com_width = 0;
                if (length <= 8) {
                    com_width = 1200;
                    $('.control-button').hide()
                } else {
                    com_width = Math.ceil(length / 2) * 300;
                }
                // console.log(com_width);
                // 动态设置容器 ul#index_areaid 的宽度
                $('.com-width').css('width', com_width + 'px');
                $.each(result, function (a, b) {
                    // console.log(encodeURIComponent(b.name));
                    if (result[a].order % 2 === 0) {
                        html_down += '<li class="subject' + (a + 1) + '"><a href="SubIndex.html?area=' + CustomEnCode(b.name) + '&submenu=' + '&id=-1"><div><img src="images/' + b.picurl + '"/></div><i>' + b.enname + '</i><p>' + b.name + '</p></a></li>'
                    } else {
                        html_up += '<li class="subject' + (a + 1) + '"><a href="SubIndex.html?area=' + CustomEnCode(b.name) + '&submenu=' + '&id=-1"><div><img src="images/' + b.picurl + '"/></div><i>' + b.enname + '</i><p>' + b.name + '</p></a></li>'
                    }
                });
                // console.log(html_up);
                // console.log(html_down);
                $("#index_areaid_up").html(html_up);
                $("#index_areaid_down").html(html_down);

                // 首页分类导航模块左右切换按钮
                if (length > 8) {
                    var left = 0;
                    $('.prev-a img').addClass('gray');
                    $('.next-a').click(function () {
                        left += 300;
                        $('.prev-a img').removeClass('gray');
                        if (left <= com_width - 1200) {
                            $('ul.item').animate({ left: '-' + left + 'px' }, 'fast');
                            if (left === com_width - 1200) {
                                $('.next-a img').addClass('gray');
                            }
                        } else {
                            left = com_width - 1200;
                        }
                    });
                    $('.prev-a').click(function () {
                        if (left > 0) {
                            left -= 300;
                            $('.next-a img').removeClass('gray');
                            $('ul.item').animate({ left: '-' + left + 'px' }, 'fast')
                        } else {
                            left = 0;
                        }
                        if (left === 0) {
                            $('.prev-a img').addClass('gray');
                        }
                    })
                } else {
                    // console.log('按钮隐藏，不绑定事件');
                    $('.control-button').hide()
                }
            }
        }
    })
});

// 技术动态
$(function () {
    var jurl = LoadUrl() + "axis2/services/MyService/getStickNewsList";
    $.ajax({
        type: "POST",
        url: jurl,
        data: {
            "sub_srv": "10",
            "area_type": "",
            "top_flag": 1,
            "fromIndex": 0,
            "Size": 1
        },
        dataType: "text",//返回类型,如果是其他类型，则需要转化成json格式
        //contentType: "text/xml",
        success: function (result) {
            var html = "";//内部变量
            if (result) {
                result = loadXML(result);
                if (result) {
                    var r = jQuery.parseJSON(result);
                    $("#tecId").empty();
                    $.each(r, function (a, b) {
                        html += '<div class="photonews1 fl"><img src="images/' + b.stick_pic + '" width="426" height="276"/>'
                            + '<h3><a href="Industry/NewsShow.html?menu=0&pid=' + b.id + '">' + b.title + '</a></h3>'
                            + '<p>' + b.stick_abstract.substring(0, 90) + "..." + '</p>'
                            + '</div>';
                    });

                    var index_url = LoadUrl() + "axis2/services/MyService/getStickNewsList";
                    $.ajax({
                        type: "POST",
                        url: index_url,
                        data: {
                            "sub_srv": "10",
                            "area_type": "",
                            "top_flag": 0,
                            "fromIndex": 0,
                            "Size": 2
                        },
                        dataType: "text",//返回类型,如果是其他类型，则需要转化成json格式
                        //contentType: "text/xml",
                        success: function (result) {
                            if (result !== "") {
                                result = loadXML(result);
                                var r = jQuery.parseJSON(result);
                                $.each(r, function (a, b) {

                                    html += '<div class="photonews2 fr"><img src="images/' + b.stick_pic + '" width="235" height="152"/>'
                                        + '<h3><a href="Industry/NewsShow.html?menu=0&pid=' + b.id + '">' + b.title + '</a></h3>'
                                        //+ '<p>' + b.stick_abstract + '</p>'
                                        + '</div>';
                                });
                                $("#tecId").html(html);
                            }
                        }
                    })
                }
            }
        }
    });

    var url = LoadUrl() + "axis2/services/MyService/getNormalNewsList";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "area_type": "",
            "sub_srv": "10",
            "doc_Type": "",
            "interpret_type": "",
            "fromIndex": 0,
            "Size": 4
        },
        dataType: "text",
        success: function (result) {
            var html = "";
            if (result) {
                result = loadXML(result);
                if (result) {
                    var r = jQuery.parseJSON(result);
                    $.each(r, function (a, b) {
                        html += "<li>"
                            + '<h3><a href="Industry/NewsShow.html?menu=&pid=' + b.id + '">' + b.title + '</a></h3>'
                            + '<p>' + b.stick_abstract.substring(0, 90) + "..." + '</p>'
                            + "</li>"
                    });
                    $("#tecnewsId").html(html);
                }
            }
        }
    })
});

// 会展培训
$(function () {
    var hurl = LoadUrl() + "axis2/services/MyService/searchMeetingOrExhibition";//getNormalNewsList";
    //会议活动
    $.ajax({
        type: "POST",
        url: hurl,
        data: {
            //"area_type": "",
            //"sub_srv": "20",
            //"doc_Type": "",
            //"interpret_type": "",
            //"fromIndex": 1,
            //"Size": 6
            "sub_srv": "20", 
            "keyword": "",
            "datescope": "",
            "unit": "",
            "fromIndex": 0,
            "size": 6
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
                        var time = b.fromTime;
                        time = time.substring(5, 10);
                        html += '<li><a href="Train/ShowInfoDetail.html?menu=5&pid=' + b.id + '"><em>[' + b.region + ']</em> ' + b.title + '</a><span>' + time + '</span></li>'
                    });
                    $("#convention").html(html);//写入动态生成内容
                }
            }
        }
    });
    //培训信息
    var purl = LoadUrl() + "axis2/services/MyService/searchTrain";//getNormalNewsList";
    $.ajax({
        type: "POST",
        url: purl,
        data: {
            "sub_srv": "22",
            "keyword": "",
            "datescope": "",
            "unit": "",
            "fromIndex": 0,
            "size": 5
        },
        dataType: "text",//返回类型,如果是其他类型，则需要转化成json格式
        //contentType:"text/xml",
        success: function (result) {
            var html = "";//内部变量
            if (result) {
                result = loadXML(result);
                if (result) {
                    var r = jQuery.parseJSON(result);
                    if (r.length > 0) {
                        var apply = r[0].applyendtime;
                        if (typeof (apply) == "undefined") {
                            apply = "";
                        }
                        else if (apply.length > 10) {
                            apply = apply.substring(0, 10);
                        }
                        var start = r[0].starttime;
                        if (typeof (start) == "undefined") {
                            start = "";
                        }
                        else if (start.length > 10) {
                            start = start.substring(0, 10);
                        }
                        var locations = r[0].location;
                        if (typeof (locations) == "undefined") {
                            locations = "";
                        }
                        else if (locations.length > 2) {
                            locations = locations.substring(0, 2);
                        }
                        var list = "";
                        for (var i = 1; i < r.length; i++) {
                            list += '<li><div><h3><a href="Train/TrainInfoDetail.html?menu=5&pid=' + r[1].id + '">' + r[i].title + '</a></h3><a href="Train/TrainInfoDetail.html?menu=7&pid=' + r[1].id + '"><img src="images/' + r[i].picurl + '" style="width:146px;height:102px;"/></a></div></li>';
                        }
                        html = '<li class="training1"><div><a href="Train/TrainInfoDetail.html?menu=5&pid=' + r[0].id + '"><img src="images/' + r[0].picurl + '" style="width:188px;height:133px;" /></a></div>'
                            + '<h3><a href="Train/TrainInfoDetail.html?menu=5&pid=' + r[0].id + '">' + r[0].title + '</a></h3>'
                            + '<p class="clearfloat">'
                            + '<span>培训日期：</span><i>' + apply + '</i><br />'
                            + '<span>报名日期：</span><i>' + start + '</i>'
                            //+ '<span class="fr location">' + locations + '</span>'
                            + '</p>'
                            + '</li>'
                            + list;
                        //+ '<li><div><h3><a href="' + r[1].url + '">' + r[1].title + '</a></h3><a href="' + r[1].url + '"><img src="images/img2.jpg"/></a></div></li>'
                        //+ '<li><div><h3><a href="' + r[2].url + '">' + r[2].title + '</a></h3><a href="' + r[2].url + '"><img src="images/img3.jpg"/></a></div></li>'
                        //+ '<li><div><h3><a href="' + r[3].url + '">' + r[3].title + '</a></h3><a href="' + r[3].url + '"><img src="images/img4.jpg"/></a></div></li>'
                        //+ '<li><div><h3><a href="' + r[4].url + '">' + r[4].title + '</a></h3><a href="' + r[4].url + '"><img src="images/img5.jpg"/></a></div></li>';
                        $("#trainid").html(html);
                    }
                }
            }
        }
    })
});