var pageSize = 20;
var pageCount = 0;
var displayNums = 5;

function ShowInfo(index, type) {
    var start = (index - 1) * pageSize;
    var wurl = LoadUrl() + "axis2/services/MyService/getNormalNewsList";
    $.ajax({
        type: "POST",
        url: wurl,
        data: {
            "area_type": type,
            "sub_srv": "17",
            "doc_Type": "",
            "interpret_type": "",
            "fromIndex": start,
            "Size": pageSize
        },
        dataType: "text",
        success: function (result) {
            var html1 = "";
            result = loadXML(result);
            result = jQuery.parseJSON(result);
            for (var i = 0; i < result.length; i++) {
                var b = result[i];
                pageCount = b.total;
                html1 += '<li>'
                    + '<a href="MarketTrendChildDetail.html?menu=2&pid=' + b.id + '" title="' + b.title + '">' + b.title + '</a><span>' + b.fromTime.substring(5, 10) + '</span>'
                    + '</li>';

            }
            $("#list1").html(html1);
            var num = 0;
            if (pageCount % pageSize === 0) {
                num = Math.floor(pageCount / pageSize);
            }
            else {
                num = Math.floor(pageCount / pageSize) + 1;
            }

            if (pageCount !== 0) {
                //$("#pagingid").css("display", "block");
                //$("#pagingid").paginate({
                //    count: num,
                //    start: index,
                //    display: displayNums,
                //    border: true,
                //    border_color: '#fffff',
                //    text_color: '#828282',
                //    background_color: '#f2f2f2',
                //    border_hover_color: '#fff',
                //    text_hover_color: '#fff',
                //    background_hover_color: '#00aaff',
                //    images: false,
                //    mouse: 'press',
                //    onChange: function (p) {
                //        ShowInfo(p, type);
                //    }
                //});
                $("#pagingid").empty();
                $("#pagingid").pagination(index, num, displayNums);
            }
            else {
                $("#pagingid").empty();
            }
        }
    })
}

function ShowPage(currentIndex) {
    var type = CustomDecode(getUrl()[1].substring(3));
    ShowInfo(currentIndex, type);
}

$(function () {
    var type = CustomDecode(getUrl()[1].substring(3));
    var menu = "";
    if (getUrl()[0].slice(0, 4) == 'menu') {
        menu = getUrl()[0].substring(5);
    }
    $(".mbx").html("<a href='../index.html'>首页</a> &gt; <a href='MarketTrend.html?menu=" + menu + "'>产业商情</a> &gt; <a href='MarketTrend.html?menu=" + menu + "'>市场观察</a> &gt; <a href='MarketTrendChild.html?menu=" + menu + "&kw=" + CustomEnCode(type) + "'>" + type + "</a>");
    //$('.mbx').html('首页 &gt; 产业商情 &gt; ' + type);
    ShowInfo(1, type)
});