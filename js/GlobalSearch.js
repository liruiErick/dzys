var pageSize = 35;
var pageCount = 0;
var displayNums = 5;
var gkey = "";
var gtype = "";
var gunit = "";
var gorign = "";
//显示百科内容
function ShowBaiKe() {
    var name = "科技查新";//$("#keyid").val();
    var url = LoadUrl() + "axis2/services/MyService/getBaike";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "baike": name
        },
        dataType: "text",
        success: function (result) {
            if (result != null) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                $("#ctid").html(result[0].baike);
                $("#ctcid").html(result[0].contact);
            }
        }
    })
}
//检索
function SearchBtn() {
    var child = $("#control_time_zhaocaixinxi").find("option:selected").val();
    var area = $("#control_lingyu_xuanze").text();
    var kwords = $("#keyid").val();
    var time = $("#control_time_xuanze").text();
    if (child == "1") {
        child = "";
    }
    SetLocal("GlobalChild", child);
    SetLocal("GlobalArea", area);
    SetLocal("GlobalKey", kwords);
    SetLocal("GlobalTime", time);
    gkey = kwords;
    pageCount = 0;
    console.log(child);
    ShowInfo(1, child, area, kwords, time, "", "");
}
//结果中检索
function SearchAgain() {
    var keys = $("#keyid").val();
    if (keys != GetLocal("GlobalKey")) {
        keys = GetLocal("GlobalKey") + "," + keys;
    }
    pageCount = 0;
    gkey = keys;
    ShowInfo(1, GetLocal("GlobalChild"), GetLocal("GlobalArea"), keys, GetLocal("GlobalTime"), gunit, gorign);
}
//时间检索
function ShowInfoByTime(obj) {
    var s = $(obj).text();
    pageCount = 0;
    ShowInfo(1, GetLocal("GlobalChild"), GetLocal("GlobalArea"), gkey, s, gunit, gorign);
}

function LoadCondition() {
    //加载子菜单
    var url = LoadUrl() + "axis2/services/MyService/getAllSubMenuName";
    $.ajax({
        type: "POST",
        url: url,
        data: {},
        dataType: "text",
        contentType: "text/xml",
        success: function (result) {
            result = loadXML(result);
            result = jQuery.parseJSON(result);
            var html = '<option value="1">全部</option>';
            var n = 2;
            $.each(result, function (a, b) {
                html += '<option value="' + b.itemid + '">' + b.menu + '</option>';
                n++;
            });
            $("#control_time_zhaocaixinxi").html(html);
            $('#control_time_zhaocaixinxi').selectize({
                create: true,
                sortField: {
                    field: 'value',
                    direction: 'asc'
                },
                dropdownParent: 'body'
            });
        }
    });
    //加载领域
    var stype = GetLocal("SubType");
    var surl = LoadUrl() + "axis2/services/MyService/getAreaList";
    $.ajax({
        type: "POST",
        url: surl,
        data: {},
        dataType: "text",
        contentType: "text/xml",
        success: function (result) {
            result = loadXML(result);
            result = jQuery.parseJSON(result);
            var html = '<option value="1">全部</option>';
            var n = 2;
            var list = new Array();
            $.each(result, function (a, b) {
                if ($.inArray(b.name, list) < 0) {
                    if (stype != "" && stype == b.name) {
                        html += '<option value="' + n + '" selected="selected">' + b.name + '</option>';
                    }
                    else {
                        html += '<option value="' + n + '">' + b.name + '</option>';
                    }
                    n++;
                }
                list.push(b.name);
            });
            $("#control_lingyu_xuanze").html(html);
            $('#control_lingyu_xuanze').selectize({
                create: true,
                sortField: {
                    field: 'value',
                    direction: 'asc'
                },
                dropdownParent: 'body'
            });
        }
    })
}

function SearchByType(obj) {
    $("#control_time_zhaocaixinxi").text($(obj).text());
    pageCount = 0;
    var child = $("#control_time_zhaocaixinxi").text();
    var area = $("#control_lingyu_xuanze").text();
    var kwords = $("#keyid").val();
    var time = $("#control_time_xuanze").text();
    var li = $(obj).parent().parent()[0].childNodes;
    for (var i = 0; i < li.length; i++) {
        li[i].attr("style", "display:none;");//.css("display", "block");
    }
    $(obj).css("display", "block");
    ShowInfo(1, child, area, kwords, time);
}

//加载右侧类型
function InitType(child, field, words, time, unit, organization) {
    var url = LoadUrl() + "axis2/services/MyService/getTypeCountByGlobal";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "keyword": words,
            "sub_srv": child,
            "areatype": field,
            "datescope": time,
            "unit": unit,
            "organization": organization
        },
        dataType: "text",
        success: function (result) {
            result = loadXML(result);
            if (result != "") {
                result = jQuery.parseJSON(result);
                var html = "";
                $.each(result, function (a, b) {
                    html += '<li><a>' + b.srv_subtype + '</a><span style="display:none;">' + b.itemid + '</span>（' + b.total + '）</li>';
                });
                $("#typeid").html(html);
                $("#typeid li").click(function () {
                    pageCount = 0;
                    gtype = $(this).find("span").text();
                    ShowInfo(1, gtype, field, words, time, unit, organization);
                    $("#control_time_zhaocaixinxi").find("option:selected").text($(this).find("a").text()).val(gtype);
                    $("#control_time_zhaocaixinxi").siblings("div").find("div.item").attr("data-value", gtype).text($(this).find("a").text());
                })
            }
            else {
                $("#typeid").empty();
            }
        }
    })
}
//加载右侧地域
function InitArea(child, field, words, time, unit, organization) {
    var url = LoadUrl() + "axis2/services/MyService/getUnitCountByGlobal";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "keyword": words,
            "sub_srv": child,
            "areatype": field,
            "datescope": time,
            "unit": unit,
            "organization": organization
        },
        dataType: "text",
        success: function (result) {
            result = loadXML(result);
            if (result != "") {
                result = jQuery.parseJSON(result);
                var html = "";
                $.each(result, function (a, b) {
                    html += '<li><a>' + b.unit + '</a>（' + b.total + '）</li>';
                });
                $("#areaid").html(html);
                $("#areaid li").click(function () {
                    pageCount = 0;
                    gunit = $(this)[0].firstChild.text;
                    ShowInfo(1, child, field, words, time, $(this)[0].firstChild.text, organization);
                })
            }
            else {
                $("#areaid").empty();
            }
        }
    })
}
//加载右侧机构
function InitOrganization(child, field, words, time, unit, organization) {
    var url = LoadUrl() + "axis2/services/MyService/getOrganizationCountByGlobal";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "keyword": words,
            "sub_srv": child,
            "areatype": field,
            "datescope": time,
            "unit": unit,
            "organization": organization
        },
        dataType: "text",
        success: function (result) {
            result = loadXML(result);
            if (result != "") {
                result = jQuery.parseJSON(result);
                var html = "";
                $.each(result, function (a, b) {
                    html += '<li><a>' + b.organization + '</a>（' + b.total + '）</li>';
                });
                $("#organid").html(html);
                $("#organid li").click(function () {
                    pageCount = 0;
                    gorign = $(this)[0].firstChild.text;
                    ShowInfo(1, child, field, words, time, unit, $(this)[0].firstChild.text);
                })
            }
            else {
                $("#organid").empty();
            }
        }
    })
}
//分页
function ShowPage(currentIndex) {
    var child = $("#control_time_zhaocaixinxi").text();
    var area = $("#control_lingyu_xuanze").text();
    var kwords = $("#keyid").val();
    var time = $("#control_time_xuanze").text();
    ShowInfo(currentIndex, child.trim(), area.trim(), kwords.trim(), time.trim(), gunit, gorign);
}

//加载内容
function ShowInfo(currentIndex, child, field, words, time, unit, organization) {
    var surl = LoadUrl() + "axis2/services/MyService/searchGlobal";
    var start = (currentIndex - 1) * pageSize;
    $.ajax({
        type: "POST",
        url: surl,
        data: {
            "keyword": words,
            "sub_srv": child,
            "areatype": field,
            "datescope": time,
            "unit": unit,
            "organization": organization,
            "fromIndex": start,
            "size": pageSize
        },
        dataType: "text",
        success: function (result) {
            var html = "";
            result = loadXML(result);
            if (result) {
                result = jQuery.parseJSON(result);
                $("#listid").empty();
                $.each(result, function (a, b) {
                    if (pageCount == 0) {
                        pageCount = b.total;
                    }
                    var link = "";
                    var checks = b.id;
                    if (b.srv_subtype == "产业新闻") {
                        link = "Industry/NewsShow.html?menu=0";
                    }
                    else if (b.srv_subtype == "法规浏览") {
                        link = "Policy/DetailShow.html?menu=1";
                    }
                    else if (b.srv_subtype == "专家解读") {
                        link = "Policy/ExpertDetail.html?menu=1";
                    }
                    else if (b.srv_subtype == "市场观察") {
                        link = "Business/MarketTrendChildDetail.html?menu=2";
                    }
                    else if (b.srv_subtype == "文献服务") {
                        link = "Technological/LiteratureServiceDetail.html?menu=3";
                    }
                    else if (b.srv_subtype == "项目申报") {
                        link = "Recruit/InviteInfoDetails.html?menu=4";
                    }
                    else if (b.srv_subtype == "会议活动") {
                        link = "Train/ShowInfoDetail.html?menu=5";
                        checks = checks + "&tran=1";
                    }
                    else if (b.srv_subtype == "行业展览") {
                        link = "Train/ShowInfoDetail.html?menu=5";
                        checks = checks + "&tran=2";
                    }
                    else if (b.srv_subtype == "培训信息") {
                        link = "Train/TrainInfoDetail.html?menu=5";
                    }
                    html += '<li>'
                        + '<a href="' + link + '&pid=' + checks + '" target="_blank" title="【' + b.srv_subtype + '】' + b.title + '">【' + b.srv_subtype + '】' + b.title + '</a><span>' + b.fromTime.substring(5, 10) + '</span>'
                        + '</li>';
                });
                $("#listid").html(html);
                var num = 0;
                //pageCount = 12;
                if (pageCount % pageSize == 0) {
                    num = Math.floor(pageCount / pageSize);
                }
                else {
                    num = Math.floor(pageCount / pageSize) + 1;
                }
                if (html == "") {
                    $("#listid").html("无结果");
                    $("#pagingid").empty();
                }
                else {
                    $("#pagingid").empty();
                    $("#pagingid").pagination(currentIndex, num, displayNums);
                }
            }
            //if (pageCount != 0) {
            //    $("#pagingid").css("display", "block");
            //    $("#pagingid").paginate({
            //        count: num,
            //        start: currentIndex,
            //        display: displayNums,
            //        border: true,
            //        border_color: '#fffff',
            //        text_color: '#828282',
            //        background_color: '#f2f2f2',
            //        border_hover_color: '#fff',
            //        text_hover_color: '#fff',
            //        background_hover_color: '#00aaff',
            //        images: false,
            //        mouse: 'press',
            //        onChange: function (p) {
            //            ShowInfo(p, child, field, words, time);
            //        }
            //    });
            //}
            //else {
            //    $("#pagingid").css("display", "none");
            //}

        }
    });
    ShowBaiKe();
    InitType(child, field, words, time, unit, organization);
    InitArea(child, field, words, time, unit, organization);
    InitOrganization(child, field, words, time, unit, organization);
}

$(function () {
    var key = GetLocal("SearchContent");
    var word = "";
    if (key != null && key != "" && key != "undefined") {
        $("#searchid").val(key);
        $("#keyid").val(key);
        word = key;
    }
    LoadCondition();
    //var area = "全部";
    //if (GetLocal("SubType") != "")
    //{
    //    area = GetLocal("SubType");
    //}
    var child = $("#control_time_zhaocaixinxi").text();
    var area = GetLocal("SubType");
    if (!area) {

    }
    console.log(area);
    var kwords = $("#keyid").val();
    var time = $("#control_time_xuanze").text();
    area = $("#control_lingyu_xuanze").text();
    ShowInfo(1, child.trim(), area.trim(), kwords.trim(), time.trim(), "", "");

});
window.onunload = function () {
    SetLocal("SubType", "");
}