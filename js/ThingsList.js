var pageSize = 20;
var pageCount = 0;
var displayNums = 5;
var SType = "";

function ShowList(index, area_type, sub_type) {
    // console.log(area_type);
    // console.log(sub_type);
    var start = (index - 1) * pageSize;
    //if (sub_type == "产业动态") {
    //    sub_type = "产业新闻";
    //}
    //if (sub_type == "法规浏览") {
    //    sub_type = "法律浏览";
    //}
    //if (sub_type == "政策解读") {
    //    sub_type = "专家解读";
    //}
    SType = sub_type;
    var wurl = LoadUrl() + "axis2/services/MyService/getNormalNewsList";
    $.ajax({
        type: "POST",
        url: wurl,
        data: {
            "area_type": area_type,
            "sub_srv": sub_type,
            "doc_Type": "",
            "interpret_type": "",
            "fromIndex": start,
            "Size": pageSize
        },
        dataType: "text",
        success: function (result) {
            var html = '';
            var gu = getUrl();
            result = loadXML(result);
            if (result) {
                result = jQuery.parseJSON(result);
                if (result.length > 0) {
                    pageCount = result[0].total;
                    for (var i = 0; i < result.length; i++) {
                        if (sub_type == "13") {
                            html += '<li><a href="DetailShow.html?area=' + gu[0].substring(5) + '&submenu=' + gu[1].substring(8) + '&id=' + gu[2].substring(3) + '&top=' + gu[3].substring(4) + '&pid=' + result[i].id + '" title="' + result[i].title + '">' + result[i].title + '</a><span>' + (result[i].fromTime.substring(5, 10)) + '</span></li>';
                        }
                        else {
                            html += '<li><a href="NewsShow.html?area=' + gu[0].substring(5) + '&submenu=' + gu[1].substring(8) + '&id=' + gu[2].substring(3) + '&top=' + gu[3].substring(4) + '&pid=' + result[i].id + '" title="' + result[i].title + '">' + result[i].title + '</a><span>' + (result[i].fromTime.substring(5, 10)) + '</span></li>';
                        }
                    }
                    $("#list1").html(html);
                    var num = 0;
                    if (pageCount % pageSize == 0) {
                        num = Math.floor(pageCount / pageSize);
                    }
                    else {
                        num = Math.floor(pageCount / pageSize) + 1;
                    }

                    if (pageCount != 0) {
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
                        //        ShowList(p, area_type, sub_type);
                        //    }
                        //});
                        $("#pagingid").empty();
                        $("#pagingid").pagination(index, num, displayNums);
                    }
                    else {
                        $("#pagingid").empty();
                    }
                }
            }
        }
    })
}

function ShowPage(currentIndex) {
    var type = CustomDecode(getUrl()[1].substring(8));
    var type1 = CustomDecode(getUrl()[0].substring(5));
    ShowList(currentIndex, type1, type);
}

$(function () {
    // var type = GetLocal("SubIndexType");
    var type = getUrl()[1].substring(8);
    // console.log(type);
    // var type = GetSubLocal ();
    // var type1 = GetLocal("SubType");
    var type1 = CustomDecode(getUrl()[0].substring(5));
    // console.log(type1);
    var title = CustomDecode(getUrl()[3].substring(4));
    var id = getUrl()[2].substring(3);
    // console.log(id);
    $(".mbx").html("<a href='../SubIndex.html?area=" + CustomEnCode(type1) + "&submenu=&id=-1'>首页 &gt; <a href='ThingsList.html?area=" + CustomEnCode(type1) + "&submenu=" + type + "&id=" + id + "&top=" + CustomEnCode(title) + "'>" + type1 + "</a> &gt; <a href='ThingsList.html?area=" + CustomEnCode(type1) + "&submenu=" + type + "&id=" + id + "&top=" + CustomEnCode(title) + "'>" + title + "</a>");
    ShowList(1, type1, type);
});