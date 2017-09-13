var pageSize = 6;
var pageCount = 0;
var displayNums = 5;

function ShowPage(currentIndex) {
    ShowInfo(currentIndex);
}
function ShowInfo(currentIndex) {
    var surl = LoadUrl() + "axis2/services/MyService/getLawList";
    var start = (currentIndex - 1) * pageSize;
    $.ajax({
        type: "POST",
        url: surl,
        data: {
            "fromIndex": start,
            "Size": pageSize
        },
        dataType: "text",
        success: function (result) {
            var html = "";
            result = loadXML(result);
            result = jQuery.parseJSON(result);
            $("#listid").empty();
            $.each(result, function (a, b) {
                html += '<li>'
                    + '<div class="peishunxinxi_list_img"><a href="#"><img src="../images/peixun.jpg" width="354" height="168" alt=""/></a> </div>'
                    + '<div class="peishunxinxi_list_xq">'
                    + '<h2><a href="#">大数据流程管理与标准化建立</a></h2>'
                    + '<p>培训时间：2017-08-24</p>'
                    + '<p>报名时间：2016-12至2017-07</p>'
                    + '<p>活动规模：350人</p>'
                    + '<p>培训地点：上海浦东新区</p>'
                    + '</div>'
                    + '</li>';
            });
            $("#listid").html(html);
            var num = 0;
            pageCount = 12;
            if (pageCount % pageSize == 0) {
                num = Math.floor(pageCount / pageSize);
            }
            else {
                num = Math.floor(pageCount / pageSize) + 1;
            }
            $("#pagingid").empty();
            $("#pagingid").pagination(currentIndex, num, displayNums);

            //$("#pagingid").paginate({
            //    count: num,
            //    start: currentIndex,
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
            //        ShowInfo(p);
            //    }
            //});
        }
    })
}
$(function () {
    ShowInfo(1);
});