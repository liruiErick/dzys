var code = "";
var ftype = "";

function LoadTime() {
    var url = LoadUrl() + "axis2/services/MyService/getMaxAndMinYear";
    $.ajax({
        type: "POST",
        url: url,
        data: {            
        },
        dataType: "text",
        contentType:"text/xml",
        success: function (data) {
            var html = '<option value="">选择时间</option>';
            data = loadXML(data);
            if (data) {
                data = jQuery.parseJSON(data);
                var maxtime = new Date().getFullYear();
                var mintime = data[0].min;
                if (mintime)
                {
                    mintime = mintime.substring(0, 4);
                }
                for (var i = mintime; i <= maxtime; i++)
                {
                    html += "<option value='" + i + "'>" + i + "</option>";
                }
                $("#control_time_01").html(html);
                $("#control_time_02").html(html);
                $('#control_time_01').selectize({
                    create: true,
                    sortField: {
                        field: 'value',
                        direction: 'asc'
                    },
                    dropdownParent: 'body'
                });
                $('#control_time_02').selectize({
                    create: true,
                    sortField: {
                        field: 'value',
                        direction: 'desc'
                    },
                    dropdownParent: 'body'
                });
            }
        }
    })
}

function SearchByTree(obj) {
    code = $(obj).next().text();
    if (code.indexOf("+") != -1)
    {
        code = code.substring(0, code.indexOf("+"));
    }
    var start = $("#control_time_01").find("option:selected").text().trim();
    var end = $("#control_time_02").find("option:selected").text().trim();
    var keyword = $("#keyid").val();
    var filetype = "";
    $("input:checkbox[class='css-checkbox']:checked").each(function (i, b) {
        if (b.labels != null && b.labels.length > 0) {
            if (i == 0) {
                filetype = b.labels[0].innerText;
            }
            else {
                filetype += ("," + b.labels[0].innerText);
            }
        }
    });
    showInfo(1, start, end, "文献", keyword, code);
}
var str = "";
var forTree = function (o) {
    for (var i = 0; i < o.length; i++) {
        var urlstr = "";
        try {
            if (o[i]["arrayList"].length == 2) {
                urlstr = "<li><a onclick='SearchByTree(this)'>" + o[i]["classifyName"] + "</a><span style='display:none;'>" + o[i]["classifyCode"] + "</span></li>";
            } else {
                urlstr = "<li><a onclick='SearchByTree(this)'>" + o[i]["classifyName"] + "</a><span style='display:none;'>" + o[i]["classifyCode"] + "</span><ul class='submenu'>";
            }
            str += urlstr;
            if (o[i]["arrayList"] != null && o[i]["arrayList"].length != 2) {
                forTree(jQuery.parseJSON(o[i]["arrayList"]));
            }
            if (i == o.length - 1) {
                str += "</ul></li>";
            }

        } catch (e) {
        }
    }
    //str += "</li>";
    return str;
};
function LoadTree() {
    var turl = LoadUrl() + "axis2/services/MyService/getBooksClassify";
    $.ajax({
        type: "POST",
        url: turl,
        data: {},
        dataType: "text",
        contentType: "text/xml",
        success: function (data) {
            var html = "";
            if (data != null) {
                data = loadXML(data);
                data = jQuery.parseJSON(data);
                var n = 0;
                html = forTree(data);
                $("#demo-list").html(html);

                $("#demo-list li").click(function () {
                    $("#demo-list li.active").removeClass("active");
                    $(this).addClass("active")
                });
                jQuery(document).ready(function () {
                    jQuery("#jquery-accordion-menu").jqueryAccordionMenu()
                })
            }
            //$("#demo-list").treemenu({ delay: 300 }).openActive();
        }
    })
}

function GoSearch() {
    var start = $("#control_time_01").find("option:selected").text().trim();
    var end = $("#control_time_02").find("option:selected").text().trim();
    var keyword = $("#keyid").val();
    var filetype = "";
    $("input:checkbox[class='css-checkbox']:checked").each(function (i, b) {
        if (b.labels != null && b.labels.length > 0) {
            if (i == 0) {
                filetype = $(b.labels[0]).attr("value");//.innerText;
            }
            else {
                filetype += ("," + $(b.labels[0]).attr("value"));
            }
        }
    });
    location.href = '../SearchResult.html?menu=3&keyword=' + keyword + '&start=' + start + '&end=' + end + '&filetype=' + filetype + '&code=' + code;
}

// 标签切换事件
$('.tab-box li').click(function () {
    if (!($(this).attr('class'))) {
        var filetype = $(this).attr('value');
        showInfo(1, '', '', filetype, '', code);
        // console.log(filetype);
        $(this).attr('class', 'current');
        $(this).siblings().removeAttr('class')
    }
});

/**
 * 点击标签，新闻列表更新事件
 * @param currentindex (传入的页码数)
 * @param start (查询开始时间)
 * @param end (查询结束时间)
 * @param filetype (标签类别)
 * @param keyword (输入的关键词)
 * @param code (左侧列表被选中的选项)
 */
function showInfo(currentindex, start, end, filetype, keyword, code) {
    var com_pageSize = 5;
    var pageCount = 0;
    var displayNums = 5;
    var fromindex = 0;
    var pageSize = 0;
    if (filetype === '文献') {
        wx_show(currentindex, start, end, keyword, code);
        return;
    } else {
        code = "";
        fromindex = (currentindex - 1) * com_pageSize;
        pageSize = com_pageSize;
    }
    ftype = filetype;
    var url = LoadUrl() + "axis2/services/MyService/searchLiterature";
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "sub_srv": "18",
            "keyword": keyword,
            "code": code,
            "doctype": filetype,
            "startdate": start,
            "enddate": end,
            "fromIndex": fromindex,
            "size": pageSize
        },
        dataType: "text",
        success: function (result) {
            result = loadXML(result);
            if (result) {
                result = jQuery.parseJSON(result);
                // console.log(result);
                var html = "";
                    $.each(result, function (a, b) {
                        pageCount = b.total;
                        html += '<li><a href="#"><img src="../images/' + b.picurl + '" width="150" height="184" alt=""/></a>'
                            + '<div class="wenxian_list_txt">'
                            + '<h1><a href="LiteratureServiceDetail.html?menu=3&pid=' + b.id + '">' + htmldecode(b.title).replace("<br/>", "") + '</a></h1>'
                            + '<p><a href="#">' + b.stick_abstract.substring(0, 252) + '...</a>'
                            + '</p>'
                            + '</div>'
                            + '</li>';
                    })

                var num = Math.ceil(pageCount / pageSize);

                $("#bg_id").html(html);
                if (pageCount != 0) {
                    $("#pagingid").empty();
                    $("#pagingid").pagination(currentindex, num, displayNums);
                } else {
                    $("#pagingid").empty();
                }
            }
        }
    })
}
//显示文献列表
function wx_show(currentindex, start, end, keyword, code)
{
    var url = LoadUrl() + "axis2/services/MyService/getDocumentList";
    var wx_pageSize = 26;
    var fromindex = (currentindex - 1) * wx_pageSize;
    var pageSize = wx_pageSize;
    var pageCount = 0;
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "keywords": keyword,
            "startYear": start,
            "endYear": end,
            "docCode": code
            //"fromIndex": fromindex,
            //"size": pageSize
        },
        dataType: "text",
        //contentType: "text/xml",
        success: function (result) {
            result = loadXML(result);
            if (result)
            {
                var html = "";
                result = JSON.parse(result);
                $.each(result, function (a, b) {
                    pageCount = b.total;
                    html += '<li class="wx-list">'
                        + '<a href="LiteratureServiceDetail.html?menu=3&pid=' + b.GUID + '" title="' + htmldecode(b.Title).replace("<br/>", "") + '">' + htmldecode(b.Title).replace("<br/>", "") + '</a><span>' + b.PublishTime.substr(5,5) + '</span>'
                        + '</li>';
                })
                var num = Math.ceil(pageCount / pageSize);

                $("#bg_id").html(html);
                if (pageCount != 0) {
                    $("#pagingid").empty();
                    $("#pagingid").pagination(currentindex, num, displayNums);
                } else {
                    $("#pagingid").empty();
                }
            }
        }
    })
}
//分页
function ShowPage(currentIndex) {
    var start = $("#control_time_01").find("option:selected").text().trim();
    var end = $("#control_time_02").find("option:selected").text().trim();
    //var filetype = "";
    //$("input:checkbox[class='css-checkbox']:checked").each(function (i, b) {
    //    if (b.labels != null && b.labels.length > 0) {
    //        if (i == 0) {
    //            filetype = b.labels[0].innerText;
    //        }
    //        else {
    //            filetype += ("," + b.labels[0].innerText);
    //        }
    //    }
    //});
    var keyword = $("#keyid").val();
    
    showInfo(currentIndex, start, end, ftype, keyword, code);
}

$(function () {
    LoadTime();
    LoadTree();
    showInfo(1, "", "", "报告", "", code);
});