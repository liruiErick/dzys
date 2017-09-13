/**
 * MTrend页面公共部分数据加载函数
 * @param url
 * @param area_type
 * @param elementId
 * @constructor
 */
function MarketTrendComLoad(url, area_type, elementId) {
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "area_type": area_type,
            "sub_srv": "17",
            "doc_Type": "",
            "interpret_type": "",
            "fromIndex": 0,
            "Size": 9
        },
        dataType: "text",
        success: function (result) {
            var html = "";
            result = loadXML(result);
            result = jQuery.parseJSON(result);
            $(elementId).empty();
            $.each(result, function (a, b) {
                html += '<li><a href="MarketTrendChildDetail.html?menu=2&pid=' + b.id + '">' + b.title + ' </a><span>' + b.fromTime.substring(5, 10) + '</span></li>';
            });
            $(elementId).html(html)
        }
    })
}

$(function () {
    var url = LoadUrl() + "axis2/services/MyService/getStickNewsList";
    //top
    $.ajax({
        type: "POST",
        url: url,
        data: {
            "sub_srv": "17",
            "area_type": "",
            "top_flag": 0,
            "fromIndex": 0,
            "Size": 3
        },
        dataType: "text",
        success: function (result) {
            var html = "";
            result = loadXML(result);
            if (result) {
                result = jQuery.parseJSON(result);
                $("#topid").empty();
                $.each(result, function (a, b) {
                    html += '<li><a href="MarketTrendChildDetail.html?menu=2&pid=' + b.id + '"><img src="../images/' + b.stick_pic + '" width="300" height="168" alt=""/></a>'
                        + '<h2 style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"><a href="MarketTrendChildDetail.html?menu=2&pid=' + b.id + '" title="' + b.title + '">' + b.title + '</a></h2>'
                        + '<p><a href="MarketTrendChildDetail.html?menu=2&pid=' + b.id + '">' + b.stick_abstract + '</a></p>'
                        + '</li>';
                });
                $("#topid").html(html);
            }
        }
    });
    var nurl = LoadUrl() + "axis2/services/MyService/getNormalNewsList";
    // 物联网
    new MarketTrendComLoad(nurl, '物联网', '#wlwid');
    // 云计算
    new MarketTrendComLoad(nurl, '云计算', '#yjsid');
    // 大数据
    new MarketTrendComLoad(nurl, '大数据', '#dsjid');
    // 人工智能
    new MarketTrendComLoad(nurl, '人工智能', '#rgznid');
    // 未来计算
    new MarketTrendComLoad(nurl, '未来计算', '#wltxid');
    // 信息安全
    new MarketTrendComLoad(nurl, '信息安全', '#xxaqid');
    // 智能制造
    new MarketTrendComLoad(nurl, '智能制造', '#znzzid');
    // 集成电路
    new MarketTrendComLoad(nurl, '集成电路', '#jcdlid');
});