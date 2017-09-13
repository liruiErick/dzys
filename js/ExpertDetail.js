var title = '';
var user = getCookie('loginName') || localStorage['loginName'] || "";
var pid = '';

if (getUrl()[1].slice(0, 3) == 'pid') {
    pid = getUrl()[1].substring(4);
}
function CollType() {
    //var c = document.getElementsByName("radiog_dark");
    var c = $("#radio1");
    if (c[0].checked) {
        c[0].removeAttribute("checked");
        CancleCollection(user, pid);
    }
    else {
        AddCollection(user, pid, title, "10");
        c[0].setAttribute("checked", true);
    }
}

var ExpertDetail = {
    init: function () {
        this.IsCollectoin(user, pid);
    },
    ShowInfo: function (isShow) {
        var wurl = LoadUrl() + "axis2/services/MyService/getMeetingDetails";
        $.ajax({
            type: "POST",
            url: wurl,
            data: {
                "indexId": pid
            },
            dataType: "text",
            success: function (data) {
                data = loadXML(data);
                if (data) {
                    var b = jQuery.parseJSON(data);
                    var html = "";
                    var collstr = '';
                    if (user) {
                        if (isShow) {
                            collstr = '<div class="fawen_all radio_styles" onclick="CollType();return false;" style="color:#a9a9a9;font-size:15px; padding-top:0px; float:right;">'
                                        + '收藏：'
                                        + '<input type="radio" name="radiog_dark" checked="checked" id="radio1" class="css-checkbox"/>'
                                        + '<label for="radio1" class="css-label radGroup1 radGroup2" style="color:#a9a9a9;font-size:15px;"></label>'
                                    + '</div>';
                        }
                        else {
                            collstr = '<div class="fawen_all radio_styles" onclick="CollType();return false;" style="color:#a9a9a9;font-size:15px; padding-top:0px; float:right;">'
                                        + '收藏：'
                                        + '<input type="radio" name="radiog_dark" id="radio1" class="css-checkbox"/>'
                                        + '<label for="radio1" class="css-label radGroup1 radGroup2" style="color:#a9a9a9;font-size:15px;"></label>'
                                    + '</div>';
                        }
                    }
                    html += b.title + '<br/>'
                        + '<span>日期：' + b.fromTime.substring(0, 10) + '&#x3000;&#x3000;来源：<a href="' + b.url + '">' + b.page_source + '</a>' + collstr + '</span>';
                    $(".biaoti").html(html);
                    title = b.title;
                    html = '<span>导读:</span> ' + b.stick_abstract;
                    $("#daoduid").html(htmldecode(html.substring(0, html.indexOf("。") + 1)));
                    var content = htmldecode("<p>" + b.content + "</p>");
                    content += '<div>'
                        + '<a href="' + b.url + '" style="float:right;">查看原文</a>'
                        + '</div>';
                    $("#Editneirongid").html(content);
                }
            }
        })
    },
    IsCollectoin: function (UserName, DetailId) {
        var url = LoadUrl() + "axis2/services/MyService/checkFavorite";
        $.ajax({
            type: "POST",
            url: url,
            data: {
                "user": UserName,
                "id": DetailId
            },
            dataType: "text",
            success: function (result) {
                result = loadXML(result);
                result = jQuery.parseJSON(result);
                ExpertDetail.ShowInfo(result);
            }
        })
    }
}

ExpertDetail.init();

